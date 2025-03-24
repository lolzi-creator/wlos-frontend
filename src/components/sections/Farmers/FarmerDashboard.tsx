// src/components/sections/Farmers/FarmerDashboard.tsx
import React, { useState, useEffect } from 'react';
import SectionTitle from '../../common/SectionTitle';
import EnhancedEntityCard from '../../common/EntityCard';
import Popup from '../../common/Popup';
import { FARMERS } from '../../../types/FarmerTypes';
import { useFarmer } from '../../../context/FarmerContext';
import '../../../styles/entityCard.css';
import '../../../styles/farmerDashboard.css';

const FarmerDashboard: React.FC = () => {
    const { ownedFarmers, pendingRewards, totalYieldPerHour, harvestRewards, levelUpFarmer, isLoading, error } = useFarmer();
    const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);

    // State for popups
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState<'success' | 'error' | 'info'>('info');
    const [popupMessage, setPopupMessage] = useState('');

    const handleHarvest = async () => {
        if (pendingRewards <= 0) {
            // Show error popup
            setPopupType('error');
            setPopupMessage('No rewards to harvest! Wait for your farmers to generate resources.');
            setShowPopup(true);
            return;
        }

        const success = await harvestRewards();
        if (success) {
            // Show success popup
            setPopupType('success');
            setPopupMessage(`Successfully harvested ${pendingRewards.toFixed(2)} WLOS!`);
            setShowPopup(true);
        } else {
            // Show error popup
            setPopupType('error');
            setPopupMessage(`Failed to harvest rewards: ${error || 'Unknown error'}`);
            setShowPopup(true);
        }
    };

    const handleSelect = (id: string) => {
        setSelectedFarmer(selectedFarmer === id ? null : id);
    };

    const handleLevelUp = async (id: string) => {
        // Find the farmer that will be leveled up
        const farmer = ownedFarmers.find(f => f.id === id);
        if (!farmer) return;

        // Store the current level and yield before level up
        const previousLevel = farmer.level;
        const previousYield = farmer.effectiveYield ||
            (farmer.baseYieldPerHour * (1 + (farmer.level * 0.1)));

        // Get the farmer name for the message
        const farmerInfo = FARMERS.find(f => f.id === farmer.farmerId);
        const farmerName = farmerInfo ? farmerInfo.name : 'Farmer';

        // Try to level up the farmer
        const success = await levelUpFarmer(id);

        if (success) {
            // Since the farmer list will be refreshed, we can assume the level was increased by 1
            const newLevel = previousLevel + 1;

            // Estimate the new yield (10% increase per level)
            const estimatedNewYield = previousYield * (1 + 0.1);

            // Show success popup with level up details
            setPopupType('success');
            setPopupMessage(
                `Level up successful! Your ${farmerName} is now level ${newLevel}. ` +
                `Yield increased from ${formatNumber(previousYield)} to approximately ${formatNumber(estimatedNewYield)} WLOS/hour!`
            );
            setShowPopup(true);
        }
        // Error handling is already done in the useEffect that watches the error state
    };

    // Format large numbers
    const formatNumber = (num: number): string => {
        return num.toFixed(2);
    };

    // Show popup for backend errors
    useEffect(() => {
        if (error) {
            setPopupType('error');
            setPopupMessage(error);
            setShowPopup(true);
        }
    }, [error]);

    return (
        <section className="farmer-dashboard-section">
            <SectionTitle title="YOUR FARMERS" />

            <div className="dashboard-overview">
                {/* Rewards Panel - Left Side */}
                <div className="rewards-panel">
                    <div className="rewards-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#14F195" strokeWidth="2"/>
                            <path d="M12 15V23M12 23L7 18M12 23L17 18" stroke="#14F195" strokeWidth="2"/>
                        </svg>
                    </div>

                    <div className="rewards-content">
                        <div className="rewards-title">Pending Rewards</div>
                        <div className="rewards-amount">{formatNumber(pendingRewards)} WLOS</div>

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
                </div>

                {/* Stats Panel - Right Side */}
                <div className="stats-container">
                    {/* Farmers Owned Box */}
                    <div className="stats-box">
                        <div className="stats-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 22V12H15V22" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="stats-content">
                            <div className="stats-label">Farmers Owned</div>
                            <div className="stats-value">{ownedFarmers.length}</div>
                        </div>
                    </div>

                    {/* Total Yield/Hour Box */}
                    <div className="stats-box">
                        <div className="stats-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L19 9H15V18C15 18.5304 14.7893 19.0391 14.4142 19.4142C14.0391 19.7893 13.5304 20 13 20H11C10.4696 20 9.96086 19.7893 9.58579 19.4142C9.21071 19.0391 9 18.5304 9 18V9H5L12 2Z" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="stats-content">
                            <div className="stats-label">Total Yield/Hour</div>
                            <div className="stats-value yield-value">
                                {formatNumber(totalYieldPerHour)} WLOS
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {ownedFarmers.length > 0 ? (
                <div className="entity-grid">
                    {ownedFarmers.map(ownedFarmer => {
                        const farmerInfo = FARMERS.find(f => f.id === ownedFarmer.farmerId);
                        if (!farmerInfo) return null;

                        // Get the effective yield from the farmer data
                        // First try to use effectiveYield if it's in the farmer data
                        // Fallback to calculating it based on level and baseYieldPerHour
                        const currentYield = ownedFarmer.effectiveYield ||
                            (farmerInfo.baseYieldPerHour * (1 + (ownedFarmer.level * 0.1)));

                        return (
                            <EnhancedEntityCard
                                key={ownedFarmer.id}
                                entity={{
                                    ...farmerInfo,
                                    // Override image if it exists in the backend data
                                    imageSrc: ownedFarmer.imageSrc || farmerInfo.imageSrc
                                }}
                                owned={true}
                                level={ownedFarmer.level}
                                showYield={true}
                                selected={selectedFarmer === ownedFarmer.id}
                                statusLabel="YIELD"
                                statusValue={`${formatNumber(currentYield)} / hour`}
                                primaryAction={{
                                    text: "LEVEL UP",
                                    onClick: (e) => {
                                        e.stopPropagation();
                                        handleLevelUp(ownedFarmer.id);
                                    },
                                    disabled: isLoading || ownedFarmer.level >= 5 // Max level is 5
                                }}
                                onSelect={() => handleSelect(ownedFarmer.id)}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="no-farmers-message">
                    <p>You don't own any farmers yet. Visit the pack store to get some!</p>
                </div>
            )}

            {/* Popup for messages */}
            {showPopup && (
                <Popup
                    type={popupType}
                    message={popupMessage}
                    onClose={() => setShowPopup(false)}
                />
            )}

            {isLoading && <div className="loading-overlay">Processing...</div>}
        </section>
    );
};

export default FarmerDashboard;