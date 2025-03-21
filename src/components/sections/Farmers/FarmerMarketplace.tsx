// Modified FarmerMarketplace.tsx
import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import FarmerCard from './FarmerCard';
import { FARMERS } from '../../../types/FarmerTypes';

const FarmerMarketplace: React.FC = () => {
    const [filterRarity, setFilterRarity] = useState<string>('all');
    const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);

    // Filter farmers based on selected rarity
    const filteredFarmers = filterRarity === 'all'
        ? FARMERS
        : FARMERS.filter(farmer => farmer.rarity === filterRarity);

    const handleSelect = (id: string) => {
        setSelectedFarmer(selectedFarmer === id ? null : id);
    };

    return (
        <section className="farmer-marketplace-section">
            <SectionTitle title="FARMER SHOWCASE" />

            <div className="marketplace-info-banner">
                <div className="info-icon"></div>
                <p>Farmers can only be acquired through packs in the Pack Store. View our collection below!</p>
            </div>

            <div className="filter-controls">
                <span className="filter-label">Filter By:</span>
                <div className="filter-options">
                    <button
                        className={`filter-option ${filterRarity === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterRarity('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-option ${filterRarity === 'common' ? 'active' : ''}`}
                        onClick={() => setFilterRarity('common')}
                    >
                        Common
                    </button>
                    <button
                        className={`filter-option ${filterRarity === 'rare' ? 'active' : ''}`}
                        onClick={() => setFilterRarity('rare')}
                    >
                        Rare
                    </button>
                    <button
                        className={`filter-option ${filterRarity === 'epic' ? 'active' : ''}`}
                        onClick={() => setFilterRarity('epic')}
                    >
                        Epic
                    </button>
                    <button
                        className={`filter-option ${filterRarity === 'legendary' ? 'active' : ''}`}
                        onClick={() => setFilterRarity('legendary')}
                    >
                        Legendary
                    </button>
                </div>
            </div>

            <div className="farmers-grid">
                {filteredFarmers.map(farmer => (
                    <FarmerCard
                        key={farmer.id}
                        farmer={farmer}
                        selected={selectedFarmer === farmer.id}
                        onSelect={() => handleSelect(farmer.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default FarmerMarketplace;