import React, { useState } from 'react';
import Layout from '../../../layout/Layout';
import { useWalletConnection } from '../../../../context/WalletConnectionProvider';
import WalletConnectButton from '../../../common/WalletConnectButton';
import WlosTokenHeroSection from './WlosTokenHeroSection';
import WlosTokenStatsSection from './WlosTokenStatsSection';
import WlosTokenUtilitySection from './WlosTokenUtilitySection';
import WlosTokenDistributionSection from './WlosTokenDistributionSection';
import WlosTokenAcquisitionSection from './WlosTokenAcquisitionSection';
import '../../../../styles/modules/wlostoken/new/WlosTokenPage.css';

const WlosTokenPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'utility' | 'tokenomics'>('overview');
    const { isConnected } = useWalletConnection();

    return (
        <Layout>
            <div className="wlostoken-page">
                <div className="page-background">
                    <div className="bg-grid"></div>
                    <div className="bg-glow"></div>
                    <div className="bg-particles"></div>
                </div>

                <WlosTokenHeroSection />
                <WlosTokenStatsSection />

                <div className="wlostoken-tabs-container">
                    <div className="tabs-wrapper">
                        <div className="tabs-nav">
                            <button
                                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M20 7L12 12L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>TOKEN OVERVIEW</span>
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'utility' ? 'active' : ''}`}
                                onClick={() => setActiveTab('utility')}
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>TOKEN UTILITY</span>
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'tokenomics' ? 'active' : ''}`}
                                onClick={() => setActiveTab('tokenomics')}
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 12L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>TOKENOMICS</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <>
                            {isConnected ? (
                                <WlosTokenAcquisitionSection />
                            ) : (
                                <div className="connect-wallet-section">
                                    <div className="connect-wallet-card">
                                        <div className="card-content">
                                            <h3 className="connect-title">CONNECT WALLET TO ACQUIRE WLOS</h3>
                                            <p className="connect-description">
                                                Connect your wallet to swap, stake, and earn WLOS tokens.
                                            </p>
                                            <div className="features-list">
                                                <div className="feature">
                                                    <div className="feature-icon">💰</div>
                                                    <span>Buy and stake WLOS tokens</span>
                                                </div>
                                                <div className="feature">
                                                    <div className="feature-icon">🔄</div>
                                                    <span>Swap other currencies for WLOS</span>
                                                </div>
                                                <div className="feature">
                                                    <div className="feature-icon">⚡</div>
                                                    <span>Power up your Warlord with token benefits</span>
                                                </div>
                                            </div>
                                            <WalletConnectButton color="purple" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'utility' && (
                        <WlosTokenUtilitySection />
                    )}

                    {activeTab === 'tokenomics' && (
                        <WlosTokenDistributionSection />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default WlosTokenPage; 