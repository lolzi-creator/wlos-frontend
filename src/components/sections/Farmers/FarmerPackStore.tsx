// src/components/sections/Farmers/FarmerPackStore.tsx
import React from 'react';
import { FARMER_PACKS } from '../../../types/FarmerTypes';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import { useFarmer } from '../../../context/FarmerContext';

const FarmerPackStore: React.FC = () => {
    const { buyPack, isLoading, error } = useFarmer();

    const handleBuyPack = async (packId: string) => {
        const success = await buyPack(packId);
        if (success) {
            // Show success message
            alert('Pack purchased successfully! Check your inventory to open it.');
        }
    };

    return (
        <section className="farmer-packs-section">
            <SectionTitle title="FARMER PACKS" />

            {error && <div className="error-message">{error}</div>}

            <div className="packs-container">
                {FARMER_PACKS.map(pack => (
                    <div key={pack.id} className="pack-card">
                        <div className="pack-image-container">
                            <div className="pack-image"></div>
                        </div>

                        <div className="pack-info">
                            <h3 className="pack-name">{pack.name}</h3>
                            <p className="pack-description">{pack.description}</p>

                            <div className="pack-chances">
                                <p className="chances-title">Drop Chances:</p>
                                <div className="chance-row">
                                    <span className="rarity common">Common:</span>
                                    <span>{Math.round(pack.rarityChances.common * 100)}%</span>
                                </div>
                                <div className="chance-row">
                                    <span className="rarity rare">Rare:</span>
                                    <span>{Math.round(pack.rarityChances.rare * 100)}%</span>
                                </div>
                                <div className="chance-row">
                                    <span className="rarity epic">Epic:</span>
                                    <span>{Math.round(pack.rarityChances.epic * 100)}%</span>
                                </div>
                                <div className="chance-row">
                                    <span className="rarity legendary">Legendary:</span>
                                    <span>{Math.round(pack.rarityChances.legendary * 100)}%</span>
                                </div>
                            </div>

                            <div className="pack-price">
                                <span className="price-label">Price:</span>
                                <span className="price-value green-text">{pack.cost} WLOS</span>
                            </div>

                            <Button
                                text="BUY PACK"
                                color="green"
                                onClick={() => handleBuyPack(pack.id)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FarmerPackStore;