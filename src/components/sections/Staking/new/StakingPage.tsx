import React, { useState } from 'react';
import Layout from '../../../layout/Layout';
import StakingHeroSection from './StakingHeroSection';
import StakingStatsSection from './StakingStatsSection';
import StakingPoolsSection from './StakingPoolsSection';
import StakingRewardsSection from './StakingRewardsSection';
import { useWalletConnection } from '../../../../context/WalletConnectionProvider';
import '../../../../styles/modules/staking/new/StakingPage.css';

export const NewStakingPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'staking' | 'rewards'>('staking');
    const { isConnected } = useWalletConnection();

    return (
        <Layout>
            <div className="staking-page-container">
                <div className="page-background">
                    <div className="bg-grid"></div>
                    <div className="bg-glow"></div>
                    <div className="bg-particles"></div>
                </div>
                
                <StakingHeroSection />
                <StakingStatsSection />
                
                {isConnected ? (
                    <div className="staking-tabs-container">
                        <div className="tabs-wrapper">
                            <div className="tabs-nav">
                                <button 
                                    className={`tab-button ${activeTab === 'staking' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('staking')}
                                >
                                    <span className="tab-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                                            <path d="M2 17L12 22L22 17V7L12 12L2 7V17Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <span className="tab-text">STAKING</span>
                                    {activeTab === 'staking' && <span className="tab-indicator"></span>}
                                </button>
                                
                                <button 
                                    className={`tab-button ${activeTab === 'rewards' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('rewards')}
                                >
                                    <span className="tab-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 1L15.3 7.4L22.4 8.5L17.2 13.5L18.5 20.5L12 17.3L5.5 20.5L6.8 13.5L1.6 8.5L8.7 7.4L12 1Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <span className="tab-text">REWARDS</span>
                                    {activeTab === 'rewards' && <span className="tab-indicator"></span>}
                                </button>
                            </div>
                            
                            <div className="tab-content">
                                {activeTab === 'staking' ? (
                                    <StakingPoolsSection />
                                ) : (
                                    <StakingRewardsSection />
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="connect-wallet-section">
                        <div className="connect-card">
                            <div className="connect-content">
                                <h3 className="connect-title">Connect Your Wallet</h3>
                                <p className="connect-description">
                                    Connect your wallet to access staking features and earn rewards.
                                </p>
                                <ul className="benefits-list">
                                    <li className="benefit-item">
                                        <span className="benefit-icon">🔒</span>
                                        <span>Securely stake your WLOS tokens</span>
                                    </li>
                                    <li className="benefit-item">
                                        <span className="benefit-icon">💰</span>
                                        <span>Earn up to 25.7% APY on your tokens</span>
                                    </li>
                                    <li className="benefit-item">
                                        <span className="benefit-icon">⚡</span>
                                        <span>Boost your Warlord powers in battles</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default NewStakingPage; 