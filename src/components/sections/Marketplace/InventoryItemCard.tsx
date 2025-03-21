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
        >
            <div className={`rarity-banner ${item.rarity}`}>
                <span className="rarity-text">{item.rarity}</span>
                <span className="type-text">{item.type}</span>
            </div>

            {equipped && <div className="equipped-badge">Equipped</div>}
            {isConsumable && <div className="charges-badge">{charges}x</div>}
            {forSale && <div className="for-sale-badge">For Sale</div>}

            <div className="item-image-container">
                <div className="item-image">
                    <span className="item-letter">{item.name.charAt(0)}</span>
                </div>
            </div>

            <div className="item-name-container">
                <h3 className="item-name">{item.name}</h3>
            </div>

            <div className="item-details">
                <p className="item-description">{item.description}</p>

                <div className="item-stats">
                    {Object.entries(item.stats).map(([statName, value]) => (
                        <div key={statName} className="stat-row">
                            <span className="stat-name">{statName.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className={`stat-value ${value > 0 ? 'positive' : 'negative'}`}>
                                {value > 0 ? '+' : ''}{value}
                            </span>
                        </div>
                    ))}
                </div>

                {item.effect && (
                    <div className="effect-box">
                        <div className="effect-text">{item.effect}</div>
                        <div className="duration-text">Duration: {item.duration}</div>
                    </div>
                )}

                <div className="item-actions">
                    <button
                        className="action-button"
                        onClick={handleActionClick}
                    >
                        {isConsumable ? 'USE' : (equipped ? 'UNEQUIP' : 'EQUIP')}
                    </button>

                    <button
                        className="sell-button"
                        onClick={handleSellClick}
                    >
                        SELL
                    </button>
                </div>

                {!isConsumable && (
                    <div className="durability-container">
                        <div className="durability-bar">
                            <div
                                className={`durability-fill ${
                                    durability > 70 ? 'good' :
                                        durability > 30 ? 'medium' : 'low'
                                }`}
                                style={{ width: `${durability}%` }}
                            ></div>
                        </div>
                        <div className="durability-text">{durability}%</div>
                    </div>
                )}
            </div>

            {selected && (
                <>
                    <div className="corner-accent top-right"></div>
                    <div className="corner-accent bottom-left"></div>
                </>
            )}
        </div>
    );
};

export default InventoryItemCard;