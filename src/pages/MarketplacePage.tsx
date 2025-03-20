import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import MarketplaceHero from '../components/sections/Marketplace/MarketplaceHero.tsx';
import MarketplaceCategories from '../components/sections/Marketplace/MarketplaceCategories';
import MarketplaceItems from '../components/sections/Marketplace/MarketplaceItems';
import MarketplaceStats from '../components/sections/Marketplace/MarketplaceStats';

const MarketplacePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'browse' | 'inventory'>('browse');
    const [activeLine, setActiveLine] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<'price_asc' | 'price_desc' | 'recent'>('recent');

    // Animation for scanning effect
    React.useEffect(() => {
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
                <div className="page-tabs">
                    <button
                        className={`tab-button ${activeTab === 'browse' ? 'active' : ''}`}
                        onClick={() => setActiveTab('browse')}
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

                {activeTab === 'browse' ? (
                    <>
                        <MarketplaceHero />
                        <MarketplaceStats />
                        <MarketplaceCategories
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                        <MarketplaceItems
                            category={selectedCategory}
                            sortOrder={sortOrder}
                            onChangeSortOrder={setSortOrder}
                        />
                    </>
                ) : (
                    // You can add the Inventory component here later
                    <div className="coming-soon-section">
                        <div className="clip-card border-yellow p-8 text-center">
                            <div className="accent-border top yellow"></div>
                            <h2 className="text-2xl font-bold mb-4 yellow-text">INVENTORY COMING SOON</h2>
                            <p className="text-gray-400 mb-6">Your personal inventory section is under development. Soon you'll be able to view and manage all your WLOS items here.</p>
                            <div className="flex justify-center">
                                <div className="loading-indicator">
                                    <div className="loading-dot yellow-bg"></div>
                                    <div className="loading-dot yellow-bg"></div>
                                    <div className="loading-dot yellow-bg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default MarketplacePage;