// src/components/sections/Marketplace/InventoryItems.tsx
import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import InventoryItemCard from './InventoryItemCard';
import SellItemPopup from './SellItemPopup';
import { MARKETPLACE_ITEMS } from '../../../types/ItemTypes';
import { useMarketplace } from '../../../context/MarketplaceContext';

interface InventoryItemsProps {
    filterType: string;
}

const InventoryItems: React.FC<InventoryItemsProps> = ({ filterType }) => {
    const { ownedItems, myListings, useItem, equipItem, error, isLoading } = useMarketplace();
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [sellItem, setSellItem] = useState<any | null>(null);

    // Get the full item details for each owned item
    const userItems = ownedItems.map(ownedItem => {
        const itemDetails = MARKETPLACE_ITEMS.find(item => item.id === ownedItem.itemId);
        if (!itemDetails) return null;

        return {
            ...ownedItem,
            details: itemDetails,
            forSale: myListings.some(listing => listing.ownedItemId === ownedItem.id)
        };
    }).filter(item => item !== null);

    // Filter by type if needed
    const filteredItems = filterType === 'all'
        ? userItems
        : filterType === 'equipped'
            ? userItems.filter(item => item?.equipped)
            : filterType === 'for-sale'
                ? userItems.filter(item => item?.forSale)
                : userItems.filter(item => item?.details.type === filterType);

    // Handle item actions (equip/unequip/use)
    const handleItemAction = async (id: string) => {
        const item = userItems.find(item => item?.id === id);
        if (!item) return;

        const isConsumable = item.details.type === 'consumable';
        const isEquipped = Boolean(item.equipped);

        if (isConsumable) {
            await useItem(id);
        } else {
            // Toggle equipped state
            await equipItem(id, isEquipped ? null : 'warlord-1'); // Hardcoded warlord ID for demo
        }
    };

    // Handle selling an item
    const handleSellItem = (item: any) => {
        setSellItem(item);
    };

    return (
        <section className="inventory-items-section">
            <SectionTitle title="YOUR INVENTORY" />

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="inventory-stats">
                <div className="stat-box">
                    <div className="stat-value">{ownedItems.length}</div>
                    <div className="stat-label">TOTAL ITEMS</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">
                        {ownedItems.filter(item => item.equipped).length}
                    </div>
                    <div className="stat-label">EQUIPPED</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">
                        {myListings.length}
                    </div>
                    <div className="stat-label">FOR SALE</div>
                </div>
            </div>

            {filteredItems.length > 0 ? (
                <div className="inventory-grid">
                    {filteredItems.map(item => {
                        if (!item) return null;

                        const isConsumable = item.details.type === 'consumable';
                        const isEquipped = Boolean(item.equipped);
                        const isForSale = myListings.some(listing => listing.ownedItemId === item.id);

                        return (
                            <div key={item.id} className="inventory-item-container">
                                <InventoryItemCard
                                    item={item.details}
                                    equipped={isEquipped}
                                    durability={isConsumable ? undefined : item.durability}
                                    charges={isConsumable ? item.charges : undefined}
                                    forSale={isForSale}
                                    selected={selectedItem === item.id}
                                    onSelect={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                                    onAction={() => handleItemAction(item.id)}
                                    onSell={() => handleSellItem(item)}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="no-items-message">
                    <p>You don't have any items matching this filter. Visit the marketplace to buy some!</p>
                </div>
            )}

            {/* Sell Item Popup */}
            {sellItem && (
                <SellItemPopup
                    item={sellItem.details}
                    ownedItemId={sellItem.id}
                    onClose={() => setSellItem(null)}
                />
            )}

            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Processing...</p>
                </div>
            )}
        </section>
    );
};

export default InventoryItems;