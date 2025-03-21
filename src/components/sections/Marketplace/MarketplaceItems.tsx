// src/components/sections/Marketplace/MarketplaceItems.tsx
import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import ItemCard from './ItemCards';
import { MARKETPLACE_ITEMS } from '../../../types/ItemTypes';

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
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    // Filter items based on selected category
    const filteredItems = category === 'all'
        ? MARKETPLACE_ITEMS
        : MARKETPLACE_ITEMS.filter(item =>
            category === 'rare'
                ? ['rare', 'epic', 'legendary'].includes(item.rarity)
                : item.type === category
        );

    // Sort items based on sort order
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortOrder === 'price_asc') return a.price - b.price;
        if (sortOrder === 'price_desc') return b.price - a.price;
        // Default to recent (by id in this mock data)
        return a.id.localeCompare(b.id);
    });

    const handleSelectItem = (id: string) => {
        setSelectedItem(selectedItem === id ? null : id);
    };

    const handleBuyItem = (id: string) => {
        console.log(`Buying item: ${id}`);
        // Implement purchase logic here
    };

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
                    <ItemCard
                        key={item.id}
                        item={item}
                        selected={selectedItem === item.id}
                        onSelect={() => handleSelectItem(item.id)}
                        onBuy={() => handleBuyItem(item.id)}
                    />
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