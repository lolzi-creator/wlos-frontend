import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';

const WlosTokenStats: React.FC = () => {
    const [timeRange, setTimeRange] = useState<'1d' | '7d' | '30d' | '90d' | 'all'>('30d');

    return (
        <section className="token-stats-section">
            <SectionTitle title="TOKEN ANALYTICS" />

            <div className="token-chart-container clip-card border-purple">
                <div className="accent-border top purple"></div>

                <div className="token-chart-header">
                    <div className="chart-title">WLOS/SOL EXCHANGE RATE</div>
                    <div className="chart-timerange">
                        <button
                            className={`timerange-btn ${timeRange === '1d' ? 'active' : ''}`}
                            onClick={() => setTimeRange('1d')}
                        >
                            1D
                        </button>
                        <button
                            className={`timerange-btn ${timeRange === '7d' ? 'active' : ''}`}
                            onClick={() => setTimeRange('7d')}
                        >
                            7D
                        </button>
                        <button
                            className={`timerange-btn ${timeRange === '30d' ? 'active' : ''}`}
                            onClick={() => setTimeRange('30d')}
                        >
                            30D
                        </button>
                        <button
                            className={`timerange-btn ${timeRange === '90d' ? 'active' : ''}`}
                            onClick={() => setTimeRange('90d')}
                        >
                            90D
                        </button>
                        <button
                            className={`timerange-btn ${timeRange === 'all' ? 'active' : ''}`}
                            onClick={() => setTimeRange('all')}
                        >
                            ALL
                        </button>
                    </div>
                </div>

                {/* Price Stats */}
                <div className="price-stats-bar">
                    <div className="price-stat">
                        <div className="stat-label">Current</div>
                        <div className="stat-value text-purple-text">1.24 SOL</div>
                    </div>
                    <div className="price-stat">
                        <div className="stat-label">Low</div>
                        <div className="stat-value">0.95 SOL</div>
                    </div>
                    <div className="price-stat">
                        <div className="stat-label">High</div>
                        <div className="stat-value">1.42 SOL</div>
                    </div>
                    <div className="price-stat">
                        <div className="stat-label">Avg</div>
                        <div className="stat-value">1.18 SOL</div>
                    </div>
                    <div className="price-stat">
                        <div className="stat-label">Change</div>
                        <div className="stat-value text-green-text">+12.7%</div>
                    </div>
                    <div className="price-stat">
                        <div className="stat-label">Volume</div>
                        <div className="stat-value">231K WLOS</div>
                    </div>
                </div>

                {/* Price Chart */}
                <div className="price-chart">
                    <svg className="price-chart-svg" viewBox="0 0 800 300">
                        {/* Grid lines */}
                        <line x1="0" y1="50" x2="800" y2="50" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                        <line x1="0" y1="100" x2="800" y2="100" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                        <line x1="0" y1="150" x2="800" y2="150" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                        <line x1="0" y1="200" x2="800" y2="200" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                        <line x1="0" y1="250" x2="800" y2="250" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />

                        {/* Price gradient area */}
                        <defs>
                            <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#9945FF" stopOpacity="0.5"/>
                                <stop offset="100%" stopColor="#9945FF" stopOpacity="0"/>
                            </linearGradient>
                        </defs>

                        {/* Area under the curve */}
                        <path
                            d="M0,250 C50,240 100,220 150,200 C200,180 250,190 300,170 C350,150 400,140 450,110 C500,80 550,100 600,70 C650,40 700,60 750,40 L750,300 L0,300 Z"
                            fill="url(#priceGradient)"
                        />

                        {/* Price line */}
                        <path
                            d="M0,250 C50,240 100,220 150,200 C200,180 250,190 300,170 C350,150 400,140 450,110 C500,80 550,100 600,70 C650,40 700,60 750,40"
                            fill="none"
                            stroke="#9945FF"
                            strokeWidth="2"
                        />

                        {/* Key price points */}
                        <circle cx="150" cy="200" r="4" fill="#9945FF" />
                        <circle cx="300" cy="170" r="4" fill="#9945FF" />
                        <circle cx="450" cy="110" r="4" fill="#9945FF" />
                        <circle cx="600" cy="70" r="4" fill="#9945FF" />
                        <circle cx="750" cy="40" r="4" fill="#9945FF" />
                    </svg>
                </div>

                {/* Time axis */}
                <div className="time-axis">
                    <div className="time-label">June 1</div>
                    <div className="time-label">June 8</div>
                    <div className="time-label">June 15</div>
                    <div className="time-label">June 22</div>
                    <div className="time-label">June 29</div>
                </div>
            </div>

            {/* Token statistics cards */}
            <div className="token-stats-grid">
                <div className="token-stat-card border-purple">
                    <div className="accent-border top purple"></div>
                    <div className="stat-card-content">
                        <div className="stat-card-icon holders"></div>
                        <div className="stat-card-info">
                            <div className="stat-card-value">12,487</div>
                            <div className="stat-card-label">TOKEN HOLDERS</div>
                        </div>
                        <div className="stat-card-trend green-text">+28% monthly growth</div>
                    </div>
                </div>

                <div className="token-stat-card border-purple">
                    <div className="accent-border top purple"></div>
                    <div className="stat-card-content">
                        <div className="stat-card-icon transactions"></div>
                        <div className="stat-card-info">
                            <div className="stat-card-value">342,156</div>
                            <div className="stat-card-label">TRANSACTIONS</div>
                        </div>
                        <div className="stat-card-trend green-text">Last 30 days</div>
                    </div>
                </div>

                <div className="token-stat-card border-purple">
                    <div className="accent-border top purple"></div>
                    <div className="stat-card-content">
                        <div className="stat-card-icon staked"></div>
                        <div className="stat-card-info">
                            <div className="stat-card-value">483,629</div>
                            <div className="stat-card-label">TOKENS STAKED</div>
                        </div>
                        <div className="stat-card-trend green-text">48.3% of supply</div>
                    </div>
                </div>

                <div className="token-stat-card border-purple">
                    <div className="accent-border top purple"></div>
                    <div className="stat-card-content">
                        <div className="stat-card-icon liquidity"></div>
                        <div className="stat-card-info">
                            <div className="stat-card-value">$82.6M</div>
                            <div className="stat-card-label">LIQUIDITY</div>
                        </div>
                        <div className="stat-card-trend green-text">Deep liquidity pools</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WlosTokenStats;