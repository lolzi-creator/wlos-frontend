import React from 'react';
import Button from '../../common/Button';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';
import WalletConnectButton from '../../common/WalletConnectButton';

const WlosTokenHero: React.FC = () => {
    const { isConnected } = useWalletConnection();

    return (
        <section className="token-hero-section">
            <div className="token-hero-content clip-banner">
                <div className="accent-line top-left"></div>
                <div className="accent-line bottom-right"></div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="hero-title glow-text">WLOS TOKEN</h2>
                        <p className="hero-subtitle">FUTURISTIC ECOSYSTEM TOKEN | GOVERNANCE & REWARDS | QUANTUM ECONOMICS</p>

                        <div className="token-hero-desc">
                            <p>The WLOS token powers the entire Warlords of Solana ecosystem, enabling advanced battle mechanics, staking rewards, marketplace transactions, and governance capabilities.</p>
                        </div>

                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-dot purple"></div>
                                <span className="feature-text">Battle rewards & enhancements</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot purple"></div>
                                <span className="feature-text">Marketplace currency</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot purple"></div>
                                <span className="feature-text">Governance voting rights</span>
                            </div>
                        </div>

                        {isConnected ? (
                            <Button
                                text="ACQUIRE WLOS"
                                color="purple"
                                onClick={() => console.log('Acquire WLOS clicked')}
                            />
                        ) : (
                            <WalletConnectButton color="purple" />
                        )}
                    </div>

                    <div className="token-info-panel clip-panel">
                        <h4 className="text-purple-text text-sm font-semibold mb-2">WLOS TOKEN METRICS</h4>
                        <div className="h-px w-48 bg-purple-text/50 mb-4"></div>

                        <div className="token-price-container">
                            <div className="price-header">
                                <span className="price-label">Current Price</span>
                                <div className="price-trend">
                                    <span className="trend-amount green-text">+5.2%</span>
                                    <span className="trend-period text-xs">24h</span>
                                </div>
                            </div>
                            <div className="price-value">
                                <span className="value-amount text-2xl font-bold text-purple-text">1.24</span>
                                <span className="value-currency ml-1">SOL</span>
                            </div>
                            <div className="price-conversion text-xs text-gray-400">≈ $182.42 USD</div>
                        </div>

                        <div className="token-metrics-grid mt-6">
                            <div className="metric-box">
                                <div className="metric-label">Market Cap</div>
                                <div className="metric-value">$182.4M</div>
                            </div>

                            <div className="metric-box">
                                <div className="metric-label">Circulating Supply</div>
                                <div className="metric-value">1M WLOS</div>
                            </div>

                            <div className="metric-box">
                                <div className="metric-label">Total Supply</div>
                                <div className="metric-value">10M WLOS</div>
                            </div>

                            <div className="metric-box">
                                <div className="metric-label">All-Time High</div>
                                <div className="metric-value">1.87 SOL</div>
                            </div>
                        </div>

                        {!isConnected && (
                            <div className="connect-prompt mt-6">
                                <WalletConnectButton
                                    color="purple"
                                    fullWidth={true}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WlosTokenHero;