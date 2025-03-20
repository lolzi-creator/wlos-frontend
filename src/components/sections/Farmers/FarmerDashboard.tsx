import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import FarmerCard from './FarmerCard';
import Button from '../../common/Button';
import { FARMERS } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';

const FarmerDashboard: React.FC = () => {
    const { ownedFarmers, pendingRewards, harvestRewards, levelUpFarmer, isLoading, error } = useFarmer();
    const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);

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

    const handleSelect = (id: string) => {
        setSelectedFarmer(selectedFarmer === id ? null : id);
    };

    const handleLevelUp = (id: string) => {
        levelUpFarmer(id);
    };

    // Calculate total hourly yield
    const totalHourlyYield = ownedFarmers.reduce((total, farmer) => {
        const farmerInfo = FARMERS.find(f => f.id === farmer.farmerId);
        if (!farmerInfo) return total;
        return total + (farmerInfo.baseYieldPerHour * (1 + (farmer.level * 0.1)));
    }, 0);

    return (
        <section className="farmer-dashboard-section">
            <SectionTitle title="YOUR FARMERS" />

            <div className="dashboard-overview" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <div className="rewards-panel" style={{
                    padding: '20px',
                    backgroundColor: 'rgba(10, 10, 37, 0.5)',
                    border: '1px solid rgba(20, 241, 149, 0.3)',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 className="rewards-title" style={{
                        fontSize: '18px',
                        marginBottom: '10px',
                        color: '#14F195'
                    }}>Pending Rewards</h3>
                    <div className="rewards-amount" style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        marginBottom: '15px'
                    }}>{pendingRewards.toFixed(2)} WLOS</div>
                    <Button
                        text="HARVEST ALL"
                        color="green"
                        onClick={handleHarvest}
                        fullWidth={true}
                        disabled={pendingRewards <= 0 || isLoading}
                    />
                </div>

                <div className="stats-panel" style={{
                    padding: '20px',
                    backgroundColor: 'rgba(10, 10, 37, 0.5)',
                    border: '1px solid rgba(20, 241, 149, 0.3)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>
                    <div className="stat-item" style={{ textAlign: 'center', marginBottom: '15px' }}>
                        <div className="stat-label" style={{
                            fontSize: '14px',
                            color: 'rgba(255, 255, 255, 0.6)',
                            marginBottom: '5px'
                        }}>Farmers Owned</div>
                        <div className="stat-value" style={{ fontSize: '24px', fontWeight: '600' }}>
                            {ownedFarmers.length}
                        </div>
                    </div>
                    <div className="stat-item" style={{ textAlign: 'center' }}>
                        <div className="stat-label" style={{
                            fontSize: '14px',
                            color: 'rgba(255, 255, 255, 0.6)',
                            marginBottom: '5px'
                        }}>Total Yield/Hour</div>
                        <div className="stat-value" style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            color: '#14F195'
                        }}>
                            {totalHourlyYield.toFixed(2)} WLOS
                        </div>
                    </div>
                </div>
            </div>

            {error && <div className="error-message" style={{
                backgroundColor: 'rgba(255, 77, 77, 0.1)',
                border: '1px solid rgba(255, 77, 77, 0.3)',
                color: '#FF4D4D',
                padding: '15px',
                marginBottom: '20px',
                borderRadius: '4px'
            }}>{error}</div>}

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
                                onSelect={() => handleSelect(ownedFarmer.id)}
                                onLevelUp={() => handleLevelUp(ownedFarmer.id)}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="no-farmers-message" style={{
                    padding: '40px',
                    textAlign: 'center',
                    backgroundColor: 'rgba(10, 10, 37, 0.5)',
                    border: '1px solid rgba(20, 241, 149, 0.3)',
                    borderRadius: '8px'
                }}>
                    <p>You don't own any farmers yet. Visit the marketplace to buy some!</p>
                </div>
            )}

            {isLoading && <div className="loading-overlay" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(8, 8, 30, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                fontSize: '20px',
                color: '#14F195'
            }}>Processing...</div>}
        </section>
    );
};

export default FarmerDashboard;