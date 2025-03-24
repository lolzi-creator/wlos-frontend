// src/components/sections/Heroes/HeroShowcase.tsx
import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import EntityCard from '../../common/EntityCard';
import { HEROES } from '../../../types/HeroTypes';

const HeroShowcase: React.FC = () => {
    const [filterRarity, setFilterRarity] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');
    const [selectedHero, setSelectedHero] = useState<string | null>(null);

    // Filter heroes based on selected criteria
    const filteredHeroes = HEROES.filter(hero => {
        const rarityMatch = filterRarity === 'all' || hero.rarity === filterRarity;
        const typeMatch = filterType === 'all' || hero.type === filterType;
        return rarityMatch && typeMatch;
    });

    const handleSelect = (id: string) => {
        setSelectedHero(selectedHero === id ? null : id);
    };

    return (
        <section className="hero-showcase-section">
            <SectionTitle title="HERO SHOWCASE" />

            <div className="showcase-info-banner">
                <div className="info-icon"></div>
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
                {filteredHeroes.map(hero => (
                    <EntityCard
                        key={hero.id}
                        entity={{
                            id: hero.id,
                            name: hero.name,
                            rarity: hero.rarity,
                            type: hero.type,
                            description: hero.description,
                            imageSrc: hero.imageSrc,
                            stats: hero.stats,
                            abilities: hero.abilities,
                            power: hero.power
                        }}
                        selected={selectedHero === hero.id}
                        onSelect={() => handleSelect(hero.id)}
                        showStats={true}
                        showPower={true}
                        infoMessage="AVAILABLE IN PACKS"
                        statusLabel="POWER"
                        statusValue={hero.power}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroShowcase;