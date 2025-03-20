import React from 'react';
import SectionTitle from '../../common/SectionTitle';

interface MarketplaceCategoriesProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const categories = [
    {
        id: 'all',
        name: 'ALL ITEMS',
        count: 2487
    },
    {
        id: 'weapons',
        name: 'WEAPONS',
        count: 734
    },
    {
        id: 'armor',
        name: 'ARMOR',
        count: 512
    },
    {
        id: 'boosters',
        name: 'POWER BOOSTERS',
        count: 356
    },
    {
        id: 'consumables',
        name: 'CONSUMABLES',
        count: 623
    },
    {
        id: 'rare',
        name: 'RARE ITEMS',
        count: 262
    }
];

const MarketplaceCategories: React.FC<MarketplaceCategoriesProps> = ({
                                                                         selectedCategory,
                                                                         onSelectCategory
                                                                     }) => {
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
                        {selectedCategory === 'weapons' && 'Equip your warlord with devastating quantum weapons to dominate the battlefield.'}
                        {selectedCategory === 'armor' && 'Protect your warlord with advanced defensive gear and energy shields.'}
                        {selectedCategory === 'boosters' && 'Amplify your warlord\'s abilities with neural enhancers and power boosters.'}
                        {selectedCategory === 'consumables' && 'One-time use items that provide powerful temporary effects in battle.'}
                        {selectedCategory === 'rare' && 'Limited edition collectibles and artifacts with unique abilities.'}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketplaceCategories;