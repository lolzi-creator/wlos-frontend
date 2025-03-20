// src/components/sections/Farmers/FarmerDashboard.tsx
import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import FarmerCard from './FarmerCard';
import Button from '../../common/Button';
import { FARMERS } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';

const FarmerDashboard: React.FC = () => {
    const { ownedFarmers, pendingRewards, harvestRewards, levelUpFarmer, isLoading, error } = useFarmer();
    const [selectedFarmer] = useState<string | null>(null);

    const handleHarvest = async () => {
        if (pendingRewards <= 0) {
            alert('No rewards to harvest!');
            return;
        }

        const success = await harvestRewards();
        if (success) {
            alert(`Successfully harvested ${pendingRewards.toFixed(2)} WLOS!`);
        }
    };

    const handleLevelUp = async (ownedFarmerId: string) => {
        const success = await levelUpFarmer(ownedFarmerId);
        if (success) {
            alert('Farmer upgraded successfully!');
        }
    };

    return (
        <section className="farmer-dashboard-section">
            <SectionTitle title="YOUR FARMERS" />

            <div className="dashboard-overview">
                <div className="rewards-panel">
                    <h3 className="rewards-title">Pending Rewards</h3>
                    <div className="rewards-amount">{pendingRewards.toFixed(2)} WLOS</div>
                    <Button
                        text="HARVEST ALL"
                        color="green"
                        onClick={handleHarvest}
                        fullWidth={true}
                        disabled={pendingRewards <= 0 || isLoading}
                    />
                </div>

                <div className="stats-panel">
                    <div className="stat-item">
                        <div className="stat-label">Farmers Owned</div>
                        <div className="stat-value">{ownedFarmers.length}</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-label">Total Yield/Hour</div>
                        <div className="stat-value">
                            {ownedFarmers.reduce((total, farmer) => {
                                const farmerInfo = FARMERS.find(f => f.id === farmer.farmerId);
                                if (!farmerInfo) return total;
                                return total + (farmerInfo.baseYieldPerHour * (1 + (farmer.level * 0.1)));
                            }, 0).toFixed(2)} WLOS
                        </div>
                    </div>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {ownedFarmers.length > 0 ? (
                <div className="farmers-grid">
                    {ownedFarmers.map(ownedFarmer => {
                        const farmerInfo = FARMERS.find(f => f.id === ownedFarmer.farmerId);
                        if (!farmerInfo) return null;

                        return (
                            <FarmerCard
                                key={ownedFarmer.id}
                                farmer={farmerInfo}
                                owned={true}
                                level={ownedFarmer.level}
                                selected={selectedFarmer === ownedFarmer.id}
                                onLevelUp={() => handleLevelUp(ownedFarmer.id)}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="no-farmers-message">
                    <p>You don't own any farmers yet. Visit the marketplace to buy some!</p>
                </div>
            )}

            {isLoading && <div className="loading-overlay">Processing...</div>}
        </section>
    );
};

export default FarmerDashboard;