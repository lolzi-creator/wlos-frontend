import React from 'react';
import { Farmer } from '../../../types/FarmerTypes';

interface FarmerCardAnimationProps {
    farmer: Farmer;
    onClose: () => void;
}

/**
 * This is a simplified version of the original FarmerCard that is ONLY used for
 * the pack opening animation. All other uses should use the EntityCard component.
 */
const FarmerCardAnimation: React.FC<FarmerCardAnimationProps> = ({ farmer, onClose }) => {
    return (
        <div className="reveal-overlay">
            <div className={`farmer-card frame-${farmer.rarity}`}>
                <div className={`card-scene scene-${farmer.rarity}`}></div>

                <div className={`rarity-badge rarity-${farmer.rarity}`}>
                    {farmer.rarity}
                </div>

                <div className="character-container">
                    <img src={farmer.imageSrc} alt={farmer.name} className="character-image" />
                </div>

                <div className="card-details">
                    <div className="card-name">{farmer.name}</div>

                    <div className="yield-indicator">
                        <div
                            className={`yield-bar-${farmer.rarity}`}
                            style={{ width: `${Math.min((farmer.baseYieldPerHour / 15) * 100, 100)}%` }}
                        ></div>
                    </div>

                    <div className="card-stats">
                        <div>YLD: {farmer.baseYieldPerHour.toFixed(1)}</div>
                        <div>{farmer.rarity.toUpperCase()}</div>
                    </div>
                </div>
            </div>

            <button
                className="awesome-button"
                onClick={onClose}
            >
                AWESOME!
            </button>
        </div>
    );
};

export default FarmerCardAnimation;