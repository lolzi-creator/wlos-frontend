import React from 'react';
import Button from '../common/Button';
import SectionTitle from '../common/SectionTitle';

const FeaturesSection: React.FC = () => {
    return (
        <section className="features-section">
            <SectionTitle title="NEURAL COMBAT SYSTEMS" />

            <div className="features-grid">
                {/* Battle Card */}
                <div className="feature-card border-purple">
                    <div className="accent-border top purple"></div>

                    <h3 className="feature-title">BATTLE ARENA</h3>

                    <div className="feature-desc">STRATEGIC BATTLE SYSTEM</div>
                    <div className="feature-desc">ADVANCED BATTLE TACTICS</div>

                    {/* Battle Power Bar */}
                    <div className="power-bar-container">
                        <div className="power-bar-bg">
                            <div className="power-bar purple" style={{ width: '85%' }}>
                                <div className="energy-flow"></div>
                            </div>
                        </div>
                        <div className="power-label">BATTLE POWER: 85%</div>
                    </div>

                    <div className="feature-footer">
                        <Button
                            text="BATTLE NOW"
                            color="purple"
                            onClick={() => console.log('Initialize battle')}
                        />

                        <div className="feature-metric">
                            <div className="metric-value purple-text">2.4 SOL</div>
                            <div className="metric-line purple"></div>
                            <div className="metric-dot purple"></div>
                        </div>
                    </div>
                </div>

                {/* Staking Card */}
                <div className="feature-card border-green">
                    <div className="accent-border top green"></div>

                    <h3 className="feature-title">STAKING VAULT</h3>

                    <div className="feature-desc">EARN PASSIVE REWARDS</div>
                    <div className="feature-desc">ENHANCE BATTLE CAPABILITIES</div>

                    {/* Staking Graph */}
                    <div className="stake-graph-container">
                        <svg className="stake-graph" viewBox="0 0 240 60">
                            <path
                                d="M0,30 C20,10 40,50 60,30 C80,10 100,50 120,30 C140,10 160,50 180,30 C200,10 220,50 240,30"
                                className="graph-line green"
                            />
                            <circle cx="60" cy="30" r="4" className="graph-point green" />
                            <circle cx="120" cy="30" r="4" className="graph-point green" />
                            <circle cx="180" cy="30" r="4" className="graph-point green" />
                        </svg>
                        <div className="graph-label">STAKING YIELD: 25.7%</div>
                    </div>

                    <div className="feature-footer">
                        <Button
                            text="STAKE WLOS"
                            color="green"
                            onClick={() => console.log('Stake WLOS')}
                        />

                        <div className="feature-metric">
                            <div className="metric-value green-text">25.7% APY</div>
                            <div className="metric-line green"></div>
                            <div className="metric-dot green"></div>
                        </div>
                    </div>
                </div>

                {/* Marketplace Card */}
                <div className="feature-card border-yellow">
                    <div className="accent-border top yellow"></div>

                    <h3 className="feature-title">POWER BOOSTS</h3>

                    <div className="feature-desc">QUANTUM BOOSTS FOR WARLORDS</div>
                    <div className="feature-desc">POWER UP YOUR WARLORDS</div>

                    {/* Item Blocks */}
                    <div className="item-blocks">
                        <div className="item-block yellow"></div>
                        <div className="item-block yellow"></div>
                        <div className="item-block yellow"></div>
                        <div className="item-block yellow"></div>
                        <div className="item-block yellow"></div>
                    </div>
                    <div className="items-label">BOOST COLLECTION</div>

                    <div className="feature-footer">
                        <Button
                            text="ENHANCE"
                            color="yellow"
                            onClick={() => console.log('Enhance')}
                        />

                        <div className="feature-metric">
                            <div className="metric-value yellow-text">14 ITEMS</div>
                            <div className="metric-line yellow"></div>
                            <div className="metric-dot yellow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;