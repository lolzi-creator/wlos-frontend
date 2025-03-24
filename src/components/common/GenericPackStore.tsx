import React from 'react';
import SectionTitle from '../common/SectionTitle';
import EntityPack from '../common/EntityPack';
import { FARMER_PACKS } from '../../types/FarmerTypes';
import { HERO_PACKS } from '../../types/HeroTypes';
import { useFarmer } from '../../context/FarmerContext';
import { useHero } from '../../context/HeroContext';
import '../../styles/entityPack.css';

interface GenericPackStoreProps {
    entityType: 'farmer' | 'hero';
    title: string;
}

const GenericPackStore: React.FC<GenericPackStoreProps> = ({ entityType, title }) => {
    // Get the appropriate context based on entity type
    const farmerContext = useFarmer();
    const heroContext = useHero();

    const buyPack = entityType === 'farmer' ? farmerContext.buyPack : heroContext.buyPack;
    const isLoading = entityType === 'farmer' ? farmerContext.isLoading : heroContext.isLoading;
    const error = entityType === 'farmer' ? farmerContext.error : heroContext.error;

    // Get the appropriate pack catalog
    const packCatalog = entityType === 'farmer' ? FARMER_PACKS : HERO_PACKS;

    const handleBuyPack = async (packId: string) => {
        console.log(`Buying ${entityType} pack with ID:`, packId);
        const success = await buyPack(packId);
        if (success) {
            alert('Pack purchased successfully! Check your inventory to open it.');
        } else {
            console.error(`Failed to buy ${entityType} pack`);
            alert(`Failed to buy pack: ${error || 'Unknown error'}`);
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

            {error && <div className="error-message">{error}</div>}

            <div className="packs-container">
                {packCatalog.map(pack => (
                    <EntityPack
                        key={pack.id}
                        id={pack.id}
                        name={pack.name}
                        description={pack.description}
                        cost={pack.cost}
                        packType={getPackType(pack.id)}
                        entityType={entityType}
                        rarityChances={pack.rarityChances}
                        onBuy={() => handleBuyPack(pack.id)}
                        disabled={isLoading}
                    />
                ))}
            </div>

            {isLoading && <div className="loading-overlay">Processing...</div>}
        </section>
    );
};

export default GenericPackStore;