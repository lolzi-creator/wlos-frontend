// src/pages/FarmerPage.tsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import FarmerMarketplace from '../components/sections/Farmers/FarmerMarketplace';
import FarmerDashboard from '../components/sections/Farmers/FarmerDashboard';
import FarmerPackStore from '../components/sections/Farmers/FarmerPackStore';
import FarmerPackInventory from '../components/sections/Farmers/FarmerPackInventory';
import { useWalletConnection } from '../context/WalletConnectionProvider';
import WalletConnectButton from '../components/common/WalletConnectButton';
import { FarmerProvider } from '../context/FarmerContext';

const FarmerPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'marketplace' | 'packs' | 'inventory'>('dashboard');
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
                    background: "linear-gradient(90deg, rgba(20, 241, 149, 0) 0%, rgba(20, 241, 149, 0.5) 50%, rgba(20, 241, 149, 0) 100%)",
                    opacity: 0.3,
                    zIndex: 5,
                    pointerEvents: "none"
                }}
            />

            {/* Background effects */}
            <div className="background-effects">
                <div className="bg-grid"></div>
                <div className="energy-orb green-orb" style={{ left: '30%', top: '20%' }}></div>
                <div className="energy-orb cyan-orb" style={{ right: '10%', top: '40%', opacity: '0.1' }}></div>
            </div>

            <main className="main-content">
                <FarmerProvider>
                    {isConnected ? (
                        <>
                            <div className="page-tabs">
                                <button
                                    className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('dashboard')}
                                >
                                    YOUR FARMERS
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'marketplace' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('marketplace')}
                                >
                                    MARKETPLACE
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'packs' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('packs')}
                                >
                                    PACK STORE
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('inventory')}
                                >
                                    YOUR PACKS
                                </button>
                                <div className="tab-line"></div>
                            </div>

                            {activeTab === 'dashboard' && <FarmerDashboard />}
                            {activeTab === 'marketplace' && <FarmerMarketplace />}
                            {activeTab === 'packs' && <FarmerPackStore />}
                            {activeTab === 'inventory' && <FarmerPackInventory />}
                        </>
                    ) : (
                        <div className="wallet-connect-prompt clip-card border-green">
                            <div className="accent-border top green"></div>

                            <div className="wallet-connect-content text-center p-10">
                                <h3 className="prompt-title text-xl font-bold mb-4 green-text">CONNECT WALLET TO ACCESS FARMERS</h3>
                                <p className="prompt-description text-gray-400 mb-6">
                                    Connect your wallet to buy and manage farmers that generate passive WLOS income.
                                </p>
                                <WalletConnectButton color="green" />
                            </div>
                        </div>
                    )}
                </FarmerProvider>
            </main>
        </Layout>
    );
};

export default FarmerPage;