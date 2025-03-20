import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import FarmerCard from './FarmerCard';
import { FARMERS } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';
import '../../../styles/farmerDashboard.css';

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

            <div className="dashboard-overview">
                {/* Rewards Panel - Left Side */}
                <div className="rewards-panel">
                    <div className="rewards-content">
                        <div className="rewards-header">
                            <div className="icon-circle">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#14F195" strokeWidth="2"/>
                                    <path d="M12 15V23M12 23L7 18M12 23L17 18" stroke="#14F195" strokeWidth="2"/>
                                </svg>
                            </div>

                            <div>
                                <h3 className="rewards-title">Pending Rewards</h3>
                                <div className="rewards-amount">{pendingRewards.toFixed(2)} WLOS</div>
                            </div>
                        </div>
                    </div>

                    <button
                        className="harvest-button"
                        onClick={handleHarvest}
                        disabled={pendingRewards <= 0 || isLoading}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 22V12H15V22" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        HARVEST ALL
                    </button>
                </div>

                {/* Stats Panel - Right Side with two separate boxes */}
                <div className="stats-container">
                    {/* Top box - Farmers Owned */}
                    <div className="stats-box">
                        <div className="stats-content">
                            <div className="stats-text">
                                <div className="stats-label">Farmers<br/>Owned</div>
                                <div className="stats-value">{ownedFarmers.length}</div>
                            </div>

                            <div className="icon-circle">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 22V12H15V22" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Bottom box - Total Yield/Hour */}
                    <div className="stats-box">
                        <div className="stats-content">
                            <div className="stats-text">
                                <div className="stats-label">Total<br/>Yield/Hour</div>
                                <div className="stats-value yield-value">
                                    {totalHourlyYield.toFixed(2)}<br/>WLOS
                                </div>
                            </div>

                            <div className="icon-circle">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L19 9H15V18C15 18.5304 14.7893 19.0391 14.4142 19.4142C14.0391 19.7893 13.5304 20 13 20H11C10.4696 20 9.96086 19.7893 9.58579 19.4142C9.21071 19.0391 9 18.5304 9 18V9H5L12 2Z" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
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
                                onSelect={() => handleSelect(ownedFarmer.id)}
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