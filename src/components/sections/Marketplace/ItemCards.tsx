// src/components/sections/Marketplace/ItemCards.tsx
import React from 'react';
import { Item } from '../../../types/ItemTypes';
import Button from '../../common/Button';

interface ItemCardProps {
    item: Item & {
        isListing?: boolean;
        seller?: string;
    };
    selected?: boolean;
    onSelect?: () => void;
    onBuy?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
                                               item,
                                               selected = false,
                                               onSelect,
                                               onBuy
                                           }) => {
    // Get rarity color
    const getRarityColor = () => {
        switch(item.rarity) {
            case 'common': return '#14F195';
            case 'uncommon': return '#49E9FF';
            case 'rare': return '#00C2FF';
            case 'epic': return '#9945FF';
            case 'legendary': return '#FFB800';
            default: return '#14F195';
        }
    };

    const rarityColor = getRarityColor();

    // Handle buy click
    const handleBuyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onBuy) onBuy();
    };

    // Format seller address
    const formatSeller = (address: string) => {
        if (!address) return '';
        return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
    };

    return (
        <div
            className={`item-card ${selected ? 'selected' : ''}`}
            onClick={onSelect}
            style={{
                width: '240px',
                height: '460px',
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
                    {item.rarity}
                </div>
                <div style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    letterSpacing: '1px',
                    color: '#fff',
                    textShadow: '0 0 5px rgba(0,0,0,0.5)',
                }}>
                    {item.type}
                </div>
            </div>

            {/* Marketplace listing badge */}
            {item.isListing && (
                <div style={{
                    position: 'absolute',
                    top: '30px',
                    right: '0',
                    padding: '4px 8px',
                    background: '#FFB800',
                    color: '#000',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    zIndex: 5,
                    borderTopLeftRadius: '4px',
                    borderBottomLeftRadius: '4px',
                }}>
                    Player Listing
                </div>
            )}

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

                {/* Item image or placeholder */}
                <div style={{
                    position: 'relative',
                    width: '70%',
                    height: '70%',
                    zIndex: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: `linear-gradient(135deg, ${rarityColor}40 0%, ${rarityColor}10 100%)`,
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                }}>
                    <div style={{
                        fontWeight: 'bold',
                        color: rarityColor,
                        fontSize: '24px',
                        textShadow: `0 0 10px ${rarityColor}80`
                    }}>
                        {item.name.charAt(0)}
                    </div>
                </div>
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
                    {item.name}
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
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{ marginBottom: '10px' }}>
                    <p style={{
                        fontSize: '12px',
                        color: '#ccc',
                        margin: '0 0 8px 0',
                    }}>
                        {item.description}
                    </p>
                </div>

                {/* Stats display */}
                <div style={{ marginBottom: '12px' }}>
                    {Object.entries(item.stats).map(([statName, value]) => (
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
                                color: Number(value) > 0 ? '#14F195' : '#FF4D4D',
                                fontWeight: 'bold'
                            }}>
                                {Number(value) > 0 ? '+' : ''}{value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Consumable effect */}
                {item.effect && (
                    <div style={{
                        marginBottom: '12px',
                        padding: '6px',
                        background: `${rarityColor}20`,
                        borderRadius: '4px',
                        fontSize: '12px',
                    }}>
                        <div style={{ color: rarityColor, fontWeight: 'bold' }}>
                            {item.effect}
                        </div>
                        <div style={{ color: '#8B8DA0' }}>
                            Duration: {item.duration}
                        </div>
                    </div>
                )}

                {/* Seller information for listings */}
                {item.isListing && item.seller && (
                    <div style={{
                        marginBottom: '12px',
                        fontSize: '12px',
                        color: '#8B8DA0',
                    }}>
                        <span style={{ fontWeight: 'bold' }}>Seller:</span> {formatSeller(item.seller)}
                    </div>
                )}

                {/* Spacer to push button to bottom */}
                <div style={{ flex: 1 }}></div>

                {/* Price and buy button */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '12px',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <div style={{ fontSize: '10px', color: '#8B8DA0' }}>PRICE</div>
                        <div style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: rarityColor,
                        }}>
                            {item.price} WLOS
                        </div>
                    </div>

                    <button
                        onClick={handleBuyClick}
                        style={{
                            padding: '8px 16px',
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
                        }}
                    >
                        BUY
                    </button>
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

export default ItemCard;