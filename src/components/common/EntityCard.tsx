import React from 'react';
import Button from '../common/Button';

// Define a generic entity interface that all entities will extend
export interface BaseEntity {
    id: string;
    name: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    imageSrc: string;
    description: string;
    type?: string;
}

export interface EntityWithStats {
    stats: Record<string, number | string>;
}

export interface EntityWithPower {
    power: number;
}

export interface EntityWithYield {
    baseYieldPerHour: number;
}

export interface EntityWithPrice {
    price?: number;
    cost?: number;
}

export interface EntityCardProps {
    entity: BaseEntity & Partial<EntityWithStats & EntityWithPower & EntityWithYield & EntityWithPrice>;
    owned?: boolean;
    level?: number;
    selected?: boolean;
    equipment?: string[];
    showYield?: boolean;
    showPower?: boolean;
    showStats?: boolean;
    statusLabel?: string;
    statusValue?: string | number;
    primaryAction?: {
        text: string;
        onClick: (e: React.MouseEvent) => void;
        disabled?: boolean;
    };
    secondaryAction?: {
        text: string;
        onClick: (e: React.MouseEvent) => void;
        disabled?: boolean;
    };
    infoMessage?: string;
    onSelect?: () => void;
}

const EntityCard: React.FC<EntityCardProps> = ({
                                                   entity,
                                                   owned = false,
                                                   level = 1,
                                                   selected = false,
                                                   equipment = [],
                                                   showYield = false,
                                                   showPower = false,
                                                   showStats = true,
                                                   statusLabel,
                                                   statusValue,
                                                   primaryAction,
                                                   secondaryAction,
                                                   infoMessage,
                                                   onSelect
                                               }) => {
    // Get color based on rarity
    const getRarityColor = () => {
        switch(entity.rarity) {
            case 'common': return '#14F195'; // Green
            case 'rare': return '#00C2FF'; // Blue
            case 'epic': return '#9945FF'; // Purple
            case 'legendary': return '#FFB800'; // Yellow/Gold
            default: return '#14F195';
        }
    };

    const rarityColor = getRarityColor();

    // Calculate values based on entity type
    const calculateYield = () => {
        if ('baseYieldPerHour' in entity) {
            // Assume 10% increase per level
            return (entity.baseYieldPerHour as number) * (1 + (level - 1) * 0.1);
        }
        return 0;
    };

    const calculatePower = () => {
        if ('power' in entity) {
            // Assume 10% increase per level
            return (entity.power as number) * (1 + (level - 1) * 0.1);
        }
        return 0;
    };

    // Calculate percentages for progress bars
    const yieldPercentage = Math.min((calculateYield() / 15) * 100, 100); // 15 as max yield
    const powerPercentage = Math.min((calculatePower() / 2000) * 100, 100); // 2000 as max power

    // Handle button clicks with stopPropagation to avoid triggering onSelect
    const handleActionClick = (e: React.MouseEvent, onClick?: (e: React.MouseEvent) => void) => {
        e.stopPropagation();
        if (onClick) onClick(e);
    };

    return (
        <div
            className={`entity-card ${selected ? 'selected' : ''} ${entity.rarity}`}
            onClick={onSelect}
            style={{
                width: '240px',
                height: '420px',
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
            {/* Top banner with rarity and type */}
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
                    {entity.rarity}
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    {entity.type && (
                        <div style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            letterSpacing: '1px',
                            color: '#fff',
                            textShadow: '0 0 5px rgba(0,0,0,0.5)',
                        }}>
                            {entity.type}
                        </div>
                    )}
                    {owned && (
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
                            {level}
                        </div>
                    )}
                    {!owned && (
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
                            ↓
                        </div>
                    )}
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
                    {entity.imageSrc ? (
                        <img
                            src={entity.imageSrc}
                            alt={entity.name}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
                            }}
                            onError={(e) => {
                                // If image fails to load, show a fallback with first letter
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
                                    fallback.innerText = entity.name.charAt(0);
                                    parent.appendChild(fallback);
                                }
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '100px',
                            height: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '5rem',
                            fontWeight: 'bold',
                            color: rarityColor,
                        }}>
                            {entity.name.charAt(0)}
                        </div>
                    )}
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
                    {entity.name}
                </h3>
            </div>

            {/* Content section */}
            <div style={{
                width: '90%',
                margin: '0 auto',
                padding: '8px',
                background: 'rgba(8,8,18,0.9)',
                border: `1px solid ${rarityColor}50`,
                borderRadius: '5px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* Progress bars for yield or power */}
                {showYield && 'baseYieldPerHour' in entity && (
                    <div style={{ marginBottom: '10px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '12px',
                            color: '#8B8DA0',
                            marginBottom: '3px'
                        }}>
                            <span>YIELD</span>
                            <span>{calculateYield().toFixed(1)}</span>
                        </div>
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
                )}

                {showPower && 'power' in entity && (
                    <div style={{ marginBottom: '10px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '12px',
                            color: '#8B8DA0',
                            marginBottom: '3px'
                        }}>
                            <span>POWER</span>
                            <span>{Math.round(calculatePower())}</span>
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
                                width: `${powerPercentage}%`,
                                backgroundColor: rarityColor
                            }}></div>
                        </div>
                    </div>
                )}

                {/* Stats display */}
                {showStats && 'stats' in entity && entity.stats && (
                    <div style={{
                        marginBottom: '12px',
                    }}>
                        {Object.entries(entity.stats).map(([statName, value]) => (
                            <div key={statName} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '4px 0',
                                fontSize: '12px',
                            }}>
                <span style={{
                    color: '#8B8DA0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                  {statName.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                                <span style={{
                                    color: typeof value === 'number' && value > 0 ? '#14F195' :
                                        typeof value === 'number' && value < 0 ? '#FF4D4D' :
                                            '#ffffff'
                                }}>
                  {typeof value === 'number' && value > 0 ? '+' : ''}{value}
                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Equipment display */}
                {equipment.length > 0 && (
                    <div style={{
                        marginBottom: '12px',
                        padding: '6px',
                        background: `${rarityColor}20`,
                        borderRadius: '4px',
                        fontSize: '12px',
                    }}>
                        <div style={{ color: rarityColor, fontWeight: 'bold', marginBottom: '4px' }}>
                            EQUIPPED ITEMS
                        </div>
                        {equipment.map((item, index) => (
                            <div key={index} style={{ color: '#8B8DA0' }}>
                                • {item}
                            </div>
                        ))}
                    </div>
                )}

                {/* Status and price display */}
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
                        {entity.description && (
                            <div style={{
                                fontSize: '11px',
                                color: '#8B8DA0',
                                maxHeight: '60px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                marginBottom: '8px',
                            }}>
                                {entity.description.length > 100
                                    ? `${entity.description.substring(0, 100)}...`
                                    : entity.description}
                            </div>
                        )}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                    }}>
                        {statusLabel && (
                            <>
                                <div style={{
                                    fontSize: '10px',
                                    color: '#8B8DA0',
                                    marginBottom: '2px',
                                }}>{statusLabel}</div>
                                <div style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: owned ? '#14F195' : '#ffffff',
                                }}>{statusValue}</div>
                            </>
                        )}
                        {!statusLabel && !owned && ('price' in entity || 'cost' in entity) && (
                            <>
                                <div style={{
                                    fontSize: '10px',
                                    color: '#8B8DA0',
                                    marginBottom: '2px',
                                }}>PRICE</div>
                                <div style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                }}>{(entity.price || entity.cost)} WLOS</div>
                            </>
                        )}
                        {!statusLabel && owned && (
                            <>
                                <div style={{
                                    fontSize: '10px',
                                    color: '#8B8DA0',
                                    marginBottom: '2px',
                                }}>STATUS</div>
                                <div style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#14F195',
                                }}>OWNED</div>
                            </>
                        )}
                    </div>
                </div>

                {/* Spacer to push buttons to bottom */}
                <div style={{ flex: 1 }}></div>

                {/* Action buttons */}
                <div style={{ marginTop: 'auto' }}>
                    {infoMessage && !primaryAction && !secondaryAction && (
                        <div style={{
                            width: '100%',
                            padding: '8px 0',
                            textAlign: 'center',
                            color: '#14F195',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                        }}>
                            {infoMessage}
                        </div>
                    )}

                    {primaryAction && (
                        <button
                            onClick={(e) => handleActionClick(e, primaryAction.onClick)}
                            disabled={primaryAction.disabled}
                            style={{
                                width: '100%',
                                padding: '8px 0',
                                backgroundColor: primaryAction.disabled ? '#444444' : '#FFFFFF',
                                border: '1px solid #CCCCCC',
                                color: primaryAction.disabled ? '#888888' : '#000000',
                                fontFamily: 'Orbitron, sans-serif',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: primaryAction.disabled ? 'not-allowed' : 'pointer',
                                borderRadius: '4px',
                                transition: 'all 0.2s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                position: 'relative',
                                overflow: 'hidden',
                                marginBottom: secondaryAction ? '8px' : '0',
                            }}
                        >
                            {primaryAction.text}
                        </button>
                    )}

                    {secondaryAction && (
                        <button
                            onClick={(e) => handleActionClick(e, secondaryAction.onClick)}
                            disabled={secondaryAction.disabled}
                            style={{
                                width: '100%',
                                padding: '8px 0',
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                border: `1px solid ${rarityColor}`,
                                color: secondaryAction.disabled ? '#888888' : rarityColor,
                                fontFamily: 'Orbitron, sans-serif',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: secondaryAction.disabled ? 'not-allowed' : 'pointer',
                                borderRadius: '4px',
                                transition: 'all 0.2s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                            }}
                        >
                            {secondaryAction.text}
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

export default EntityCard;