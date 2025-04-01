import React, { useRef, useEffect, useState } from 'react';
import MarketplaceActionModal from '../../../common/MarketplaceActionModal';
import { useWalletConnection } from '../../../../context/WalletConnectionProvider';
import { marketplaceService } from '../../../../services/api';
import { Rarity } from '../../../../types/ItemTypes';
import '../../../../styles/modules/marketplace/new/MarketplaceItemsSection.css';
import { toast } from 'react-toastify';

interface MarketplaceItem {
    id: string;
    name: string;
    type: string;
    category: string;
    rarity: Rarity;
    image?: string;
    price: number;
    seller: string;
    listedAt: string;
}

interface MarketplaceItemsSectionProps {
    sortOrder?: 'price_asc' | 'price_desc' | 'newest' | 'oldest';
    onChangeSortOrder?: (order: 'price_asc' | 'price_desc' | 'newest' | 'oldest') => void;
}

const MarketplaceItemsSection: React.FC<MarketplaceItemsSectionProps> = ({ 
    sortOrder = 'newest',
    onChangeSortOrder
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
    const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<MarketplaceItem | null>(null);
    const [processingAction, setProcessingAction] = useState(false);
    
    const sectionRef = useRef<HTMLDivElement>(null);
    const { isConnected, walletAddress } = useWalletConnection();

    // Define categories
    const rarityOptions = [
        { id: 'legendary', name: 'LEGENDARY' },
        { id: 'epic', name: 'EPIC' },
        { id: 'rare', name: 'RARE' },
        { id: 'common', name: 'COMMON' }
    ];

    // Define sort options
    const sortOptions = [
        { id: 'newest', name: 'Newest' },
        { id: 'oldest', name: 'Oldest' },
        { id: 'price_asc', name: 'Price: Low to High' },
        { id: 'price_desc', name: 'Price: High to Low' }
    ];

    // Fetch marketplace items
    useEffect(() => {
        fetchMarketplaceItems();
    }, [sortOrder, selectedRarities]);

    const fetchMarketplaceItems = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            // Create filters based on selected rarities
            const filters: any = {};
            
            // Add sort order
            if (sortOrder === 'price_asc') {
                filters.sortBy = 'price_asc';
            } else if (sortOrder === 'price_desc') {
                filters.sortBy = 'price_desc';
            } else if (sortOrder === 'oldest') {
                filters.sortBy = 'oldest';
            } else {
                filters.sortBy = 'newest'; // Default
            }
            
            // Add rarity filter if any selected
            if (selectedRarities.length > 0) {
                filters.rarity = selectedRarities.join(',');
            }
            
            // Get marketplace listings from the API
            const response = await marketplaceService.getListings(filters);
            
            if (response?.data?.listings) {
                setMarketplaceItems(response.data.listings);
            } else {
                console.error('Unexpected response format:', response?.data);
                setError('The marketplace data is not in the expected format. Please try again later.');
            }
        } catch (err: any) {
            console.error('Error fetching marketplace items:', err);
            
            // Extract error message from API response if available
            let errorMessage = 'Failed to load marketplace items. Please try again later.';
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = `Error: ${err.message}`;
            }
            
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

    // Handle toggling a rarity
    const toggleRarity = (rarityId: string) => {
        if (selectedRarities.includes(rarityId)) {
            setSelectedRarities(prev => prev.filter(id => id !== rarityId));
        } else {
            setSelectedRarities(prev => [...prev, rarityId]);
        }
    };

    // Handle changing sort order
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortOrder = e.target.value as 'price_asc' | 'price_desc' | 'newest' | 'oldest';
        if (onChangeSortOrder) {
            onChangeSortOrder(newSortOrder);
        }
    };

    // Filter items based on search term and rarities
    const filteredItems = marketplaceItems.filter(item => {
        const matchesSearch = searchTerm === '' || 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.type.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRarity = selectedRarities.length === 0 || 
            selectedRarities.includes(item.rarity.toLowerCase());
        
        return matchesSearch && matchesRarity;
    });

    // Open the buy modal
    const openBuyModal = (item: MarketplaceItem) => {
        if (!isConnected || !walletAddress) {
            setError("Please connect your wallet to buy items");
            return;
        }
        
        setActiveItem(item);
        setModalOpen(true);
    };
    
    // Handle modal confirmation
    const handleModalConfirm = async () => {
        if (!activeItem || !isConnected || !walletAddress) return;
        
        setProcessingAction(true);
        
        try {
            console.log(`Attempting to purchase item with ID: ${activeItem.id}, by wallet: ${walletAddress}`);
            
            // Purchase the item
            await marketplaceService.purchaseItem(walletAddress, activeItem.id);
            
            // Close modal first
            setModalOpen(false);
            setActiveItem(null);
            
            // Then show success message
            toast.success(`${activeItem.name} purchased successfully for ${activeItem.price.toLocaleString()} WLO!`);
            
            // Remove from marketplace items
            setMarketplaceItems(prev => prev.filter(item => item.id !== activeItem.id));
            
            // Refresh marketplace items
            fetchMarketplaceItems();
        } catch (err: any) {
            console.error('Error purchasing item:', err);
            
            // Close modal first
            setModalOpen(false);
            setActiveItem(null);
            
            // Extract error message if available
            let errorMessage = 'Failed to purchase item. Please try again later.';
            
            // Check for server 500 errors specifically
            if (err.response?.status === 500) {
                console.error('Server 500 error details:', {
                    item: activeItem.id,
                    wallet: walletAddress,
                    message: err.response?.data?.message || 'Unknown server error',
                    data: JSON.stringify(err.response?.data)
                });
                errorMessage = `Server error occurred (500): ${err.response?.data?.message || 'Unknown error'}. The transaction may have failed.`;
            }
            // Check for specific API errors
            else if (err.response && err.response.data) {
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
            console.log('Purchase error details:', {
                error: err,
                response: err.response?.data,
                status: err.response?.status,
                itemId: activeItem.id,
                walletAddress: walletAddress
            });
            
            // Show more specific error message
            toast.error(errorMessage);
        } finally {
            setProcessingAction(false);
        }
    };

    // Get asset type for an item
    const getAssetType = (item: MarketplaceItem): 'item' | 'hero' | 'farmer' => {
        if (item.category === 'heroes') return 'hero';
        if (item.category === 'farmers') return 'farmer';
        return 'item';
    };

    // Handle search button click
    const handleSearch = () => {
        // Trigger search with current term
        fetchMarketplaceItems();
    };

    return (
        <div className={`marketplace-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="marketplace-header">
                <div className="categories-section">
                    <div className="rarity-header">
                        <span className="selected-rarity">
                            {selectedRarities.length === 1 
                                ? `${selectedRarities[0].toUpperCase()} RARITY` 
                                : selectedRarities.length === 0 
                                    ? "COMMON RARITY" 
                                    : "MIXED RARITIES"}
                        </span>
                    </div>
                    <div className="categories-grid">
                        {rarityOptions.map(rarity => (
                            <button
                                key={rarity.id}
                                className={`category-card ${selectedRarities.includes(rarity.id) ? 'active' : ''}`}
                                onClick={() => toggleRarity(rarity.id)}
                                data-rarity={rarity.id}
                            >
                                <span className="category-name">{rarity.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="marketplace-search">
                    <div className="search-container">
                        <input
                            type="text"
                            className="marketplace-search-input"
                            placeholder="Search marketplace..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                        <button 
                            className="search-button"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    <div className="sort-section">
                        <span className="sort-label">Sort by:</span>
                        <select 
                            className="sort-select"
                            value={sortOrder}
                            onChange={handleSortChange}
                        >
                            {sortOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="loading-indicator">Loading marketplace items...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : filteredItems.length > 0 ? (
                <div className="table-container">
                    <table className="marketplace-table">
                        <thead>
                            <tr>
                                <th>ITEM</th>
                                <th className="hide-mobile">TYPE</th>
                                <th className="hide-mobile">PRICE</th>
                                <th className="hide-mobile">SELLER</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map(item => (
                                <tr key={item.id} className={`rarity-${item.rarity.toLowerCase()}`}>
                                    <td>
                                        <span className="item-name">{item.name}</span>
                                        <div className="mobile-details">
                                            <span>{item.type}</span>
                                            <span>{item.price.toLocaleString()} WLO</span>
                                        </div>
                                    </td>
                                    <td className="hide-mobile">{item.type}</td>
                                    <td className="hide-mobile">{item.price.toLocaleString()} WLO</td>
                                    <td className="hide-mobile">{item.seller.substring(0, 6)}...{item.seller.substring(item.seller.length - 4)}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="action-btn list-btn"
                                                onClick={() => openBuyModal(item)}
                                            >
                                                BUY NOW
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-marketplace-items">
                    <div className="no-items-icon">🔍</div>
                    <h3 className="no-items-title">No items found</h3>
                    <p className="no-items-message">
                        No items match your current search or filter criteria.
                    </p>
                </div>
            )}
            
            {/* Buy Modal */}
            {activeItem && (
                <MarketplaceActionModal
                    isOpen={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setActiveItem(null);
                    }}
                    actionType="buy"
                    assetName={activeItem.name}
                    assetType={getAssetType(activeItem)}
                    assetRarity={activeItem.rarity}
                    assetImage={activeItem.image}
                    currentPrice={activeItem.price}
                    onConfirm={handleModalConfirm}
                    isProcessing={processingAction}
                />
            )}
        </div>
    );
};

export default MarketplaceItemsSection; 