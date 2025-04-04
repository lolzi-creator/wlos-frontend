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
import { useLocation } from 'react-router-dom';
import '../styles/modules/farmers/new/FarmersPage.css';

const FarmerPage: React.FC = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<'dashboard' | 'showcase' | 'packs' | 'inventory'>('showcase');
    const [activeLine, setActiveLine] = useState(0);
    const [showConnectPrompt, setShowConnectPrompt] = useState(false);
    const { isConnected } = useWalletConnection();
    const { ownedPacks, buyPack, openPack, isLoading, error } = useFarmer();

    // Check URL hash on initial load
    useEffect(() => {
        // Check if hash is #packs to navigate directly to packs tab
        if (location.hash === '#packs') {
            setActiveTab('packs');
        }
    }, [location]);

    // Animation for scanning effect
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLine(prev => (prev + 1) % 100);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    // Set initial tab based on wallet connection
    useEffect(() => {
        if (isConnected) {
            setActiveTab(prevTab => {
                // If #packs is in the URL, prioritize that
                if (location.hash === '#packs') return 'packs';
                // Otherwise, use default logic
                return prevTab === 'showcase' ? prevTab : 'dashboard';
            });
        } else {
            setActiveTab(prevTab => {
                // If #packs is in the URL, prioritize that
                if (location.hash === '#packs') return 'packs';
                // Otherwise, use default logic
                return ['dashboard', 'inventory'].includes(prevTab) ? 'showcase' : prevTab;
            });
        }
    }, [isConnected, location]);

    // Handle tab click - check if wallet connection is required
    const handleTabClick = (tab: 'dashboard' | 'showcase' | 'packs' | 'inventory') => {
        if (!isConnected && (tab === 'dashboard' || tab === 'inventory')) {
            setShowConnectPrompt(true);
        } else {
            setActiveTab(tab);
            setShowConnectPrompt(false);
        }
    };

    // Handle pack purchase attempt - check if wallet is connected
    const handleBuyPackAttempt = (packId: string) => {
        if (!isConnected) {
            setShowConnectPrompt(true);
            return Promise.resolve(false);
        }
        return buyPack(packId);
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
                {/* Hero Section always visible */}
                <FarmersHeroSection />
                
                {/* Tab Navigation */}
                <div className="farmers-tab-navigation">
                    {isConnected && (
                        <button
                            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                            onClick={() => handleTabClick('dashboard')}
                        >
                            YOUR FARMERS
                        </button>
                    )}
                    <button
                        className={`tab-button ${activeTab === 'showcase' ? 'active' : ''}`}
                        onClick={() => handleTabClick('showcase')}
                    >
                        SHOWCASE
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'packs' ? 'active' : ''}`}
                        onClick={() => handleTabClick('packs')}
                    >
                        PACK STORE
                    </button>
                    {isConnected && (
                        <button
                            className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
                            onClick={() => handleTabClick('inventory')}
                        >
                            YOUR PACKS
                        </button>
                    )}
                </div>

                {/* Wallet Connect Prompt (overlay) */}
                {showConnectPrompt && (
                    <div className="wallet-connect-prompt-overlay">
                        <div className="wallet-connect-prompt-modal">
                            <button className="close-prompt" onClick={() => setShowConnectPrompt(false)}>×</button>
                            <h2 className="prompt-title">CONNECT WALLET</h2>
                            <p className="prompt-description">
                                Connect your wallet to {activeTab === 'dashboard' ? 'view your farmers' : 
                                                        activeTab === 'inventory' ? 'access your packs' : 
                                                        'purchase farmer packs'}.
                            </p>
                            <div className="prompt-buttons">
                                <WalletConnectButton color="green" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Sections */}
                <div className="farmers-content">
                    {activeTab === 'dashboard' && isConnected && <FarmersDashboardSection />}
                    {activeTab === 'showcase' && <FarmersShowcaseSection />}
                    {activeTab === 'packs' && (
                        <div className="farmers-content-section">
                            <GenericPackStore
                                packs={FARMER_PACKS}
                                entityType="farmer"
                                buyPack={handleBuyPackAttempt}
                                isLoading={isLoading}
                                error={error}
                                title="FARMER PACKS"
                            />
                        </div>
                    )}
                    {activeTab === 'inventory' && isConnected && (
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
            </main>
        </Layout>
    );
};

export default FarmerPage;