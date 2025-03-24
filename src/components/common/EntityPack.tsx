import React, { useState } from 'react';
import '../../styles/entityPack.css';

interface PackRarityChances {
    common: number;
    rare: number;
    epic: number;
    legendary: number;
}

export interface EntityPackProps {
    id: string;
    name: string;
    description: string;
    cost: number;
    packType: 'basic' | 'premium' | 'legendary';
    entityType: 'hero' | 'farmer';
    rarityChances: PackRarityChances;
    onBuy?: () => void;
    disabled?: boolean;
    owned?: boolean;
    count?: number;
    onOpen?: () => void;
}

const EntityPack: React.FC<EntityPackProps> = ({
                                                   id,
                                                   name,
                                                   description,
                                                   cost,
                                                   packType,
                                                   entityType,
                                                   rarityChances,
                                                   onBuy,
                                                   disabled = false,
                                                   owned = false,
                                                   count = 1,
                                                   onOpen
                                               }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Determine colors based on pack type and entity type
    const getColors = () => {
        // Default colors for each pack type
        const packColors = {
            'basic': {
                farmer: '#14F195', // Green for farmers
                hero: '#00C2FF'    // Cyan for heroes
            },
            'premium': {
                farmer: '#00C2FF', // Cyan for farmers premium
                hero: '#9945FF'    // Purple for heroes premium
            },
            'legendary': {
                farmer: '#9945FF',  // Purple for farmers legendary
                hero: '#FFB800'     // Yellow for heroes legendary
            }
        };

        return {
            primary: packColors[packType][entityType],
            background: `rgba(${packType === 'basic' ?
                (entityType === 'farmer' ? '20, 241, 149' : '0, 194, 255') :
                packType === 'premium' ?
                    (entityType === 'farmer' ? '0, 194, 255' : '153, 69, 255') :
                    (entityType === 'farmer' ? '153, 69, 255' : '255, 184, 0')}, 0.05)`,
            border: `rgba(${packType === 'basic' ?
                (entityType === 'farmer' ? '20, 241, 149' : '0, 194, 255') :
                packType === 'premium' ?
                    (entityType === 'farmer' ? '0, 194, 255' : '153, 69, 255') :
                    (entityType === 'farmer' ? '153, 69, 255' : '255, 184, 0')}, 0.3)`
        };
    };

    const colors = getColors();

    // Function to calculate the total chances of getting each rarity tier
    const calculateLegendaryChance = () => Math.round(rarityChances.legendary * 100);
    const calculateEpicChance = () => Math.round(rarityChances.epic * 100);
    const calculateRareChance = () => Math.round(rarityChances.rare * 100);
    const calculateCommonChance = () => Math.round(rarityChances.common * 100);

    return (
        <div
            className={`entity-pack ${owned ? 'owned' : ''} ${packType}`}
            style={{
                backgroundColor: colors.background,
                borderColor: colors.primary,
                boxShadow: isHovered ? `0 0 15px ${colors.primary}40` : 'none',
                display: 'flex',
                flexDirection: 'column'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Pack Top Section with Type Badge */}
            <div className="pack-header" style={{
                borderBottom: `1px solid ${colors.primary}`,
                background: `linear-gradient(to bottom, rgba(8,8,30,0.2) 0%, rgba(8,8,30,0) 100%)`,
                position: 'relative'
            }}>
                <div
                    className="pack-type-badge"
                    style={{
                        backgroundColor: colors.primary,
                        color: '#000'
                    }}
                >
                    {packType.toUpperCase()}
                </div>
                <h3
                    className="pack-name"
                    style={{ color: colors.primary }}
                >
                    {name}
                </h3>
            </div>

            {/* Pack Content - Shows either description or rarity chances */}
            <div className="pack-content">
                {isHovered ? (
                    <div className="pack-rarity-chances">
                        <div className="chance-title" style={{ color: colors.primary }}>DROP RATES</div>
                        <div className="chance-grid">
                            <div className="chance-item">
                                <div className="chance-label" style={{ color: '#14F195' }}>COMMON</div>
                                <div className="chance-bar">
                                    <div
                                        className="chance-fill"
                                        style={{ width: `${calculateCommonChance()}%`, backgroundColor: '#14F195' }}
                                    ></div>
                                </div>
                                <div className="chance-value">{calculateCommonChance()}%</div>
                            </div>

                            <div className="chance-item">
                                <div className="chance-label" style={{ color: '#00C2FF' }}>RARE</div>
                                <div className="chance-bar">
                                    <div
                                        className="chance-fill"
                                        style={{ width: `${calculateRareChance()}%`, backgroundColor: '#00C2FF' }}
                                    ></div>
                                </div>
                                <div className="chance-value">{calculateRareChance()}%</div>
                            </div>

                            <div className="chance-item">
                                <div className="chance-label" style={{ color: '#9945FF' }}>EPIC</div>
                                <div className="chance-bar">
                                    <div
                                        className="chance-fill"
                                        style={{ width: `${calculateEpicChance()}%`, backgroundColor: '#9945FF' }}
                                    ></div>
                                </div>
                                <div className="chance-value">{calculateEpicChance()}%</div>
                            </div>

                            <div className="chance-item">
                                <div className="chance-label" style={{ color: '#FFB800' }}>LEGENDARY</div>
                                <div className="chance-bar">
                                    <div
                                        className="chance-fill"
                                        style={{ width: `${calculateLegendaryChance()}%`, backgroundColor: '#FFB800' }}
                                    ></div>
                                </div>
                                <div className="chance-value">{calculateLegendaryChance()}%</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="pack-description">
                        <p>{description}</p>

                        {/* Show holographic effect in non-hovered state */}
                        <div
                            className="pack-holographic-icon"
                            style={{ borderColor: colors.primary }}
                        >
                            <div className="pack-icon">
                                <span style={{ color: colors.primary }}>{packType.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="holographic-effect" style={{ background: `linear-gradient(45deg, transparent, ${colors.primary}30, transparent)` }}></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Pack Footer */}
            <div className="pack-footer">
                {owned ? (
                    /* Owned Pack Display */
                    <>
                        {count > 1 && (
                            <div className="pack-count" style={{ color: colors.primary }}>
                                x{count}
                            </div>
                        )}
                        <button
                            className="pack-action-button"
                            style={{
                                backgroundColor: 'transparent',
                                color: colors.primary,
                                borderColor: colors.primary,
                                minWidth: '160px',
                                boxShadow: `0 0 10px ${colors.primary}40`
                            }}
                            onClick={onOpen}
                            disabled={disabled}
                        >
                            {disabled ? "OPENING..." : "OPEN PACK"}
                        </button>
                    </>
                ) : (
                    /* Store Pack Display */
                    <>
                        <button
                            className="pack-action-button"
                            style={{
                                backgroundColor: 'transparent',
                                color: colors.primary,
                                borderColor: colors.primary,
                                minWidth: '160px',
                                boxShadow: `0 0 10px ${colors.primary}40`
                            }}
                            onClick={onBuy}
                            disabled={disabled}
                        >
                            {disabled ? "PROCESSING..." : "BUY PACK"}
                        </button>
                    </>
                )}
            </div>

            {/* Decorative corner accents */}
            <div className="pack-corner top-left" style={{ borderColor: colors.primary }}></div>
            <div className="pack-corner top-right" style={{ borderColor: colors.primary }}></div>
            <div className="pack-corner bottom-left" style={{ borderColor: colors.primary }}></div>
            <div className="pack-corner bottom-right" style={{ borderColor: colors.primary }}></div>
        </div>
    );
};

export default EntityPack;