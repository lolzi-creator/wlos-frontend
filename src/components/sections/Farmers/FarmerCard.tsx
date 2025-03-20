import React from 'react';
import { Farmer } from '../../../types/FarmerTypes';
import Button from '../../common/Button';

interface FarmerCardProps {
    farmer: Farmer;
    owned?: boolean;
    level?: number;
    selected?: boolean;
    onSelect?: () => void;
    onBuy?: () => void;
    onLevelUp?: () => void;
}

const FarmerCard: React.FC<FarmerCardProps> = ({
                                                   farmer,
                                                   owned = false,
                                                   level = 1,
                                                   selected = false,
                                                   onSelect,
                                                   onBuy,
                                                   onLevelUp
                                               }) => {
    // Get rarity to use in classNames
    const rarity = farmer.rarity;

    // Calculate yield value based on level
    const currentYield = farmer.baseYieldPerHour * (1 + (level * 0.1));

    // Calculate yield percentage for progress bar (assume max is 15)
    const yieldPercentage = Math.min((currentYield / 15) * 100, 100);

    // Use simple functions without event parameters to avoid TypeScript errors
    const handleBuyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onBuy) onBuy();
    };

    const handleLevelUpClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onLevelUp) onLevelUp();
    };

    // Get color based on rarity
    const getRarityColor = () => {
        switch(rarity) {
            case 'common': return '#14F195';
            case 'rare': return '#00C2FF';
            case 'epic': return '#9945FF';
            case 'legendary': return '#FFB800';
            default: return '#14F195';
        }
    };

    const rarityColor = getRarityColor();

    return (
        <div
            className={`modern-farmer-card ${selected ? 'selected' : ''}`}
            onClick={onSelect}
            style={{
                width: '240px',
                height: '420px', // Increased height to make room for the button
                position: 'relative',
                margin: '12px',
                borderRadius: '12px',
                background: `linear-gradient(145deg, rgba(10,10,35,0.95) 0%, rgba(8,8,25,0.98) 100%)`,
                boxShadow: selected
                    ? `0 0 20px ${rarityColor}80, 0 0 40px ${rarityColor}40`
                    : '0 8px 16px rgba(0,0,0,0.3)',
                border: `2px solid ${rarityColor}`,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Top banner with rarity */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                padding: '6px 12px',
                background: `linear-gradient(90deg, ${rarityColor}99 0%, ${rarityColor}22 100%)`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10,
            }}>
                <div style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    letterSpacing: '1px',
                    color: '#fff',
                    textShadow: '0 0 5px rgba(0,0,0,0.5)',
                }}>
                    {rarity}
                </div>
                <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: rarityColor,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#000',
                }}>
                    {owned ? level : '↓'}
                </div>
            </div>

            {/* Image container with hexagonal clip-path */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '200px',
                marginTop: '35px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
            }}>
                {/* Decorative elements for tech feel */}
                <div style={{
                    position: 'absolute',
                    top: '-5px',
                    left: '-5px',
                    width: '110%',
                    height: '110%',
                    background: `linear-gradient(135deg, ${rarityColor}10 0%, ${rarityColor}30 100%)`,
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    zIndex: 1,
                }}></div>

                {/* Border design */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 10,
                    width: 'calc(100% - 20px)',
                    height: '100%',
                    border: `1px solid ${rarityColor}40`,
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    zIndex: 2,
                }}></div>

                {/* Actual image container */}
                <div style={{
                    position: 'relative',
                    width: '70%',
                    height: '70%',
                    zIndex: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <img
                        src={farmer.imageSrc}
                        alt={farmer.name}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
                        }}
                    />
                </div>

                {/* Tech circuit patterns */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `
                        radial-gradient(circle at 15% 15%, ${rarityColor}50 0%, ${rarityColor}00 8%),
                        radial-gradient(circle at 85% 85%, ${rarityColor}50 0%, ${rarityColor}00 8%)
                    `,
                    zIndex: 3,
                    pointerEvents: 'none',
                }}></div>
            </div>

            {/* Name panel with glowing effect */}
            <div style={{
                position: 'relative',
                width: '90%',
                margin: '10px auto',
                padding: '5px',
                textAlign: 'center',
                background: 'rgba(8,8,20,0.9)',
                border: `1px solid ${rarityColor}70`,
                boxShadow: `0 0 10px ${rarityColor}40`,
                borderRadius: '4px',
                zIndex: 5,
            }}>
                <h3 style={{
                    margin: 0,
                    padding: '5px 0',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#fff',
                    textShadow: `0 0 5px ${rarityColor}90`,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                }}>
                    {farmer.name}
                </h3>
            </div>

            {/* Stats section */}
            <div style={{
                width: '90%',
                margin: '0 auto',
                padding: '8px',
                background: 'rgba(8,8,18,0.9)',
                border: `1px solid ${rarityColor}50`,
                borderRadius: '5px',
                flex: 1, // Allow this section to flex and take available space
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* Yield bar with tech design */}
                <div style={{
                    marginBottom: '10px',
                }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '8px',
                        background: 'rgba(10,10,30,0.8)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${yieldPercentage}%`,
                            background: `linear-gradient(90deg, ${rarityColor}60 0%, ${rarityColor} 100%)`,
                            borderRadius: '4px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* Animated pulse effect */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '30px',
                                height: '100%',
                                background: `linear-gradient(90deg, transparent 0%, ${rarityColor} 50%, transparent 100%)`,
                                animation: 'pulse-slide 1.5s infinite linear',
                            }}></div>
                        </div>
                    </div>
                </div>

                {/* Stats and info */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}>
                        <div style={{
                            fontSize: '10px',
                            color: '#8B8DA0',
                            marginBottom: '2px',
                        }}>YIELD</div>
                        <div style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: rarityColor,
                            textShadow: `0 0 5px ${rarityColor}60`,
                        }}>{currentYield.toFixed(1)}</div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                    }}>
                        <div style={{
                            fontSize: '10px',
                            color: '#8B8DA0',
                            marginBottom: '2px',
                        }}>{owned ? 'STATUS' : 'PRICE'}</div>
                        <div style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: owned ? '#14F195' : '#ffffff',
                        }}>{owned ? 'OWNED' : `${farmer.cost} WLOS`}</div>
                    </div>
                </div>

                {/* Spacer to push button to bottom */}
                <div style={{ flex: 1 }}></div>

                {/* Action button with hover effect - Always visible for owned farmers */}
                <div style={{ marginTop: 'auto' }}>
                    {!owned && onBuy && (
                        <button
                            onClick={handleBuyClick}
                            style={{
                                width: '100%',
                                padding: '8px 0',
                                backgroundColor: 'rgba(20, 241, 149, 0.2)',
                                border: '1px solid #14F195',
                                color: '#fff',
                                fontFamily: 'Orbitron, sans-serif',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                transition: 'all 0.2s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            BUY
                        </button>
                    )}
                    {owned && onLevelUp && (
                        <button
                            onClick={handleLevelUpClick}
                            style={{
                                width: '100%',
                                padding: '8px 0',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #CCCCCC',
                                color: '#000000',
                                fontFamily: 'Orbitron, sans-serif',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                transition: 'all 0.2s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                position: 'relative',
                                overflow: 'hidden',
                                marginBottom: '8px', // Add some bottom margin
                            }}
                        >
                            LEVEL UP
                        </button>
                    )}
                </div>
            </div>

            {/* Corner accents for selected state */}
            {selected && (
                <>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '15px',
                        height: '15px',
                        borderTop: `2px solid ${rarityColor}`,
                        borderRight: `2px solid ${rarityColor}`,
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '15px',
                        height: '15px',
                        borderBottom: `2px solid ${rarityColor}`,
                        borderLeft: `2px solid ${rarityColor}`,
                    }}></div>
                </>
            )}
        </div>
    );
};

export default FarmerCard;