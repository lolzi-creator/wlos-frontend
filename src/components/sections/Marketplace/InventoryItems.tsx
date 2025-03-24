// src/components/sections/Marketplace/InventoryItems.tsx
import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import EntityCard from '../../common/EntityCard';
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

        const isForSale = myListings.some(listing => listing.ownedItemId === ownedItem.id);

        return {
            ...itemDetails,
            ownedItemId: ownedItem.id,
            equipped: ownedItem.equipped,
            durability: ownedItem.durability,
            charges: ownedItem.charges,
            forSale: isForSale
        };
    }).filter(item => item !== null);

    // Filter by type if needed
    const filteredItems = filterType === 'all'
        ? userItems
        : filterType === 'equipped'
            ? userItems.filter(item => item?.equipped)
            : filterType === 'for-sale'
                ? userItems.filter(item => item?.forSale)
                : userItems.filter(item => item?.type === filterType);

    // Handle item actions (equip/unequip/use)
    const handleItemAction = async (id: string) => {
        const item = userItems.find(item => item?.ownedItemId === id);
        if (!item) return;

        const isConsumable = item.type === 'consumable';
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

    const handleSelect = (id: string) => {
        setSelectedItem(selectedItem === id ? null : id);
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
                <div className="entity-grid">
                    {filteredItems.map(item => {
                        const isConsumable = item.type === 'consumable';
                        const actionText = isConsumable ? 'USE' : (item.equipped ? 'UNEQUIP' : 'EQUIP');

                        return (
                            <EntityCard
                                key={item.ownedItemId}
                                entity={item}
                                owned={true}
                                equipped={Boolean(item.equipped)}
                                forSale={item.forSale}
                                selected={selectedItem === item.ownedItemId}
                                onSelect={() => handleSelect(item.ownedItemId)}
                                showStats={true}
                                primaryAction={{
                                    text: actionText,
                                    onClick: () => handleItemAction(item.ownedItemId)
                                }}
                                secondaryAction={{
                                    text: "SELL",
                                    onClick: () => handleSellItem(item),
                                    disabled: item.forSale
                                }}
                            />
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
                    item={sellItem}
                    ownedItemId={sellItem.ownedItemId}
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