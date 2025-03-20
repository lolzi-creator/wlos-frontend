import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import { FARMER_PACKS, Farmer } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';

const FarmerPackInventory: React.FC = () => {
    const { ownedPacks, openPack, isLoading, error } = useFarmer();
    const [showAnimation, setShowAnimation] = useState(false);
    const [animationFarmer, setAnimationFarmer] = useState<Farmer | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // This will store the pack ID to open after animation
    const [pendingPackId, setPendingPackId] = useState<string | null>(null);

    // Animation stages
    const [animationStage, setAnimationStage] = useState<'initial' | 'spinning' | 'colorFlash' | 'reveal'>('initial');

    // Use effect to control animation flow with specific timing
    useEffect(() => {
        // Only run if we have a pending pack to open
        if (pendingPackId) {
            // Start animation
            setShowAnimation(true);
            setAnimationStage('initial');

            // Transition to spinning stage after 1 second
            const spinTimeout = setTimeout(() => {
                setAnimationStage('spinning');

                // Process pack opening during spinning animation
                const processTimeout = setTimeout(async () => {
                    try {
                        // Now process the actual pack opening
                        const result = await openPack(pendingPackId);

                        if (result.success && result.farmer) {
                            // Store the farmer for animation
                            setAnimationFarmer(result.farmer);

                            // Show color flash
                            setAnimationStage('colorFlash');

                            // Delay the reveal for animation effect
                            setTimeout(() => {
                                setAnimationStage('reveal');
                            }, 1500); // Color flash lasts 1.5 seconds
                        } else {
                            // Handle error
                            closeAnimation();
                            alert('Failed to open pack');
                        }
                    } catch (err) {
                        console.error('Error opening pack:', err);
                        closeAnimation();
                        alert('Error opening pack');
                    }
                }, 3000); // Process the pack after 3 seconds of spinning

                return () => clearTimeout(processTimeout);
            }, 1000);

            return () => clearTimeout(spinTimeout);
        }
    }, [pendingPackId, openPack]);

    const handleOpenPack = (packId: string) => {
        setIsProcessing(true);
        setPendingPackId(packId);
    };

    const closeAnimation = () => {
        setShowAnimation(false);
        setAnimationFarmer(null);
        setAnimationStage('initial');
        setPendingPackId(null);
        setIsProcessing(false);
    };

    // Generate confetti pieces
    const renderConfetti = () => {
        const confetti = [];
        const colors = ['#14F195', '#9945FF', '#00C2FF', '#FFB800', '#FF4D4D', '#FFFFFF'];

        for (let i = 0; i < 100; i++) {
            const style = {
                left: `${Math.random() * 100}%`,
                top: `-5%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                opacity: Math.random(),
                transform: `rotate(${Math.random() * 360}deg)`
            };

            confetti.push(
                <div
                    key={i}
                    className="confetti"
                    style={style}
                />
            );
        }

        return confetti;
    };

    if (ownedPacks.length === 0) {
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
                                    text={isProcessing ? "PROCESSING..." : "OPEN PACK"}
                                    color="green"
                                    onClick={() => handleOpenPack(ownedPack.id)}
                                    disabled={isLoading || isProcessing}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Animation overlay */}
            {showAnimation && (
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
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    {/* Initial pack */}
                    {animationStage === 'initial' && (
                        <div className="unopened-pack" style={{
                            width: '240px',
                            height: '340px',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '24px',
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                            OPENING PACK
                        </div>
                    )}

                    {/* Spinning animation */}
                    {animationStage === 'spinning' && (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            perspective: '1200px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {/* Carousel of cards */}
                            <div style={{
                                width: '240px',
                                height: '340px',
                                position: 'relative',
                                transformStyle: 'preserve-3d',
                                animation: 'spin-3d 5s infinite linear',
                                transformOrigin: 'center center'
                            }}>
                                {/* Cards positioned around a circle */}
                                {[...Array(10)].map((_, i) => {
                                    const angle = (i / 10) * Math.PI * 2;
                                    const x = Math.sin(angle) * 300;
                                    const z = Math.cos(angle) * 300;
                                    const colors = ['#14F195', '#00C2FF', '#9945FF', '#FFB800'];

                                    return (
                                        <div key={i} style={{
                                            position: 'absolute',
                                            width: '240px',
                                            height: '340px',
                                            borderRadius: '10px',
                                            backgroundColor: colors[i % colors.length],
                                            border: '3px solid white',
                                            transform: `translate3d(${x}px, 0, ${z}px) rotateY(${angle * (180/Math.PI)}deg)`,
                                            backfaceVisibility: 'hidden',
                                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%) rotateY(180deg)',
                                                color: 'white',
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>
                                                ?
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Color flash based on rarity */}
                    {animationStage === 'colorFlash' && animationFarmer && (
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden'
                        }}>
                            {/* Confetti effect */}
                            {animationFarmer.rarity === 'legendary' || animationFarmer.rarity === 'epic' ? renderConfetti() : null}

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '300px',
                                height: '400px',
                                borderRadius: '15px',
                                backgroundColor:
                                    animationFarmer.rarity === 'legendary' ? '#FFB800' :
                                        animationFarmer.rarity === 'epic' ? '#9945FF' :
                                            animationFarmer.rarity === 'rare' ? '#00C2FF' : '#14F195',
                                animation: 'pulse-glow 1.5s infinite',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '36px',
                                fontWeight: 'bold',
                                color: 'white',
                                textTransform: 'uppercase',
                                boxShadow: '0 0 50px rgba(255, 255, 255, 0.8)'
                            }}>
                                {animationFarmer.rarity}!
                            </div>
                        </div>
                    )}

                    {/* Reveal card */}
                    {animationStage === 'reveal' && animationFarmer && (
                        <>
                            {/* Keep confetti for legendary/epic cards */}
                            {(animationFarmer.rarity === 'legendary' || animationFarmer.rarity === 'epic') &&
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
                                    {renderConfetti()}
                                </div>
                            }

                            <div className={`farmer-card frame-${animationFarmer.rarity}`} style={{
                                width: '280px',
                                height: '420px',
                                marginBottom: '20px',
                                animation: 'appear 0.5s forwards',
                                position: 'relative'
                            }}>
                                {/* Firework effect for legendary cards */}
                                {animationFarmer.rarity === 'legendary' && (
                                    <>
                                        <div className="firework" style={{ animationDelay: '0s' }}></div>
                                        <div className="firework" style={{ animationDelay: '0.5s' }}></div>
                                    </>
                                )}

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
                                    cursor: 'pointer',
                                    zIndex: 10000
                                }}
                            >
                                AWESOME!
                            </button>
                        </>
                    )}
                </div>
            )}
        </section>
    );
};

export default FarmerPackInventory;