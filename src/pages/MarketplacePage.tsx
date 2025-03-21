// src/pages/MarketplacePage.tsx
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import MarketplaceHero from '../components/sections/Marketplace/MarketplaceHero';
import MarketplaceStats from '../components/sections/Marketplace/MarketplaceStats';
import FeaturedItems from '../components/sections/Marketplace/FeaturedItems';
import MarketplaceCategories from '../components/sections/Marketplace/MarketplaceCategories';
import MarketplaceItems from '../components/sections/Marketplace/MarketplaceItems';
import InventoryCategories from '../components/sections/Marketplace/InventoryCategories';
import InventoryItems from '../components/sections/Marketplace/InventoryItems';
import { useWalletConnection } from '../context/WalletConnectionProvider';
import WalletConnectButton from '../components/common/WalletConnectButton';

const MarketplacePage: React.FC = () => {
    // Three main tabs
    const [activeTab, setActiveTab] = useState<'stats' | 'marketplace' | 'inventory'>('stats');

    // Filters & Sorting
    const [selectedMarketCategory, setSelectedMarketCategory] = useState<string>('all');
    const [selectedInventoryCategory, setSelectedInventoryCategory] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<'price_asc' | 'price_desc' | 'recent'>('recent');

    // Animation line
    const [activeLine, setActiveLine] = useState(0);

    // Wallet connection
    const { isConnected } = useWalletConnection();

    // Animation for scanning effect
    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveLine(prev => (prev + 1) % 100);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    // Handle "View All Items" click
    const handleViewAllItems = () => {
        setActiveTab('marketplace');
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
                    background: "linear-gradient(90deg, rgba(255, 184, 0, 0) 0%, rgba(255, 184, 0, 0.5) 50%, rgba(255, 184, 0, 0) 100%)",
                    opacity: 0.3,
                    zIndex: 5,
                    pointerEvents: "none"
                }}
            />

            {/* Background effects */}
            <div className="background-effects">
                <div className="bg-grid"></div>
                <div className="energy-orb yellow-orb" style={{ left: '30%', top: '20%' }}></div>
                <div className="energy-orb purple-orb" style={{ right: '10%', top: '40%', opacity: '0.1' }}></div>
            </div>

            <main className="main-content">
                {isConnected ? (
                    <>
                        {/* Main navigation tabs - now at the top */}
                        <div className="page-tabs">
                            <button
                                className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
                                onClick={() => setActiveTab('stats')}
                            >
                                STATS
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'marketplace' ? 'active' : ''}`}
                                onClick={() => setActiveTab('marketplace')}
                            >
                                MARKETPLACE
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
                                onClick={() => setActiveTab('inventory')}
                            >
                                MY INVENTORY
                            </button>
                            <div className="tab-line"></div>
                        </div>

                        {/* Stats tab content */}
                        {activeTab === 'stats' && (
                            <>
                                <MarketplaceHero />
                                <MarketplaceStats />
                                <FeaturedItems onViewAll={handleViewAllItems} />
                            </>
                        )}

                        {/* Marketplace tab content */}
                        {activeTab === 'marketplace' && (
                            <>
                                <MarketplaceCategories
                                    selectedCategory={selectedMarketCategory}
                                    onSelectCategory={setSelectedMarketCategory}
                                />
                                <MarketplaceItems
                                    category={selectedMarketCategory}
                                    sortOrder={sortOrder}
                                    onChangeSortOrder={setSortOrder}
                                />
                            </>
                        )}

                        {/* Inventory tab content */}
                        {activeTab === 'inventory' && (
                            <>
                                <InventoryCategories
                                    selectedCategory={selectedInventoryCategory}
                                    onSelectCategory={setSelectedInventoryCategory}
                                />
                                <InventoryItems filterType={selectedInventoryCategory} />
                            </>
                        )}
                    </>
                ) : (
                    // Wallet connection prompt
                    <>
                        {/* Show hero section for non-connected users too */}
                        <MarketplaceHero />

                        <div className="wallet-connect-prompt clip-card border-yellow">
                            <div className="accent-border top yellow"></div>

                            <div className="wallet-connect-content text-center p-10">
                                <h3 className="prompt-title text-xl font-bold mb-4 yellow-text">CONNECT WALLET TO ACCESS MARKETPLACE</h3>
                                <p className="prompt-description text-gray-400 mb-6">
                                    Connect your wallet to browse, buy and sell items in the marketplace.
                                </p>
                                <WalletConnectButton color="yellow" />
                            </div>
                        </div>
                    </>
                )}
            </main>
        </Layout>
    );
};

export default MarketplacePage;