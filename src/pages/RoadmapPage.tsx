import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

const RoadmapPage: React.FC = () => {
    const [activePhase, setActivePhase] = useState<number>(1);

    // Phase data
    const phases = [
        {
            id: 1,
            title: "Genesis",
            period: "Q4 2023",
            status: "completed",
            description: "Foundation of the ecosystem with secure infrastructure and user-friendly platform",
            objectives: [
                { icon: "rocket", text: "Platform infrastructure deployment", date: "October 2023" },
                { icon: "users", text: "Intuitive UI/UX design", date: "November 2023" },
                { icon: "shield", text: "Secure backend transactions", date: "November 2023" },
                { icon: "connect", text: "Extensive testing & security audits", date: "December 2023" }
            ]
        },
        {
            id: 2,
            title: "Pre-Game Phase",
            period: "Q1 2024",
            status: "completed",
            description: "WLOS acquisition and preparation phase for the upcoming battle system",
            objectives: [
                { icon: "wallet", text: "Farming & staking system", date: "January 2024" },
                { icon: "chart", text: "Farmer NFTs marketplace", date: "January 2024" },
                { icon: "ecosystem", text: "Tokenomics & rewards", date: "January-February 2024" },
                { icon: "token", text: "WLOS token launch", date: "February 2024" }
            ]
        },
        {
            id: 3,
            title: "Battle System",
            period: "Q2-Q3 2024",
            status: "in-progress",
            description: "Introduction of the core battle mechanics and hero collection",
            objectives: [
                { icon: "innovation", text: "Hero NFT collection", date: "May 2024" },
                { icon: "partnership", text: "Battle system mechanics", date: "June 2024" },
                { icon: "governance", text: "Tournaments & leaderboards", date: "July 2024" },
                { icon: "shield", text: "Hero upgrade system", date: "August 2024" }
            ]
        },
        {
            id: 4,
            title: "Multiverse Expansion",
            period: "Q4 2024+",
            status: "planned",
            description: "Expanding the Warlords universe with advanced features and cross-chain capabilities",
            objectives: [
                { icon: "globe", text: "Cross-chain integration", date: "October 2024" },
                { icon: "connect", text: "Guild system & alliances", date: "November 2024" },
                { icon: "ecosystem", text: "Advanced marketplace", date: "December 2024" },
                { icon: "innovation", text: "Metaverse integration", date: "Q1 2025" }
            ]
        }
    ];

    return (
        <Layout>
            <div className="roadmap-bg">
                <div className="glowing-line"></div>
                <div className="grid-overlay"></div>
            </div>
            
            <main className="roadmap-container">
                <div className="roadmap-header">
                    <h1 className="roadmap-title">Warlords of Solana Roadmap</h1>
                    <p className="roadmap-description">
                        Strategic development plan for the Warlords of Solana ecosystem
                    </p>
                </div>

                {/* Horizontal Timeline */}
                <div className="horizontal-timeline">
                    <div className="timeline-track">
                        <div className="timeline-line">
                            <div className="timeline-progress" style={{
                                width: `${(phases.findIndex(p => p.status === 'completed') + 1) * 33.3}%`,
                                '--active-phases': phases.findIndex(p => p.status === 'completed') + 1
                            } as React.CSSProperties}></div>
                        </div>
                        
                        {phases.map((phase) => (
                            <div 
                                key={phase.id} 
                                className={`timeline-point ${phase.status} ${activePhase === phase.id ? 'active' : ''}`}
                                onClick={() => setActivePhase(phase.id)}
                            >
                                <div className="timeline-circle">
                                    <span>{phase.id}</span>
                                </div>
                                <div className="timeline-label">
                                    <div className="timeline-title">{phase.title}</div>
                                    <div className="timeline-period">{phase.period}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Phase Details */}
                {phases.map(phase => (
                    activePhase === phase.id && (
                        <div key={phase.id} className={`phase-detail-card ${phase.status}`}>
                            <div className="phase-tag">Phase {phase.id}</div>
                            
                            <div className="phase-card-header">
                                <h2 className="phase-card-title">{phase.title}</h2>
                                <div className={`phase-status ${phase.status}`}>
                                    {phase.status === 'completed' ? 'COMPLETED' : 
                                     phase.status === 'in-progress' ? 'IN PROGRESS' : 'PLANNED'}
                                </div>
                            </div>
                            
                            <p className="phase-card-description">{phase.description}</p>
                            
                            <div className="phase-objectives">
                                <h3 className="objectives-title">{`${phase.title} Objectives`}</h3>
                                <div className="objectives-grid">
                                    {phase.objectives.map((objective, index) => (
                                        <div key={index} className="objective-item">
                                            <div className={`objective-icon ${objective.icon}`}>
                                                <span className="icon-inner"></span>
                                            </div>
                                            <div className="objective-text">
                                                {objective.text}
                                                <span className="objective-date">{objective.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </main>
        </Layout>
    );
};

export default RoadmapPage;