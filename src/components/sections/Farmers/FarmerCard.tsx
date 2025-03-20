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
    const handleBuyClick = () => {
        if (onBuy) onBuy();
    };

    const handleLevelUpClick = () => {
        if (onLevelUp) onLevelUp();
    };

    return (
        <div
            className={`farmer-card frame-${rarity} ${selected ? 'selected' : ''}`}
            onClick={onSelect}
        >
            {/* Scene background */}
            <div className={`card-scene scene-${rarity}`}></div>

            {/* Rarity badge */}
            <div className={`rarity-badge rarity-${rarity}`}>
                {rarity}
            </div>

            {/* Corner icon with level or cost */}
            <div className={`corner-icon corner-icon-${rarity}`}>
                {owned ? level : '↓'}
            </div>

            {/* Character image */}
            <div className="character-container">
                <img src={farmer.imageSrc} alt={farmer.name} className="character-image" />
            </div>

            {/* Card details */}
            <div className="card-details">
                <div className="card-name">{farmer.name}</div>

                {/* Yield bar */}
                <div className="yield-indicator">
                    <div
                        className={`yield-bar-${rarity}`}
                        style={{ width: `${yieldPercentage}%` }}
                    ></div>
                </div>

                {/* Stats */}
                <div className="card-stats">
                    <div>YLD: {currentYield.toFixed(1)}</div>
                    <div>{owned ? 'OWNED' : `${farmer.cost} WLOS`}</div>
                </div>

                {/* Action buttons */}
                {(onBuy || onLevelUp) && (
                    <div className="mt-4">
                        {onBuy && !owned && (
                            <Button
                                text="BUY"
                                color="green"
                                onClick={handleBuyClick}
                            />
                        )}
                        {onLevelUp && owned && (
                            <Button
                                text="LEVEL UP"
                                color="green"
                                onClick={handleLevelUpClick}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FarmerCard;