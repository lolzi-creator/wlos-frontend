// src/pages/HeroPage.tsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import HeroDashboardSection from '../components/sections/Heroes/new/HeroDashboardSection';
import HeroShowcaseSection from '../components/sections/Heroes/new/HeroShowcaseSection';
import HeroHeroSection from '../components/sections/Heroes/new/HeroHeroSection';
import GenericPackStore from '../components/common/GenericPackStore';
import GenericPackInventory from '../components/common/GenericPackInventory';
import { useWalletConnection } from '../context/WalletConnectionProvider';
import WalletConnectButton from '../components/common/WalletConnectButton';
import { HeroProvider, useHero } from '../context/HeroContext';
import { HERO_PACKS } from '../types/HeroTypes';
import '../styles/modules/heroes/new/HeroesPage.css';

// Inner component that uses the Hero context
const HeroPageContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'showcase' | 'packs' | 'inventory'>('dashboard');
    const [activeLine, setActiveLine] = useState(0);
    const { isConnected } = useWalletConnection();
    const { buyPack, openPack, ownedPacks, isLoading, error } = useHero();

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
                {isConnected ? (
                    <>
                        {/* Hero Hero Section - Always visible */}
                        <HeroHeroSection />
                        
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

                        {activeTab === 'dashboard' && <HeroDashboardSection />}
                        {activeTab === 'showcase' && <HeroShowcaseSection />}
                        {activeTab === 'packs' && (
                            <GenericPackStore
                                packs={HERO_PACKS}
                                entityType="hero"
                                buyPack={buyPack}
                                isLoading={isLoading}
                                error={error}
                                title="HERO PACKS"
                            />
                        )}
                        {activeTab === 'inventory' && (
                            <GenericPackInventory
                                ownedPacks={ownedPacks}
                                packs={HERO_PACKS}
                                openPack={openPack}
                                isLoading={isLoading}
                                error={error}
                                entityType="hero"
                                title="YOUR PACKS"
                            />
                        )}
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
            </main>
        </Layout>
    );
};

// Main component that wraps the content with the HeroProvider
const HeroPage: React.FC = () => {
    return (
        <HeroProvider>
            <HeroPageContent />
        </HeroProvider>
    );
};

export default HeroPage;