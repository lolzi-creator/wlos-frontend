// src/pages/HeroPage.tsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import HeroDashboard from '../components/sections/Heroes/HeroDashboard.tsx';
import HeroShowcase from '../components/sections/Heroes/HeroShowcase';
import HeroPackStore from '../components/sections/Heroes/HeroPackStore';
import HeroPackInventory from '../components/sections/Heroes/HeroPackInventory';
import { useWalletConnection } from '../context/WalletConnectionProvider';
import WalletConnectButton from '../components/common/WalletConnectButton';
import { HeroProvider } from '../context/HeroContext';

const HeroPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'showcase' | 'packs' | 'inventory'>('dashboard');
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
                <div className="energy-orb cyan-orb" style={{ left: '30%', top: '20%' }}></div>
                <div className="energy-orb purple-orb" style={{ right: '10%', top: '40%', opacity: '0.1' }}></div>
            </div>

            <main className="main-content">
                <HeroProvider>
                    {isConnected ? (
                        <>
                            <div className="page-tabs">
                                <button
                                    className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('dashboard')}
                                >
                                    YOUR HEROES
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'showcase' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('showcase')}
                                >
                                    HERO SHOWCASE
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

                            {activeTab === 'dashboard' && <HeroDashboard />}
                            {activeTab === 'showcase' && <HeroShowcase />}
                            {activeTab === 'packs' && <HeroPackStore />}
                            {activeTab === 'inventory' && <HeroPackInventory />}
                        </>
                    ) : (
                        <div className="wallet-connect-prompt clip-card border-cyan">
                            <div className="accent-border top cyan"></div>

                            <div className="wallet-connect-content text-center p-10">
                                <h3 className="prompt-title text-xl font-bold mb-4 cyan-text">CONNECT WALLET TO ACCESS HEROES</h3>
                                <p className="prompt-description text-gray-400 mb-6">
                                    Connect your wallet to buy and manage heroes for the battle arena.
                                </p>
                                <WalletConnectButton color="cyan" />
                            </div>
                        </div>
                    )}
                </HeroProvider>
            </main>
        </Layout>
    );
};

export default HeroPage;