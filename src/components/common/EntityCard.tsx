// src/components/common/EnhancedEntityCard.tsx
import React from 'react';
import { getRarityColor } from './PackOpeningAnimation';
import { Rarity } from '../../types/ItemTypes';
import '../../styles/entityCard.css';

// Define a generic entity interface that all entities will extend
export interface BaseEntity {
    id: string;
    name: string;
    rarity: Rarity;
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

export interface EntityWithAbilities {
    abilities?: Array<{
        name: string;
        type: string;
        cooldown: string;
        description: string;
    }>;
}

export interface EnhancedEntityCardProps {
    entity: BaseEntity & Partial<EntityWithStats & EntityWithPower & EntityWithYield & EntityWithPrice & EntityWithAbilities>;
    owned?: boolean;
    level?: number;
    selected?: boolean;
    equipment?: string[];
    showYield?: boolean;
    showPower?: boolean;
    showStats?: boolean;
    statusLabel?: string;
    statusValue?: string | number;
    equipped?: boolean;
    forSale?: boolean;
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

const EnhancedEntityCard: React.FC<EnhancedEntityCardProps> = ({
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
                                                                   equipped = false,
                                                                   forSale = false,
                                                                   primaryAction,
                                                                   secondaryAction,
                                                                   infoMessage,
                                                                   onSelect
                                                               }) => {
    const rarityColor = getRarityColor(entity.rarity);

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
            className="card-container"
            onClick={onSelect}
            style={{ cursor: onSelect ? 'pointer' : 'default' }}
        >
            <div className={`card-inner ${selected ? 'selected' : ''}`}>
                {/* FRONT SIDE OF CARD */}
                <div
                    className="card-front"
                    style={{
                        boxShadow: selected ? `0 0 20px ${rarityColor}80, 0 0 40px ${rarityColor}40` : '0 8px 16px rgba(0,0,0,0.3)',
                        border: `2px solid ${rarityColor}`
                    }}
                >
                    {/* Top banner with rarity and type */}
                    <div
                        className="card-header"
                        style={{
                            background: `linear-gradient(90deg, ${rarityColor}99 0%, ${rarityColor}22 100%)`
                        }}
                    >
                        <div
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                letterSpacing: '1px',
                                color: '#fff',
                                textShadow: '0 0 5px rgba(0,0,0,0.5)',
                            }}
                        >
                            {entity.rarity}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {entity.type && (
                                <div
                                    style={{
                                        textTransform: 'uppercase',
                                        fontWeight: 'bold',
                                        fontSize: '12px',
                                        letterSpacing: '1px',
                                        color: '#fff',
                                        textShadow: '0 0 5px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    {entity.type}
                                </div>
                            )}
                            {owned && (
                                <div
                                    style={{
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
                                    }}
                                >
                                    {level}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status badges */}
                    {equipped && (
                        <div className="status-badge equipped">
                            Equipped
                        </div>
                    )}
                    {forSale && (
                        <div className="status-badge for-sale" style={{ top: equipped ? '60px' : '30px' }}>
                            For Sale
                        </div>
                    )}

                    {/* Entity image container */}
                    <div className="entity-image-container">
                        <div
                            className="hexagon-frame"
                            style={{ background: `linear-gradient(135deg, ${rarityColor}10 0%, ${rarityColor}30 100%)` }}
                        ></div>
                        <div
                            className="hexagon-border"
                            style={{ border: `1px solid ${rarityColor}40` }}
                        ></div>
                        <div className="entity-image">
                            {entity.imageSrc ? (
                                <img
                                    src={entity.imageSrc}
                                    alt={entity.name}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.innerHTML = `
                                            <div class="entity-placeholder ${entity.rarity}" style="color: ${rarityColor}">
                                                ${entity.name.charAt(0)}
                                            </div>
                                        `;
                                    }}
                                />
                            ) : (
                                <div
                                    className={`entity-placeholder ${entity.rarity}`}
                                    style={{ color: rarityColor }}
                                >
                                    {entity.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Entity name */}
                    <div
                        className="entity-name-container"
                        style={{
                            border: `1px solid ${rarityColor}70`,
                            boxShadow: `0 0 10px ${rarityColor}40`
                        }}
                    >
                        <h3
                            className="entity-name"
                            style={{ textShadow: `0 0 5px ${rarityColor}90` }}
                        >
                            {entity.name}
                        </h3>
                    </div>

                    {/* Content section */}
                    <div
                        className="entity-content"
                        style={{ border: `1px solid ${rarityColor}50` }}
                    >
                        {/* Progress bars for yield or power */}
                        {showYield && 'baseYieldPerHour' in entity && (
                            <div className="progress-bar-container">
                                <div className="progress-bar-header">
                                    <span>YIELD</span>
                                    <span>{calculateYield().toFixed(1)}</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div
                                        className="progress-bar-fill"
                                        style={{
                                            width: `${yieldPercentage}%`,
                                            background: `linear-gradient(90deg, ${rarityColor}60 0%, ${rarityColor} 100%)`
                                        }}
                                    >
                                        <div
                                            className="progress-pulse"
                                            style={{
                                                background: `linear-gradient(90deg, transparent 0%, ${rarityColor} 50%, transparent 100%)`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showPower && 'power' in entity && (
                            <div className="progress-bar-container">
                                <div className="progress-bar-header">
                                    <span>POWER</span>
                                    <span>{Math.round(calculatePower())}</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div
                                        className="progress-bar-fill"
                                        style={{
                                            width: `${powerPercentage}%`,
                                            background: rarityColor
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Description removed from front as requested */}

                        {/* Status and price display */}
                        <div className="status-section">
                            <div className="status-column">
                                {/* Left empty for spacing */}
                            </div>
                            <div className="status-column">
                                {statusLabel && (
                                    <>
                                        <div style={{
                                            fontSize: '10px',
                                            color: '#8B8DA0',
                                            marginBottom: '2px',
                                        }}>{statusLabel}</div>
                                        <div
                                            className="status-value"
                                            style={{ color: owned ? '#14F195' : '#ffffff' }}
                                        >
                                            {statusValue}
                                        </div>
                                    </>
                                )}
                                {!statusLabel && !owned && ('price' in entity || 'cost' in entity) && (
                                    <>
                                        <div style={{
                                            fontSize: '10px',
                                            color: '#8B8DA0',
                                            marginBottom: '2px',
                                        }}>PRICE</div>
                                        <div
                                            className="status-value"
                                            style={{ color: '#ffffff' }}
                                        >
                                            {(entity.price || entity.cost)} WLOS
                                        </div>
                                    </>
                                )}
                                {!statusLabel && owned && (
                                    <>
                                        <div style={{
                                            fontSize: '10px',
                                            color: '#8B8DA0',
                                            marginBottom: '2px',
                                        }}>STATUS</div>
                                        <div
                                            className="status-value"
                                            style={{ color: '#14F195' }}
                                        >
                                            OWNED
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Hint to flip */}
                        <div style={{
                            textAlign: 'center',
                            color: rarityColor,
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            marginTop: '10px',
                            padding: '5px',
                            border: `1px dashed ${rarityColor}40`,
                            borderRadius: '4px',
                            animation: 'pulse 1.5s infinite ease-in-out'
                        }}>
                            HOVER TO SEE DETAILS
                        </div>

                        {/* Action buttons */}
                        <div className="action-buttons">
                            {infoMessage && !primaryAction && !secondaryAction && (
                                <div className="info-message">
                                    {infoMessage}
                                </div>
                            )}

                            {primaryAction && (
                                <button
                                    className={`entity-button primary-button ${primaryAction.disabled ? 'disabled' : ''}`}
                                    onClick={(e) => handleActionClick(e, primaryAction.onClick)}
                                    disabled={primaryAction.disabled}
                                >
                                    {primaryAction.text}
                                </button>
                            )}

                            {secondaryAction && (
                                <button
                                    className={`entity-button secondary-button ${secondaryAction.disabled ? 'disabled' : ''}`}
                                    onClick={(e) => handleActionClick(e, secondaryAction.onClick)}
                                    disabled={secondaryAction.disabled}
                                    style={{
                                        borderColor: rarityColor,
                                        color: secondaryAction.disabled ? '#888888' : rarityColor
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
                            <div
                                className="corner-accent top-right"
                                style={{ borderColor: rarityColor }}
                            ></div>
                            <div
                                className="corner-accent bottom-left"
                                style={{ borderColor: rarityColor }}
                            ></div>
                        </>
                    )}
                </div>

                {/* BACK SIDE OF CARD */}
                <div
                    className="card-back"
                    style={{
                        boxShadow: selected ? `0 0 20px ${rarityColor}80, 0 0 40px ${rarityColor}40` : '0 8px 16px rgba(0,0,0,0.3)',
                        border: `2px solid ${rarityColor}`
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 15px 0',
                            padding: '5px 0',
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: rarityColor,
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            borderBottom: `1px solid ${rarityColor}50`,
                            paddingBottom: '10px'
                        }}
                    >
                        {entity.name}
                    </h3>

                    <div className="detailed-info">
                        {/* Full description */}
                        <div className="info-section">
                            <div
                                className="info-title"
                                style={{ color: rarityColor }}
                            >
                                Description
                            </div>
                            <div className="info-description">
                                {entity.description}
                            </div>
                        </div>

                        {/* Detailed stats */}
                        {showStats && 'stats' in entity && entity.stats && (
                            <div className="detailed-stats">
                                <div
                                    className="detailed-stats-title"
                                    style={{ color: rarityColor }}
                                >
                                    Stats
                                </div>

                                {Object.entries(entity.stats).map(([statName, value]) => (
                                    <div className="stat-bar" key={statName}>
                                        <div className="stat-bar-label">
                                            <span>{statName.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            <span>{value}</span>
                                        </div>
                                        <div className="stat-bar-bg">
                                            <div
                                                className="stat-bar-fill"
                                                style={{
                                                    width: typeof value === 'number' ?
                                                        `${Math.min(Math.abs(parseInt(value.toString()) / 100 * 100), 100)}%` : '0%',
                                                    backgroundColor: typeof value === 'number' && value > 0 ? '#14F195' :
                                                        typeof value === 'number' && value < 0 ? '#FF4D4D' : rarityColor
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Abilities section for heroes */}
                        {'abilities' in entity && entity.abilities && entity.abilities.length > 0 && (
                            <div className="info-section">
                                <div
                                    className="info-title"
                                    style={{ color: rarityColor }}
                                >
                                    Abilities
                                </div>
                                {entity.abilities.map((ability, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            marginBottom: '2px',
                                            color: rarityColor
                                        }}>
                                            <span>{ability.name}</span>
                                            <span>{ability.type} • {ability.cooldown}</span>
                                        </div>
                                        <div style={{
                                            fontSize: '11px',
                                            color: '#8B8DA0',
                                            marginBottom: '5px',
                                            lineHeight: '1.3'
                                        }}>
                                            {ability.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Equipment display */}
                        {equipment.length > 0 && (
                            <div
                                className="equipment-section"
                                style={{ background: `${rarityColor}20` }}
                            >
                                <div
                                    className="equipment-title"
                                    style={{ color: rarityColor }}
                                >
                                    EQUIPPED ITEMS
                                </div>
                                {equipment.map((item, index) => (
                                    <div key={index} className="equipment-item">
                                        • {item}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Level and yield/power information for owned entities */}
                        {owned && (
                            <div className="info-section">
                                <div
                                    className="info-title"
                                    style={{ color: rarityColor }}
                                >
                                    Details
                                </div>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '10px',
                                    fontSize: '12px',
                                    marginBottom: '10px'
                                }}>
                                    <div>
                                        <div style={{ color: '#8B8DA0', marginBottom: '2px' }}>Level</div>
                                        <div style={{ color: '#fff', fontWeight: 'bold' }}>{level}</div>
                                    </div>
                                    {showYield && 'baseYieldPerHour' in entity && (
                                        <div>
                                            <div style={{ color: '#8B8DA0', marginBottom: '2px' }}>Yield / Hour</div>
                                            <div style={{ color: '#14F195', fontWeight: 'bold' }}>
                                                {calculateYield().toFixed(1)} WLOS
                                            </div>
                                        </div>
                                    )}
                                    {showPower && 'power' in entity && (
                                        <div>
                                            <div style={{ color: '#8B8DA0', marginBottom: '2px' }}>Power</div>
                                            <div style={{ color: '#fff', fontWeight: 'bold' }}>
                                                {Math.round(calculatePower())}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action buttons (same as front) */}
                    <div className="action-buttons">
                        {infoMessage && !primaryAction && !secondaryAction && (
                            <div className="info-message">
                                {infoMessage}
                            </div>
                        )}

                        {primaryAction && (
                            <button
                                className={`entity-button primary-button ${primaryAction.disabled ? 'disabled' : ''}`}
                                onClick={(e) => handleActionClick(e, primaryAction.onClick)}
                                disabled={primaryAction.disabled}
                            >
                                {primaryAction.text}
                            </button>
                        )}

                        {secondaryAction && (
                            <button
                                className={`entity-button secondary-button ${secondaryAction.disabled ? 'disabled' : ''}`}
                                onClick={(e) => handleActionClick(e, secondaryAction.onClick)}
                                disabled={secondaryAction.disabled}
                                style={{
                                    borderColor: rarityColor,
                                    color: secondaryAction.disabled ? '#888888' : rarityColor
                                }}
                            >
                                {secondaryAction.text}
                            </button>
                        )}
                    </div>

                    {/* Corner accents for selected state */}
                    {selected && (
                        <>
                            <div
                                className="corner-accent top-right"
                                style={{ borderColor: rarityColor }}
                            ></div>
                            <div
                                className="corner-accent bottom-left"
                                style={{ borderColor: rarityColor }}
                            ></div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnhancedEntityCard;