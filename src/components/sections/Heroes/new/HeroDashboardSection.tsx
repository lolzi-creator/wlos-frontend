import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useHero } from '../../../../context/HeroContext';
import { HEROES, getHeroPower } from '../../../../types/HeroTypes';
import EnhancedEntityCard from '../../../common/EntityCard';
import '../../../../styles/modules/heroes/new/HeroDashboardSection.css';

// Notification Portal Component
const LevelUpNotification = ({
    isSuccess,
    message,
    isClosing,
    onClose,
    heroImage,
    heroRarity,
    getRarityColor
}: {
    isSuccess: boolean | null;
    message: string;
    isClosing: boolean;
    onClose: () => void;
    heroImage: string | null;
    heroRarity: string | null;
    getRarityColor: (rarity: string) => string;
}) => {
    // Get appropriate icon for notifications
    const getNotificationIcon = () => {
        if (isSuccess) {
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="notification-icon">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#00C2FF" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                    
                    {heroImage && isSuccess && (
                        <div className="hero-level-up-image-container">
                            <img src={heroImage} alt="Hero" className="hero-level-up-image" />
                            <div className="level-up-glow" style={{ background: `radial-gradient(circle, ${getRarityColor(heroRarity || 'common')}80 0%, transparent 70%)` }}></div>
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
                            <span>Power Increased by 10%!</span>
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

const HeroDashboardSection: React.FC = () => {
    const { ownedHeroes, levelUpHero, isLoading, error } = useHero();
    const [visible, setVisible] = useState(false);
    const [selectedHero, setSelectedHero] = useState<string | null>(null);
    const [filterRarity, setFilterRarity] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'power' | 'level' | 'name'>('power');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const sectionRef = useRef<HTMLDivElement>(null);
    const [levelUpSuccess, setLevelUpSuccess] = useState<boolean | null>(null);
    const [levelUpMessage, setLevelUpMessage] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [heroImage, setHeroImage] = useState<string | null>(null);
    const [heroRarity, setHeroRarity] = useState<string | null>(null);

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

    const handleSelectHero = (id: string) => {
        setSelectedHero(selectedHero === id ? null : id);
    };

    const closeNotification = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setLevelUpSuccess(null);
            setLevelUpMessage('');
            setHeroImage(null);
            setHeroRarity(null);
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

    const handleLevelUp = async (heroId: string) => {
        try {
            const hero = ownedHeroes.find(h => h.id === heroId);
            if (!hero) return;
            
            const previousLevel = hero.level;
            const previousPower = hero.power || 0;
            const heroType = HEROES.find(h => h.id === hero.heroId);
            if (!heroType) return;
            
            const heroName = hero.name || heroType.name;
            const success = await levelUpHero(heroId);
            
            if (success) {
                setLevelUpSuccess(true);
                setLevelUpMessage(`${heroName} has been leveled up to level ${previousLevel + 1}! Power increased from ${Math.round(previousPower)} to approximately ${Math.round(previousPower * 1.1)}.`);
                setHeroImage(hero.imageSrc || heroType.imageSrc);
                setHeroRarity(hero.rarity);
            } else {
                setLevelUpSuccess(false);
                setLevelUpMessage(`Failed to level up ${heroName}`);
            }
        } catch (err) {
            setLevelUpSuccess(false);
            setLevelUpMessage('Failed to level up hero');
        }
    };

    // Format numbers with a consistent format
    const formatNumber = (num: number): string => {
        return num.toFixed(0);
    };
    
    // Return colors for different rarity levels
    const getRarityColor = (rarity: string): string => {
        switch (rarity) {
            case 'common': return '#b0b0b0';
            case 'rare': return '#5d8aff';
            case 'epic': return '#ad76ff';
            case 'legendary': return '#ffb84d';
            default: return '#00C2FF';
        }
    };
    
    // Filter and sort heroes
    const filteredAndSortedHeroes = React.useMemo(() => {
        // First filter by rarity and type if needed
        let filtered = [...ownedHeroes];
        
        if (filterRarity) {
            filtered = filtered.filter(ownedHero => ownedHero.rarity === filterRarity);
        }
        
        if (filterType) {
            filtered = filtered.filter(ownedHero => ownedHero.type === filterType);
        }
        
        // Then sort
        return filtered.sort((a, b) => {
            if (sortBy === 'power') {
                const powerA = a.power || 0;
                const powerB = b.power || 0;
                return sortOrder === 'desc' ? powerB - powerA : powerA - powerB;
            } else if (sortBy === 'level') {
                return sortOrder === 'desc' ? b.level - a.level : a.level - b.level;
            } else {
                // Sort by name
                const nameA = a.name || '';
                const nameB = b.name || '';
                return sortOrder === 'desc' 
                    ? nameB.localeCompare(nameA)
                    : nameA.localeCompare(nameB);
            }
        });
    }, [ownedHeroes, filterRarity, filterType, sortBy, sortOrder]);
    
    // Toggle sort order
    const toggleSort = (newSortBy: 'power' | 'level' | 'name') => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortOrder('desc'); // Default to descending when changing sort type
        }
    };

    return (
        <section className={`heroes-dashboard-section ${visible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="section-header">
                <h2 className="section-title">YOUR HEROES</h2>
                <p className="section-description">
                    Level up your heroes to increase their power and battle capabilities
                </p>
            </div>

            {ownedHeroes.length > 0 ? (
                <>
                    <div className="filter-sort-container">
                        <div className="filter-group">
                            <label className="filter-label">FILTER BY RARITY:</label>
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
                        
                        <div className="filter-group">
                            <label className="filter-label">FILTER BY TYPE:</label>
                            <div className="filter-buttons">
                                <button 
                                    className={`filter-button ${filterType === null ? 'active' : ''}`}
                                    onClick={() => setFilterType(null)}
                                >
                                    All
                                </button>
                                <button 
                                    className={`filter-button ${filterType === 'attack' ? 'active' : ''}`}
                                    onClick={() => setFilterType('attack')}
                                >
                                    Attack
                                </button>
                                <button 
                                    className={`filter-button ${filterType === 'defense' ? 'active' : ''}`}
                                    onClick={() => setFilterType('defense')}
                                >
                                    Defense
                                </button>
                                <button 
                                    className={`filter-button ${filterType === 'speed' ? 'active' : ''}`}
                                    onClick={() => setFilterType('speed')}
                                >
                                    Speed
                                </button>
                                <button 
                                    className={`filter-button ${filterType === 'balanced' ? 'active' : ''}`}
                                    onClick={() => setFilterType('balanced')}
                                >
                                    Balanced
                                </button>
                                <button 
                                    className={`filter-button ${filterType === 'magic' ? 'active' : ''}`}
                                    onClick={() => setFilterType('magic')}
                                >
                                    Magic
                                </button>
                            </div>
                        </div>
                        
                        <div className="sort-group">
                            <label className="sort-label">SORT BY:</label>
                            <div className="sort-buttons">
                                <button 
                                    className={`sort-button ${sortBy === 'power' ? 'active' : ''}`}
                                    onClick={() => toggleSort('power')}
                                >
                                    Power {sortBy === 'power' && (sortOrder === 'desc' ? '↓' : '↑')}
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
                        {filteredAndSortedHeroes.map(ownedHero => {
                            const heroInfo = HEROES.find(h => h.id === ownedHero.heroId);
                            if (!heroInfo) return null;

                            // Get any equipped items
                            const equipment = ownedHero.equippedItems || [];

                            // Use the hero's power from the backend, or fall back to the frontend calculation
                            const heroPower = ownedHero.power ||
                                (heroInfo ? getHeroPower(heroInfo, ownedHero.level, equipment) : 0);
                            
                            return (
                                <EnhancedEntityCard
                                    key={ownedHero.id}
                                    entity={{
                                        ...heroInfo,
                                        name: ownedHero.name || heroInfo.name,
                                        imageSrc: ownedHero.imageSrc || heroInfo.imageSrc,
                                        rarity: ownedHero.rarity,
                                        type: ownedHero.type,
                                        power: heroPower
                                    }}
                                    owned={true}
                                    level={ownedHero.level}
                                    showPower={true}
                                    showStats={true}
                                    equipment={equipment}
                                    statusLabel="POWER"
                                    statusValue={formatNumber(heroPower)}
                                    selected={selectedHero === ownedHero.id}
                                    primaryAction={{
                                        text: ownedHero.level >= 5 ? "MAX LEVEL" : "LEVEL UP",
                                        onClick: () => handleLevelUp(ownedHero.id),
                                        disabled: isLoading || ownedHero.level >= 5
                                    }}
                                    onSelect={() => handleSelectHero(ownedHero.id)}
                                />
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 16V12" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 8H12.01" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h3 className="empty-title">No Heroes Found</h3>
                    <p className="empty-description">You don't own any heroes yet. Visit the pack store to get your first hero!</p>
                </div>
            )}

            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Processing...</div>
                </div>
            )}

            {/* Level-up notification popup */}
            {levelUpMessage && (
                <LevelUpNotification 
                    isSuccess={levelUpSuccess}
                    message={levelUpMessage}
                    isClosing={isClosing}
                    onClose={closeNotification}
                    heroImage={heroImage}
                    heroRarity={heroRarity}
                    getRarityColor={getRarityColor}
                />
            )}
        </section>
    );
};

export default HeroDashboardSection; 