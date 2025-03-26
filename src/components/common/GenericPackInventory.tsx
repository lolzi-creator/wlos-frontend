import React, { useState, useMemo, useCallback } from 'react';
import SectionTitle from '../common/SectionTitle';
import EntityPack from '../common/EntityPack';
import Popup from '../common/Popup';
import { Farmer } from '../../types/FarmerTypes';
import { Hero } from '../../types/HeroTypes';
import PackOpeningAnimation from '../common/PackOpeningAnimation';
import '../../styles/entityPack.css';
import '../../styles/packAnimations.css';

interface GenericPackInventoryProps {
    entityType: 'farmer' | 'hero';
    title: string;
    ownedPacks: Array<{
        id: string;
        packId: string;
    }>;
    packs: Array<{
        id: string;
        name: string;
        description: string;
        cost: number;
        rarityChances: {
            common: number;
            rare: number;
            epic: number;
            legendary: number;
        };
    }>;
    openPack: (packId: string) => Promise<{ success: boolean; farmer?: any; hero?: any; error?: string }>;
    isLoading: boolean;
    error: string | null;
}

const GenericPackInventory: React.FC<GenericPackInventoryProps> = ({
    entityType,
    title,
    ownedPacks,
    packs: packCatalog,
    openPack,
    isLoading,
    error
}) => {
    // Remove the context usage since we're getting props
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState<'success' | 'error' | 'info'>('info');
    const [popupMessage, setPopupMessage] = useState('');

    // Set up state for animations
    const [animationEntity, setAnimationEntity] = useState<Farmer | Hero | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    // Group packs by packId to combine duplicates - memoized for performance
    const groupedPacks = useMemo(() => {
        return ownedPacks.reduce((acc, pack) => {
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
    }, [ownedPacks]);

    // This is the critical function we're optimizing
    const handleOpenPack = useCallback(async (packId: string) => {
        try {
            console.log(`Opening ${entityType} pack with ID:`, packId);

            const result = await openPack(packId);
            if (result.success && result.farmer) {
                setAnimationEntity(result.farmer);
                setShowAnimation(true);
            } else {
                // Show error popup
                setPopupType('error');
                setPopupMessage(`Failed to open ${entityType} pack: ${result.error || 'Unknown error'}`);
                setShowPopup(true);
            }
        } catch (err) {
            console.error(`Error opening ${entityType} pack:`, err);
            // Show error popup
            setPopupType('error');
            setPopupMessage(`Error opening pack: ${err}`);
            setShowPopup(true);
        }
    }, [entityType, openPack]);

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
    if (ownedPacks.length === 0 && !showAnimation) {
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

            {error && <div className="error-message">{error}</div>}

            <div className="packs-container">
                {Object.entries(groupedPacks).map(([groupId, group]) => {
                    const packInfo = packCatalog.find(p => p.id === group.packId);
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
                            disabled={isLoading}
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

            {isLoading && !showAnimation && (
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