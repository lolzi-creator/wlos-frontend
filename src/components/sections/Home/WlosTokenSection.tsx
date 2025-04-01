import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import '../../../styles/modules/home/WlosTokenSection.css';

const WlosTokenSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Animation when component enters viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        const section = document.querySelector('.wlos-token-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section className={`wlos-token-section ${isVisible ? 'visible' : ''}`}>
            {/* Background Elements */}
            <div className="token-bg">
                <div className="token-circuit-bg"></div>
                <div className="token-glow"></div>
            </div>

            {/* Section Title */}
            <div className="section-title-container">
                <h2 className="section-title">WLOS TOKEN MATRIX</h2>
            </div>

            {/* Token Content */}
            <div className="token-content">
                {/* Token Info Panel */}
                <div className="token-info">
                    <div className="hexagon-bg"></div>
                    
                    <h4 className="token-heading purple-text">WLOS QUANTUM TOKEN</h4>
                    
                    <p className="token-description">
                        The WLOS token powers the Warlords of Solana ecosystem with advanced game mechanics and quantum staking capabilities.
                    </p>
                    
                    <div className="token-features">
                        <div className="token-feature">
                            <div className="feature-dot purple"></div>
                            <span className="feature-text">Governance Rights</span>
                        </div>
                        <div className="token-feature">
                            <div className="feature-dot purple"></div>
                            <span className="feature-text">Battle Rewards Booster</span>
                        </div>
                        <div className="token-feature">
                            <div className="feature-dot purple"></div>
                            <span className="feature-text">Game Marketplace Currency</span>
                        </div>
                    </div>
                </div>

                {/* Token Metrics Panel */}
                <div className="token-metrics">
                    <div className="token-waveform">
                        <div className="wave"></div>
                    </div>
                    
                    <div className="token-logo">
                        <div className="token-logo-inner">W</div>
                    </div>

                    <div className="metric-row">
                        <span className="metric-label">Current Price</span>
                        <span className="metric-value purple-text">1.24 SOL</span>
                    </div>
                    <div className="metric-row">
                        <span className="metric-label">Circulating Supply</span>
                        <span className="metric-value purple-text">1,000,000 WLOS</span>
                    </div>
                    <div className="metric-row">
                        <span className="metric-label">Total Supply</span>
                        <span className="metric-value purple-text">10,000,000 WLOS</span>
                    </div>

                    <div className="token-button-container">
                        <Button
                            text="CONNECT TO ACQUIRE WLOS"
                            color="purple"
                            onClick={() => console.log('Acquire WLOS clicked')}
                            fullWidth={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WlosTokenSection; 