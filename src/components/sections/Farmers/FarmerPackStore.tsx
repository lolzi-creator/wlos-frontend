import React from 'react';
import SectionTitle from '../../common/SectionTitle';
import EntityPack from '../../common/EntityPack';
import { FARMER_PACKS } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';
import '../../../styles/entityPack.css';

const FarmerPackStore: React.FC = () => {
    const { buyPack, isLoading, error } = useFarmer();

    const handleBuyPack = async (packId: string) => {
        const success = await buyPack(packId);
        if (success) {
            alert('Pack purchased successfully! Check your inventory to open it.');
        }
    };

    // Map pack type based on ID
    const getPackType = (id: string): 'basic' | 'premium' | 'legendary' => {
        if (id.includes('basic')) return 'basic';
        if (id.includes('premium')) return 'premium';
        return 'legendary';
    };

    return (
        <section className="farmer-packs-section">
            <SectionTitle title="FARMER PACKS" />

            {error && <div className="error-message">{error}</div>}

            <div className="packs-container">
                {FARMER_PACKS.map(pack => (
                    <EntityPack
                        key={pack.id}
                        id={pack.id}
                        name={pack.name}
                        description={pack.description}
                        cost={pack.cost}
                        packType={getPackType(pack.id)}
                        entityType="farmer"
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

export default FarmerPackStore;