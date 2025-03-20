import React from 'react';
import SectionTitle from '../../common/SectionTitle';
import Button from '../../common/Button';

const WlosTokenAcquisition: React.FC = () => {
    return (
        <section className="token-acquisition-section">
            <SectionTitle title="ACQUIRE WLOS TOKENS" />

            <div className="acquisition-container">
                <div className="acquisition-methods-grid">
                    {/* DEX Exchange */}
                    <div className="acquisition-card border-purple">
                        <div className="accent-border top purple"></div>

                        <div className="acquisition-icon exchange"></div>
                        <h3 className="acquisition-title">QUANTUM EXCHANGE</h3>

                        <div className="acquisition-description">
                            <p>Trade SOL for WLOS tokens on major decentralized exchanges with deep liquidity pools.</p>
                        </div>

                        <div className="acquisition-details">
                            <div className="detail-row">
                                <div className="detail-label">Trading Pairs</div>
                                <div className="detail-value">WLOS/SOL, WLOS/USDC</div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-label">Slippage</div>
                                <div className="detail-value">0.1% - 0.5%</div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-label">Liquidity</div>
                                <div className="detail-value text-green-text">High</div>
                            </div>
                        </div>

                        <Button
                            text="TRADE NOW"
                            color="purple"
                            onClick={() => console.log('Trade Now clicked')}
                            fullWidth={true}
                        />
                    </div>

                    {/* Battle Rewards */}
                    <div className="acquisition-card border-purple">
                        <div className="accent-border top purple"></div>

                        <div className="acquisition-icon battle"></div>
                        <h3 className="acquisition-title">BATTLE REWARDS</h3>

                        <div className="acquisition-description">
                            <p>Earn WLOS tokens by participating in battles and ranked competitions in the game.</p>
                        </div>

                        <div className="acquisition-details">
                            <div className="detail-row">
                                <div className="detail-label">Daily Battles</div>
                                <div className="detail-value">1-5 WLOS per win</div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-label">Weekly Tournaments</div>
                                <div className="detail-value">10-100 WLOS</div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-label">Acquisition Speed</div>
                                <div className="detail-value text-yellow-text">Medium</div>
                            </div>
                        </div>

                        <Button
                            text="BATTLE NOW"
                            color="purple"
                            onClick={() => console.log('Battle Now clicked')}
                            fullWidth={true}
                        />
                    </div>

                    {/* Staking Rewards */}
                    <div className="acquisition-card border-purple">
                        <div className="accent-border top purple"></div>

                        <div className="acquisition-icon staking"></div>
                        <h3 className="acquisition-title">STAKING REWARDS</h3>

                        <div className="acquisition-description">
                            <p>Stake your existing WLOS tokens to earn passive rewards over time.</p>
                        </div>

                        <div className="acquisition-details">
                            <div className="detail-row">
                                <div className="detail-label">APY Range</div>
                                <div className="detail-value">15.2% - 25.7%</div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-label">Lock Periods</div>
                                <div className="detail-value">7 - 90 days</div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-label">Acquisition Speed</div>
                                <div className="detail-value text-red-500">Slow</div>
                            </div>
                        </div>

                        <Button
                            text="STAKE WLOS"
                            color="purple"
                            onClick={() => console.log('Stake WLOS clicked')}
                            fullWidth={true}
                        />
                    </div>
                </div>

                {/* Direct Purchase Card */}
                <div className="direct-purchase-card clip-card border-purple">
                    <div className="accent-border top purple"></div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="purchase-title purple-text">DIRECT PURCHASE</h3>
                            <p className="purchase-description">Convert SOL to WLOS tokens instantly with our direct swap feature. No complex DEX interfaces required.</p>

                            <div className="swap-features">
                                <div className="feature-item">
                                    <div className="feature-dot purple"></div>
                                    <span className="feature-text">Instant token delivery</span>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-dot purple"></div>
                                    <span className="feature-text">Low 0.5% conversion fee</span>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-dot purple"></div>
                                    <span className="feature-text">Min purchase: 5 SOL</span>
                                </div>
                            </div>
                        </div>

                        <div className="swap-form">
                            <div className="form-group">
                                <div className="swap-input-container">
                                    <div className="swap-label">You Pay</div>
                                    <div className="input-with-max">
                                        <input
                                            type="text"
                                            placeholder="0.00"
                                            className="swap-input"
                                        />
                                        <div className="currency-selector">
                                            <div className="currency-icon sol"></div>
                                            <span className="currency-code">SOL</span>
                                        </div>
                                    </div>
                                    <div className="balance-display">Balance: 0 SOL</div>
                                </div>

                                <div className="swap-arrow">
                                    <div className="arrow-icon"></div>
                                </div>

                                <div className="swap-input-container">
                                    <div className="swap-label">You Receive</div>
                                    <div className="input-with-max">
                                        <input
                                            type="text"
                                            placeholder="0.00"
                                            className="swap-input"
                                            disabled
                                        />
                                        <div className="currency-selector">
                                            <div className="currency-icon wlos"></div>
                                            <span className="currency-code">WLOS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="conversion-rate">
                                <span className="rate-label">Rate:</span>
                                <span className="rate-value">1 SOL = 124 WLOS</span>
                            </div>

                            <Button
                                text="CONNECT WALLET TO SWAP"
                                color="purple"
                                onClick={() => console.log('Connect wallet to swap clicked')}
                                fullWidth={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WlosTokenAcquisition;