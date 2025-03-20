import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import WlosTokenHero from '../components/sections/WlosToken/WlosTokenHero';
import WlosTokenStats from '../components/sections/WlosToken/WlosTokenStats';
import WlosTokenUtility from '../components/sections/WlosToken/WlosTokenUtility.tsx';
import WlosTokenDistribution from '../components/sections/WlosToken/WlosTokenDistribution';
import WlosTokenAcquisition from '../components/sections/WlosToken/WlosTokenAcquisition';
import { useWalletConnection } from '../context/WalletConnectionProvider';
import WalletConnectButton from '../components/common/WalletConnectButton';

const WlosTokenPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'utility' | 'tokenomics'>('overview');
    const [activeLine, setActiveLine] = useState(0);
    const { isConnected } = useWalletConnection();

    // Animation for scanning effect
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLine(prev => (prev + 1) % 100);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    // Most of the token info should be visible to all users, whether connected or not
    // But acquisition options should only be shown when connected

    return (
        <Layout>
            {/* Scanning line effect */}
            <div
                style={{
                    position: "absolute",
                    top: `${activeLine}%`,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(90deg, rgba(153, 69, 255, 0) 0%, rgba(153, 69, 255, 0.5) 50%, rgba(153, 69, 255, 0) 100%)",
                    opacity: 0.3,
                    zIndex: 5,
                    pointerEvents: "none"
                }}
            />

            {/* Background effects */}
            <div className="background-effects">
                <div className="bg-grid"></div>
                <div className="energy-orb purple-orb" style={{ left: '30%', top: '20%' }}></div>
                <div className="energy-orb purple-orb" style={{ right: '10%', top: '40%', opacity: '0.2' }}></div>
            </div>

            <main className="main-content">
                <div className="page-tabs">
                    <button
                        className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        TOKEN OVERVIEW
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'utility' ? 'active' : ''}`}
                        onClick={() => setActiveTab('utility')}
                    >
                        TOKEN UTILITY
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'tokenomics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tokenomics')}
                    >
                        TOKENOMICS
                    </button>
                    <div className="tab-line"></div>
                </div>

                {activeTab === 'overview' && (
                    <>
                        <WlosTokenHero />
                        <WlosTokenStats />

                        {isConnected ? (
                            <WlosTokenAcquisition />
                        ) : (
                            <div className="wallet-connect-prompt clip-card border-purple mt-8">
                                <div className="accent-border top purple"></div>

                                <div className="wallet-connect-content text-center p-10">
                                    <h3 className="prompt-title text-xl font-bold mb-4 purple-text">CONNECT WALLET TO ACQUIRE WLOS</h3>
                                    <p className="prompt-description text-gray-400 mb-6">
                                        Connect your wallet to swap, stake, and earn WLOS tokens.
                                    </p>
                                    <WalletConnectButton color="purple" />
                                </div>
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'utility' && (
                    <>
                        <WlosTokenUtility />
                    </>
                )}

                {activeTab === 'tokenomics' && (
                    <>
                        <WlosTokenDistribution />
                    </>
                )}
            </main>
        </Layout>
    );
};

export default WlosTokenPage;