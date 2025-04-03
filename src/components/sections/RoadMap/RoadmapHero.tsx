import React from 'react';

const RoadmapHero: React.FC = () => {
    return (
        <section className="roadmap-hero-section">
            <div className="roadmap-hero-content clip-banner">
                <div className="accent-line top-left"></div>
                <div className="accent-line bottom-right"></div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="hero-title glow-text">WARLORDS OF SOLANA ROADMAP</h2>
                        <p className="hero-subtitle">FARMERS • STAKING • HEROES • BATTLES</p>

                        <div className="roadmap-hero-desc">
                            <p>The Warlords of Solana roadmap outlines our strategic development from the current pre-game phase through the exciting battle phase and beyond.</p>
                        </div>

                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-dot purple"></div>
                                <span className="feature-text">Farmer NFTs and staking mechanisms</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot purple"></div>
                                <span className="feature-text">Weekly leaderboards with token rewards</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot orange"></div>
                                <span className="feature-text">Hero collection and battle system in 2025</span>
                            </div>
                        </div>
                    </div>

                    <div className="roadmap-progress-panel clip-panel">
                        <h4 className="text-blue-text text-sm font-semibold mb-2">DEVELOPMENT PROGRESS</h4>
                        <div className="h-px w-48 bg-blue-text/50 mb-4"></div>

                        <div className="progress-metrics">
                            <div className="progress-metric">
                                <div className="metric-label">Overall Completion</div>
                                <div className="progress-bar-container">
                                    <div className="progress-bar-bg">
                                        <div className="progress-bar purple" style={{ width: '38%' }}>
                                            <div className="progress-glow"></div>
                                        </div>
                                    </div>
                                    <div className="progress-value">38% Complete</div>
                                </div>
                            </div>

                            <div className="current-phase">
                                <div className="phase-header">
                                    <div className="phase-dot purple"></div>
                                    <div className="phase-title">CURRENT PHASE: PRE-GAME</div>
                                </div>
                                <div className="phase-description">
                                    Establishing farmer NFT marketplace, deploying staking mechanisms, and implementing weekly leaderboards with token rewards.
                                </div>
                                <div className="phase-timeline">Q4 2024 - Q1 2025</div>
                            </div>

                            <div className="next-milestone">
                                <div className="milestone-header">
                                    <div className="milestone-icon"></div>
                                    <div className="milestone-title">NEXT MILESTONE: STAKING SYSTEM</div>
                                </div>
                                <div className="milestone-date">Estimated Completion: November 25, 2024</div>
                                <div className="milestone-progress-bar">
                                    <div className="milestone-progress purple" style={{ width: '78%' }}></div>
                                </div>
                                <div className="milestone-percentage">78%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoadmapHero;