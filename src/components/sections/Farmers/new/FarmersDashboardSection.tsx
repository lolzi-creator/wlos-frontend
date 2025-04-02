import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useFarmer } from '../../../../context/FarmerContext';
import { FARMERS } from '../../../../types/FarmerTypes';
import EnhancedEntityCard from '../../../common/EntityCard';
import '../../../../styles/modules/farmers/new/FarmersDashboardSection.css';

// Notification Portal Component
const LevelUpNotification = ({
    isSuccess,
    message,
    isClosing,
    onClose,
    farmerImage,
    farmerRarity,
    getRarityColor
}: {
    isSuccess: boolean | null;
    message: string;
    isClosing: boolean;
    onClose: () => void;
    farmerImage: string | null;
    farmerRarity: string | null;
    getRarityColor: (rarity: string) => string;
}) => {
    // Get appropriate icon for notifications
    const getNotificationIcon = () => {
        if (isSuccess) {
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

    return ReactDOM.createPortal(
        <>
            <div className="notification-overlay"></div>
            <div className={`level-up-notification ${isSuccess ? 'success' : 'error'} ${isClosing ? 'closing' : ''}`}>
                {getNotificationIcon()}
                <div className="notification-content">
                    <h3 className="notification-title">
                        {isSuccess ? 'Level Up Successful' : 'Level Up Failed'}
                    </h3>
                    
                    {farmerImage && isSuccess && (
                        <div className="farmer-level-up-image-container">
                            <img src={farmerImage} alt="Farmer" className="farmer-level-up-image" />
                            <div className="level-up-glow" style={{ background: `radial-gradient(circle, ${getRarityColor(farmerRarity || 'common')}80 0%, transparent 70%)` }}></div>
                            <div className="level-up-stars">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`level-up-star ${i < 5 ? 'active' : ''}`}>
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFD700" strokeWidth="2" fill="#FFD700" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <p className="notification-message">{message}</p>
                    
                    {isSuccess && (
                        <div className="level-up-bonus">
                            <span>Yield Increased by 10%!</span>
                        </div>
                    )}
                </div>
                <button className="notification-close-button" onClick={onClose} aria-label="Close">
                    {closeIcon}
                </button>
            </div>
        </>,
        document.body
    );
};

export const FarmersDashboardSection: React.FC = () => {
    const { ownedFarmers, levelUpFarmer, isLoading, error } = useFarmer();
    const [visible, setVisible] = useState(false);
    const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);
    const [filterRarity, setFilterRarity] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'yield' | 'level' | 'name'>('yield');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const sectionRef = useRef<HTMLDivElement>(null);
    const [levelUpSuccess, setLevelUpSuccess] = useState<boolean | null>(null);
    const [levelUpMessage, setLevelUpMessage] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [farmerImage, setFarmerImage] = useState<string | null>(null);
    const [farmerRarity, setFarmerRarity] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 600);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (error) {
            setLevelUpSuccess(false);
            setLevelUpMessage(error);
        }
    }, [error]);

    const handleSelectFarmer = (id: string) => {
        setSelectedFarmer(selectedFarmer === id ? null : id);
    };

    const closeNotification = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setLevelUpSuccess(null);
            setLevelUpMessage('');
            setFarmerImage(null);
            setFarmerRarity(null);
        }, 300); // Duration of close animation
    };

    // Auto-close after delay
    useEffect(() => {
        let timer: NodeJS.Timeout;
        
        if (levelUpMessage) {
            timer = setTimeout(closeNotification, 5000);
        }
        
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [levelUpMessage]);

    const handleLevelUp = async (farmerId: string) => {
        try {
            const farmer = ownedFarmers.find(f => f.id === farmerId);
            if (!farmer) return;
            
            const previousLevel = farmer.level;
            const farmerType = FARMERS.find(f => f.id === farmer.farmerId);
            if (!farmerType) return;
            
            const farmerName = farmerType.name;
            const success = await levelUpFarmer(farmerId);
            
            if (success) {
                setLevelUpSuccess(true);
                setLevelUpMessage(`${farmerName} has been leveled up to level ${previousLevel + 1}!`);
                setFarmerImage(farmer.imageSrc || farmerType.imageSrc);
                setFarmerRarity(farmerType.rarity);
            } else {
                setLevelUpSuccess(false);
                setLevelUpMessage(`Failed to level up ${farmerName}`);
            }
        } catch (err) {
            setLevelUpSuccess(false);
            setLevelUpMessage('Failed to level up farmer');
        }
    };

    // Format numbers with a consistent format
    const formatNumber = (num: number): string => {
        return num.toFixed(2);
    };
    
    // Return colors for different rarity levels
    const getRarityColor = (rarity: string): string => {
        switch (rarity) {
            case 'common': return '#b0b0b0';
            case 'rare': return '#5d8aff';
            case 'epic': return '#ad76ff';
            case 'legendary': return '#ffb84d';
            default: return 'white';
        }
    };
    
    // Filter and sort farmers
    const filteredAndSortedFarmers = React.useMemo(() => {
        // First filter by rarity if needed
        let filtered = [...ownedFarmers];
        if (filterRarity) {
            filtered = filtered.filter(ownedFarmer => {
                const farmerInfo = FARMERS.find(f => f.id === ownedFarmer.farmerId);
                return farmerInfo && farmerInfo.rarity === filterRarity;
            });
        }
        
        // Then sort
        return filtered.sort((a, b) => {
            const farmerInfoA = FARMERS.find(f => f.id === a.farmerId);
            const farmerInfoB = FARMERS.find(f => f.id === b.farmerId);
            
            if (!farmerInfoA || !farmerInfoB) return 0;
            
            if (sortBy === 'yield') {
                const yieldA = a.effectiveYield || (farmerInfoA.baseYieldPerHour * (1 + (a.level * 0.1)));
                const yieldB = b.effectiveYield || (farmerInfoB.baseYieldPerHour * (1 + (b.level * 0.1)));
                return sortOrder === 'desc' ? yieldB - yieldA : yieldA - yieldB;
            } else if (sortBy === 'level') {
                return sortOrder === 'desc' ? b.level - a.level : a.level - b.level;
            } else {
                // Sort by name
                return sortOrder === 'desc' 
                    ? farmerInfoB.name.localeCompare(farmerInfoA.name)
                    : farmerInfoA.name.localeCompare(farmerInfoB.name);
            }
        });
    }, [ownedFarmers, filterRarity, sortBy, sortOrder]);
    
    // Toggle sort order
    const toggleSort = (newSortBy: 'yield' | 'level' | 'name') => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortOrder('desc'); // Default to descending when changing sort type
        }
    };

    return (
        <section className={`farmers-dashboard-section ${visible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="section-header">
                <h2 className="section-title">YOUR FARMERS</h2>
                <p className="section-description">
                    Level up your farmers to increase their yield and earnings potential
                </p>
            </div>

            {ownedFarmers.length > 0 ? (
                <>
                    <div className="filter-sort-container">
                        <div className="filter-group">
                            <label className="filter-label">FILTER BY:</label>
                            <div className="filter-buttons">
                                <button 
                                    className={`filter-button ${filterRarity === null ? 'active' : ''}`}
                                    onClick={() => setFilterRarity(null)}
                                >
                                    All
                                </button>
                                <button 
                                    className={`filter-button ${filterRarity === 'common' ? 'active' : ''}`}
                                    onClick={() => setFilterRarity('common')}
                                    style={{ '--rarity-color': getRarityColor('common') } as React.CSSProperties}
                                >
                                    Common
                                </button>
                                <button 
                                    className={`filter-button ${filterRarity === 'rare' ? 'active' : ''}`}
                                    onClick={() => setFilterRarity('rare')}
                                    style={{ '--rarity-color': getRarityColor('rare') } as React.CSSProperties}
                                >
                                    Rare
                                </button>
                                <button 
                                    className={`filter-button ${filterRarity === 'epic' ? 'active' : ''}`}
                                    onClick={() => setFilterRarity('epic')}
                                    style={{ '--rarity-color': getRarityColor('epic') } as React.CSSProperties}
                                >
                                    Epic
                                </button>
                                <button 
                                    className={`filter-button ${filterRarity === 'legendary' ? 'active' : ''}`}
                                    onClick={() => setFilterRarity('legendary')}
                                    style={{ '--rarity-color': getRarityColor('legendary') } as React.CSSProperties}
                                >
                                    Legendary
                                </button>
                            </div>
                        </div>
                        
                        <div className="sort-group">
                            <label className="sort-label">SORT BY:</label>
                            <div className="sort-buttons">
                                <button 
                                    className={`sort-button ${sortBy === 'yield' ? 'active' : ''}`}
                                    onClick={() => toggleSort('yield')}
                                >
                                    Yield {sortBy === 'yield' && (sortOrder === 'desc' ? '↓' : '↑')}
                                </button>
                                <button 
                                    className={`sort-button ${sortBy === 'level' ? 'active' : ''}`}
                                    onClick={() => toggleSort('level')}
                                >
                                    Level {sortBy === 'level' && (sortOrder === 'desc' ? '↓' : '↑')}
                                </button>
                                <button 
                                    className={`sort-button ${sortBy === 'name' ? 'active' : ''}`}
                                    onClick={() => toggleSort('name')}
                                >
                                    Name {sortBy === 'name' && (sortOrder === 'desc' ? '↓' : '↑')}
                                </button>
                            </div>
                        </div>
                    </div>
                
                    <div className="entity-grid">
                        {filteredAndSortedFarmers.map(ownedFarmer => {
                            const farmerInfo = FARMERS.find(f => f.id === ownedFarmer.farmerId);
                            if (!farmerInfo) return null;

                            // Calculate effective yield based on level
                            const currentYield = ownedFarmer.effectiveYield || 
                                (farmerInfo.baseYieldPerHour * (1 + (ownedFarmer.level * 0.1)));
                            
                            return (
                                <EnhancedEntityCard
                                    key={ownedFarmer.id}
                                    entity={{
                                        ...farmerInfo,
                                        imageSrc: ownedFarmer.imageSrc || farmerInfo.imageSrc,
                                        baseYieldPerHour: currentYield // Use effective yield
                                    }}
                                    owned={true}
                                    level={ownedFarmer.level}
                                    showYield={true}
                                    statusLabel="YIELD"
                                    statusValue={`${formatNumber(currentYield)} / hour`}
                                    selected={selectedFarmer === ownedFarmer.id}
                                    primaryAction={{
                                        text: ownedFarmer.level >= 5 ? "MAX LEVEL" : "LEVEL UP",
                                        onClick: () => handleLevelUp(ownedFarmer.id),
                                        disabled: isLoading || ownedFarmer.level >= 5
                                    }}
                                    onSelect={() => handleSelectFarmer(ownedFarmer.id)}
                                />
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 16V12" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 8H12.01" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h3 className="empty-title">No Farmers Found</h3>
                    <p className="empty-description">You don't own any farmers yet. Visit the pack store to get your first farmer!</p>
                </div>
            )}

            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Processing...</div>
                </div>
            )}

            {/* Render notification using portal for better positioning */}
            {levelUpMessage && (
                <LevelUpNotification 
                    isSuccess={levelUpSuccess}
                    message={levelUpMessage}
                    isClosing={isClosing}
                    onClose={closeNotification}
                    farmerImage={farmerImage}
                    farmerRarity={farmerRarity}
                    getRarityColor={getRarityColor}
                />
            )}
        </section>
    );
};

export default FarmersDashboardSection; 