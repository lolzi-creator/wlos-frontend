import React, { useState, useEffect, useRef } from 'react';
import { useHero } from '../../../../context/HeroContext';
import { HEROES } from '../../../../types/HeroTypes';
import EnhancedEntityCard from '../../../common/EntityCard';
import '../../../../styles/modules/heroes/new/HeroShowcaseSection.css';

const HeroShowcaseSection: React.FC = () => {
    const { isLoading } = useHero();
    const [visible, setVisible] = useState(false);
    const [selectedHero, setSelectedHero] = useState<string | null>(null);
    const [filterRarity, setFilterRarity] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 600);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    const handleSelectHero = (id: string) => {
        setSelectedHero(selectedHero === id ? null : id);
    };

    // Return colors for different rarity levels
    const getRarityColor = (rarity: string): string => {
        switch (rarity) {
            case 'common': return '#b0b0b0';
            case 'rare': return '#5d8aff';
            case 'epic': return '#ad76ff';
            case 'legendary': return '#ffb84d';
            default: return '#00C2FF';
        }
    };
    
    // Filter heroes
    const filteredHeroes = React.useMemo(() => {
        let filtered = [...HEROES];
        
        if (filterRarity) {
            filtered = filtered.filter(hero => hero.rarity === filterRarity);
        }
        
        if (filterType) {
            filtered = filtered.filter(hero => hero.type === filterType);
        }
        
        return filtered;
    }, [filterRarity, filterType]);

    return (
        <section className={`hero-showcase-section ${visible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="section-header">
                <h2 className="section-title">HERO SHOWCASE</h2>
                <p className="section-description">
                    Explore all available heroes and their unique abilities
                </p>
            </div>

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

            <div className="filter-sort-container">
                <div className="filter-group">
                    <label className="filter-label">FILTER BY RARITY:</label>
                    <div className="filter-buttons">
                        <button 
                            className={`filter-button ${filterRarity === null ? 'active' : ''}`}
                            onClick={() => setFilterRarity(null)}
                        >
                            All
                        </button>
                        <button 
                            className={`filter-button ${filterRarity === 'common' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('common')}
                            style={{ '--rarity-color': getRarityColor('common') } as React.CSSProperties}
                        >
                            Common
                        </button>
                        <button 
                            className={`filter-button ${filterRarity === 'rare' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('rare')}
                            style={{ '--rarity-color': getRarityColor('rare') } as React.CSSProperties}
                        >
                            Rare
                        </button>
                        <button 
                            className={`filter-button ${filterRarity === 'epic' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('epic')}
                            style={{ '--rarity-color': getRarityColor('epic') } as React.CSSProperties}
                        >
                            Epic
                        </button>
                        <button 
                            className={`filter-button ${filterRarity === 'legendary' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('legendary')}
                            style={{ '--rarity-color': getRarityColor('legendary') } as React.CSSProperties}
                        >
                            Legendary
                        </button>
                    </div>
                </div>
                
                <div className="filter-group">
                    <label className="filter-label">FILTER BY TYPE:</label>
                    <div className="filter-buttons">
                        <button 
                            className={`filter-button ${filterType === null ? 'active' : ''}`}
                            onClick={() => setFilterType(null)}
                        >
                            All
                        </button>
                        <button 
                            className={`filter-button ${filterType === 'attack' ? 'active' : ''}`}
                            onClick={() => setFilterType('attack')}
                        >
                            Attack
                        </button>
                        <button 
                            className={`filter-button ${filterType === 'defense' ? 'active' : ''}`}
                            onClick={() => setFilterType('defense')}
                        >
                            Defense
                        </button>
                        <button 
                            className={`filter-button ${filterType === 'speed' ? 'active' : ''}`}
                            onClick={() => setFilterType('speed')}
                        >
                            Speed
                        </button>
                        <button 
                            className={`filter-button ${filterType === 'balanced' ? 'active' : ''}`}
                            onClick={() => setFilterType('balanced')}
                        >
                            Balanced
                        </button>
                        <button 
                            className={`filter-button ${filterType === 'magic' ? 'active' : ''}`}
                            onClick={() => setFilterType('magic')}
                        >
                            Magic
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="entity-grid">
                {filteredHeroes.map(hero => (
                    <EnhancedEntityCard
                        key={hero.id}
                        entity={hero}
                        owned={false}
                        showPower={true}
                        showStats={true}
                        infoMessage="AVAILABLE IN PACKS"
                        onSelect={() => handleSelectHero(hero.id)}
                        selected={selectedHero === hero.id}
                        statusLabel="POWER"
                        statusValue={hero.power.toString()}
                    />
                ))}
            </div>

            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Processing...</div>
                </div>
            )}
        </section>
    );
};

export default HeroShowcaseSection; 