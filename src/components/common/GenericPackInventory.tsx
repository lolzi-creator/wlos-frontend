import React, { useState, useMemo, useCallback } from 'react';
import SectionTitle from '../common/SectionTitle';
import EntityPack from '../common/EntityPack';
import Popup from '../common/Popup';
import { Farmer, FARMER_PACKS } from '../../types/FarmerTypes';
import { Hero, HERO_PACKS } from '../../types/HeroTypes';
import { useFarmer } from '../../context/FarmerContext';
import { useHero } from '../../context/HeroContext';
import PackOpeningAnimation from '../common/PackOpeningAnimation';
import '../../styles/entityPack.css';
import '../../styles/packAnimations.css';

interface GenericPackInventoryProps {
    entityType: 'farmer' | 'hero';
    title: string;
}

const GenericPackInventory: React.FC<GenericPackInventoryProps> = ({ entityType, title }) => {
    // Get the appropriate context based on entity type
    const farmerContext = useFarmer();
    const heroContext = useHero();

    // Use context based on entity type
    const contextData = useMemo(() => {
        return entityType === 'farmer'
            ? {
                ownedPacks: farmerContext.ownedPacks,
                isLoading: farmerContext.isLoading,
                error: farmerContext.error,
                openPack: farmerContext.openPack,
                packCatalog: FARMER_PACKS
            }
            : {
                ownedPacks: heroContext.ownedPacks,
                isLoading: heroContext.isLoading,
                error: heroContext.error,
                openPack: heroContext.openPack,
                packCatalog: HERO_PACKS
            };
    }, [
        entityType,
        farmerContext.ownedPacks, farmerContext.isLoading, farmerContext.error,
        heroContext.ownedPacks, heroContext.isLoading, heroContext.error
    ]);

    // State for popups
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState<'success' | 'error' | 'info'>('info');
    const [popupMessage, setPopupMessage] = useState('');

    // Set up state for animations
    const [animationEntity, setAnimationEntity] = useState<Farmer | Hero | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    // Group packs by packId to combine duplicates - memoized for performance
    const groupedPacks = useMemo(() => {
        return contextData.ownedPacks.reduce((acc, pack) => {
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
        }, {} as Record<string, { packId: string; count: number; packs: typeof contextData.ownedPacks }>);
    }, [contextData.ownedPacks]);

    // This is the critical function we're optimizing
    const handleOpenPack = useCallback(async (packId: string) => {
        try {
            console.log(`Opening ${entityType} pack with ID:`, packId);

            if (entityType === 'farmer') {
                const result = await farmerContext.openPack(packId);
                if (result.success && result.farmer) {
                    setAnimationEntity(result.farmer);
                    setShowAnimation(true);
                } else {
                    // Show error popup
                    setPopupType('error');
                    setPopupMessage(`Failed to open farmer pack: ${result.error || 'Unknown error'}`);
                    setShowPopup(true);
                }
            } else {
                const result = await heroContext.openPack(packId);
                if (result.success && result.hero) {
                    setAnimationEntity(result.hero);
                    setShowAnimation(true);
                } else {
                    // Show error popup
                    setPopupType('error');
                    setPopupMessage(`Failed to open hero pack: ${result.error || 'Unknown error'}`);
                    setShowPopup(true);
                }
            }
        } catch (err) {
            console.error(`Error opening ${entityType} pack:`, err);
            // Show error popup
            setPopupType('error');
            setPopupMessage(`Error opening pack: ${err}`);
            setShowPopup(true);
        }
    }, [entityType, farmerContext, heroContext]);

    const closeAnimation = useCallback(() => {
        setShowAnimation(false);
        setAnimationEntity(null);

        // Show success popup after animation closes
        if (animationEntity) {
            setPopupType('success');
            setPopupMessage(`Successfully obtained a ${animationEntity.rarity} ${animationEntity.name}!`);
            setShowPopup(true);
        }
    }, [animationEntity]);

    // Map pack type based on ID - moved to a pure function
    const getPackType = (id: string): 'basic' | 'premium' | 'legendary' => {
        if (id.includes('basic')) return 'basic';
        if (id.includes('premium')) return 'premium';
        return 'legendary';
    };

    // Show empty state if no packs
    if (contextData.ownedPacks.length === 0 && !showAnimation) {
        return (
            <section className={`${entityType}-packs-inventory`}>
                <SectionTitle title={title} />
                <div className="no-packs-message">
                    <p>You don't have any {entityType} packs yet. Visit the store to buy some!</p>
                </div>
            </section>
        );
    }

    return (
        <section className={`${entityType}-packs-inventory`}>
            <SectionTitle title={title} />

            {contextData.error && <div className="error-message">{contextData.error}</div>}

            <div className="packs-container">
                {Object.entries(groupedPacks).map(([groupId, group]) => {
                    const packInfo = contextData.packCatalog.find(p => p.id === group.packId);
                    if (!packInfo) return null;

                    return (
                        <EntityPack
                            key={groupId}
                            id={group.packId}
                            name={packInfo.name}
                            description={packInfo.description}
                            cost={packInfo.cost}
                            packType={getPackType(group.packId)}
                            entityType={entityType}
                            rarityChances={packInfo.rarityChances}
                            owned={true}
                            count={group.count}
                            // THIS IS THE KEY FIX - Use the actual individual pack ID, not the pack template ID
                            onOpen={() => handleOpenPack(group.packs[0].id)}
                            disabled={contextData.isLoading}
                        />
                    );
                })}
            </div>

            {/* Pack opening animation */}
            {showAnimation && animationEntity && (
                <PackOpeningAnimation
                    entity={animationEntity}
                    entityType={entityType}
                    onClose={closeAnimation}
                />
            )}

            {/* Popup for messages */}
            {showPopup && (
                <Popup
                    type={popupType}
                    message={popupMessage}
                    onClose={() => setShowPopup(false)}
                />
            )}

            {contextData.isLoading && !showAnimation && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Processing...</p>
                </div>
            )}
        </section>
    );
};

// Use memo to prevent unnecessary re-renders
export default React.memo(GenericPackInventory);