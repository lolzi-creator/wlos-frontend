import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import WalletOverview from '../components/sections/Wallet/WalletOverview';
// Removed redundant imports
import WalletTransactions from '../components/sections/Wallet/WalletTransactions';
import WalletAssets from '../components/sections/Wallet/WalletAssets';
import { useWalletConnection } from '../context/WalletConnectionProvider';
import WalletConnectButton from '../components/common/WalletConnectButton';

const WalletPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'transactions'>('overview');
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
            {/* Scanning line effect */}
            <div
                style={{
                    position: "absolute",
                    top: `${activeLine}%`,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(90deg, rgba(0, 194, 255, 0) 0%, rgba(0, 194, 255, 0.5) 50%, rgba(0, 194, 255, 0) 100%)",
                    opacity: 0.3,
                    zIndex: 5,
                    pointerEvents: "none"
                }}
            />

            {/* Background effects */}
            <div className="background-effects">
                <div className="bg-grid"></div>
                <div className="energy-orb blue-orb" style={{ left: '20%', top: '30%' }}></div>
                <div className="energy-orb cyan-orb" style={{ right: '15%', top: '20%', opacity: '0.2' }}></div>
            </div>

            <main className="main-content">
                {isConnected ? (
                    <>
                        <div className="page-tabs">
                            <button
                                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                OVERVIEW
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'assets' ? 'active' : ''}`}
                                onClick={() => setActiveTab('assets')}
                            >
                                ASSETS
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
                                onClick={() => setActiveTab('transactions')}
                            >
                                TRANSACTIONS
                            </button>
                            <div className="tab-line"></div>
                        </div>

                        {activeTab === 'overview' && <WalletOverview />}
                        {activeTab === 'assets' && <WalletAssets />}
                        {activeTab === 'transactions' && <WalletTransactions />}
                    </>
                ) : (
                    <div className="wallet-connect-prompt clip-card border-cyan">
                        <div className="accent-border top cyan"></div>

                        <div className="wallet-connect-content">
                            <h3 className="prompt-title cyan-text">CONNECT YOUR NEURAL WALLET</h3>
                            <p className="prompt-description">
                                Connect your wallet to access your Warlords, inventory items, and transaction history.
                            </p>

                            <div className="wallets-container">
                                <WalletConnectButton color="cyan" />
                                <p className="mt-4 text-sm text-gray-400">
                                    Select your wallet above to connect to the Warlords of Solana platform
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default WalletPage;