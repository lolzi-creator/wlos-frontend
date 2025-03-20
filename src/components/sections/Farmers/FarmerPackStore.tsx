import React from 'react';
import { FARMER_PACKS } from '../../../types/FarmerTypes';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import { useFarmer } from '../../../context/FarmerContext';
import '../../../styles/farmerPacks.css';

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
                        <div className="pack-image-wrapper">
                            <div className="pack-image-container">
                                <img
                                    src={pack.imageSrc}
                                    alt={pack.name}
                                    className="pack-image"
                                />
                                <div className="pack-label">
                                    {pack.id === 'basic-pack' && 'BASIC PACK'}
                                    {pack.id === 'premium-pack' && 'PREMIUM PACK'}
                                    {pack.id === 'legendary-pack' && 'LEGENDARY PACK'}
                                </div>
                            </div>
                        </div>

                        <div className="pack-details">
                            <h3 className="pack-name"
                                style={{
                                    color: pack.id === 'basic-pack' ? '#14F195' :
                                        pack.id === 'premium-pack' ? '#00C2FF' :
                                            '#9945FF'
                                }}
                            >
                                {pack.name}
                            </h3>

                            <p className="pack-description">{pack.description}</p>

                            <div className="pack-chances-container">
                                <div className="chances-header">Drop Chances:</div>
                                <div className="chance-row">
                                    <span className="chance-label common">Common:</span>
                                    <span className="chance-value">{Math.round(pack.rarityChances.common * 100)}%</span>
                                </div>
                                <div className="chance-row">
                                    <span className="chance-label rare">Rare:</span>
                                    <span className="chance-value">{Math.round(pack.rarityChances.rare * 100)}%</span>
                                </div>
                                <div className="chance-row">
                                    <span className="chance-label epic">Epic:</span>
                                    <span className="chance-value">{Math.round(pack.rarityChances.epic * 100)}%</span>
                                </div>
                                <div className="chance-row">
                                    <span className="chance-label legendary">Legendary:</span>
                                    <span className="chance-value">{Math.round(pack.rarityChances.legendary * 100)}%</span>
                                </div>
                            </div>

                            <div className="pack-price-container">
                                <div className="price-label">Price:</div>
                                <div className="price-value">{pack.cost} WLOS</div>
                            </div>

                            <button
                                className="buy-pack-button"
                                onClick={() => handleBuyPack(pack.id)}
                                disabled={isLoading}
                            >
                                BUY PACK
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FarmerPackStore;