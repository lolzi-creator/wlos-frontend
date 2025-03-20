import React from 'react';
import SectionTitle from '../../common/SectionTitle';
import Card from '../../common/Card';

const WlosTokenUtility: React.FC = () => {
    return (
        <section className="token-utility-section">
            <SectionTitle title="TOKEN UTILITY" />

            <div className="utility-hero clip-card border-purple">
                <div className="accent-border top purple"></div>

                <h3 className="utility-hero-title purple-text">QUANTUM ECOSYSTEM UTILITY</h3>
                <p className="utility-hero-description">
                    The WLOS token serves as the foundation of the Warlords of Solana ecosystem, with multiple use cases
                    that create consistent demand and utility value across all game features.
                </p>

                <div className="utility-pulse-container">
                    <div className="utility-pulse-ring"></div>
                    <div className="utility-pulse-core">
                        <div className="utility-token-icon"></div>
                    </div>
                </div>
            </div>

            <div className="utility-grid">
                {/* Battle System Utility */}
                <div className="utility-card clip-card border-purple">
                    <div className="accent-border top purple"></div>
                    <div className="utility-card-header">
                        <div className="utility-icon battle"></div>
                        <h4 className="utility-title">BATTLE SYSTEM</h4>
                    </div>
                    <div className="utility-content">
                        <ul className="utility-list">
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Entry fees for ranked battles</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Power booster activations</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Battle rewards distribution</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Tournament prize pools</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Staking Utility */}
                <div className="utility-card clip-card border-purple">
                    <div className="accent-border top purple"></div>
                    <div className="utility-card-header">
                        <div className="utility-icon staking"></div>
                        <h4 className="utility-title">STAKING SYSTEM</h4>
                    </div>
                    <div className="utility-content">
                        <ul className="utility-list">
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Stake to earn passive rewards</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Battle power amplification</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Unlock special abilities</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Pool liquidity provision</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Marketplace Utility */}
                <div className="utility-card clip-card border-purple">
                    <div className="accent-border top purple"></div>
                    <div className="utility-card-header">
                        <div className="utility-icon marketplace"></div>
                        <h4 className="utility-title">MARKETPLACE</h4>
                    </div>
                    <div className="utility-content">
                        <ul className="utility-list">
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Purchase rare items</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Listing fees for sellers</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Trade fees discounts</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Special item access</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Governance Utility */}
                <div className="utility-card clip-card border-purple">
                    <div className="accent-border top purple"></div>
                    <div className="utility-card-header">
                        <div className="utility-icon governance"></div>
                        <h4 className="utility-title">GOVERNANCE</h4>
                    </div>
                    <div className="utility-content">
                        <ul className="utility-list">
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Voting rights on game updates</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Feature development prioritization</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Ecosystem parameter adjustments</span>
                            </li>
                            <li className="utility-list-item">
                                <div className="list-dot purple"></div>
                                <span>Community treasury management</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="utility-benefits-section">
                <h3 className="benefits-title">TOKEN VALUE DRIVERS</h3>

                <div className="benefits-grid">
                    <Card color="purple">
                        <div className="benefit-card-content">
                            <div className="benefit-icon deflationary"></div>
                            <h4 className="benefit-title purple-text">DEFLATIONARY MECHANICS</h4>
                            <p className="benefit-description">5% of all marketplace transactions are burnt, reducing total supply over time and increasing token scarcity.</p>
                        </div>
                    </Card>

                    <Card color="purple">
                        <div className="benefit-card-content">
                            <div className="benefit-icon rewards"></div>
                            <h4 className="benefit-title purple-text">REWARDS ECOSYSTEM</h4>
                            <p className="benefit-description">Sustainable rewards system with multiple earning opportunities and balanced token emission schedule.</p>
                        </div>
                    </Card>

                    <Card color="purple">
                        <div className="benefit-card-content">
                            <div className="benefit-icon utility"></div>
                            <h4 className="benefit-title purple-text">GROWING UTILITY</h4>
                            <p className="benefit-description">Expanding use cases with each game update, creating consistent demand across the entire ecosystem.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default WlosTokenUtility;