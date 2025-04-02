import React, { useState, useEffect } from 'react';
import { useWalletConnection } from '../../../../context/WalletConnectionProvider';
import '../../../../styles/modules/wlostoken/new/WlosTokenHeroSection.css';

const WlosTokenHeroSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { isConnected, balance } = useWalletConnection();
    
    useEffect(() => {
        // Animation for section visibility
        setIsVisible(true);
    }, []);
    
    return (
        <section className={`wlostoken-hero-section ${isVisible ? 'visible' : ''}`}>
            <div className="hero-content">
                <div className="hero-left">
                    <h1 className="hero-title">
                        <span className="gradient-text">WLOS</span> Token
                    </h1>
                    <p className="hero-description">
                        The native utility token powering the Warlords ecosystem. Stake, trade, and unlock exclusive features with WLOS tokens.
                    </p>
                    <div className="hero-highlights">
                        <div className="highlight-item">
                            <span className="highlight-value">$0.0547</span>
                            <span className="highlight-label">Current Price</span>
                        </div>
                        <div className="highlight-item">
                            <span className="highlight-value">
                                {isConnected ? Number(balance.wlos).toLocaleString() : '---'}
                            </span>
                            <span className="highlight-label">Your Balance</span>
                        </div>
                    </div>
                    <div className="hero-buttons">
                        <a href="#marketplace" className="button primary-button">
                            <span>Buy WLOS</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1.33334L14.6667 8.00001L8 14.6667M1.33334 8.00001H14.6667H1.33334Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                        <a href="#staking" className="button secondary-button">
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
                        <div className="particle particle-1"></div>
                        <div className="particle particle-2"></div>
                        <div className="particle particle-3"></div>
                        <div className="pulse-ring"></div>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <span>Scroll to explore</span>
                <div className="scroll-arrow">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3.33334V16.6667M10 16.6667L16.6667 10M10 16.6667L3.33334 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default WlosTokenHeroSection; 