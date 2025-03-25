// src/components/sections/Heroes/HeroShowcase.tsx
import React, { useState, useEffect } from 'react';
import SectionTitle from '../../common/SectionTitle';
import EntityCard from '../../common/EntityCard';
import { HEROES } from '../../../types/HeroTypes';
import { useHero } from '../../../context/HeroContext';
import '../../../styles/entityCard.css';

const HeroShowcase: React.FC = () => {
    const [filterRarity, setFilterRarity] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');
    const [selectedHero, setSelectedHero] = useState<string | null>(null);
    const { isLoading } = useHero();
    const [heroesToDisplay, setHeroesToDisplay] = useState(HEROES);

    // Apply filters when filterRarity or filterType changes
    useEffect(() => {
        let filtered = HEROES;

        if (filterRarity !== 'all') {
            filtered = filtered.filter(hero => hero.rarity === filterRarity);
        }

        if (filterType !== 'all') {
            filtered = filtered.filter(hero => hero.type === filterType);
        }

        setHeroesToDisplay(filtered);
    }, [filterRarity, filterType]);

    const handleSelect = (id: string) => {
        setSelectedHero(selectedHero === id ? null : id);
    };

    return (
        <section className="hero-showcase-section">
            <SectionTitle title="HERO SHOWCASE" />

            <div className="marketplace-info-banner">
                <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16V12" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8H12.01" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <p>Heroes can only be acquired through packs in the Pack Store. View our collection below!</p>
            </div>

            <div className="filter-controls">
                <div className="filter-group">
                    <span className="filter-label">Rarity:</span>
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

                <div className="filter-group">
                    <span className="filter-label">Type:</span>
                    <div className="filter-options">
                        <button
                            className={`filter-option ${filterType === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterType('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-option ${filterType === 'attack' ? 'active' : ''}`}
                            onClick={() => setFilterType('attack')}
                        >
                            Attack
                        </button>
                        <button
                            className={`filter-option ${filterType === 'defense' ? 'active' : ''}`}
                            onClick={() => setFilterType('defense')}
                        >
                            Defense
                        </button>
                        <button
                            className={`filter-option ${filterType === 'speed' ? 'active' : ''}`}
                            onClick={() => setFilterType('speed')}
                        >
                            Speed
                        </button>
                        <button
                            className={`filter-option ${filterType === 'balanced' ? 'active' : ''}`}
                            onClick={() => setFilterType('balanced')}
                        >
                            Balanced
                        </button>
                        <button
                            className={`filter-option ${filterType === 'magic' ? 'active' : ''}`}
                            onClick={() => setFilterType('magic')}
                        >
                            Magic
                        </button>
                    </div>
                </div>
            </div>

            <div className="entity-grid">
                {heroesToDisplay.map(hero => (
                    <EntityCard
                        key={hero.id}
                        entity={hero}
                        owned={false}
                        showPower={true}
                        showStats={true}
                        infoMessage="AVAILABLE IN PACKS"
                        onSelect={() => handleSelect(hero.id)}
                        selected={selectedHero === hero.id}
                        statusLabel="POWER"
                        statusValue={hero.power}
                    />
                ))}
            </div>

            {isLoading && <div className="loading-overlay">Processing...</div>}
        </section>
    );
};

export default HeroShowcase;