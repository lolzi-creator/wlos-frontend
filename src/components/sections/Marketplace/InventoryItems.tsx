// src/components/sections/Marketplace/InventoryItems.tsx
import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import InventoryItemCard from './InventoryItemCard';
import SellItemPopup from './SellItemPopup';
import { MARKETPLACE_ITEMS, USER_INVENTORY } from '../../../types/ItemTypes';

interface InventoryItemsProps {
    filterType: string;
}

const InventoryItems: React.FC<InventoryItemsProps> = ({ filterType }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [sellItem, setSellItem] = useState<any | null>(null);

    // Mock data for items currently for sale
    const [itemsForSale, setItemsForSale] = useState<any[]>([]);

    // Get the full item details for each owned item
    const ownedItems = USER_INVENTORY.map(ownedItem => {
        const itemDetails = MARKETPLACE_ITEMS.find(item => item.id === ownedItem.itemId);
        if (!itemDetails) return null;

        return {
            ...ownedItem,
            details: itemDetails,
            forSale: itemsForSale.some(saleItem => saleItem.id === ownedItem.id)
        };
    }).filter(item => item !== null);

    // Filter by type if needed
    const filteredItems = filterType === 'all'
        ? ownedItems
        : filterType === 'equipped'
            ? ownedItems.filter(item => item?.equipped)
            : filterType === 'for-sale'
                ? ownedItems.filter(item => item?.forSale)
                : ownedItems.filter(item => item?.details.type === filterType);

    // Handle item actions (equip/unequip/use)
    const handleItemAction = (id: string) => {
        const item = ownedItems.find(item => item?.id === id);
        if (!item) return;

        const isConsumable = 'charges' in item;
        const isEquipped = Boolean(item.equipped);

        if (isConsumable) {
            console.log(`Using item: ${id}`);
            // Implement consumable use logic
        } else {
            console.log(`${isEquipped ? 'Unequipping' : 'Equipping'} item: ${id}`);
            // Implement equip/unequip logic
        }
    };

    // Handle selling an item
    const handleSellItem = (item: any) => {
        setSellItem(item);
    };

    // Handle instant sell
    const handleInstantSell = () => {
        if (!sellItem) return;

        console.log(`Instant selling item: ${sellItem.id} for ${Math.round(sellItem.details.price * 0.7)} WLOS`);
        // Implementation would go here

        setSellItem(null);
    };

    // Handle listing an item for sale
    const handleListForSale = (price: number) => {
        if (!sellItem) return;

        console.log(`Listing item ${sellItem.id} for sale at ${price} WLOS`);

        // Add to items for sale
        setItemsForSale(prev => [...prev, { ...sellItem, listingPrice: price }]);

        setSellItem(null);
    };

    return (
        <section className="inventory-items-section">
            <SectionTitle title="YOUR INVENTORY" />

            <div className="inventory-stats">
                <div className="stat-box">
                    <div className="stat-value">{USER_INVENTORY.length}</div>
                    <div className="stat-label">TOTAL ITEMS</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">
                        {USER_INVENTORY.filter(item => item.equipped).length}
                    </div>
                    <div className="stat-label">EQUIPPED</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">
                        {itemsForSale.length}
                    </div>
                    <div className="stat-label">FOR SALE</div>
                </div>
            </div>

            {filteredItems.length > 0 ? (
                <div className="inventory-grid">
                    {filteredItems.map(item => {
                        if (!item) return null;

                        const isConsumable = 'charges' in item;
                        const isEquipped = Boolean(item.equipped);
                        const isForSale = itemsForSale.some(saleItem => saleItem.id === item.id);

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
                    onClose={() => setSellItem(null)}
                    onInstantSell={handleInstantSell}
                    onListForSale={handleListForSale}
                />
            )}
        </section>
    );
};

export default InventoryItems;