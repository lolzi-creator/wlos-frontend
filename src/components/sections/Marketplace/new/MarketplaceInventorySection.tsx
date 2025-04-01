import React, { useRef, useEffect, useState } from 'react';
import Button from '../../../common/Button';
import EntityCard from '../../../common/EntityCard';
import MarketplaceActionModal from '../../../common/MarketplaceActionModal';
import { useWalletConnection } from '../../../../context/WalletConnectionProvider';
import { marketplaceService, heroService } from '../../../../services/api';
import { Rarity } from '../../../../types/ItemTypes';
import '../../../../styles/modules/marketplace/new/MarketplaceInventorySection.css';
import { toast } from 'react-toastify';

interface InventoryItem {
    id: string;
    name: string;
    type: string;
    subType?: string;
    category: string;
    rarity: Rarity;
    image?: string;
    acquired: string;
    equipped: boolean;
    level?: number;
    yield?: number;
    assetType: 'item' | 'hero' | 'farmer';
    price?: number;
    listed: boolean;
}

const MarketplaceInventorySection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    
    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<'list' | 'cancel' | 'changePrice' | 'buy' | 'sellNow'>('list');
    const [activeItem, setActiveItem] = useState<InventoryItem | null>(null);
    const [estimatedValue, setEstimatedValue] = useState<number | undefined>(undefined);
    const [processingAction, setProcessingAction] = useState(false);
    
    const sectionRef = useRef<HTMLDivElement>(null);
    const { isConnected, walletAddress, refreshWallet } = useWalletConnection();

    // Define inventory categories
    const categories = [
        { id: 'heroes', name: 'HEROES' },
        { id: 'farmers', name: 'FARMERS' }
    ];

    // Fetch inventory data
    useEffect(() => {
        if (isConnected && walletAddress) {
            fetchInventory();
        }
    }, [isConnected, walletAddress]);
    
    const fetchInventory = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            console.log('Fetching inventory for wallet:', walletAddress);
            
            // Get user's inventory from the assets endpoint
            const response = await marketplaceService.getUserInventory(walletAddress);
            
            console.log('Raw inventory response:', response); 
            
            // Check if we have items in the expected format
            if (response?.data?.items) {
                // Map the API response to our required format
                const items = response.data.items;
                
                // Log the first few items with their detailed structure
                if (items.length > 0) {
                    console.log('First 3 inventory items (or fewer if less available):');
                    items.slice(0, 3).forEach((item: InventoryItem, index: number) => {
                        console.log(`Item ${index + 1}:`, item);
                        console.log(`- ID: ${item.id} (type: ${typeof item.id})`);
                        console.log(`- Name: ${item.name}`);
                        console.log(`- Type: ${item.type} / AssetType: ${item.assetType}`);
                    });
                }
                
                if (items.length > 0) {
                    console.log(`Found ${items.length} inventory items`);
                    setInventoryItems(items);
                } else {
                    setInventoryItems([]);
                    setError('Your inventory is empty. Purchase items from the marketplace to see them here.');
                }
            } else {
                console.error('Unexpected response format:', response?.data);
                setError('Could not load inventory data. The API response format is unexpected.');
            }
        } catch (err: any) {
            console.error('Error fetching inventory:', err);
            
            // Extract error message from API response if available
            let errorMessage = 'Failed to load your inventory. Please try again later.';
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
    
    // Get estimated value for an item
    const getEstimatedValue = async (itemId: string, assetType: string) => {
        try {
            const response = await marketplaceService.getEstimatedValue(itemId, assetType);
            if (response?.data?.estimatedValue) {
                return response.data.estimatedValue;
            }
            // Fallback estimated values if API doesn't return one
            return assetType === 'hero' ? 5000 : assetType === 'farmer' ? 3000 : 1000;
        } catch (error) {
            console.error('Error getting estimated value:', error);
            // Fallback estimated values
            return assetType === 'hero' ? 5000 : assetType === 'farmer' ? 3000 : 1000;
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

    // Filter items based on search and category
    const filteredItems = inventoryItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (item.subType && item.subType.toLowerCase().includes(searchTerm.toLowerCase()));
        
        let matchesCategory = false;
        if (selectedCategory === 'all') {
            matchesCategory = true;
        } else if (selectedCategory === 'items') {
            matchesCategory = item.assetType === 'item';
        } else if (selectedCategory === 'heroes') {
            matchesCategory = item.assetType === 'hero';
        } else if (selectedCategory === 'farmers') {
            matchesCategory = item.assetType === 'farmer';
        } else {
            // For specific item categories (weapons, armor, etc.)
            matchesCategory = item.category === selectedCategory;
        }
        
        return matchesSearch && matchesCategory;
    });

    // Format date string to human readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    // Handle equip/unequip item
    const handleEquipToggle = async (itemId: string, equipped: boolean, assetType: string) => {
        if (!isConnected || !walletAddress) {
            setError("Please connect your wallet to equip/unequip items");
            return;
        }
        
        // Only items can be equipped for now
        if (assetType !== 'item') {
            return;
        }
        
        setIsLoading(true);
        
        try {
            if (equipped) {
                // Use the heroService to unequip
                await heroService.unequipItem(walletAddress, "default-hero", itemId);
            } else {
                // Use the heroService to equip
                await heroService.equipItem(walletAddress, "default-hero", itemId);
            }
            
            // Optimistically update UI for better UX
            setInventoryItems(items => 
                items.map(item => 
                    item.id === itemId 
                        ? { ...item, equipped: !equipped } 
                        : item
                )
            );
            
            // Refresh inventory after equip/unequip
            fetchInventory();
        } catch (error) {
            console.error('Error toggling equip status:', error);
            setError('Failed to equip/unequip item. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Open the listing modal
    const openListingModal = async (item: InventoryItem) => {
        if (!isConnected || !walletAddress) {
            setError("Please connect your wallet to list items");
            return;
        }
        
        console.log('Opening listing modal for item:', {
            id: item.id,
            name: item.name,
            type: item.type,
            assetType: item.assetType
        });
        
        setActiveItem(item);
        setModalAction('list');
        // Get estimated value for the item
        const value = await getEstimatedValue(item.id, item.assetType);
        setEstimatedValue(value);
        setModalOpen(true);
    };
    
    // Open the instant sell modal
    const openSellNowModal = async (item: InventoryItem) => {
        if (!isConnected || !walletAddress) {
            setError("Please connect your wallet to sell items");
            return;
        }
        
        console.log('Opening instant sell modal for item:', {
            id: item.id,
            name: item.name,
            type: item.type,
            assetType: item.assetType,
            idType: typeof item.id
        });
        
        setActiveItem(item);
        setModalAction('sellNow');
        // Get estimated value for the item
        const value = await getEstimatedValue(item.id, item.assetType);
        setEstimatedValue(value);
        setModalOpen(true);
    };
    
    // Handle modal confirmation
    const handleModalConfirm = async (price?: number, instantSell?: boolean) => {
        if (!activeItem || !isConnected || !walletAddress) return;
        
        setProcessingAction(true);
        
        try {
            if (modalAction === 'sellNow') {
                console.log(`Attempting to instant sell item: ${activeItem.id}, type: ${activeItem.assetType}, wallet: ${walletAddress}`);
                console.log('Item ID type:', typeof activeItem.id);
                
                // Handle instant sell for "Sell Now" button
                const sellPrice = Math.round((estimatedValue || 0) * 0.8);
                // Use the original ID directly
                const response = await marketplaceService.instantSell(walletAddress, activeItem.id, activeItem.assetType);
                
                // Log the full response for debugging
                console.log('Sell Now response details:', {
                    status: response.status,
                    data: response.data,
                    headers: response.headers
                });
                
                // Check if the API explicitly returned success
                let success = true;
                if (response.data && typeof response.data.success === 'boolean') {
                    success = response.data.success;
                }
                
                if (!success) {
                    toast.error('Item sale API returned a failure. Please try again.');
                    setModalOpen(false);
                    setActiveItem(null);
                    return;
                }
                
                // Close modal first
                setModalOpen(false);
                setActiveItem(null);
                
                // Remove from inventory
                setInventoryItems(prev => prev.filter(item => item.id !== activeItem.id));
                
                // Show success notification
                toast.success(`${activeItem.name} sold instantly for ${sellPrice.toLocaleString()} WLO!`);
                
                // Wait a moment for balance update
                setTimeout(async () => {
                    // Refresh wallet balance to show updated WLO amount
                    try {
                        await refreshWallet();
                        console.log('Wallet refreshed after sale');
                    } catch (err) {
                        console.error('Error refreshing wallet after sale:', err);
                        // Add a note that credits may be delayed
                        toast.info('WLO credits from your sale may be delayed. Please refresh your page if they don\'t appear immediately.');
                    }
                }, 1500);
            } else if (price && modalAction === 'list') {
                console.log(`Attempting to list item: ${activeItem.id}, type: ${activeItem.assetType}, price: ${price}, wallet: ${walletAddress}`);
                console.log('Item ID type:', typeof activeItem.id);
                console.log('Full item details:', JSON.stringify(activeItem, null, 2));
                
                // Create detailed asset details
                const assetDetails = {
                    name: activeItem.name,
                    type: activeItem.type,
                    subType: activeItem.subType,
                    category: activeItem.category,
                    rarity: activeItem.rarity,
                    image: activeItem.image || `/images/marketplace/${activeItem.assetType}s/default.png`,
                    description: `A ${activeItem.rarity} ${activeItem.type}`
                };
                
                console.log('Sending listing with assetDetails:', assetDetails);
                console.log('Using EXACT original ID:', activeItem.id);
                
                // Handle regular listing for "List For Sale" button - use original ID directly
                await marketplaceService.createListing(
                    walletAddress, 
                    activeItem.id, 
                    price, 
                    activeItem.assetType,
                    assetDetails
                );
                
                // Close modal first
                setModalOpen(false);
                setActiveItem(null);
                
                // Remove from inventory
                setInventoryItems(prev => prev.filter(item => item.id !== activeItem.id));
                
                // Show success notification
                toast.success(`${activeItem.name} listed for ${price.toLocaleString()} WLO!`);
            }
        } catch (err: any) {
            console.error('Error processing marketplace action:', err);
            
            // Close modal first
            setModalOpen(false);
            setActiveItem(null);
            
            // Extract error message if available
            let errorMessage = 'Failed to complete the action. Please try again later.';
            
            // Special handling for 500 errors which might have more details
            if (err.response?.status === 500) {
                console.error('Server 500 error details:', {
                    action: modalAction,
                    item: activeItem.id,
                    type: activeItem.assetType,
                    wallet: walletAddress,
                    message: err.response?.data?.message || 'Unknown server error',
                    data: JSON.stringify(err.response?.data)
                });
                errorMessage = `Server error (500): ${err.response?.data?.message || 'Unknown error'}. The action may have failed.`;
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
            console.log('Marketplace action error details:', {
                action: modalAction,
                error: err,
                response: err.response?.data,
                status: err.response?.status,
                itemId: activeItem.id,
                assetType: activeItem.assetType,
                walletAddress: walletAddress
            });
            
            // Show error notification
            toast.error(errorMessage);
        } finally {
            setProcessingAction(false);
        }
    };

    // Handle card selection
    const handleSelect = (id: string) => {
        setSelectedItem(selectedItem === id ? null : id);
    };

    // Get info message based on asset type
    const getInfoMessage = (item: InventoryItem) => {
        if (item.assetType === 'hero') {
            return `Level ${item.level || 1} ${item.subType || 'Hero'}`;
        } else if (item.assetType === 'farmer') {
            return `Level ${item.level || 1} - Yield: ${item.yield || 0}/day`;
        }
        return undefined;
    };

    return (
        <div className="inventory-section">
            <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {isLoading ? (
                <div className="loading-indicator">Loading inventory items...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : filteredItems.length > 0 ? (
                <div className="table-container">
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th className="hide-mobile">LEVEL</th>
                                <th className="hide-mobile">AVG PRICE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map(item => (
                                <tr key={item.id} className={`type-${item.type.toLowerCase()}`}>
                                    <td>
                                        <span className="item-name">{item.name}</span>
                                        <div className="mobile-details">
                                            <span>Lvl {item.level || '1'}</span>
                                            <span>{estimatedValue ? `${estimatedValue.toLocaleString()} WLO` : '3,000 WLO'}</span>
                                        </div>
                                    </td>
                                    <td className="hide-mobile">{item.level || '1'}</td>
                                    <td className="hide-mobile">{estimatedValue ? `${estimatedValue.toLocaleString()} WLO` : '3,000 WLO'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="action-btn list-btn"
                                                onClick={() => openListingModal(item)}
                                            >
                                                List
                                            </button>
                                            <button 
                                                className="action-btn sell-btn"
                                                onClick={() => openSellNowModal(item)}
                                            >
                                                Sell
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-inventory-items">
                    <div className="no-items-icon">📦</div>
                    <h3 className="no-items-title">Your inventory is empty</h3>
                    <p className="no-items-message">
                        You don't have any items to display. Purchase items from the marketplace to see them here.
                    </p>
                    <p className="test-instructions">
                        <strong>For Development:</strong> To test the listing functionality, you need to have real items in your inventory.
                        Check that your wallet address is correct and that it contains items according to the backend database.
                    </p>
                </div>
            )}

            {activeItem && (
                <div className="modal-container">
                    <MarketplaceActionModal
                        isOpen={modalOpen}
                        onClose={() => {
                            setModalOpen(false);
                            setActiveItem(null);
                        }}
                        actionType={modalAction}
                        assetName={activeItem.name}
                        assetType={activeItem.assetType}
                        assetRarity={activeItem.rarity}
                        assetImage={activeItem.image}
                        estimatedValue={estimatedValue}
                        onConfirm={handleModalConfirm}
                        isProcessing={processingAction}
                    />
                </div>
            )}
        </div>
    );
};

export default MarketplaceInventorySection; 