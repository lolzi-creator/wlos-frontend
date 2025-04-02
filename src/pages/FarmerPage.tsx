// src/pages/FarmerPage.tsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useWalletConnection } from '../context/WalletConnectionProvider';
import WalletConnectButton from '../components/common/WalletConnectButton';
import GenericPackStore from '../components/common/GenericPackStore';
import GenericPackInventory from '../components/common/GenericPackInventory';
import { useFarmer } from '../context/FarmerContext';
import { FARMER_PACKS } from '../types/FarmerTypes';
import FarmersHeroSection from '../components/sections/Farmers/new/FarmersHeroSection';
import FarmersDashboardSection from '../components/sections/Farmers/new/FarmersDashboardSection';
import FarmersShowcaseSection from '../components/sections/Farmers/new/FarmersShowcaseSection';
import '../styles/modules/farmers/new/FarmersPage.css';

const FarmerPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'showcase' | 'packs' | 'inventory'>('dashboard');
    const [activeLine, setActiveLine] = useState(0);
    const { isConnected } = useWalletConnection();
    const { ownedPacks, buyPack, openPack, isLoading, error } = useFarmer();

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
                {isConnected ? (
                    <>
                        {/* Hero Section always visible when connected */}
                        <FarmersHeroSection />
                        
                        <div className="farmers-tab-navigation">
                            <button
                                className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                YOUR FARMERS
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'showcase' ? 'active' : ''}`}
                                onClick={() => setActiveTab('showcase')}
                            >
                                SHOWCASE
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
                        </div>

                        <div className="farmers-content">
                            {activeTab === 'dashboard' && <FarmersDashboardSection />}
                            {activeTab === 'showcase' && <FarmersShowcaseSection />}
                            {activeTab === 'packs' && (
                                <div className="farmers-content-section">
                                    <GenericPackStore
                                        packs={FARMER_PACKS}
                                        entityType="farmer"
                                        buyPack={buyPack}
                                        isLoading={isLoading}
                                        error={error}
                                        title="FARMER PACKS"
                                    />
                                </div>
                            )}
                            {activeTab === 'inventory' && (
                                <div className="farmers-content-section">
                                    <GenericPackInventory
                                        ownedPacks={ownedPacks}
                                        packs={FARMER_PACKS}
                                        openPack={openPack}
                                        isLoading={isLoading}
                                        error={error}
                                        entityType="farmer"
                                        title="YOUR PACKS"
                                    />
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="wallet-connect-prompt">
                        <div className="wallet-connect-content">
                            <h2 className="prompt-title">CONNECT WALLET</h2>
                            <p className="prompt-description">
                                Connect your wallet to buy and manage farmers that generate passive WLOS income.
                            </p>
                            <WalletConnectButton color="green" />
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default FarmerPage;