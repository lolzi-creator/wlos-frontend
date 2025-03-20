import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';

// Phase and roadmap data
const roadmapPhases = [
    {
        id: 'phase1',
        name: 'PHASE I: GENESIS',
        period: 'Q3 2024 - Q4 2024',
        status: 'completed',
        description: 'Launch of the core platform with basic battle mechanics and initial token deployment.',
        completionPercentage: 100,
        milestones: [
            { name: 'Platform Launch', date: 'August 15, 2024', status: 'completed' },
            { name: 'WLOS Token Generation', date: 'September 5, 2024', status: 'completed' },
            { name: 'Basic Battle System', date: 'October 20, 2024', status: 'completed' },
            { name: 'Initial Staking Mechanism', date: 'November 15, 2024', status: 'completed' }
        ]
    },
    {
        id: 'phase2',
        name: 'PHASE II: NEURAL EXPANSION',
        period: 'Q1 2025 - Q2 2025',
        status: 'in-progress',
        description: 'Expanding the ecosystem with enhanced battle mechanics, marketplace functionality, and advanced staking.',
        completionPercentage: 42,
        milestones: [
            { name: 'Marketplace Launch', date: 'January 10, 2025', status: 'completed' },
            { name: 'Advanced Battle System', date: 'February 28, 2025', status: 'completed' },
            { name: 'Tournament System', date: 'April 12, 2025', status: 'in-progress' },
            { name: 'Enhanced Staking System', date: 'May 25, 2025', status: 'planned' }
        ]
    },
    {
        id: 'phase3',
        name: 'PHASE III: QUANTUM EVOLUTION',
        period: 'Q3 2025 - Q4 2025',
        status: 'planned',
        description: 'Introducing advanced features like clan systems, special events, and expanded game mechanics.',
        completionPercentage: 0,
        milestones: [
            { name: 'Clan System', date: 'July 15, 2025', status: 'planned' },
            { name: 'Special Events System', date: 'August 30, 2025', status: 'planned' },
            { name: 'Warlord Evolution Mechanics', date: 'October 10, 2025', status: 'planned' },
            { name: 'Enhanced Governance', date: 'November 25, 2025', status: 'planned' }
        ]
    },
    {
        id: 'phase4',
        name: 'PHASE IV: MULTIVERSE EXPANSION',
        period: 'Q1 2026 - Q2 2026',
        status: 'planned',
        description: 'Expanding into a multiverse with cross-chain functionality and advanced ecosystem integration.',
        completionPercentage: 0,
        milestones: [
            { name: 'Cross-Chain Integration', date: 'January 20, 2026', status: 'planned' },
            { name: 'Multiverse Battles', date: 'March 15, 2026', status: 'planned' },
            { name: 'Expanded Item System', date: 'April 25, 2026', status: 'planned' },
            { name: 'Advanced AI Opponents', date: 'June 10, 2026', status: 'planned' }
        ]
    }
];

const RoadmapTimeline: React.FC = () => {
    const [expandedPhase, setExpandedPhase] = useState<string>('phase2'); // Default to current phase

    const togglePhase = (phaseId: string) => {
        setExpandedPhase(expandedPhase === phaseId ? '' : phaseId);
    };

    return (
        <section className="roadmap-timeline-section">
            <SectionTitle title="DEVELOPMENT TIMELINE" />

            <div className="timeline-container clip-card border-blue">
                <div className="accent-border top blue"></div>

                <div className="vertical-timeline">
                    {roadmapPhases.map((phase) => (
                        <div
                            key={phase.id}
                            className={`timeline-phase ${phase.status} ${expandedPhase === phase.id ? 'expanded' : ''}`}
                        >
                            <div
                                className="phase-header"
                                onClick={() => togglePhase(phase.id)}
                            >
                                <div className="phase-indicator">
                                    <div className="phase-dot"></div>
                                    <div className="phase-line"></div>
                                </div>

                                <div className="phase-title-container">
                                    <h3 className="phase-title blue-text">{phase.name}</h3>
                                    <div className="phase-period">{phase.period}</div>
                                </div>

                                <div className="phase-status-container">
                                    <div className="phase-status">
                                        {phase.status === 'completed' && 'COMPLETED'}
                                        {phase.status === 'in-progress' && 'IN PROGRESS'}
                                        {phase.status === 'planned' && 'PLANNED'}
                                    </div>

                                    <div className="phase-progress">
                                        <div className="progress-bar-bg">
                                            <div
                                                className={`progress-bar ${phase.status === 'completed' ? 'blue' : phase.status === 'in-progress' ? 'blue-pulse' : 'inactive'}`}
                                                style={{ width: `${phase.completionPercentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="progress-percentage">{phase.completionPercentage}%</div>
                                    </div>

                                    <div className="expand-icon">
                                        {expandedPhase === phase.id ? '-' : '+'}
                                    </div>
                                </div>
                            </div>

                            {expandedPhase === phase.id && (
                                <div className="phase-content">
                                    <div className="phase-description">
                                        {phase.description}
                                    </div>

                                    <div className="phase-milestones">
                                        <h4 className="milestones-title">Key Milestones</h4>

                                        <div className="milestones-grid">
                                            {phase.milestones.map((milestone, idx) => (
                                                <div key={idx} className={`milestone-card ${milestone.status}`}>
                                                    <div className="milestone-status-indicator"></div>
                                                    <div className="milestone-name">{milestone.name}</div>
                                                    <div className="milestone-date">{milestone.date}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoadmapTimeline;