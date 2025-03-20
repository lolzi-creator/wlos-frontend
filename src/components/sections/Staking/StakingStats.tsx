import React from 'react';
import Card from '../../common/Card.tsx';

const StakingStats: React.FC = () => {
    return (
        <section className="staking-stats-section">
            <div className="stats-grid">
                <Card color="green">
                    <h3 className="card-title green-text">TOTAL WLOS STAKED</h3>
                    <div className="stat-value glow-text">1,566,116</div>
                    <div className="stat-trend green-text">+124,532 this week</div>
                </Card>

                <Card color="green">
                    <h3 className="card-title green-text">ACTIVE STAKERS</h3>
                    <div className="stat-value glow-text">4,237</div>
                    <div className="stat-trend green-text">+342 new stakers</div>
                </Card>

                <Card color="green">
                    <h3 className="card-title green-text">REWARDS DISTRIBUTED</h3>
                    <div className="stat-value glow-text">246,892 WLOS</div>
                    <div className="stat-trend green-text">Since launch</div>
                </Card>
            </div>

            {/* APY Chart */}
            <div className="apy-chart-container clip-card border-green">
                <div className="accent-border top green"></div>
                <h3 className="chart-title">APY HISTORY</h3>

                <div className="chart-content">
                    <div className="chart-labels">
                        <div className="chart-label">30%</div>
                        <div className="chart-label">20%</div>
                        <div className="chart-label">10%</div>
                        <div className="chart-label">0%</div>
                    </div>

                    <div className="chart-area">
                        <svg className="apy-chart" viewBox="0 0 720 200">
                            {/* Chart Grid Lines */}
                            <line x1="0" y1="50" x2="720" y2="50" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="100" x2="720" y2="100" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="150" x2="720" y2="150" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />

                            {/* Warrior Pool Line (15.2% APY) */}
                            <path
                                d="M0,132 C60,135 120,130 180,132 C240,134 300,128 360,125 C420,122 480,120 540,118 C600,116 660,115 720,114"
                                fill="none"
                                stroke="#9945FF"
                                strokeWidth="2"
                            />

                            {/* Knight Pool Line (22.4% APY) */}
                            <path
                                d="M0,92 C60,95 120,90 180,88 C240,86 300,82 360,80 C420,78 480,75 540,72 C600,69 660,68 720,66"
                                fill="none"
                                stroke="#14F195"
                                strokeWidth="2"
                            />

                            {/* Warlord Pool Line (25.7% APY) */}
                            <path
                                d="M0,82 C60,80 120,78 180,75 C240,72 300,70 360,67 C420,64 480,60 540,58 C600,56 660,55 720,53"
                                fill="none"
                                stroke="#FFB800"
                                strokeWidth="2"
                            />

                            {/* Data Points */}
                            <circle cx="180" cy="88" r="4" fill="#14F195" />
                            <circle cx="360" cy="80" r="4" fill="#14F195" />
                            <circle cx="540" cy="72" r="4" fill="#14F195" />
                            <circle cx="720" cy="66" r="4" fill="#14F195" />
                        </svg>
                    </div>

                    <div className="chart-timeline">
                        <div className="time-label">3 Months Ago</div>
                        <div className="time-label">2 Months Ago</div>
                        <div className="time-label">1 Month Ago</div>
                        <div className="time-label">Current</div>
                    </div>
                </div>

                <div className="chart-legend">
                    <div className="legend-item">
                        <div className="legend-color purple"></div>
                        <div className="legend-label">Warrior Pool</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color green"></div>
                        <div className="legend-label">Knight Pool</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color yellow"></div>
                        <div className="legend-label">Warlord Pool</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StakingStats;