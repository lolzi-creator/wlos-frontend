import React, { useRef, useEffect, useState } from 'react';
import Button from '../../../common/Button';
import EntityCard from '../../../common/EntityCard';
import MarketplaceActionModal from '../../../common/MarketplaceActionModal';
import { useWalletConnection } from '../../../../context/WalletConnectionProvider';
import { marketplaceService } from '../../../../services/api';
import { Rarity } from '../../../../types/ItemTypes';
import { toast } from 'react-toastify';
import '../../../../styles/modules/marketplace/new/MarketplaceListingsSection.css';

interface ListedItem {
    id: string;
    name: string;
    type: string;
    category: string;
    rarity: Rarity;
    image?: string;
    price: number;
    listedAt: string;
    views: number;
    likes: number;
}

const MarketplaceListingsSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [listings, setListings] = useState<ListedItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedListing, setSelectedListing] = useState<string | null>(null);
    
    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<'changePrice' | 'cancel'>('changePrice');
    const [activeListing, setActiveListing] = useState<ListedItem | null>(null);
    const [processingAction, setProcessingAction] = useState(false);
    
    const sectionRef = useRef<HTMLDivElement>(null);
    const { isConnected, walletAddress } = useWalletConnection();

    // Fetch user's listings
    useEffect(() => {
        if (isConnected && walletAddress) {
            fetchUserListings();
        }
    }, [isConnected, walletAddress]);
    
    const fetchUserListings = async () => {
        if (!isConnected || !walletAddress) {
            setError("Please connect your wallet to view your listings");
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            // Get user's listings from the API
            const response = await marketplaceService.getMyListings(walletAddress);
            
            if (response?.data?.listings) {
                // Map the API response to our required format
                const myListings = response.data.listings.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    type: item.type || "Item",
                    category: item.category || "items",
                    rarity: item.rarity || "common",
                    image: item.image,
                    price: item.price,
                    listedAt: item.listedAt || new Date().toISOString(),
                    views: item.views || 0,
                    likes: item.likes || 0
                }));
                
                setListings(myListings);
            } else {
                console.error('Unexpected listings response format:', response?.data);
                setError('Failed to load your listings. The API response was in an unexpected format.');
            }
        } catch (err: any) {
            console.error('Error fetching user listings:', err);
            
            // Extract error message from API response if available
            let errorMessage = 'Failed to load your listings. Please try again later.';
            if (err.response?.data) {
                if (typeof err.response.data === 'string') {
                    errorMessage = err.response.data;
                } else if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                } else if (err.response.data.error) {
                    errorMessage = err.response.data.error;
                }
            } else if (err.message) {
                errorMessage = `Error: ${err.message}`;
            }
            
            // Log full error details
            console.log('Listings fetch error details:', {
                error: err,
                response: err.response?.data,
                status: err.response?.status
            });
            
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Filter listings based on search term
    const filteredListings = listings.filter(item => {
        const matchesSearch = searchTerm === '' || 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.type.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesSearch;
    });

    // Format date string to human readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    // Open the change price modal
    const openChangePriceModal = (listing: ListedItem) => {
        if (!isConnected || !walletAddress) {
            toast.error("Please connect your wallet to edit listings");
            return;
        }
        
        setActiveListing(listing);
        setModalAction('changePrice');
        setModalOpen(true);
    };
    
    // Open the cancel listing modal
    const openCancelListingModal = (listing: ListedItem) => {
        if (!isConnected || !walletAddress) {
            toast.error("Please connect your wallet to cancel listings");
            return;
        }
        
        setActiveListing(listing);
        setModalAction('cancel');
        setModalOpen(true);
    };
    
    // Handle modal confirmation
    const handleModalConfirm = async (price?: number) => {
        if (!activeListing || !isConnected || !walletAddress) return;
        
        setProcessingAction(true);
        
        try {
            if (modalAction === 'changePrice' && price) {
                // Update the listing price
                await marketplaceService.updateListing(walletAddress, activeListing.id, price);
                
                // Close modal first
                setModalOpen(false);
                setActiveListing(null);
                
                // Update the price in the local state
                setListings(prev => 
                    prev.map(item => 
                        item.id === activeListing.id ? { ...item, price } : item
                    )
                );
                
                // Show success message
                toast.success(`Price updated successfully to ${price.toLocaleString()} WLO!`);
                
                // Refresh listings to get updated data
                fetchUserListings();
            } else if (modalAction === 'cancel') {
                // Cancel the listing
                await marketplaceService.cancelListing(walletAddress, activeListing.id);
                
                // Close modal first
                setModalOpen(false);
                setActiveListing(null);
                
                // Remove the listing from the UI
                setListings(prevListings => prevListings.filter(listing => listing.id !== activeListing.id));
                
                // Show success message
                toast.success("Listing canceled successfully!");
            }
        } catch (err: any) {
            console.error('Error processing listing action:', err);
            
            // Close modal first
            setModalOpen(false);
            setActiveListing(null);
            
            // Extract error message if available
            let errorMessage = 'Failed to complete the action. Please try again later.';
            
            // Check for specific API errors
            if (err.response && err.response.data) {
                if (typeof err.response.data === 'string') {
                    errorMessage = err.response.data;
                } else if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                } else if (err.response.data.error) {
                    errorMessage = err.response.data.error;
                }
            } else if (err.message) {
                // If it's just a generic error, use the message
                errorMessage = `Error: ${err.message}`;
            }
            
            // Log the full error for debugging
            console.log('Marketplace action error details:', {
                action: modalAction,
                error: err,
                response: err.response?.data,
                status: err.response?.status
            });
            
            // Show error message
            toast.error(errorMessage);
        } finally {
            setProcessingAction(false);
        }
    };

    // Handle creating a new listing
    const handleCreateListing = () => {
        if (!isConnected || !walletAddress) {
            toast.error("Please connect your wallet to create listings");
            return;
        }
        
        // Navigate to inventory tab
        const inventoryTab = document.querySelector('[data-tab="inventory"]');
        if (inventoryTab) {
            (inventoryTab as HTMLElement).click();
        }
    };

    // Handle card selection
    const handleSelect = (id: string) => {
        setSelectedListing(selectedListing === id ? null : id);
    };

    return (
        <div className={`listings-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
            {/* Marketplace Action Modal - Positioned at the top */}
            {activeListing && (
                <div className="modal-container">
                    <MarketplaceActionModal
                        isOpen={modalOpen}
                        onClose={() => {
                            setModalOpen(false);
                            setActiveListing(null);
                        }}
                        actionType={modalAction}
                        assetName={activeListing.name}
                        assetType={activeListing.type.toLowerCase() === 'hero' ? 'hero' : 
                                  activeListing.type.toLowerCase() === 'farmer' ? 'farmer' : 'item'}
                        assetRarity={activeListing.rarity}
                        assetImage={activeListing.image}
                        currentPrice={activeListing.price}
                        onConfirm={handleModalConfirm}
                        isProcessing={processingAction}
                    />
                </div>
            )}

            <div className="listings-dashboard">
                <div className="listings-dashboard-header">
                    <div className="dashboard-title">
                        <div className="title-accent"></div>
                        <h2>MY ACTIVE LISTINGS</h2>
                    </div>
                    <button className="create-listing-button" onClick={handleCreateListing}>
                        <span className="create-icon">+</span>
                        LIST NEW ITEM
                    </button>
                </div>
                
                <div className="listings-stats-panel">
                    <div className="stat-card">
                        <div className="stat-icon-container">
                            <div className="stat-icon listings-icon"></div>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{listings.length}</div>
                            <div className="stat-label">ACTIVE<br/>LISTINGS</div>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-icon-container">
                            <div className="stat-icon value-icon"></div>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{listings.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</div>
                            <div className="stat-label">TOTAL<br/>VALUE</div>
                        </div>
                        <div className="stat-unit">WLO</div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-icon-container">
                            <div className="stat-icon views-icon"></div>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{listings.reduce((sum, item) => sum + item.views, 0).toLocaleString()}</div>
                            <div className="stat-label">TOTAL<br/>VIEWS</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="listings-search-container">
                <div className="search-wrapper">
                    <input
                        type="text"
                        className="listings-search-input"
                        placeholder="SEARCH YOUR LISTINGS..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="search-icon"></div>
                </div>
            </div>

            {isLoading ? (
                <div className="loading-indicator">Loading your listings...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : filteredListings.length > 0 ? (
                <div className="listings-table-container">
                    <table className="listings-table">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>TYPE</th>
                                <th>PRICE</th>
                                <th className="hide-mobile">LISTED</th>
                                <th className="hide-mobile">VIEWS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredListings.map(item => (
                                <tr key={item.id} className={`type-${item.type.toLowerCase()}`}>
                                    <td className="item-name-cell">{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>{item.price.toLocaleString()} WLO</td>
                                    <td className="hide-mobile">{formatDate(item.listedAt)}</td>
                                    <td className="hide-mobile">{item.views}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="action-btn edit-btn"
                                                onClick={() => openChangePriceModal(item)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="action-btn cancel-btn"
                                                onClick={() => openCancelListingModal(item)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-listings">
                    <div className="no-listings-icon">📊</div>
                    <h3 className="no-listings-title">No Active Listings</h3>
                    <p className="no-listings-message">
                        You don't have any items listed for sale in the marketplace.
                    </p>
                    <button 
                        className="create-listing-btn"
                        onClick={handleCreateListing}
                    >
                        List an Item for Sale
                    </button>
                </div>
            )}
        </div>
    );
};

export default MarketplaceListingsSection; 