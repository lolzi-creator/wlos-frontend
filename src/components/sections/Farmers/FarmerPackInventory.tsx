// src/components/sections/Farmers/FarmerPackInventory.tsx
import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import { FARMER_PACKS, Farmer } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';
import PackOpeningAnimation from '../../common/PackOpeningAnimation';
import '../../../styles/packAnimations.css';
import '../../../styles/farmerPacks.css';

const FarmerPackInventory: React.FC = () => {
    const { ownedPacks, openPack, isLoading, error } = useFarmer();
    const [animationFarmer, setAnimationFarmer] = useState<Farmer | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    // Group packs by packId to combine duplicates
    const groupedPacks = ownedPacks.reduce((acc, pack) => {
        if (!acc[pack.packId]) {
            acc[pack.packId] = {
                packId: pack.packId,
                count: 0,
                packs: []
            };
        }
        acc[pack.packId].count += 1;
        acc[pack.packId].packs.push(pack);
        return acc;
    }, {} as Record<string, { packId: string; count: number; packs: typeof ownedPacks }>);

    const handleOpenPack = async (packId: string) => {
        try {
            const result = await openPack(packId);
            if (result.success && result.farmer) {
                setAnimationFarmer(result.farmer);
                setShowAnimation(true);
            } else {
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
                {Object.values(groupedPacks).map(group => {
                    const packInfo = FARMER_PACKS.find(p => p.id === group.packId);
                    if (!packInfo) return null;

                    const packColors = {
                        'basic-pack': '#14F195', // Green
                        'premium-pack': '#00C2FF', // Cyan
                        'legendary-pack': '#9945FF' // Purple
                    };
                    const packColor = packColors[packInfo.id as keyof typeof packColors];

                    return (
                        <div key={group.packId} className="owned-pack-card">
                            <div className="pack-container">
                                <div className="pack-box" style={{ borderColor: packColor }}>
                                    <div className="pack-content">
                                        <div className="pack-name-vertical" style={{ color: packColor }}>
                                            {packInfo.id.split('-')[0].toUpperCase()} PACK
                                        </div>
                                    </div>
                                </div>
                                <div className="pack-info">
                                    <div className="pack-title" style={{ color: packColor }}>
                                        {packInfo.name.toUpperCase()}
                                        {group.count > 1 && <span className="pack-count">x{group.count}</span>}
                                    </div>
                                </div>
                            </div>

                            <button
                                className="open-pack-button"
                                style={{
                                    backgroundColor: `rgba(8, 8, 25, 0.8)`,
                                    borderColor: packColor,
                                    color: packColor
                                }}
                                onClick={() => handleOpenPack(group.packs[0].id)}
                                disabled={isLoading}
                            >
                                {isLoading ? "OPENING..." : "OPEN PACK"}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Use the unified animation component */}
            {showAnimation && animationFarmer && (
                <PackOpeningAnimation
                    entity={animationFarmer}
                    entityType="farmer"
                    onClose={closeAnimation}
                />
            )}
        </section>
    );
};

export default FarmerPackInventory;