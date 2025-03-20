// src/components/sections/Marketplace/MarketplaceHero.tsx
import React from 'react';
import Button from '../../common/Button';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';

const MarketplaceHero: React.FC = () => {
    const { isConnected } = useWalletConnection();

    return (
        <section className="marketplace-hero-section">
            <div className="marketplace-hero-content clip-banner">
                <div className="accent-line top-left"></div>
                <div className="accent-line bottom-right"></div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="hero-title glow-text">QUANTUM MARKETPLACE</h2>
                        <p className="hero-subtitle">RARE ITEMS | POWER BOOSTS | EXCLUSIVE WARLORD GEAR</p>

                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-dot yellow"></div>
                                <span className="feature-text">Exclusive warlord equipment</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot yellow"></div>
                                <span className="feature-text">Battle power boosts up to +150%</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot yellow"></div>
                                <span className="feature-text">Limited edition collectibles</span>
                            </div>
                        </div>

                        <Button
                            text="BROWSE ITEMS"
                            color="yellow"
                            onClick={() => console.log('Browse items clicked')}
                        />
                    </div>

                    <div className="marketplace-info-panel clip-panel">
                        <h4 className="text-yellow-text text-sm font-semibold mb-2">MARKETPLACE HIGHLIGHTS</h4>
                        <div className="h-px w-48 bg-yellow-text/50 mb-4"></div>

                        <div className="featured-items-grid">
                            <div className="featured-item">
                                <div className="featured-item-box yellow"></div>
                                <p className="featured-item-name">Quantum Shield</p>
                                <p className="featured-item-price yellow-text">240 WLOS</p>
                            </div>
                            <div className="featured-item">
                                <div className="featured-item-box yellow"></div>
                                <p className="featured-item-name">Neural Amplifier</p>
                                <p className="featured-item-price yellow-text">185 WLOS</p>
                            </div>
                            <div className="featured-item">
                                <div className="featured-item-box yellow"></div>
                                <p className="featured-item-name">Void Disruptor</p>
                                <p className="featured-item-price yellow-text">320 WLOS</p>
                            </div>
                            <div className="featured-item">
                                <div className="featured-item-box yellow"></div>
                                <p className="featured-item-name">Energy Matrix</p>
                                <p className="featured-item-price yellow-text">95 WLOS</p>
                            </div>
                        </div>

                        {!isConnected && (
                            <div className="connect-prompt">

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketplaceHero;