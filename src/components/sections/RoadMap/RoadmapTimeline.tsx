import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';

const RoadmapTimeline: React.FC = () => {
    const [activePhase, setActivePhase] = useState<number>(2);

    const phases = [
        {
            id: 1,
            title: "Foundation",
            period: "Q3 2024",
            status: "completed",
            description: "Initial platform launch and token creation",
            objectives: [
                {
                    title: "Platform Launch",
                    description: "Successfully deploy the core platform infrastructure and smart contracts",
                    icon: "platform"
                },
                {
                    title: "WLOS Token",
                    description: "Launch the WLOS token with initial distribution and liquidity",
                    icon: "token"
                },
                {
                    title: "Community Building",
                    description: "Establish community channels and initial user acquisition",
                    icon: "community"
                },
                {
                    title: "Website Development",
                    description: "Launch the official website with comprehensive documentation",
                    icon: "website"
                }
            ]
        },
        {
            id: 2,
            title: "Pre-Game Phase",
            period: "Q4 2024",
            status: "in-progress",
            description: "Establishing farmer NFTs, staking systems, and weekly leaderboards",
            objectives: [
                {
                    title: "Farmer NFT Marketplace",
                    description: "Deploy marketplace for buying, selling, and trading farmer NFTs",
                    icon: "marketplace"
                },
                {
                    title: "Staking Mechanism",
                    description: "Implement comprehensive staking system for farmers and WLOS tokens",
                    icon: "staking"
                },
                {
                    title: "Weekly Leaderboard",
                    description: "Launch competitive leaderboard with WLOS token rewards",
                    icon: "leaderboard"
                },
                {
                    title: "Rare Farmer Collections",
                    description: "Release limited edition rare farmer NFTs with special abilities",
                    icon: "collection"
                }
            ]
        },
        {
            id: 3,
            title: "Battle Phase",
            period: "Q1-Q2 2025",
            status: "planned",
            description: "Introduction of heroes and battle mechanics",
            objectives: [
                {
                    title: "Hero NFT Collection",
                    description: "Launch hero characters with unique attributes and abilities",
                    icon: "heroes"
                },
                {
                    title: "Battle System",
                    description: "Deploy core battle mechanics and game engine",
                    icon: "battle"
                },
                {
                    title: "Tournament System",
                    description: "Implement competitive tournaments with prize pools",
                    icon: "tournament"
                },
                {
                    title: "Multiplayer Features",
                    description: "Add real-time multiplayer capabilities and matchmaking",
                    icon: "multiplayer"
                }
            ]
        },
        {
            id: 4,
            title: "Ecosystem Expansion",
            period: "Q3 2025+",
            status: "planned",
            description: "Growing the ecosystem with new content and features",
            objectives: [
                {
                    title: "Cross-Chain Integration",
                    description: "Enable multi-chain support and interoperability",
                    icon: "crosschain"
                },
                {
                    title: "Advanced Game Mechanics",
                    description: "Introduce new gameplay systems and progression paths",
                    icon: "mechanics"
                },
                {
                    title: "Guild System",
                    description: "Launch guild formation and guild vs guild battles",
                    icon: "guild"
                },
                {
                    title: "Partner Integrations",
                    description: "Establish strategic partnerships with other projects",
                    icon: "partners"
                }
            ]
        }
    ];

    return (
        <section className="roadmap-timeline-section">
            <SectionTitle title="PROJECT ROADMAP" />
            <p className="roadmap-subtitle">Our vision for growth and development across strategic milestones</p>

            {/* Visual Timeline */}
            <div className="simple-timeline">
                <div className="timeline-connector-track">
                    <div className="timeline-connector"></div>
                </div>
                
                <div className="timeline-phases">
                    {phases.map((phase) => (
                        <div 
                            key={phase.id}
                            className={`timeline-phase ${phase.status} ${activePhase === phase.id ? 'active' : ''}`}
                            onClick={() => setActivePhase(phase.id)}
                        >
                            <div className="phase-circle">
                                <span className="phase-number">{phase.id}</span>
                            </div>
                            <div className="phase-label">
                                <h3 className="phase-name">{phase.title}</h3>
                                <span className="phase-period">{phase.period}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Phase Details */}
            {phases.map((phase) => (
                activePhase === phase.id && (
                    <div key={phase.id} className="phase-detail-card">
                        <div className="phase-detail-header">
                            <h2 className="phase-detail-title">{phase.title} Phase Objectives</h2>
                            <div className={`phase-detail-status ${phase.status}`}>
                                {phase.status === 'completed' ? 'COMPLETED' : 
                                 phase.status === 'in-progress' ? 'IN PROGRESS' : 'PLANNED'}
                            </div>
                        </div>
                        
                        <p className="phase-detail-description">{phase.description}</p>
                        
                        <div className="phase-detail-content">
                            <div className="objectives-grid">
                                {phase.objectives.map((objective, index) => (
                                    <div key={index} className="objective-card">
                                        <div className="objective-icon">
                                            <div className={`icon-${objective.icon}`}></div>
                                        </div>
                                        <div className="objective-content">
                                            <h3 className="objective-title">{objective.title}</h3>
                                            <p className="objective-description">{objective.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            ))}
        </section>
    );
};

export default RoadmapTimeline;