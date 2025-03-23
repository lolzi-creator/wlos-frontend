import React, { useState } from 'react';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import { HERO_PACKS, Hero } from '../../../types/HeroTypes';
import { useHero } from '../../../context/HeroContext';
import '../../../styles/farmerPacks.css'; // Reusing the farmer packs CSS

const HeroPackInventory: React.FC = () => {
    const { ownedPacks, openPack, isLoading, error } = useHero();
    const [animationHero, setAnimationHero] = useState<Hero | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    // Group packs by packId to combine duplicates
    const groupedPacks = ownedPacks.reduce((acc, pack) => {
        if (!acc[pack.packId]) {
            acc[pack.packId] = {
                packId: pack.packId,
                count: 0,
                packs: []
            };
        }
        acc[pack.packId].count += 1;
        acc[pack.packId].packs.push(pack);
        return acc;
    }, {} as Record<string, { packId: string; count: number; packs: typeof ownedPacks }>);

    const handleOpenPack = async (packId: string) => {
        try {
            const result = await openPack(packId);
            if (result.success && result.hero) {
                setAnimationHero(result.hero);
                setShowAnimation(true);
            } else {
                alert('Failed to open pack');
            }
        } catch (err) {
            console.error('Error opening pack:', err);
            alert('Error opening pack');
        }
    };

    const closeAnimation = () => {
        setShowAnimation(false);
        setAnimationHero(null);
    };

    if (ownedPacks.length === 0 && !showAnimation) {
        return (
            <section className="hero-packs-inventory">
                <SectionTitle title="YOUR PACKS" />
                <div className="no-packs-message">
                    <p>You don't have any hero packs yet. Visit the store to buy some!</p>
                </div>
            </section>
        );
    }

    return (
        <section className="hero-packs-inventory">
            <SectionTitle title="YOUR PACKS" />

            {error && <div className="error-message">{error}</div>}

            <div className="owned-packs-grid">
                {Object.values(groupedPacks).map(group => {
                    const packInfo = HERO_PACKS.find(p => p.id === group.packId);
                    if (!packInfo) return null;

                    const packColors = {
                        'basic-pack': '#00C2FF', // Cyan
                        'premium-pack': '#9945FF', // Purple
                        'legendary-pack': '#FFB800' // Yellow
                    };
                    const packColor = packColors[packInfo.id as keyof typeof packColors];

                    return (
                        <div key={group.packId} className="owned-pack-card">
                            <div className="pack-container">
                                <div className="pack-box" style={{ borderColor: packColor }}>
                                    <div className="pack-content">
                                        <div className="pack-name-vertical" style={{ color: packColor }}>
                                            {packInfo.id.split('-')[0].toUpperCase()} PACK
                                        </div>
                                    </div>
                                </div>
                                <div className="pack-info">
                                    <div className="pack-title" style={{ color: packColor }}>
                                        {packInfo.name.toUpperCase()}
                                        {group.count > 1 && <span className="pack-count">x{group.count}</span>}
                                    </div>
                                </div>
                            </div>

                            <button
                                className="open-pack-button"
                                style={{
                                    backgroundColor: `rgba(8, 8, 25, 0.8)`,
                                    borderColor: packColor,
                                    color: packColor
                                }}
                                onClick={() => handleOpenPack(group.packs[0].id)}
                                disabled={isLoading}
                            >
                                {isLoading ? "OPENING..." : "OPEN PACK"}
                            </button>
                        </div>
                    );
                })}
            </div>

            {showAnimation && animationHero && (
                <div className="reveal-overlay">
                    <div className={`hero-card frame-${animationHero.rarity}`}>
                        <div className={`card-scene scene-${animationHero.rarity}`}></div>

                        <div className={`rarity-badge rarity-${animationHero.rarity}`}>
                            {animationHero.rarity.toUpperCase()}
                        </div>

                        <div className="character-container">
                            <div className="character-placeholder">
                                {animationHero.name.charAt(0)}
                            </div>
                        </div>

                        <div className="card-details">
                            <div className="card-name">{animationHero.name}</div>

                            <div className="card-type">
                                {animationHero.type.toUpperCase()} - {animationHero.power} POWER
                            </div>

                            <div className="card-stats">
                                {Object.entries(animationHero.stats).map(([stat, value]) => (
                                    <div key={stat} className="stat-item">
                                        <span className="stat-name">{stat.toUpperCase()}</span>
                                        <span className="stat-value">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        className="awesome-button"
                        onClick={closeAnimation}
                    >
                        AWESOME!
                    </button>
                </div>
            )}
        </section>
    );
};

export default HeroPackInventory;