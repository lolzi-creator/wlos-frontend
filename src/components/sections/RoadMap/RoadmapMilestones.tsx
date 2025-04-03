import React from 'react';
import SectionTitle from '../../common/SectionTitle';

// Milestone data
const milestones = [
    {
        id: 'milestone1',
        title: 'INITIAL LAUNCH',
        date: 'August 15, 2024',
        status: 'completed',
        phase: 'foundation',
        description: 'Initial platform launch with foundation systems',
        achievements: [
            'Core platform infrastructure deployment',
            'Website and dApp launch',
            'Smart contract deployment',
            'Initial UI/UX design'
        ],
        metrics: [
            { label: 'Initial Users', value: '1,245' },
            { label: 'Contract Interactions', value: '8,732' }
        ],
        icon: 'genesis'
    },
    {
        id: 'milestone2',
        title: 'WLOS TOKEN LAUNCH',
        date: 'September 5, 2024',
        status: 'completed',
        phase: 'foundation',
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
        title: 'FARMER NFT MARKETPLACE',
        date: 'October 21, 2024',
        status: 'completed',
        phase: 'pre-game',
        description: 'Introduction of Farmer NFTs and marketplace for trading',
        achievements: [
            'Farmer NFT standards implementation',
            'Marketplace UI/UX development',
            'Trading system implementation',
            'Initial farmer collection release'
        ],
        metrics: [
            { label: 'Farmer Types', value: '24' },
            { label: 'Trading Volume', value: '258,734 WLOS' }
        ],
        icon: 'marketplace'
    },
    {
        id: 'milestone4',
        title: 'STAKING SYSTEM',
        date: 'November 15, 2024',
        status: 'in-progress',
        phase: 'pre-game',
        description: 'Comprehensive staking system for farmers and WLOS tokens',
        goals: [
            'Farmer staking mechanism',
            'WLOS token staking pools',
            'Yield distribution system',
            'Staking dashboard development'
        ],
        progress: {
            'Smart Contracts': 90,
            'Frontend Integration': 75,
            'Yield Calculations': 85,
            'Testing & QA': 60
        },
        icon: 'staking'
    },
    {
        id: 'milestone5',
        title: 'WEEKLY LEADERBOARD',
        date: 'December 10, 2024',
        status: 'planned',
        phase: 'pre-game',
        description: 'Competitive staking leaderboard with weekly rewards',
        goals: [
            'Leaderboard ranking system',
            'Weekly rewards distribution',
            'Performance metrics tracking',
            'Leaderboard UI implementation'
        ],
        dependencies: [
            'Staking System Completion',
            'Smart Contract Audit',
            'Governance Approval'
        ],
        icon: 'tournament'
    },
    {
        id: 'milestone6',
        title: 'HERO NFT COLLECTION',
        date: 'Q1 2025',
        status: 'planned',
        phase: 'battle',
        description: 'Launch of the Hero NFT collection for the battle phase',
        goals: [
            'Hero character design and attributes',
            'NFT minting mechanism',
            'Hero rarity system',
            'Hero marketplace integration'
        ],
        dependencies: [
            'Pre-game Phase Stability',
            'Community Voting',
            'Art Asset Development'
        ],
        icon: 'collection'
    },
    {
        id: 'milestone7',
        title: 'BATTLE SYSTEM LAUNCH',
        date: 'Q2 2025',
        status: 'planned',
        phase: 'battle',
        description: 'Core gameplay system with hero battles and rewards',
        goals: [
            'Battle mechanics implementation',
            'Matchmaking system',
            'Rewards distribution',
            'Battle UI/UX development'
        ],
        dependencies: [
            'Hero NFT Collection Launch',
            'Backend Battle Logic',
            'Balance Testing'
        ],
        icon: 'battle'
    }
];

const RoadmapMilestones: React.FC = () => {
    return (
        <section className="roadmap-milestones-section">
            <SectionTitle title="KEY MILESTONES" />
            <p className="feature-subtitle">Track our progress as we build the Warlords of Solana ecosystem</p>

            <div className="milestones-container">
                {milestones.map((milestone) => (
                    <div
                        key={milestone.id}
                        className={`milestone-card clip-card border-blue ${milestone.status}`}
                    >
                        <div className="accent-border top blue"></div>
                        <div className={`phase-tag ${milestone.phase}`}>
                            {milestone.phase.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Phase
                        </div>

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