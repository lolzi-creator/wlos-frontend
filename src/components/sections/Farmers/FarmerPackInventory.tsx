import React, { useState } from 'react';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import { FARMER_PACKS, Farmer } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';

const FarmerPackInventory: React.FC = () => {
    const { ownedPacks, openPack, isLoading, error } = useFarmer();
    const [animationFarmer, setAnimationFarmer] = useState<Farmer | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    const handleOpenPack = async (packId: string) => {
        try {
            // Process the actual pack opening
            const result = await openPack(packId);

            if (result.success && result.farmer) {
                // Store the farmer for display
                setAnimationFarmer(result.farmer);
                setShowAnimation(true);
            } else {
                // Handle error
                alert('Failed to open pack');
            }
        } catch (err) {
            console.error('Error opening pack:', err);
            alert('Error opening pack');
        }
    };

    const closeAnimation = () => {
        setShowAnimation(false);
        setAnimationFarmer(null);
    };

    // Only show the "no packs" message if we don't have packs AND we're not showing a result
    if (ownedPacks.length === 0 && !showAnimation) {
        return (
            <section className="farmer-packs-inventory">
                <SectionTitle title="YOUR PACKS" />
                <div className="no-packs-message">
                    <p>You don't have any packs yet. Visit the store to buy some!</p>
                </div>
            </section>
        );
    }

    return (
        <section className="farmer-packs-inventory">
            <SectionTitle title="YOUR PACKS" />

            {error && <div className="error-message">{error}</div>}

            <div className="owned-packs-grid">
                {ownedPacks.map(ownedPack => {
                    const packInfo = FARMER_PACKS.find(p => p.id === ownedPack.packId);
                    if (!packInfo) return null;

                    return (
                        <div key={ownedPack.id} className="owned-pack-card">
                            <div className="pack-image-container">
                                <div className="pack-image"></div>
                            </div>

                            <div className="pack-info">
                                <h3 className="pack-name">{packInfo.name}</h3>
                                <Button
                                    text={isLoading ? "PROCESSING..." : "OPEN PACK"}
                                    color="green"
                                    onClick={() => handleOpenPack(ownedPack.id)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Simple reveal screen with no animations */}
            {showAnimation && animationFarmer && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <div className={`farmer-card frame-${animationFarmer.rarity}`} style={{
                        width: '280px',
                        height: '420px',
                        marginBottom: '20px'
                    }}>
                        <div className={`card-scene scene-${animationFarmer.rarity}`}></div>

                        <div className={`rarity-badge rarity-${animationFarmer.rarity}`}>
                            {animationFarmer.rarity}
                        </div>

                        <div className="character-container">
                            <img src={animationFarmer.imageSrc} alt={animationFarmer.name} className="character-image" />
                        </div>

                        <div className="card-details">
                            <div className="card-name">{animationFarmer.name}</div>

                            <div className="yield-indicator">
                                <div
                                    className={`yield-bar-${animationFarmer.rarity}`}
                                    style={{ width: `${Math.min((animationFarmer.baseYieldPerHour / 15) * 100, 100)}%` }}
                                ></div>
                            </div>

                            <div className="card-stats">
                                <div>YLD: {animationFarmer.baseYieldPerHour.toFixed(1)}</div>
                                <div>{animationFarmer.rarity.toUpperCase()}</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={closeAnimation}
                        style={{
                            padding: '12px 30px',
                            backgroundColor: '#14F195',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        AWESOME!
                    </button>
                </div>
            )}
        </section>
    );
};

export default FarmerPackInventory;