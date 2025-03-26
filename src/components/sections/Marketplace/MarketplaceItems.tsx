// src/components/sections/Marketplace/MarketplaceItems.tsx
import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import EntityCard from '../../common/EntityCard';
import InsufficientFundsPopup from '../../common/InsufficientFundsPopup';
import { MARKETPLACE_ITEMS } from '../../../types/ItemTypes';
import { useMarketplace } from '../../../context/MarketplaceContext';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';

interface MarketplaceItemsProps {
    category: string;
    sortOrder: 'price_asc' | 'price_desc' | 'recent';
    onChangeSortOrder: (order: 'price_asc' | 'price_desc' | 'recent') => void;
}

const MarketplaceItems: React.FC<MarketplaceItemsProps> = ({
                                                               category,
                                                               sortOrder,
                                                               onChangeSortOrder
                                                           }) => {
    const { marketListings, buyItem, error, isLoading } = useMarketplace();
    const { balance } = useWalletConnection();
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [insufficientFunds, setInsufficientFunds] = useState<{
        show: boolean;
        itemName: string;
        requiredAmount: number;
    }>({
        show: false,
        itemName: '',
        requiredAmount: 0
    });

    // Format listings to work with EntityCard
    const formattedListings = marketListings.map(listing => {
        const baseItem = MARKETPLACE_ITEMS.find(item => item.id === listing.itemId);
        if (!baseItem) return null;

        // Return item formatted for EntityCard
        return {
            id: listing.id,
            name: baseItem.name,
            rarity: baseItem.rarity,
            type: baseItem.type,
            description: baseItem.description,
            imageSrc: baseItem.imageSrc,
            stats: baseItem.stats,
            price: listing.price,
            effect: baseItem.effect,
            duration: baseItem.duration,
            seller: listing.seller
        };
    }).filter(item => item !== null);

    // Filter items based on selected category
    const filteredItems = category === 'all'
        ? formattedListings
        : category === 'rare'
            ? formattedListings.filter(item => item && ['rare', 'epic', 'legendary'].includes(item.rarity))
            : formattedListings.filter(item => item && item.type === category);

    // Sort items based on sort order
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortOrder === 'price_asc') return a.price - b.price;
        if (sortOrder === 'price_desc') return b.price - a.price;
        // Default to recent
        return a.id.localeCompare(b.id);
    });

    const handleSelectItem = (id: string) => {
        setSelectedItem(selectedItem === id ? null : id);
    };

    const handleBuyItem = async (id: string) => {
        const item = formattedListings.find(item => item.id === id);
        if (!item) return;

        // Check if user has enough WLOS
        if (balance.wlos < item.price) {
            // Show insufficient funds popup
            setInsufficientFunds({
                show: true,
                itemName: item.name,
                requiredAmount: item.price
            });
            return;
        }

        try {
            const success = await buyItem(id);
            if (success) {
                setSelectedItem(null);
            }
        } catch (error) {
            console.error('Error buying item:', error);
        }
    };

    // Close the insufficient funds popup
    const handleClosePopup = () => {
        setInsufficientFunds({
            show: false,
            itemName: '',
            requiredAmount: 0
        });
    };

    return (
        <section className="marketplace-items-section">
            <SectionTitle title="QUANTUM ITEMS" />

            {error && <div className="error-message">{error}</div>}

            {/* Error warning message for insufficient funds */}
            {!insufficientFunds.show && formattedListings.some(item => item.price > balance.wlos) && (
                <div className="warning-banner">
                    <div className="warning-icon">⚠️</div>
                    <div className="warning-message">Insufficient WLOS balance for some items</div>
                </div>
            )}

            {/* Filters and Sort */}
            <div className="filters-container">
                <div className="filter-count">
                    <span className="filter-count-text">Showing {sortedItems.length} items</span>
                </div>

                <div className="sort-controls">
                    <span className="sort-label">Sort by:</span>
                    <div className="sort-options">
                        <button
                            className={`sort-option ${sortOrder === 'recent' ? 'active' : ''}`}
                            onClick={() => onChangeSortOrder('recent')}
                        >
                            Recent
                        </button>
                        <button
                            className={`sort-option ${sortOrder === 'price_asc' ? 'active' : ''}`}
                            onClick={() => onChangeSortOrder('price_asc')}
                        >
                            Price: Low to High
                        </button>
                        <button
                            className={`sort-option ${sortOrder === 'price_desc' ? 'active' : ''}`}
                            onClick={() => onChangeSortOrder('price_desc')}
                        >
                            Price: High to Low
                        </button>
                    </div>
                </div>
            </div>

            {/* Items Grid */}
            {sortedItems.length > 0 ? (
                <div className="entity-grid">
                    {sortedItems.map(item => (
                        <EntityCard
                            key={item.id}
                            entity={item}
                            selected={selectedItem === item.id}
                            onSelect={() => handleSelectItem(item.id)}
                            showStats={true}
                            statusLabel="PRICE"
                            statusValue={`${item.price} WLOS`}
                            primaryAction={{
                                text: "BUY",
                                onClick: () => handleBuyItem(item.id)
                            }}
                            infoMessage={item.seller ? `Sold by: ${item.seller.substring(0, 4)}...${item.seller.substring(item.seller.length - 4)}` : undefined}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-items-message">
                    <p>No items found matching your criteria.</p>
                </div>
            )}

            {/* Pagination */}
            {sortedItems.length > 0 && (
                <div className="pagination">
                    <button className="pagination-button active">1</button>
                    <button className="pagination-button">2</button>
                    <button className="pagination-button">3</button>
                    <span className="pagination-ellipsis">...</span>
                    <button className="pagination-button">10</button>
                </div>
            )}

            {/* Insufficient Funds Popup */}
            {insufficientFunds.show && (
                <InsufficientFundsPopup
                    itemName={insufficientFunds.itemName}
                    requiredAmount={insufficientFunds.requiredAmount}
                    onClose={handleClosePopup}
                />
            )}

            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Processing...</p>
                </div>
            )}

            <style>
                {`
                .warning-banner {
                    background-color: rgba(255, 77, 77, 0.2);
                    border: 1px solid rgba(255, 77, 77, 0.5);
                    border-radius: 4px;
                    padding: 10px 15px;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    color: #FFB800;
                }
                
                .warning-icon {
                    margin-right: 10px;
                    font-size: 18px;
                }
                
                .no-items-message {
                    background-color: rgba(8, 8, 30, 0.7);
                    border-radius: 8px;
                    border: 1px solid rgba(0, 194, 255, 0.3);
                    padding: 40px 20px;
                    text-align: center;
                    color: #ccc;
                    margin: 20px 0;
                }
                `}
            </style>
        </section>
    );
};

export default MarketplaceItems;