import React, { useState, useEffect, useMemo } from 'react';
import SectionTitle from '../common/SectionTitle';
import EntityPack from '../common/EntityPack';
import Popup from '../common/Popup';
import { FARMER_PACKS } from '../../types/FarmerTypes';
import { HERO_PACKS } from '../../types/HeroTypes';
import { useFarmer } from '../../context/FarmerContext';
import { useHero } from '../../context/HeroContext';
import { useWalletConnection } from '../../context/WalletConnectionProvider';
import { packService } from '../../services/api';
import '../../styles/entityPack.css';

interface GenericPackStoreProps {
    entityType: 'farmer' | 'hero';
    title: string;
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
    buyPack: (packId: string) => Promise<boolean>;
    isLoading: boolean;
    error: string | null;
}

const GenericPackStore: React.FC<GenericPackStoreProps> = ({ entityType, title}) => {
    // Get the appropriate context based on entity type
    const farmerContext = useFarmer();
    const heroContext = useHero();
    const { walletBalance } = useWalletConnection();

    // State for backend packs
    const [backendPacks, setBackendPacks] = useState<any[]>([]);
    const [loadingPacks, setLoadingPacks] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    // State for popups
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState<'success' | 'error' | 'info'>('info');
    const [popupMessage, setPopupMessage] = useState('');

    // Use context based on entity type
    const contextData = useMemo(() => {
        return entityType === 'farmer'
            ? {
                buyPack: farmerContext.buyPack,
                isLoading: farmerContext.isLoading,
                error: farmerContext.error || loadError,
                packCatalog: FARMER_PACKS
            }
            : {
                buyPack: heroContext.buyPack,
                isLoading: heroContext.isLoading,
                error: heroContext.error || loadError,
                packCatalog: HERO_PACKS
            };
    }, [
        entityType,
        farmerContext.isLoading, farmerContext.error,
        heroContext.isLoading, heroContext.error,
        loadError
    ]);

    // Fetch packs from backend on component mount
    useEffect(() => {
        const fetchPacks = async () => {
            try {
                setLoadingPacks(true);
                setLoadError(null);
                const response = await packService.getPackTypes(entityType);

                if (response.data && response.data.packTypes) {
                    setBackendPacks(response.data.packTypes);
                } else {
                    // Fallback to local data if response doesn't have expected structure
                    setBackendPacks([]);
                }
            } catch (err) {
                console.error(`Error fetching ${entityType} packs:`, err);
                setLoadError(`Failed to load packs. Using local data instead.`);
                // Just leave backend packs empty, we'll fallback to local data
                setBackendPacks([]);
            } finally {
                setLoadingPacks(false);
            }
        };

        fetchPacks();
    }, [entityType]);

    // Determine which packs to display - first try backend, then fallback to local
    const packsToDisplay = useMemo(() => {
        return backendPacks.length > 0 ? backendPacks : contextData.packCatalog;
    }, [backendPacks, contextData.packCatalog]);

    const handleBuyPack = async (packId: string, packCost: number) => {
        console.log(`Buying ${entityType} pack with ID:`, packId);

        // Check if user has enough balance
        if ((walletBalance?.wlos || 0) < packCost) {
            // Show not enough WLOS popup
            setPopupType('error');
            setPopupMessage(`Not enough WLOS to buy this pack. You need ${packCost} WLOS but only have ${walletBalance?.wlos || 0} WLOS.`);
            setShowPopup(true);
            return;
        }

        const success = await contextData.buyPack(packId);
        if (success) {
            // Show success popup
            setPopupType('success');
            setPopupMessage(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} pack purchased successfully! Check your inventory to open it.`);
            setShowPopup(true);
        } else {
            // Show error popup
            setPopupType('error');
            setPopupMessage(`Failed to buy pack: ${contextData.error || 'Unknown error'}`);
            setShowPopup(true);
        }
    };

    // Map pack type based on ID
    const getPackType = (id: string): 'basic' | 'premium' | 'legendary' => {
        if (id.includes('basic')) return 'basic';
        if (id.includes('premium')) return 'premium';
        return 'legendary';
    };

    return (
        <section className={`${entityType}-packs-section`}>
            <SectionTitle title={title} />

            {contextData.error && <div className="error-message">{contextData.error}</div>}

            <div className="packs-container">
                {packsToDisplay.map(pack => (
                    <EntityPack
                        key={pack.id}
                        id={pack.id}
                        name={pack.name || `${getPackType(pack.id).toUpperCase()} ${entityType.toUpperCase()} PACK`}
                        description={pack.description}
                        cost={pack.price}
                        packType={getPackType(pack.id)}
                        entityType={entityType}
                        rarityChances={pack.rarityChances}
                        onBuy={() => handleBuyPack(pack.id, pack.cost)}
                        disabled={contextData.isLoading || loadingPacks}
                    />
                ))}
            </div>

            {(contextData.isLoading || loadingPacks) && <div className="loading-overlay">
                <div className="loading-spinner"></div>
                <p>Processing...</p>
            </div>}

            {/* Popup for messages */}
            {showPopup && (
                <Popup
                    type={popupType}
                    message={popupMessage}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </section>
    );
};

export default GenericPackStore;