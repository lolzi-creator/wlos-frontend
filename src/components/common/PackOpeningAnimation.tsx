// src/components/common/PackOpeningAnimation.tsx
import React, { useState, useEffect } from 'react';
import { Farmer } from '../../types/FarmerTypes';
import { Hero } from '../../types/HeroTypes';

interface PackOpeningAnimationProps {
    entity: Farmer | Hero;
    entityType: 'farmer' | 'hero';
    onClose: () => void;
}

const PackOpeningAnimation: React.FC<PackOpeningAnimationProps> = ({
                                                                       entity,
                                                                       entityType,
                                                                       onClose
                                                                   }) => {
    const [animationState, setAnimationState] = useState<'revealing' | 'revealed'>('revealing');

    // Effect to play the reveal animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationState('revealed');
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Function to get entity specific data
    const getEntitySpecificData = () => {
        if (entityType === 'farmer') {
            const farmer = entity as Farmer;
            return {
                statLabel: 'YLD',
                statValue: `${farmer.baseYieldPerHour.toFixed(1)}`,
                progressPercentage: `${Math.min((farmer.baseYieldPerHour / 15) * 100, 100)}%`
            };
        } else {
            const hero = entity as Hero;
            return {
                statLabel: 'PWR',
                statValue: `${hero.power}`,
                progressPercentage: `${Math.min((hero.power / 2000) * 100, 100)}%`
            };
        }
    };

    const { statLabel, statValue, progressPercentage } = getEntitySpecificData();

    return (
        <div className="reveal-overlay">
            <div className={`entity-card-animation frame-${entity.rarity} ${animationState}`}>
                {/* Particle effects */}
                <div className="particles-container">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div
                            key={index}
                            className={`particle particle-${entity.rarity}`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${1 + Math.random() * 2}s`
                            }}
                        ></div>
                    ))}
                </div>

                {/* Dynamic background scene based on rarity */}
                <div className={`card-scene scene-${entity.rarity}`}></div>

                {/* Rarity badge */}
                <div className={`rarity-badge rarity-${entity.rarity}`}>
                    {entity.rarity.toUpperCase()}
                </div>

                {/* Entity image */}
                <div className="character-container">
                    {entity.imageSrc ? (
                        <img src={entity.imageSrc} alt={entity.name} className="character-image" />
                    ) : (
                        <div className="character-placeholder">
                            {entity.name.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Entity details */}
                <div className="card-details">
                    <div className="card-name">{entity.name}</div>

                    <div className={`entity-indicator-bar ${entity.rarity}`}>
                        <div
                            className={`indicator-fill-${entity.rarity}`}
                            style={{ width: progressPercentage }}
                        ></div>
                    </div>

                    <div className="card-stats">
                        <div>{statLabel}: {statValue}</div>
                        <div>{entity.rarity.toUpperCase()}</div>
                    </div>
                </div>

                {/* Glint effect */}
                <div className="card-glint"></div>
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

export default PackOpeningAnimation;

// Helper function to determine color based on rarity
export const getRarityColor = (rarity: string): string => {
    switch(rarity) {
        case 'common': return '#14F195'; // Green
        case 'rare': return '#00C2FF';   // Blue
        case 'epic': return '#9945FF';   // Purple
        case 'legendary': return '#FFB800'; // Orange/Gold
        default: return '#14F195';
    }
};