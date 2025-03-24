// src/components/sections/Marketplace/MarketplaceCategories.tsx
import React from 'react';
import SectionTitle from '../../common/SectionTitle';
import { MARKETPLACE_ITEMS } from '../../../types/ItemTypes';
import { useMarketplace } from '../../../context/MarketplaceContext';

interface MarketplaceCategoriesProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const MarketplaceCategories: React.FC<MarketplaceCategoriesProps> = ({
                                                                         selectedCategory,
                                                                         onSelectCategory
                                                                     }) => {
    // Get real marketplace listings from context
    const { marketListings } = useMarketplace();

    // Map listings to their base items
    const listingsWithData = marketListings.map(listing => {
        const baseItem = MARKETPLACE_ITEMS.find(item => item.id === listing.itemId);
        return baseItem ? { ...listing, type: baseItem.type, rarity: baseItem.rarity } : null;
    }).filter(item => item !== null);

    // Calculate item counts dynamically
    const allCount = listingsWithData.length;
    const weaponCount = listingsWithData.filter(item => item?.type === 'weapon').length;
    const armorCount = listingsWithData.filter(item => item?.type === 'armor').length;
    const accessoryCount = listingsWithData.filter(item => item?.type === 'accessory').length;
    const consumableCount = listingsWithData.filter(item => item?.type === 'consumable').length;
    const rareCount = listingsWithData.filter(item =>
        ['rare', 'epic', 'legendary'].includes(item?.rarity || '')
    ).length;

    // Define categories with dynamic counts
    const categories = [
        { id: 'all', name: 'ALL ITEMS', count: allCount },
        { id: 'weapon', name: 'WEAPONS', count: weaponCount },
        { id: 'armor', name: 'ARMOR', count: armorCount },
        { id: 'accessory', name: 'ACCESSORIES', count: accessoryCount },
        { id: 'consumable', name: 'CONSUMABLES', count: consumableCount },
        { id: 'rare', name: 'RARE+ ITEMS', count: rareCount }
    ];

    // Get the appropriate description for the selected category
    const getCategoryDescription = (categoryId: string) => {
        switch(categoryId) {
            case 'all':
                return 'Browse all items in the marketplace, from common consumables to legendary artifacts.';
            case 'weapon':
                return 'Equip your warlord with devastating quantum weapons to dominate the battlefield.';
            case 'armor':
                return 'Protect your warlord with advanced defensive gear and energy shields.';
            case 'accessory':
                return 'Enhance your warlord with powerful accessories that provide unique bonuses.';
            case 'consumable':
                return 'One-time use items that provide powerful temporary effects in battle.';
            case 'rare':
                return 'Premium items of Rare quality or higher with exceptional stats and abilities.';
            default:
                return '';
        }
    };

    return (
        <section className="marketplace-categories-section">
            <SectionTitle title="ITEM CATEGORIES" />

            <div className="categories-container clip-card border-yellow">
                <div className="accent-border top yellow"></div>

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
                                <div className="category-count">{category.count} {category.count === 1 ? 'item' : 'items'}</div>
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
                        {getCategoryDescription(selectedCategory)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketplaceCategories;