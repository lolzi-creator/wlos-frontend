import React from 'react';
import SectionTitle from '../../common/SectionTitle';
import EntityPack from '../../common/EntityPack';
import { HERO_PACKS } from '../../../types/HeroTypes';
import { useHero } from '../../../context/HeroContext';
import '../../../styles/entityPack.css';

const HeroPackStore: React.FC = () => {
    const { buyPack, isLoading, error } = useHero();

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
        <section className="hero-packs-section">
            <SectionTitle title="HERO PACKS" />

            {error && <div className="error-message">{error}</div>}

            <div className="packs-container">
                {HERO_PACKS.map(pack => (
                    <EntityPack
                        key={pack.id}
                        id={pack.id}
                        name={pack.name}
                        description={pack.description}
                        cost={pack.cost}
                        packType={getPackType(pack.id)}
                        entityType="hero"
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

export default HeroPackStore;