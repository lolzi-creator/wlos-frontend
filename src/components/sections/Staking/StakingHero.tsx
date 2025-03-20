import React from 'react';
import Button from '../../common/Button.tsx';

const StakingHero: React.FC = () => {
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

                        <Button
                            text="STAKE WLOS NOW"
                            color="green"
                            onClick={() => console.log('Stake now clicked')}
                        />
                    </div>

                    <div className="staking-info-panel clip-panel">
                        <h4 className="text-green-text text-sm font-semibold mb-2">YOUR STAKING DASHBOARD</h4>
                        <div className="h-px w-48 bg-green-text/50 mb-4"></div>

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

                        <div className="connect-prompt">
                            <p className="text-xs text-center text-gray-400 mb-2">Connect your wallet to view your staking stats</p>
                            <Button
                                text="CONNECT WALLET"
                                color="green"
                                onClick={() => console.log('Connect wallet clicked')}
                                fullWidth={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StakingHero;