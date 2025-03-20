// src/components/sections/Farmers/FarmerMarketplace.tsx
import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import FarmerCard from './FarmerCard';
import { FARMERS } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';

const FarmerMarketplace: React.FC = () => {
    const { buyFarmer, isLoading, error } = useFarmer();
    const [filterRarity, setFilterRarity] = useState<string>('all');
    const [selectedFarmer] = useState<string | null>(null);

    // Filter farmers based on selected rarity
    const filteredFarmers = filterRarity === 'all'
        ? FARMERS
        : FARMERS.filter(farmer => farmer.rarity === filterRarity);

    const handleBuy = async (farmerId: string) => {
        const success = await buyFarmer(farmerId);
        if (success) {
            // Show success message
            alert('Farmer purchased successfully!');
        }
    };

    return (
        <section className="farmer-marketplace-section">
            <SectionTitle title="FARMER MARKETPLACE" />

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

            {error && <div className="error-message">{error}</div>}

            <div className="farmers-grid">
                {filteredFarmers.map(farmer => (
                    <FarmerCard
                        key={farmer.id}
                        farmer={farmer}
                        selected={selectedFarmer === farmer.id}
                        onBuy={() => handleBuy(farmer.id)}
                    />
                ))}
            </div>

            {isLoading && <div className="loading-overlay">Processing purchase...</div>}
        </section>
    );
};

export default FarmerMarketplace;