import React, { useState, useEffect } from 'react';
import { useWalletConnection } from '../../../../context/WalletConnectionProvider';
import '../../../../styles/modules/wlostoken/new/WlosTokenHeroSection.css';

const WlosTokenHeroSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { isConnected, balance } = useWalletConnection();
    
    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    return (
        <section className={`wlostoken-hero-section ${isVisible ? 'visible' : ''}`}>
            <div className="hero-content">
                <div className="hero-left">
                    <h1 className="hero-title">
                        <span className="gradient-text">WLOS Token</span>
                    </h1>
                    <p className="hero-description">
                        The official currency of Warlords of Solana. Use WLOS to buy items, heroes, and earn rewards by staking.
                    </p>
                    <div className="hero-highlights">
                        <div className="highlight-item">
                            <div className="highlight-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15 8.5C14.315 7.81501 13.1087 7.33855 12 7.30872M9 15C9.64448 15.8593 10.8428 16.3494 12 16.391M12 7.30872C10.6809 7.27322 9.5 7.86998 9.5 9.50001C9.5 12.5 15 11 15 14C15 15.711 13.5362 16.4462 12 16.391M12 7.30872V5.5M12 16.391V18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="highlight-content">
                                <span className="highlight-value">$0.0547</span>
                                <span className="highlight-label">Current Price</span>
                            </div>
                        </div>
                        <div className="highlight-item">
                            <div className="highlight-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="highlight-content">
                                <span className="highlight-value">
                                    {isConnected ? Number(balance.wlos).toLocaleString() : '---'}
                                </span>
                                <span className="highlight-label">Your Balance</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-buttons">
                        <a href="/marketplace" className="button primary-button">
                            <span>Buy WLOS</span>
                        </a>
                        <a href="/staking" className="button secondary-button">
                            <span>Stake WLOS</span>
                        </a>
                    </div>
                </div>
                <div className="hero-right">
                    <div className="token-illustration">
                        <div className="token-circle"></div>
                        <div className="token-logo">
                            <img src="/images/token/wlos-token-3d.png" alt="WLOS Token" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WlosTokenHeroSection; 