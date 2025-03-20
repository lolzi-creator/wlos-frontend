// src/components/sections/Farmers/FarmerPackInventory.tsx
import React from 'react';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import { FARMER_PACKS } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';

const FarmerPackInventory: React.FC = () => {
    const { ownedPacks, openPack, isLoading, error } = useFarmer();

    const handleOpenPack = async (packId: string) => {
        const result = await openPack(packId);
        if (result) {
            // Show success message with the farmer that was received
            const farmer = result.farmer;
            alert(`Congratulations! You received a ${farmer.rarity.toUpperCase()} farmer: ${farmer.name}!`);
        }
    };

    if (ownedPacks.length === 0) {
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
                {ownedPacks.map(ownedPack => {
                    const packInfo = FARMER_PACKS.find(p => p.id === ownedPack.packId);
                    if (!packInfo) return null;

                    return (
                        <div key={ownedPack.id} className="owned-pack-card">
                            <div className="pack-image-container">
                                <div className="pack-image"></div>
                            </div>

                            <div className="pack-info">
                                <h3 className="pack-name">{packInfo.name}</h3>
                                <Button
                                    text="OPEN PACK"
                                    color="green"
                                    onClick={() => handleOpenPack(ownedPack.id)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FarmerPackInventory;