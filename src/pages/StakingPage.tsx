import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import StakingHero from '../components/sections/Staking/StakingHero';
import StakingPools from '../components/sections/Staking/StakingPools';
import StakingStats from '../components/sections/Staking/StakingStats';
import StakingRewards from '../components/sections/Staking/StakingRewards';
import { useWalletConnection } from '../context/WalletConnectionProvider';
import WalletConnectButton from '../components/common/WalletConnectButton';
import '../styles/modules/staking/StakingPage.css';

const StakingPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'staking' | 'rewards'>('staking');
    const [activeLine, setActiveLine] = useState(0);
    const { isConnected } = useWalletConnection();

    // Animation for scanning effect
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLine(prev => (prev + 1) % 100);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <Layout>
            <div className="staking-page">
                <div className="staking-background">
                    <div className="grid-lines">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="grid-line"></div>
                        ))}
                    </div>
                    <div className="scanning-line" style={{ top: `${activeLine}%` }}></div>
                </div>

                <div className="page-header">
                    <h1 className="page-title">STAKING PORTAL</h1>
                </div>

                <main className="staking-content">
                    <StakingHero />
                    
                    {isConnected ? (
                        <div className="staking-connected-content">
                            <div className="staking-tabs">
                                <button
                                    className={`staking-tab ${activeTab === 'staking' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('staking')}
                                >
                                    <span className="tab-text">STAKING VAULT</span>
                                    {activeTab === 'staking' && <span className="tab-indicator"></span>}
                                </button>
                                <button
                                    className={`staking-tab ${activeTab === 'rewards' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('rewards')}
                                >
                                    <span className="tab-text">REWARDS DASHBOARD</span>
                                    {activeTab === 'rewards' && <span className="tab-indicator"></span>}
                                </button>
                            </div>

                            <div className="staking-content-area">
                                {activeTab === 'staking' ? (
                                    <>
                                        <StakingStats />
                                        <StakingPools />
                                    </>
                                ) : (
                                    <StakingRewards />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="wallet-connect-container">
                            <div className="wallet-connect-card">
                                <div className="card-glow"></div>
                                <div className="wallet-connect-content">
                                    <h3 className="connect-title">CONNECT WALLET TO STAKE</h3>
                                    <p className="connect-description">
                                        Connect your wallet to stake your WLOS tokens and earn rewards.
                                    </p>
                                    <div className="features-list">
                                        <div className="feature">
                                            <div className="feature-icon">🔒</div>
                                            <span>Stake WLOS tokens for up to 25.7% APY</span>
                                        </div>
                                        <div className="feature">
                                            <div className="feature-icon">⚔️</div>
                                            <span>Boost your battle performance by up to 50%</span>
                                        </div>
                                        <div className="feature">
                                            <div className="feature-icon">💎</div>
                                            <span>Earn exclusive rewards and special abilities</span>
                                        </div>
                                    </div>
                                    <WalletConnectButton />
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </Layout>
    );
};

export default StakingPage;