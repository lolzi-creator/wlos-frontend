import React from 'react';
import Button from '../common/Button';
import SectionTitle from '../common/SectionTitle';

const WlosTokenSection: React.FC = () => {
    return (
        <section className="wlos-token-section">
            <SectionTitle title="WLOS TOKEN MATRIX" />

            <div className="token-content">
                <div className="token-info">
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

                <div className="token-metrics">
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

                    <Button
                        text="CONNECT TO ACQUIRE WLOS"
                        color="purple"
                        onClick={() => console.log('Acquire WLOS clicked')}
                        fullWidth={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default WlosTokenSection;