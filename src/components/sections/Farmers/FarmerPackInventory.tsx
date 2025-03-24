import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import EntityPack from '../../common/EntityPack';
import { FARMER_PACKS, Farmer } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';
import PackOpeningAnimation from '../../common/PackOpeningAnimation';
import '../../../styles/entityPack.css';
import '../../../styles/packAnimations.css';

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

    // Map pack type based on ID
    const getPackType = (id: string): 'basic' | 'premium' | 'legendary' => {
        if (id.includes('basic')) return 'basic';
        if (id.includes('premium')) return 'premium';
        return 'legendary';
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

            <div className="packs-container">
                {Object.entries(groupedPacks).map(([groupId, group]) => {
                    const packInfo = FARMER_PACKS.find(p => p.id === group.packId);
                    if (!packInfo) return null;

                    return (
                        <EntityPack
                            key={groupId}
                            id={group.packId}
                            name={packInfo.name}
                            description={packInfo.description}
                            cost={packInfo.cost}
                            packType={getPackType(group.packId)}
                            entityType="farmer"
                            rarityChances={packInfo.rarityChances}
                            owned={true}
                            count={group.count}
                            onOpen={() => handleOpenPack(group.packs[0].id)}
                            disabled={isLoading}
                        />
                    );
                })}
            </div>

            {/* Pack opening animation */}
            {showAnimation && animationFarmer && (
                <PackOpeningAnimation
                    entity={animationFarmer}
                    entityType="farmer"
                    onClose={closeAnimation}
                />
            )}

            {isLoading && !showAnimation && <div className="loading-overlay">Processing...</div>}
        </section>
    );
};

export default FarmerPackInventory;