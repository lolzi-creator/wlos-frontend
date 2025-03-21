// src/components/sections/Marketplace/MarketplaceCategories.tsx
import React from 'react';
import SectionTitle from '../../common/SectionTitle';
import { MARKETPLACE_ITEMS } from '../../../types/ItemTypes';

interface MarketplaceCategoriesProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const MarketplaceCategories: React.FC<MarketplaceCategoriesProps> = ({
                                                                         selectedCategory,
                                                                         onSelectCategory
                                                                     }) => {
    // Calculate item counts dynamically
    const allCount = MARKETPLACE_ITEMS.length;
    const weaponCount = MARKETPLACE_ITEMS.filter(item => item.type === 'weapon').length;
    const armorCount = MARKETPLACE_ITEMS.filter(item => item.type === 'armor').length;
    const accessoryCount = MARKETPLACE_ITEMS.filter(item => item.type === 'accessory').length;
    const consumableCount = MARKETPLACE_ITEMS.filter(item => item.type === 'consumable').length;
    const rareCount = MARKETPLACE_ITEMS.filter(item =>
        ['rare', 'epic', 'legendary'].includes(item.rarity)
    ).length;

    const categories = [
        { id: 'all', name: 'ALL ITEMS', count: allCount },
        { id: 'weapon', name: 'WEAPONS', count: weaponCount },
        { id: 'armor', name: 'ARMOR', count: armorCount },
        { id: 'accessory', name: 'ACCESSORIES', count: accessoryCount },
        { id: 'consumable', name: 'CONSUMABLES', count: consumableCount },
        { id: 'rare', name: 'RARE+ ITEMS', count: rareCount }
    ];

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
                        {selectedCategory === 'all' && 'Browse all items in the marketplace, from common consumables to legendary artifacts.'}
                        {selectedCategory === 'weapon' && 'Equip your warlord with devastating quantum weapons to dominate the battlefield.'}
                        {selectedCategory === 'armor' && 'Protect your warlord with advanced defensive gear and energy shields.'}
                        {selectedCategory === 'accessory' && 'Enhance your warlord with powerful accessories that provide unique bonuses.'}
                        {selectedCategory === 'consumable' && 'One-time use items that provide powerful temporary effects in battle.'}
                        {selectedCategory === 'rare' && 'Premium items of Rare quality or higher with exceptional stats and abilities.'}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketplaceCategories;