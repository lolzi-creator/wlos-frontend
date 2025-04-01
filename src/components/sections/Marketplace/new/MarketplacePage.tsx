import React, { useState } from 'react';
import Layout from '../../../layout/Layout';
import { useWalletConnection } from '../../../../context/WalletConnectionProvider';
import WalletConnectButton from '../../../common/WalletConnectButton';
import MarketplaceHeroSection from './MarketplaceHeroSection';
import MarketplaceStatsSection from './MarketplaceStatsSection';
import MarketplaceItemsSection from './MarketplaceItemsSection';
import MarketplaceInventorySection from './MarketplaceInventorySection';
import MarketplaceListingsSection from './MarketplaceListingsSection';
import '../../../../styles/modules/marketplace/new/MarketplacePage.css';

const MarketplacePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'browse' | 'inventory' | 'listings'>('browse');
    const [sortOrder, setSortOrder] = useState<'price_asc' | 'price_desc' | 'newest' | 'oldest'>('newest');
    const { isConnected } = useWalletConnection();

    const handleViewAllItems = () => {
        setActiveTab('browse');
    };

    return (
        <Layout>
            <div className="marketplace-page">
                <div className="page-background">
                    <div className="bg-grid"></div>
                    <div className="bg-glow"></div>
                    <div className="bg-particles"></div>
                </div>

                <MarketplaceHeroSection onViewAll={handleViewAllItems} />
                <MarketplaceStatsSection />

                {isConnected ? (
                    <>
                        <div className="marketplace-tabs-container">
                            <div className="tabs-wrapper">
                                <div className="tabs-nav">
                                    <button
                                        className={`tab-button ${activeTab === 'browse' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('browse')}
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 6L3 18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M6 8H6.01M18 8H18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>BROWSE MARKETPLACE</span>
                                    </button>
                                    <button
                                        className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('inventory')}
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>MY INVENTORY</span>
                                    </button>
                                    <button
                                        className={`tab-button ${activeTab === 'listings' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('listings')}
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>MY LISTINGS</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'browse' && (
                                <MarketplaceItemsSection 
                                    sortOrder={sortOrder}
                                    onChangeSortOrder={setSortOrder}
                                />
                            )}

                            {activeTab === 'inventory' && (
                                <MarketplaceInventorySection />
                            )}

                            {activeTab === 'listings' && (
                                <MarketplaceListingsSection />
                            )}
                        </div>
                    </>
                ) : (
                    <div className="connect-wallet-section">
                        <div className="connect-wallet-card">
                            <div className="card-content">
                                <h3 className="connect-title">CONNECT WALLET TO ACCESS MARKETPLACE</h3>
                                <p className="connect-description">
                                    Connect your wallet to browse, buy and sell items in the marketplace.
                                </p>
                                <div className="features-list">
                                    <div className="feature">
                                        <div className="feature-icon">🛒</div>
                                        <span>Buy rare and unique items for your battles</span>
                                    </div>
                                    <div className="feature">
                                        <div className="feature-icon">💰</div>
                                        <span>Sell items from your inventory for WLO</span>
                                    </div>
                                    <div className="feature">
                                        <div className="feature-icon">⚡</div>
                                        <span>Enhance your warlord's powers with special equipment</span>
                                    </div>
                                </div>
                                <WalletConnectButton color="yellow" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default MarketplacePage; 