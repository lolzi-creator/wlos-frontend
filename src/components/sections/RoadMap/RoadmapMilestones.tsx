import React from 'react';
import SectionTitle from '../../common/SectionTitle';

// Milestone data
const milestones = [
    {
        id: 'milestone1',
        title: 'PLATFORM GENESIS',
        date: 'August 15, 2024',
        status: 'completed',
        description: 'Initial platform launch with core functionality',
        achievements: [
            'Core platform infrastructure deployment',
            'Basic battle system implementation',
            'User account system',
            'Initial UI/UX design'
        ],
        metrics: [
            { label: 'Initial Users', value: '1,245' },
            { label: 'Battles Conducted', value: '8,732' }
        ],
        icon: 'genesis'
    },
    {
        id: 'milestone2',
        title: 'TOKEN GENERATION EVENT',
        date: 'September 5, 2024',
        status: 'completed',
        description: 'Launch of the WLOS token with initial distribution',
        achievements: [
            'WLOS token smart contract deployment',
            'Initial token distribution',
            'Liquidity pool establishment',
            'Token utility integration'
        ],
        metrics: [
            { label: 'Initial Token Supply', value: '10,000,000 WLOS' },
            { label: 'Initial Market Cap', value: '$4.2M' }
        ],
        icon: 'token'
    },
    {
        id: 'milestone3',
        title: 'MARKETPLACE LAUNCH',
        date: 'January 10, 2025',
        status: 'completed',
        description: 'Introduction of the in-game marketplace for items and assets',
        achievements: [
            'Item NFT standards implementation',
            'Marketplace UI/UX development',
            'Trading system implementation',
            'Initial item catalog release'
        ],
        metrics: [
            { label: 'Initial Items', value: '145' },
            { label: 'Trading Volume', value: '258,734 WLOS' }
        ],
        icon: 'marketplace'
    },
    {
        id: 'milestone4',
        title: 'TOURNAMENT SYSTEM',
        date: 'April 12, 2025',
        status: 'in-progress',
        description: 'Competitive tournament system with rewards and rankings',
        goals: [
            'Tournament bracket system',
            'Rewards distribution mechanism',
            'Leaderboard implementation',
            'Tournament UI/UX'
        ],
        progress: {
            'System Architecture': 90,
            'Smart Contracts': 70,
            'Frontend Integration': 55,
            'Testing & QA': 30
        },
        icon: 'tournament'
    },
    {
        id: 'milestone5',
        title: 'ENHANCED STAKING',
        date: 'May 25, 2025',
        status: 'planned',
        description: 'Advanced staking system with multiple tiers and rewards',
        goals: [
            'Multiple staking pool implementation',
            'Enhanced rewards mechanism',
            'Flexible lock periods',
            'Staking dashboard improvements'
        ],
        dependencies: [
            'Tournament System Completion',
            'Smart Contract Audit',
            'Governance Approval'
        ],
        icon: 'staking'
    }
];

const RoadmapMilestones: React.FC = () => {
    return (
        <section className="roadmap-milestones-section">
            <SectionTitle title="KEY MILESTONES" />

            <div className="milestones-container">
                {milestones.map((milestone) => (
                    <div
                        key={milestone.id}
                        className={`milestone-card clip-card border-blue ${milestone.status}`}
                    >
                        <div className="accent-border top blue"></div>

                        <div className="milestone-header">
                            <div className="milestone-icon-container">
                                <div className={`milestone-icon ${milestone.icon}`}></div>
                            </div>
                            <div className="milestone-title-container">
                                <h3 className="milestone-title">{milestone.title}</h3>
                                <div className="milestone-date">{milestone.date}</div>
                            </div>
                            <div className={`milestone-status-badge ${milestone.status}`}>
                                {milestone.status === 'completed' ? 'COMPLETED' :
                                    milestone.status === 'in-progress' ? 'IN PROGRESS' : 'PLANNED'}
                            </div>
                        </div>

                        <div className="milestone-description">
                            {milestone.description}
                        </div>

                        {milestone.status === 'completed' && (
                            <>
                                <div className="milestone-achievements">
                                    <h4 className="section-subtitle">Key Achievements</h4>
                                    <ul className="achievements-list">
                                        {milestone.achievements?.map((achievement, idx) => (
                                            <li key={idx} className="achievement-item">
                                                <div className="achievement-dot blue"></div>
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="milestone-metrics">
                                    <h4 className="section-subtitle">Metrics</h4>
                                    <div className="metrics-grid">
                                        {milestone.metrics?.map((metric, idx) => (
                                            <div key={idx} className="metric-box">
                                                <div className="metric-value blue-text">{metric.value}</div>
                                                <div className="metric-label">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {milestone.status === 'in-progress' && (
                            <>
                                <div className="milestone-goals">
                                    <h4 className="section-subtitle">Current Goals</h4>
                                    <ul className="goals-list">
                                        {milestone.goals?.map((goal, idx) => (
                                            <li key={idx} className="goal-item">
                                                <div className="goal-dot blue"></div>
                                                <span>{goal}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="milestone-progress-section">
                                    <h4 className="section-subtitle">Development Progress</h4>
                                    <div className="progress-items">
                                        {Object.entries(milestone.progress || {}).map(([key, value], idx) => (
                                            <div key={idx} className="progress-item">
                                                <div className="progress-label">{key}</div>
                                                <div className="progress-bar-container">
                                                    <div className="progress-bar-bg">
                                                        <div
                                                            className="progress-bar blue"
                                                            style={{ width: `${value}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="progress-percentage">{value}%</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {milestone.status === 'planned' && (
                            <>
                                <div className="milestone-goals">
                                    <h4 className="section-subtitle">Planned Features</h4>
                                    <ul className="goals-list">
                                        {milestone.goals?.map((goal, idx) => (
                                            <li key={idx} className="goal-item">
                                                <div className="goal-dot blue"></div>
                                                <span>{goal}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="milestone-dependencies">
                                    <h4 className="section-subtitle">Dependencies</h4>
                                    <ul className="dependencies-list">
                                        {milestone.dependencies?.map((dependency, idx) => (
                                            <li key={idx} className="dependency-item">
                                                <div className="dependency-dot"></div>
                                                <span>{dependency}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RoadmapMilestones;