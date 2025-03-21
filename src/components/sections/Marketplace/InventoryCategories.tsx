// src/components/sections/Marketplace/InventoryCategories.tsx
import React from 'react';
import SectionTitle from '../../common/SectionTitle';
import { USER_INVENTORY, MARKETPLACE_ITEMS } from '../../../types/ItemTypes';

interface InventoryCategoriesProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    itemsForSale: any[]; // Add this prop to receive items for sale
}

const InventoryCategories: React.FC<InventoryCategoriesProps> = ({
                                                                     selectedCategory,
                                                                     onSelectCategory,
                                                                     itemsForSale
                                                                 }) => {
    // Calculate counts for each category dynamically
    const getItemDetails = (itemId: string) =>
        MARKETPLACE_ITEMS.find(item => item.id === itemId);

    const allCount = USER_INVENTORY.length;

    const equippedCount = USER_INVENTORY.filter(item =>
        item.equipped
    ).length;

    const forSaleCount = itemsForSale.length;

    const weaponCount = USER_INVENTORY.filter(item => {
        const details = getItemDetails(item.itemId);
        return details?.type === 'weapon';
    }).length;

    const armorCount = USER_INVENTORY.filter(item => {
        const details = getItemDetails(item.itemId);
        return details?.type === 'armor';
    }).length;

    const accessoryCount = USER_INVENTORY.filter(item => {
        const details = getItemDetails(item.itemId);
        return details?.type === 'accessory';
    }).length;

    const consumableCount = USER_INVENTORY.filter(item => {
        const details = getItemDetails(item.itemId);
        return details?.type === 'consumable';
    }).length;

    const categories = [
        { id: 'all', name: 'ALL ITEMS', count: allCount },
        { id: 'equipped', name: 'EQUIPPED', count: equippedCount },
        { id: 'for-sale', name: 'FOR SALE', count: forSaleCount },
        { id: 'weapon', name: 'WEAPONS', count: weaponCount },
        { id: 'armor', name: 'ARMOR', count: armorCount },
        { id: 'accessory', name: 'ACCESSORIES', count: accessoryCount },
        { id: 'consumable', name: 'CONSUMABLES', count: consumableCount }
    ];

    return (
        <section className="inventory-categories-section">
            <SectionTitle title="INVENTORY FILTERS" />

            <div className="categories-container">
                <div className="categories-grid">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                            onClick={() => onSelectCategory(category.id)}
                        >
                            <div className="category-icon-container">
                                <div className={`category-icon ${category.id}`}></div>
                            </div>
                            <div className="category-info">
                                <div className="category-name">{category.name}</div>
                                <div className="category-count">{category.count} items</div>
                            </div>
                            {selectedCategory === category.id && (
                                <>
                                    <div className="corner-accent top-right"></div>
                                    <div className="corner-accent bottom-left"></div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className="category-description">
                    <div className="description-icon"></div>
                    <div className="description-text">
                        {selectedCategory === 'all' && 'View all items in your inventory.'}
                        {selectedCategory === 'equipped' && 'View items currently equipped by your warlords.'}
                        {selectedCategory === 'for-sale' && 'View items you have listed for sale on the marketplace.'}
                        {selectedCategory === 'weapon' && 'Your arsenal of weapons for battle.'}
                        {selectedCategory === 'armor' && 'Your collection of protective gear.'}
                        {selectedCategory === 'accessory' && 'Special items that enhance your warlord abilities.'}
                        {selectedCategory === 'consumable' && 'One-time use items in your inventory.'}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InventoryCategories;