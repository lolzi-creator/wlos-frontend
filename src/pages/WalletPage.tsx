import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import WalletOverview from '../components/sections/Wallet/WalletOverview';
import WalletHeroes from '../components/sections/Wallet/WalletHeroes';
import WalletItems from '../components/sections/Wallet/WalletItems';
import WalletTransactions from '../components/sections/Wallet/WalletTransactions';

const WalletPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'heroes' | 'items' | 'transactions'>('overview');
    const [activeLine, setActiveLine] = useState(0);
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    // Animation for scanning effect
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLine(prev => (prev + 1) % 100);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    // Mock function to simulate wallet connection
    const connectWallet = () => {
        setIsWalletConnected(true);
    };

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
                <WalletOverview isConnected={isWalletConnected} onConnect={connectWallet} />

                {isWalletConnected ? (
                    <>
                        <div className="page-tabs">
                            <button
                                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                OVERVIEW
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'heroes' ? 'active' : ''}`}
                                onClick={() => setActiveTab('heroes')}
                            >
                                WARLORDS
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'items' ? 'active' : ''}`}
                                onClick={() => setActiveTab('items')}
                            >
                                INVENTORY
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
                                onClick={() => setActiveTab('transactions')}
                            >
                                TRANSACTIONS
                            </button>
                            <div className="tab-line"></div>
                        </div>

                        {activeTab === 'overview' && <WalletOverview isConnected={isWalletConnected} onConnect={connectWallet} />}
                        {activeTab === 'heroes' && <WalletHeroes />}
                        {activeTab === 'items' && <WalletItems isConnected={false} onConnect={function(): void {
                            throw new Error('Function not implemented.');
                        } } />}
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
                                <div className="wallet-option" onClick={connectWallet}>
                                    <div className="wallet-icon phantom"></div>
                                    <span className="wallet-name">Phantom</span>
                                </div>

                                <div className="wallet-option" onClick={connectWallet}>
                                    <div className="wallet-icon solflare"></div>
                                    <span className="wallet-name">Solflare</span>
                                </div>

                                <div className="wallet-option" onClick={connectWallet}>
                                    <div className="wallet-icon backpack"></div>
                                    <span className="wallet-name">Backpack</span>
                                </div>

                                <div className="wallet-option" onClick={connectWallet}>
                                    <div className="wallet-icon sollet"></div>
                                    <span className="wallet-name">Sollet</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default WalletPage;