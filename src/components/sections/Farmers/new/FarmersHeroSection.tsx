import React, { useState, useEffect } from 'react';
import { useFarmer } from '../../../../context/FarmerContext';
import '../../../../styles/modules/farmers/new/FarmersHeroSection.css';

export const FarmersHeroSection: React.FC = () => {
    const { pendingRewards, totalYieldPerHour, harvestRewards, isLoading, error } = useFarmer();
    const [visible, setVisible] = useState(false);
    const [harvestSuccess, setHarvestSuccess] = useState<boolean | null>(null);
    const [harvestMessage, setHarvestMessage] = useState('');
    const [isClosing, setIsClosing] = useState(false);

    // Format numbers with commas
    const formatNumber = (num: number): string => {
        return num.toFixed(2);
    };

    useEffect(() => {
        // Animate in the section
        const timer = setTimeout(() => {
            setVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const handleHarvest = async () => {
        if (pendingRewards <= 0) {
            setHarvestSuccess(false);
            setHarvestMessage('No rewards to harvest! Wait for your farmers to generate resources.');
            return;
        }

        try {
            const success = await harvestRewards();
            if (success) {
                setHarvestSuccess(true);
                setHarvestMessage(`Successfully harvested ${formatNumber(pendingRewards)} WLOS!`);
            } else {
                setHarvestSuccess(false);
                setHarvestMessage(`Failed to harvest rewards: ${error || 'Unknown error'}`);
            }
        } catch (err) {
            setHarvestSuccess(false);
            setHarvestMessage('An error occurred during harvesting');
        }
    };

    const closeNotification = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setHarvestSuccess(null);
            setHarvestMessage('');
        }, 300); // Duration of close animation
    };

    // Auto-close after delay
    useEffect(() => {
        let timer: NodeJS.Timeout;
        
        if (harvestMessage) {
            timer = setTimeout(closeNotification, 5000);
        }
        
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [harvestMessage]);

    // Get appropriate icon for notifications
    const getNotificationIcon = () => {
        if (harvestSuccess) {
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="notification-icon">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#14F195" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        } else {
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="notification-icon">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ff4b4b" strokeWidth="2"/>
                    <path d="M12 16V12" stroke="#ff4b4b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="#ff4b4b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        }
    };

    // Close icon for notification
    const closeIcon = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="notification-close">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    return (
        <section className={`farmers-hero-section ${visible ? 'visible' : ''}`}>
            <div className="farmers-hero-bg">
                <div className="farmers-hero-glow"></div>
            </div>

            <div className="farmers-hero-content">
                <div className="farmers-hero-title-area">
                    <h1 className="farmers-hero-title">FARMERS</h1>
                    <p className="farmers-hero-subtitle">Generate passive WLOS income with your farming workforce</p>
                </div>

                <div className="farmers-stats-container">
                    {/* Pending Rewards Stat */}
                    <div className="stat-card stat-card-rewards" data-type="rewards">
                        <div className="stat-icon-wrapper">
                            <img src="/images/icons/harvest-icon.svg" alt="Harvest" className="stat-icon-img" 
                                 onError={(e) => (e.currentTarget.src = '/images/fallback-icon.svg')} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{formatNumber(pendingRewards)}</div>
                            <div className="stat-label">PENDING REWARDS</div>
                            <div className="stat-unit">WLOS</div>
                        </div>
                        <button
                            className="harvest-button"
                            onClick={handleHarvest}
                            disabled={pendingRewards <= 0 || isLoading}
                        >
                            HARVEST
                        </button>
                    </div>

                    {/* Total Yield/Hour Stat */}
                    <div className="stat-card stat-card-yield" data-type="yield">
                        <div className="stat-icon-wrapper">
                            <img src="/images/icons/yield-icon.svg" alt="Yield" className="stat-icon-img" 
                                 onError={(e) => (e.currentTarget.src = '/images/fallback-icon.svg')} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{formatNumber(totalYieldPerHour)}</div>
                            <div className="stat-label">YIELD PER HOUR</div>
                            <div className="stat-unit">WLOS / HR</div>
                        </div>
                    </div>
                </div>

                {/* Harvest notification popup */}
                {harvestMessage && (
                    <div className={`harvest-notification ${harvestSuccess ? 'success' : 'error'} ${isClosing ? 'closing' : ''}`}>
                        {getNotificationIcon()}
                        <div className="notification-content">
                            <h3 className="notification-title">
                                {harvestSuccess ? 'Harvest Successful' : 'Harvest Failed'}
                            </h3>
                            <p className="notification-message">{harvestMessage}</p>
                        </div>
                        <button className="notification-close-button" onClick={closeNotification} aria-label="Close">
                            {closeIcon}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FarmersHeroSection; 