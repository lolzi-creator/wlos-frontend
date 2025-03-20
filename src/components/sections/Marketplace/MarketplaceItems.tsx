import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import Button from '../../common/Button';

interface MarketplaceItemsProps {
    category: string;
    sortOrder: 'price_asc' | 'price_desc' | 'recent';
    onChangeSortOrder: (order: 'price_asc' | 'price_desc' | 'recent') => void;
}

// Mock data for marketplace items
const marketplaceItems = [
    {
        id: 1,
        name: 'Quantum Shield',
        category: 'armor',
        rarity: 'rare',
        price: 240,
        boost: '+35% Defense',
        description: 'Advanced energy shield that absorbs incoming damage and converts it to power.',
        image: 'quantum-shield'
    },
    {
        id: 2,
        name: 'Neural Amplifier',
        category: 'boosters',
        rarity: 'epic',
        price: 185,
        boost: '+25% Attack Speed',
        description: 'Enhances neural pathways to accelerate combat reactions and decision making.',
        image: 'neural-amplifier'
    },
    {
        id: 3,
        name: 'Void Disruptor',
        category: 'weapons',
        rarity: 'legendary',
        price: 320,
        boost: '+40% Attack Power',
        description: 'Harnesses void energy to create devastating attacks that pierce through defenses.',
        image: 'void-disruptor'
    },
    {
        id: 4,
        name: 'Energy Matrix',
        category: 'consumables',
        rarity: 'common',
        price: 95,
        boost: '+15% Energy Regen',
        description: 'Single-use matrix that enhances energy regeneration for 24 hours.',
        image: 'energy-matrix'
    },
    {
        id: 5,
        name: 'Photon Blade',
        category: 'weapons',
        rarity: 'epic',
        price: 275,
        boost: '+30% Critical Chance',
        description: 'Blade of pure photon energy that has a high chance of critical strikes.',
        image: 'photon-blade'
    },
    {
        id: 6,
        name: 'Hyperspace Boots',
        category: 'armor',
        rarity: 'rare',
        price: 210,
        boost: '+20% Movement Speed',
        description: 'Boots that allow short bursts of hyperspace travel for quick repositioning.',
        image: 'hyperspace-boots'
    },
    {
        id: 7,
        name: 'Combat Stimulant',
        category: 'consumables',
        rarity: 'uncommon',
        price: 120,
        boost: '+25% All Stats',
        description: 'Temporary boost to all combat statistics for one battle session.',
        image: 'combat-stimulant'
    },
    {
        id: 8,
        name: 'Plasma Accelerator',
        category: 'boosters',
        rarity: 'legendary',
        price: 350,
        boost: '+45% Damage Output',
        description: 'Rare technology that significantly enhances all damage output from weapons.',
        image: 'plasma-accelerator'
    }
];

const MarketplaceItems: React.FC<MarketplaceItemsProps> = ({
                                                               category,
                                                               sortOrder,
                                                               onChangeSortOrder
                                                           }) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    // Filter items based on selected category
    const filteredItems = category === 'all'
        ? marketplaceItems
        : marketplaceItems.filter(item => item.category === category);

    // Sort items based on sort order
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortOrder === 'price_asc') return a.price - b.price;
        if (sortOrder === 'price_desc') return b.price - a.price;
        // Default to recent (by id in this mock data)
        return b.id - a.id;
    });

    return (
        <section className="marketplace-items-section">
            <SectionTitle title="QUANTUM ITEMS" />

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
            <div className="items-grid">
                {sortedItems.map(item => (
                    <div
                        key={item.id}
                        className={`item-card border-yellow ${selectedItem === item.id ? 'selected' : ''}`}
                        onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                    >
                        <div className="accent-border top yellow"></div>

                        <div className={`item-rarity-badge ${item.rarity}`}>
                            {item.rarity.toUpperCase()}
                        </div>

                        <div className="item-image-container">
                            <div className={`item-image ${item.image}`}></div>
                        </div>

                        <div className="item-details">
                            <h3 className="item-name">{item.name}</h3>
                            <div className="item-boost yellow-text">{item.boost}</div>
                            <p className="item-description">{item.description}</p>

                            <div className="item-price-section">
                                <div className="item-price">
                                    <span className="price-value yellow-text">{item.price}</span>
                                    <span className="price-currency">WLOS</span>
                                </div>

                                <Button
                                    text="PURCHASE"
                                    color="yellow"
                                    onClick={() => console.log(`Purchase item ${item.id}`)}
                                />
                            </div>
                        </div>

                        {selectedItem === item.id && (
                            <>
                                <div className="corner-accent top-right"></div>
                                <div className="corner-accent bottom-left"></div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button className="pagination-button active">1</button>
                <button className="pagination-button">2</button>
                <button className="pagination-button">3</button>
                <span className="pagination-ellipsis">...</span>
                <button className="pagination-button">10</button>
            </div>
        </section>
    );
};

export default MarketplaceItems;