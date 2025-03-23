// src/components/sections/Heroes/HeroCard.tsx
import React from 'react';
import { Hero } from '../../../types/HeroTypes';
import Button from '../../common/Button';

interface HeroCardProps {
    hero: Hero;
    owned?: boolean;
    level?: number;
    selected?: boolean;
    onSelect?: () => void;
    onBuy?: () => void;
    onLevelUp?: () => void;
}

const HeroCard: React.FC<HeroCardProps> = ({
                                               hero,
                                               owned = false,
                                               level = 1,
                                               selected = false,
                                               onSelect,
                                               onBuy,
                                               onLevelUp
                                           }) => {
    // Get color based on rarity
    const getRarityColor = () => {
        switch(hero.rarity) {
            case 'common': return '#14F195'; // Green
            case 'rare': return '#00C2FF';   // Blue
            case 'epic': return '#9945FF';   // Purple
            case 'legendary': return '#FFB800'; // Orange/Gold
            default: return '#14F195';
        }
    };

    const rarityColor = getRarityColor();

    // Calculate power based on level (simple formula for demonstration)
    const heroPower = owned ? Math.round(hero.power * (1 + (level - 1) * 0.1)) : hero.power;

    // Handle button clicks
    const handleLevelUpClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onLevelUp) onLevelUp();
    };

    return (
        <div
            className={`hero-card ${selected ? 'selected' : ''} ${hero.rarity}`}
            onClick={onSelect}
            style={{
                width: '240px',
                height: '400px',
                position: 'relative',
                margin: '10px',
                padding: '0',
                background: hero.rarity === 'common' ? '#0F2A1E' :
                    hero.rarity === 'rare' ? '#0A1A2A' :
                        hero.rarity === 'epic' ? '#1A0A2A' :
                            '#2A1A0A',  // for legendary
                borderRadius: '8px',
                boxShadow: selected ? `0 0 20px ${rarityColor}80, 0 0 40px ${rarityColor}40` : '0 4px 8px rgba(0,0,0,0.3)',
                border: `2px solid ${rarityColor}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
        >
            {/* Top banner with rarity and type */}
            <div style={{
                width: '100%',
                padding: '8px 15px',
                background: hero.rarity === 'common' ? '#14F195' :
                    hero.rarity === 'rare' ? '#00C2FF' :
                        hero.rarity === 'epic' ? '#9945FF' :
                            '#FFB800',  // for legendary
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#000'
                }}>{hero.rarity}</div>
                <div style={{
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#000'
                }}>{hero.type}</div>
            </div>

            {/* Hero image area */}
            <div style={{
                width: '100%',
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                backgroundColor: 'rgba(0,0,0,0.3)', // Dark background for the image
                padding: '20px'
            }}>
                {/* If there's an actual image, try to load it */}
                <img
                    src={hero.imageSrc}
                    alt={hero.name}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                    }}
                    onError={(e) => {
                        // If image fails to load, show a fallback with the first letter
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                            const fallback = document.createElement('div');
                            fallback.style.width = '100px';
                            fallback.style.height = '100px';
                            fallback.style.display = 'flex';
                            fallback.style.justifyContent = 'center';
                            fallback.style.alignItems = 'center';
                            fallback.style.fontSize = '5rem';
                            fallback.style.fontWeight = 'bold';
                            fallback.style.color = rarityColor;
                            fallback.innerText = hero.name.charAt(0);
                            parent.appendChild(fallback);
                        }
                    }}
                />
            </div>

            {/* Hero name */}
            <div style={{
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: '10px',
                textAlign: 'center'
            }}>
                <h3 style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#fff',
                    textTransform: 'uppercase'
                }}>
                    {hero.name}
                </h3>
            </div>

            {/* Power bar */}
            <div style={{
                padding: '5px 15px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#8B8DA0',
                    marginBottom: '3px'
                }}>
                    <span>POWER</span>
                    <span>{heroPower}</span>
                </div>
                <div style={{
                    width: '100%',
                    height: '5px',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${(heroPower / 2000) * 100}%`, // Scale to max of 2000
                        backgroundColor: rarityColor
                    }}></div>
                </div>
            </div>

            {/* Hero stats */}
            <div style={{
                padding: '5px 15px'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    rowGap: '5px',
                    columnGap: '5px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#8B8DA0', fontSize: '12px' }}>ATTACK:</span>
                        <span style={{ color: '#ffffff', fontSize: '12px' }}>{hero.stats.attack}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#8B8DA0', fontSize: '12px' }}>DEFENSE:</span>
                        <span style={{ color: '#ffffff', fontSize: '12px' }}>{hero.stats.defense}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#8B8DA0', fontSize: '12px' }}>SPEED:</span>
                        <span style={{ color: '#ffffff', fontSize: '12px' }}>{hero.stats.speed}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#8B8DA0', fontSize: '12px' }}>ENERGY:</span>
                        <span style={{ color: '#ffffff', fontSize: '12px' }}>{hero.stats.energy}</span>
                    </div>
                </div>
            </div>

            {/* Bottom section */}
            <div style={{
                marginTop: 'auto',
                padding: '10px 15px',
                textAlign: 'center'
            }}>
                {owned && onLevelUp ? (
                    <button
                        onClick={handleLevelUpClick}
                        style={{
                            width: '100%',
                            padding: '8px',
                            backgroundColor: rarityColor,
                            border: 'none',
                            borderRadius: '4px',
                            color: '#000',
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        LEVEL UP
                    </button>
                ) : (
                    <div style={{
                        width: '100%',
                        padding: '8px 0',
                        textAlign: 'center',
                        color: '#14F195',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}>
                        AVAILABLE IN PACKS
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroCard;