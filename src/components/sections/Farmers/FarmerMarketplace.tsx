// src/components/sections/Farmers/FarmerMarketplace.tsx
import React, { useState, useEffect } from 'react';
import SectionTitle from '../../common/SectionTitle';
import EntityCard from '../../common/EntityCard';
import { FARMERS } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';
import '../../../styles/entityCard.css';

const FarmerMarketplace: React.FC = () => {
    const [filterRarity, setFilterRarity] = useState<string>('all');
    const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);
    const { isLoading } = useFarmer();
    const [farmersToDisplay, setFarmersToDisplay] = useState(FARMERS);

    // Apply filter when filterRarity changes
    useEffect(() => {
        if (filterRarity === 'all') {
            setFarmersToDisplay(FARMERS);
        } else {
            setFarmersToDisplay(FARMERS.filter(farmer => farmer.rarity === filterRarity));
        }
    }, [filterRarity]);

    const handleSelect = (id: string) => {
        setSelectedFarmer(selectedFarmer === id ? null : id);
    };

    return (
        <section className="farmer-marketplace-section">
            <SectionTitle title="FARMER SHOWCASE" />

            <div className="marketplace-info-banner">
                <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16V12" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8H12.01" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
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

            <div className="entity-grid">
                {farmersToDisplay.map(farmer => (
                    <EntityCard
                        key={farmer.id}
                        entity={farmer}
                        owned={false}
                        showYield={true}
                        infoMessage="AVAILABLE IN PACKS"
                        onSelect={() => handleSelect(farmer.id)}
                        selected={selectedFarmer === farmer.id}
                        statusLabel="YIELD"
                        statusValue={`${farmer.baseYieldPerHour.toFixed(1)} / hour`}
                    />
                ))}
            </div>

            {isLoading && <div className="loading-overlay">Processing...</div>}
        </section>
    );
};

export default FarmerMarketplace;