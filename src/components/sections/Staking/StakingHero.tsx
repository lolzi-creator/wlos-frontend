import React from 'react';
import Button from '../../common/Button.tsx';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';
import WalletConnectButton from '../../common/WalletConnectButton';

const StakingHero: React.FC = () => {
    const { isConnected } = useWalletConnection();

    return (
        <section className="staking-hero-section">
            <div className="staking-hero-content clip-banner">
                <div className="accent-line top-left"></div>
                <div className="accent-line bottom-right"></div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="hero-title glow-text">STAKE YOUR WARLORDS</h2>
                        <p className="hero-subtitle">EARN PASSIVE REWARDS | INCREASE BATTLE POWER | UNLOCK SPECIAL ABILITIES</p>

                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-dot green"></div>
                                <span className="feature-text">Up to 25.7% APY rewards</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot green"></div>
                                <span className="feature-text">Boost battle performance by 50%</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot green"></div>
                                <span className="feature-text">Early unstaking available with 5% fee</span>
                            </div>
                        </div>

                        {isConnected ? (
                            <Button
                                text="STAKE WLOS NOW"
                                color="green"
                                onClick={() => console.log('Stake now clicked')}
                            />
                        ) : (
                            <WalletConnectButton color="green" />
                        )}
                    </div>

                    <div className="staking-info-panel clip-panel">
                        <h4 className="text-green-text text-sm font-semibold mb-2">YOUR STAKING DASHBOARD</h4>
                        <div className="h-px w-48 bg-green-text/50 mb-4"></div>

                        {isConnected ? (
                            <>
                                <div className="staking-stats-grid">
                                    <div className="stat-box">
                                        <div className="stat-label">Available WLOS</div>
                                        <div className="stat-value">0</div>
                                    </div>

                                    <div className="stat-box">
                                        <div className="stat-label">Staked WLOS</div>
                                        <div className="stat-value">0</div>
                                    </div>

                                    <div className="stat-box">
                                        <div className="stat-label">Current APY</div>
                                        <div className="stat-value text-green-text">25.7%</div>
                                    </div>

                                    <div className="stat-box">
                                        <div className="stat-label">Rewards Earned</div>
                                        <div className="stat-value">0 WLOS</div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <p className="text-gray-400 mb-4">Connect your wallet to view your staking stats and start earning rewards</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StakingHero;