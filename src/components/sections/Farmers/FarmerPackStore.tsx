import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import { FARMER_PACKS } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';
import '../../../styles/farmerPacks.css';

const FarmerPackStore: React.FC = () => {
    const { buyPack, isLoading, error } = useFarmer();
    const [hoveredPack, setHoveredPack] = useState<string | null>(null);

    const handleBuyPack = async (packId: string) => {
        const success = await buyPack(packId);
        if (success) {
            alert('Pack purchased successfully! Check your inventory to open it.');
        }
    };

    return (
        <section className="farmer-packs-section">
            <SectionTitle title="FARMER PACKS" />

            {error && <div className="error-message">{error}</div>}

            <div className="fixed-packs-container">
                {FARMER_PACKS.map(pack => {
                    // Determine color based on pack type
                    const packColors = {
                        'basic-pack': {
                            primary: '#14F195', // Green
                            background: 'rgba(20, 241, 149, 0.05)',
                            border: 'rgba(20, 241, 149, 0.3)'
                        },
                        'premium-pack': {
                            primary: '#00C2FF', // Cyan
                            background: 'rgba(0, 194, 255, 0.05)',
                            border: 'rgba(0, 194, 255, 0.3)'
                        },
                        'legendary-pack': {
                            primary: '#9945FF', // Purple
                            background: 'rgba(153, 69, 255, 0.05)',
                            border: 'rgba(153, 69, 255, 0.3)'
                        }
                    };

                    const colors = packColors[pack.id as keyof typeof packColors];
                    const isHovered = hoveredPack === pack.id;

                    return (
                        <div
                            key={pack.id}
                            className="fixed-pack-card"
                            onMouseEnter={() => setHoveredPack(pack.id)}
                            onMouseLeave={() => setHoveredPack(null)}
                            style={{
                                backgroundColor: colors.background,
                                borderColor: colors.border
                            }}
                        >
                            <div className="pack-header">
                                <h3 className="pack-title" style={{ color: colors.primary }}>
                                    {pack.name}
                                </h3>
                            </div>

                            <div className="pack-description">
                                {pack.description}
                            </div>

                            {isHovered ? (
                                <div className="drop-rates-container">
                                    <div className="drop-rates-header" style={{ color: colors.primary }}>
                                        DROP RATES
                                    </div>
                                    <div className="drop-rate">
                                        <span className="rate-type" style={{ color: '#14F195' }}>Common:</span>
                                        <span className="rate-value">{Math.round(pack.rarityChances.common * 100)}%</span>
                                    </div>
                                    <div className="drop-rate">
                                        <span className="rate-type" style={{ color: '#00C2FF' }}>Rare:</span>
                                        <span className="rate-value">{Math.round(pack.rarityChances.rare * 100)}%</span>
                                    </div>
                                    <div className="drop-rate">
                                        <span className="rate-type" style={{ color: '#9945FF' }}>Epic:</span>
                                        <span className="rate-value">{Math.round(pack.rarityChances.epic * 100)}%</span>
                                    </div>
                                    <div className="drop-rate">
                                        <span className="rate-type" style={{ color: '#FFB800' }}>Legendary:</span>
                                        <span className="rate-value">{Math.round(pack.rarityChances.legendary * 100)}%</span>
                                    </div>
                                </div>
                            ) : null}

                            <div className="pack-footer">
                                <div className="pack-price">
                                    <span>Price:</span>
                                    <span className="price-value" style={{ color: colors.primary }}>
                                        {pack.cost} WLOS
                                    </span>
                                </div>

                                <button
                                    className="buy-pack-button"
                                    style={{ color: colors.primary, borderColor: colors.primary }}
                                    onClick={() => handleBuyPack(pack.id)}
                                    disabled={isLoading}
                                >
                                    BUY PACK
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FarmerPackStore;