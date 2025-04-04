import React, { useRef, useEffect, useState } from 'react';
import MarketplaceActionModal from '../../../common/MarketplaceActionModal';
import WalletConnectButton from '../../../common/WalletConnectButton';
import Button from '../../../common/Button';
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
    level?: number;
    yieldPerHour?: number;
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
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<MarketplaceItem | null>(null);
    const [processingAction, setProcessingAction] = useState(false);
    const [showConnectPrompt, setShowConnectPrompt] = useState<boolean>(false);
    const [showCardDetail, setShowCardDetail] = useState<boolean>(false);
    const [selectedCardItem, setSelectedCardItem] = useState<MarketplaceItem | null>(null);
    
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
                // Add mock level and yield data for now
                const enhancedListings = response.data.listings.map((item: MarketplaceItem) => {
                    const rarityYieldMultiplier = {
                        'legendary': 12,
                        'epic': 8,
                        'rare': 5,
                        'common': 2
                    };
                    
                    // Generate level between 1-100 based on rarity
                    const minLevel = {
                        'legendary': 70,
                        'epic': 40,
                        'rare': 20,
                        'common': 1
                    };
                    
                    const maxLevel = {
                        'legendary': 100,
                        'epic': 80,
                        'rare': 60,
                        'common': 40
                    };
                    
                    const min = minLevel[item.rarity.toLowerCase() as keyof typeof minLevel] || 1;
                    const max = maxLevel[item.rarity.toLowerCase() as keyof typeof maxLevel] || 100;
                    const level = Math.floor(Math.random() * (max - min + 1)) + min;
                    
                    // Calculate yield based on level and rarity
                    const baseYield = rarityYieldMultiplier[item.rarity.toLowerCase() as keyof typeof rarityYieldMultiplier] || 1;
                    const yieldPerHour = Math.floor(baseYield * (level / 10));
                    
                    return {
                        ...item,
                        level,
                        yieldPerHour
                    };
                });
                
                setMarketplaceItems(enhancedListings);
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

    // Toggle filters on mobile
    const toggleFilters = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Open the card detail modal
    const openCardDetail = (item: MarketplaceItem) => {
        setSelectedCardItem(item);
        setShowCardDetail(true);
    };

    // Close the card detail modal
    const closeCardDetail = () => {
        setShowCardDetail(false);
        setSelectedCardItem(null);
    };

    // Open the buy modal
    const openBuyModal = (item: MarketplaceItem, e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        
        if (!isConnected || !walletAddress) {
            setShowConnectPrompt(true);
            return;
        }
        
        setActiveItem(item);
        setModalOpen(true);
        
        // Close card detail if open
        if (showCardDetail) {
            setShowCardDetail(false);
        }
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
    
    const getAssetType = (item: MarketplaceItem): 'item' | 'hero' | 'farmer' => {
        // Logic to determine asset type based on the item
        return 'item'; // Default to item for now
    };
    
    const handleSearch = () => {
        // Handle search (current implementation doesn't need this)
        console.log('Searching for:', searchTerm);
    };

    const handleClosePrompt = () => {
        setShowConnectPrompt(false);
    };

    return (
        <div className={`marketplace-section ${isVisible ? 'visible' : ''}`} ref={sectionRef} id="marketplace-items">
            <div className="marketplace-header">
                <div className="mobile-filter-controls">
                    <button 
                        className={`filter-toggle-btn ${isFilterOpen ? 'active' : ''}`}
                        onClick={toggleFilters}
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M6 12h12M10 18h4"></path>
                        </svg>
                        <span>Filters</span>
                    </button>
                    <div className="sort-section mobile-sort">
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

                <div className={`categories-section ${isFilterOpen ? 'open' : ''}`}>
                    <div className="rarity-header">
                        <span className="selected-rarity">
                            {selectedRarities.length === 1 
                                ? `${selectedRarities[0].toUpperCase()} RARITY` 
                                : selectedRarities.length === 0 
                                    ? "ALL RARITIES" 
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
                    <div className="sort-section desktop-sort">
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
                <div className="items-grid-container">
                    <div className="marketplace-items-grid">
                        <div className="marketplace-table-header">
                            <div className="header-cell">Name</div>
                            <div className="header-cell">Level</div>
                            <div className="header-cell">Price</div>
                            <div className="header-cell">Yield</div>
                            <div className="header-cell">Action</div>
                        </div>
                        
                        {filteredItems.map(item => (
                            <div 
                                key={item.id} 
                                className="marketplace-item-card"
                                data-rarity={item.rarity.toLowerCase()}
                                onClick={() => openCardDetail(item)}
                            >
                                <div className="item-name-cell">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-type">{item.type}</span>
                                </div>
                                
                                <div className="item-level-cell">
                                    {item.level && <span className="item-level">LVL {item.level}</span>}
                                </div>
                                
                                <div className="item-price-cell">
                                    <span className="item-price">{item.price.toLocaleString()} WLO</span>
                                    <span className="item-seller">
                                        Seller: {item.seller.substring(0, 4)}...{item.seller.substring(item.seller.length - 4)}
                                    </span>
                                </div>
                                
                                <div className="item-yield-cell">
                                    {item.yieldPerHour && <span className="item-yield">+{item.yieldPerHour} WLO/hr</span>}
                                </div>
                                
                                <div className="item-action-cell">
                                    <button 
                                        className="buy-button"
                                        onClick={(e) => openBuyModal(item, e)}
                                    >
                                        BUY NOW
                                    </button>
                                </div>
                                
                                {/* For mobile layout */}
                                <div className="item-info-row">
                                    <div className="mobile-level">
                                        {item.level && <span className="item-level">LVL {item.level}</span>}
                                    </div>
                                    
                                    <div className="mobile-yield">
                                        {item.yieldPerHour && <span className="item-yield">+{item.yieldPerHour} WLO/hr</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
            
            {/* Card Detail Modal */}
            {showCardDetail && selectedCardItem && (
                <div className="card-detail-overlay" onClick={closeCardDetail}>
                    <div className="card-detail-modal" 
                        data-rarity={selectedCardItem.rarity.toLowerCase()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="card-detail-close" onClick={closeCardDetail}>×</button>
                        <div className="item-name">{selectedCardItem.name}</div>
                        <div className="item-type">{selectedCardItem.type}</div>
                        
                        <div className="card-detail-stats">
                            {selectedCardItem.level && (
                                <div className="item-level">
                                    LVL {selectedCardItem.level}
                                </div>
                            )}
                            
                            {selectedCardItem.yieldPerHour && (
                                <div className="item-yield">
                                    +{selectedCardItem.yieldPerHour} WLO/hr
                                </div>
                            )}
                        </div>
                        
                        <div className="item-price">{selectedCardItem.price.toLocaleString()} WLO</div>
                        <div className="item-seller">
                            Seller: {selectedCardItem.seller.substring(0, 4)}...{selectedCardItem.seller.substring(selectedCardItem.seller.length - 4)}
                        </div>
                        
                        <button 
                            className="buy-button"
                            onClick={() => openBuyModal(selectedCardItem)}
                        >
                            BUY NOW
                        </button>
                    </div>
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

            {/* Wallet Connect Prompt */}
            {showConnectPrompt && (
                <div className="wallet-connect-overlay" onClick={handleClosePrompt}>
                    <div className="wallet-connect-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Connect Wallet to Buy Items</h3>
                        <p>Connect your wallet to purchase items from the marketplace.</p>
                        <div className="modal-actions">
                            <WalletConnectButton color="green" />
                            <Button text="CANCEL" color="transparent" onClick={handleClosePrompt} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketplaceItemsSection; 