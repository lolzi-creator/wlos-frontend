import React, { useState } from 'react';
import MarketplaceActionModal from '../../../common/MarketplaceActionModal';
import { useWalletConnection } from '../../../../context/WalletConnectionProvider';
import { marketplaceService } from '../../../../services/api';
import { Rarity } from '../../../../types/ItemTypes';
import '../../../../styles/modules/marketplace/new/MarketplaceInventorySection.css';
import { toast } from 'react-toastify';

interface InventoryItem {
    id: string;
    name: string;
    type: string;
    subType: string;
    category: string;
    rarity: Rarity;
    image?: string;
    level?: number;
    yield?: number;
    assetType: 'item' | 'hero' | 'farmer';
}

const MarketplaceInventorySection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
    const [isLoading] = useState(false);
    const [error] = useState<string | null>(null);
    
    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<'sellNow' | 'list'>('sellNow');
    const [activeItem, setActiveItem] = useState<InventoryItem | null>(null);
    const [processingAction, setProcessingAction] = useState(false);
    const [estimatedValue, setEstimatedValue] = useState<number | undefined>(undefined);
    
    const { isConnected, walletAddress, refreshWallet } = useWalletConnection();
    
    // Filter items based on search term
    const filteredItems = inventoryItems.filter(item => {
        const matchesSearch = searchTerm === '' || 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.type.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesSearch;
    });
    
    // Open the listing modal
    const openListingModal = (item: InventoryItem) => {
        if (!isConnected || !walletAddress) {
            toast.error("Please connect your wallet to list items");
            return;
        }
        
        console.log('Opening listing modal for item:', {
            id: item.id,
            name: item.name,
            type: item.type,
            assetType: item.assetType,
            idType: typeof item.id
        });
        
        // Set an estimated value based on rarity
        let value = 3000; // Default value
        if (item.rarity === 'rare') value = 5000;
        if (item.rarity === 'epic') value = 10000;
        if (item.rarity === 'legendary') value = 25000;
        
        setEstimatedValue(value);
        setActiveItem(item);
        setModalAction('list');
        setModalOpen(true);
    };
    
    // Open the sell now modal
    const openSellNowModal = (item: InventoryItem) => {
        if (!isConnected || !walletAddress) {
            toast.error("Please connect your wallet to sell items");
            return;
        }
        
        console.log('Opening sell now modal for item:', {
            id: item.id,
            name: item.name,
            type: item.type,
            assetType: item.assetType,
            idType: typeof item.id
        });
        
        // Set an estimated value based on rarity
        let value = 3000; // Default value
        if (item.rarity === 'rare') value = 5000;
        if (item.rarity === 'epic') value = 10000;
        if (item.rarity === 'legendary') value = 25000;
        
        setEstimatedValue(value);
        setActiveItem(item);
        setModalAction('sellNow');
        setModalOpen(true);
    };
    
    // Handle modal confirmation
    const handleModalConfirm = async (price?: number) => {
        if (!activeItem || !isConnected || !walletAddress) return;
        
        setProcessingAction(true);
        
        try {
            if (modalAction === 'sellNow') {
                console.log(`Attempting to instant sell item: ${activeItem.id}, type: ${activeItem.assetType}, wallet: ${walletAddress}`);
                console.log('Item ID type:', typeof activeItem.id);
                
                // Handle instant sell for "Sell Now" button
                const sellPrice = Math.round((estimatedValue || 0) * 0.8);
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
            
            {/* Modal */}
            {activeItem && (
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
            )}
        </div>
    );
};

export default MarketplaceInventorySection; 