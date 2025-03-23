import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import HeroCard from '../Heroes/HeroCard';
import { HEROES } from '../../../types/HeroTypes';
import { useHero } from '../../../context/HeroContext';
import '../../../styles/heroes.css';

const HeroDashboard: React.FC = () => {
    const { ownedHeroes, levelUpHero, isLoading, error } = useHero();
    const [selectedHero, setSelectedHero] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelectedHero(selectedHero === id ? null : id);
    };

    const handleLevelUp = (id: string) => {
        levelUpHero(id);
    };

    // Calculate total power
    const totalPower = ownedHeroes.reduce((total, hero) => {
        const heroInfo = HEROES.find(h => h.id === hero.heroId);
        if (!heroInfo) return total;
        // Calculate hero power based on level
        const heroPower = heroInfo.power * (1 + (hero.level * 0.1));
        return total + heroPower;
    }, 0);

    return (
        <section className="hero-dashboard-section">
            <SectionTitle title="YOUR HEROES" />

            <div className="dashboard-overview">
                {/* Power Panel - Left Side */}
                <div className="power-panel">
                    <div className="power-content">
                        <div className="power-header">
                            <div className="icon-circle">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>

                            <div>
                                <h3 className="power-title">Battle Power</h3>
                                <div className="power-amount">{Math.round(totalPower)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Panel - Right Side with two separate boxes */}
                <div className="stats-container">
                    {/* Top box - Heroes Owned */}
                    <div className="stats-box">
                        <div className="stats-content">
                            <div className="stats-text">
                                <div className="stats-label">Heroes<br/>Owned</div>
                                <div className="stats-value">{ownedHeroes.length}</div>
                            </div>

                            <div className="icon-circle">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Bottom box - Highest Level */}
                    <div className="stats-box">
                        <div className="stats-content">
                            <div className="stats-text">
                                <div className="stats-label">Highest<br/>Level</div>
                                <div className="stats-value level-value">
                                    {ownedHeroes.length > 0
                                        ? Math.max(...ownedHeroes.map(hero => hero.level))
                                        : 0}
                                </div>
                            </div>

                            <div className="icon-circle">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {ownedHeroes.length > 0 ? (
                <div className="heroes-grid">
                    {ownedHeroes.map(ownedHero => {
                        const heroInfo = HEROES.find(h => h.id === ownedHero.heroId);
                        if (!heroInfo) return null;

                        return (
                            <HeroCard
                                key={ownedHero.id}
                                hero={heroInfo}
                                owned={true}
                                level={ownedHero.level}
                                selected={selectedHero === ownedHero.id}
                                onSelect={() => handleSelect(ownedHero.id)}
                                onLevelUp={() => handleLevelUp(ownedHero.id)}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="no-heroes-message">
                    <p>You don't own any heroes yet. Visit the pack store to buy some!</p>
                </div>
            )}

            {isLoading && <div className="loading-overlay">Processing...</div>}
        </section>
    );
};

export default HeroDashboard;