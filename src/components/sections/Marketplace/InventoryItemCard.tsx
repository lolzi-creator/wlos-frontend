// src/components/sections/Marketplace/InventoryItemCard.tsx
import React from 'react';
import { Item } from '../../../types/ItemTypes';

interface InventoryItemCardProps {
    item: Item;
    equipped?: boolean;
    durability?: number;
    charges?: number;
    forSale?: boolean;
    selected?: boolean;
    onSelect?: () => void;
    onAction?: () => void;
    onSell?: () => void;
}

const InventoryItemCard: React.FC<InventoryItemCardProps> = ({
                                                                 item,
                                                                 equipped = false,
                                                                 durability = 100,
                                                                 charges = 1,
                                                                 forSale = false,
                                                                 selected = false,
                                                                 onSelect,
                                                                 onAction,
                                                                 onSell
                                                             }) => {
    const isConsumable = item.type === 'consumable';

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

    const handleActionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onAction) onAction();
    };

    const handleSellClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onSell) onSell();
    };

    return (
        <div
            className={`inventory-item-card ${selected ? 'selected' : ''} ${forSale ? 'for-sale' : ''}`}
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

            {/* Status badges */}
            {equipped && (
                <div style={{
                    position: 'absolute',
                    top: '30px',
                    right: '0',
                    padding: '4px 8px',
                    background: '#14F195',
                    color: '#000',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    zIndex: 5,
                    borderTopLeftRadius: '4px',
                    borderBottomLeftRadius: '4px',
                }}>
                    Equipped
                </div>
            )}

            {forSale && (
                <div style={{
                    position: 'absolute',
                    top: equipped ? '60px' : '30px',
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
                    For Sale
                </div>
            )}

            {isConsumable && (
                <div style={{
                    position: 'absolute',
                    top: '30px',
                    left: '0',
                    padding: '4px 8px',
                    background: '#9945FF',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    zIndex: 5,
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px',
                }}>
                    {charges}x
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

            {/* Item details section */}
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

                {/* Equipment durability */}
                {!isConsumable && (
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{
                            fontSize: '12px',
                            color: '#8B8DA0',
                            marginBottom: '4px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span>DURABILITY</span>
                            <span>{durability}%</span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '6px',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                height: '100%',
                                width: `${durability}%`,
                                background: durability > 70 ? '#14F195' : durability > 30 ? '#FFB800' : '#FF4D4D',
                                borderRadius: '3px'
                            }}></div>
                        </div>
                    </div>
                )}

                {/* Spacer to push buttons to bottom */}
                <div style={{ flex: 1 }}></div>

                {/* Action buttons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginTop: '12px',
                }}>
                    <button
                        onClick={handleActionClick}
                        style={{
                            flex: 1,
                            padding: '8px 0',
                            backgroundColor: 'rgba(20, 241, 149, 0.1)',
                            border: '1px solid #14F195',
                            color: '#14F195',
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            transition: 'all 0.2s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                    >
                        {isConsumable ? 'USE' : (equipped ? 'UNEQUIP' : 'EQUIP')}
                    </button>

                    <button
                        onClick={handleSellClick}
                        disabled={forSale}
                        style={{
                            flex: 1,
                            padding: '8px 0',
                            backgroundColor: forSale ? 'rgba(136, 136, 136, 0.1)' : 'rgba(255, 184, 0, 0.1)',
                            border: `1px solid ${forSale ? '#888888' : '#FFB800'}`,
                            color: forSale ? '#888888' : '#FFB800',
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            cursor: forSale ? 'not-allowed' : 'pointer',
                            borderRadius: '4px',
                            transition: 'all 0.2s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                    >
                        {forSale ? 'LISTED' : 'SELL'}
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

export default InventoryItemCard;