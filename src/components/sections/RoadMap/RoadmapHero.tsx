import React from 'react';

const RoadmapHero: React.FC = () => {
    return (
        <section className="roadmap-hero-section">
            <div className="roadmap-hero-content clip-banner">
                <div className="accent-line top-left"></div>
                <div className="accent-line bottom-right"></div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="hero-title glow-text">NEURAL NETWORK ROADMAP</h2>
                        <p className="hero-subtitle">STRATEGIC EXPANSION | ECOSYSTEM DEVELOPMENT | QUANTUM EVOLUTION</p>

                        <div className="roadmap-hero-desc">
                            <p>The Warlords of Solana roadmap outlines our vision for evolving the ecosystem through strategic development phases and feature deployments.</p>
                        </div>

                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-dot blue"></div>
                                <span className="feature-text">Ecosystem expansion through 2025</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot blue"></div>
                                <span className="feature-text">New battle mechanics & game modes</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot blue"></div>
                                <span className="feature-text">Enhanced staking & reward systems</span>
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
                                        <div className="progress-bar blue" style={{ width: '42%' }}>
                                            <div className="progress-glow"></div>
                                        </div>
                                    </div>
                                    <div className="progress-value">42% Complete</div>
                                </div>
                            </div>

                            <div className="current-phase">
                                <div className="phase-header">
                                    <div className="phase-dot blue"></div>
                                    <div className="phase-title">CURRENT PHASE: NEURAL EXPANSION</div>
                                </div>
                                <div className="phase-description">
                                    Enhancing core battle mechanics, expanding marketplace functionality, and implementing advanced staking mechanisms.
                                </div>
                                <div className="phase-timeline">Q1 2025 - Q2 2025</div>
                            </div>

                            <div className="next-milestone">
                                <div className="milestone-header">
                                    <div className="milestone-icon"></div>
                                    <div className="milestone-title">NEXT MILESTONE: TOURNAMENT SYSTEM</div>
                                </div>
                                <div className="milestone-date">Estimated Completion: April 12, 2025</div>
                                <div className="milestone-progress-bar">
                                    <div className="milestone-progress blue" style={{ width: '65%' }}></div>
                                </div>
                                <div className="milestone-percentage">65%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoadmapHero;