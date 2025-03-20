import React from 'react';
import Card from '../../common/Card';

const MarketplaceStats: React.FC = () => {
    return (
        <section className="marketplace-stats-section">
            <div className="stats-grid">
                <Card color="yellow">
                    <h3 className="card-title yellow-text">ACTIVE LISTINGS</h3>
                    <div className="stat-value glow-text">2,487</div>
                    <div className="stat-trend green-text">+156 new items</div>
                </Card>

                <Card color="yellow">
                    <h3 className="card-title yellow-text">ITEMS TRADED</h3>
                    <div className="stat-value glow-text">12,653</div>
                    <div className="stat-trend green-text">+842 this week</div>
                </Card>

                <Card color="yellow">
                    <h3 className="card-title yellow-text">MARKETPLACE VOLUME</h3>
                    <div className="stat-value glow-text">584,328 WLOS</div>
                    <div className="stat-trend green-text">+15% growth</div>
                </Card>
            </div>

            {/* Trading Volume Chart */}
            <div className="volume-chart-container clip-card border-yellow">
                <div className="accent-border top yellow"></div>
                <h3 className="chart-title yellow-text">TRADING VOLUME</h3>

                <div className="chart-content">
                    <div className="chart-labels">
                        <div className="chart-label">50K</div>
                        <div className="chart-label">40K</div>
                        <div className="chart-label">30K</div>
                        <div className="chart-label">20K</div>
                        <div className="chart-label">10K</div>
                        <div className="chart-label">0</div>
                    </div>

                    <div className="chart-area">
                        <svg className="volume-chart" viewBox="0 0 720 200">
                            {/* Chart Grid Lines */}
                            <line x1="0" y1="33" x2="720" y2="33" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="66" x2="720" y2="66" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="99" x2="720" y2="99" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="132" x2="720" y2="132" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="165" x2="720" y2="165" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />

                            {/* Volume Bars */}
                            <rect x="30" y="120" width="40" height="80" fill="rgba(255, 184, 0, 0.2)" stroke="#FFB800" strokeWidth="1" />
                            <rect x="90" y="100" width="40" height="100" fill="rgba(255, 184, 0, 0.2)" stroke="#FFB800" strokeWidth="1" />
                            <rect x="150" y="80" width="40" height="120" fill="rgba(255, 184, 0, 0.2)" stroke="#FFB800" strokeWidth="1" />
                            <rect x="210" y="90" width="40" height="110" fill="rgba(255, 184, 0, 0.2)" stroke="#FFB800" strokeWidth="1" />
                            <rect x="270" y="110" width="40" height="90" fill="rgba(255, 184, 0, 0.2)" stroke="#FFB800" strokeWidth="1" />
                            <rect x="330" y="70" width="40" height="130" fill="rgba(255, 184, 0, 0.3)" stroke="#FFB800" strokeWidth="1" />
                            <rect x="390" y="50" width="40" height="150" fill="rgba(255, 184, 0, 0.4)" stroke="#FFB800" strokeWidth="1" />
                            <rect x="450" y="60" width="40" height="140" fill="rgba(255, 184, 0, 0.3)" stroke="#FFB800" strokeWidth="1" />
                            <rect x="510" y="40" width="40" height="160" fill="rgba(255, 184, 0, 0.4)" stroke="#FFB800" strokeWidth="1" />
                            <rect x="570" y="30" width="40" height="170" fill="rgba(255, 184, 0, 0.5)" stroke="#FFB800" strokeWidth="1" />
                            <rect x="630" y="20" width="40" height="180" fill="rgba(255, 184, 0, 0.6)" stroke="#FFB800" strokeWidth="1" />

                            {/* Trend Line */}
                            <path
                                d="M50,130 L110,110 L170,90 L230,100 L290,120 L350,80 L410,60 L470,70 L530,50 L590,40 L650,30"
                                fill="none"
                                stroke="#FFB800"
                                strokeWidth="2"
                            />

                            {/* Trend Points */}
                            <circle cx="50" cy="130" r="4" fill="#FFB800" />
                            <circle cx="110" cy="110" r="4" fill="#FFB800" />
                            <circle cx="170" cy="90" r="4" fill="#FFB800" />
                            <circle cx="230" cy="100" r="4" fill="#FFB800" />
                            <circle cx="290" cy="120" r="4" fill="#FFB800" />
                            <circle cx="350" cy="80" r="4" fill="#FFB800" />
                            <circle cx="410" cy="60" r="4" fill="#FFB800" />
                            <circle cx="470" cy="70" r="4" fill="#FFB800" />
                            <circle cx="530" cy="50" r="4" fill="#FFB800" />
                            <circle cx="590" cy="40" r="4" fill="#FFB800" />
                            <circle cx="650" cy="30" r="4" fill="#FFB800" />
                        </svg>
                    </div>
                </div>

                <div className="chart-timeline">
                    <div className="time-label">Jan</div>
                    <div className="time-label">Feb</div>
                    <div className="time-label">Mar</div>
                    <div className="time-label">Apr</div>
                    <div className="time-label">May</div>
                    <div className="time-label">Jun</div>
                    <div className="time-label">Jul</div>
                    <div className="time-label">Aug</div>
                    <div className="time-label">Sep</div>
                    <div className="time-label">Oct</div>
                    <div className="time-label">Nov</div>
                </div>
            </div>
        </section>
    );
};

export default MarketplaceStats;