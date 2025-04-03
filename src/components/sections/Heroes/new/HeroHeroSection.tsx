import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useHero } from '../../../../context/HeroContext';
import '../../../../styles/modules/heroes/new/HeroHeroSection.css';

// Notification Portal Component
const BattleNotification = ({
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
            <div className={`battle-notification ${isSuccess ? 'success' : 'error'} ${isClosing ? 'closing' : ''}`}>
                {getNotificationIcon()}
                <div className="notification-content">
                    <h3 className="notification-title">
                        {isSuccess ? 'Battle Complete' : 'Battle Failed'}
                    </h3>
                    
                    {heroImage && isSuccess && (
                        <div className="hero-battle-image-container">
                            <img src={heroImage} alt="Hero" className="hero-battle-image" />
                            <div className="battle-glow" style={{ background: `radial-gradient(circle, ${getRarityColor(heroRarity || 'common')}80 0%, transparent 70%)` }}></div>
                        </div>
                    )}
                    
                    <p className="notification-message">{message}</p>
                    
                    {isSuccess && (
                        <div className="battle-rewards">
                            <span>+150 WLOS Earned!</span>
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

const HeroHeroSection: React.FC = () => {
    const { ownedHeroes, isLoading, error } = useHero();
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [battleSuccess, setBattleSuccess] = useState<boolean | null>(null);
    const [battleMessage, setBattleMessage] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [heroImage, setHeroImage] = useState<string | null>(null);
    const [heroRarity, setHeroRarity] = useState<string | null>(null);

    // Data for the stats
    const totalPower = ownedHeroes.reduce((total, hero) => total + (hero.power || 0), 0);
    const highestLevel = ownedHeroes.length > 0 
        ? Math.max(...ownedHeroes.map(hero => hero.level))
        : 0;

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
            setBattleSuccess(false);
            setBattleMessage(error);
        }
    }, [error]);

    const closeNotification = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setBattleSuccess(null);
            setBattleMessage('');
            setHeroImage(null);
            setHeroRarity(null);
        }, 300); // Duration of close animation
    };

    // Auto-close after delay
    useEffect(() => {
        let timer: NodeJS.Timeout;
        
        if (battleMessage) {
            timer = setTimeout(closeNotification, 5000);
        }
        
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [battleMessage]);
    
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

    return (
        <section className={`hero-hero-section ${visible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="hero-header">
                <div className="hero-title-container">
                    <h1 className="hero-title">HERO ARENA</h1>
                    <p className="hero-subtitle">Deploy your heroes, battle opponents, and earn rewards!</p>
                </div>
            </div>

            <div className="hero-stats-container">
                <div className="hero-stats-card">
                    <div className="stat-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="stat-info">
                        <div className="stat-label">Battle Power</div>
                        <div className="stat-value">{Math.round(totalPower || 0)}</div>
                    </div>
                </div>

                <div className="hero-stats-card">
                    <div className="stat-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="stat-info">
                        <div className="stat-label">Heroes Owned</div>
                        <div className="stat-value">{ownedHeroes.length}</div>
                    </div>
                </div>

                <div className="hero-stats-card">
                    <div className="stat-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="stat-info">
                        <div className="stat-label">Highest Level</div>
                        <div className="stat-value">{highestLevel}</div>
                    </div>
                </div>
            </div>

            {/* Battle notification popup */}
            {battleMessage && (
                <BattleNotification 
                    isSuccess={battleSuccess}
                    message={battleMessage}
                    isClosing={isClosing}
                    onClose={closeNotification}
                    heroImage={heroImage}
                    heroRarity={heroRarity}
                    getRarityColor={getRarityColor}
                />
            )}

            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Processing...</div>
                </div>
            )}
        </section>
    );
};

export default HeroHeroSection; 