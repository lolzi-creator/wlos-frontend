import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import Button from '../../common/Button';

// Updated feature data with current pre-game and upcoming battle phases
const upcomingFeatures = [
    {
        id: 'advanced-staking',
        title: 'ADVANCED STAKING',
        category: 'Economy',
        eta: 'June 2024',
        priority: 'High',
        progress: 65,
        description: 'Enhanced staking mechanisms with better rewards and flexible lock periods to maximize your token earnings.',
        details: [
            'Multiple staking tiers with different reward rates',
            'Flexible lock/unlock periods',
            'Staking rewards boosts',
            'Auto-compounding options',
            'Staking analytics dashboard'
        ],
        image: 'staking',
        phase: 'pre-game'
    },
    {
        id: 'marketplace',
        title: 'EXPANDED MARKETPLACE',
        category: 'Economy',
        eta: 'August 2024',
        priority: 'High',
        progress: 45,
        description: 'A comprehensive marketplace for trading farmers, items, and resources with advanced filtering and trading features.',
        details: [
            'Enhanced search and filtering',
            'Price history tracking',
            'Auction system',
            'Bundle sales',
            'NFT metadata verification'
        ],
        image: 'marketplace',
        phase: 'pre-game'
    },
    {
        id: 'farmer-collection',
        title: 'RARE FARMERS',
        category: 'Gameplay',
        eta: 'September 2024',
        priority: 'Medium',
        progress: 30,
        description: 'Expansion of the farmer collection with special rare and legendary farmers with unique abilities and higher yield rates.',
        details: [
            'Legendary farmer types',
            'Special harvest abilities',
            'Yield multiplier bonuses',
            'Unique visual attributes',
            'Limited edition seasonal farmers'
        ],
        image: 'farmers',
        phase: 'pre-game'
    },
    {
        id: 'hero-collection',
        title: 'HERO COLLECTION',
        category: 'Battle',
        eta: 'October 2024',
        priority: 'High',
        progress: 15,
        description: 'Launch of the hero collection system that introduces battle-ready characters with unique abilities and attributes.',
        details: [
            'Various hero classes and types',
            'Special combat abilities',
            'Hero leveling system',
            'Equipment and gear system',
            'Hero combination mechanics'
        ],
        image: 'heroes',
        phase: 'battle'
    },
    {
        id: 'battle-system',
        title: 'BATTLE SYSTEM',
        category: 'Battle',
        eta: 'November 2024',
        priority: 'High',
        progress: 10,
        description: 'Core battle system featuring strategic combat mechanics, matchmaking, and rewards for victorious players.',
        details: [
            'Turn-based strategic combat',
            'Skill-based mechanics',
            'Matchmaking system',
            'Battle rewards and incentives',
            'Battle history and replays'
        ],
        image: 'battle',
        phase: 'battle'
    },
    {
        id: 'tournaments',
        title: 'TOURNAMENTS',
        category: 'Battle',
        eta: 'December 2024',
        priority: 'Medium',
        progress: 5,
        description: 'Weekly and special tournaments where players can compete for exclusive rewards and leaderboard rankings.',
        details: [
            'Weekly tournament schedule',
            'Bracketed elimination rounds',
            'Special tournament rewards',
            'Leaderboards and rankings',
            'Tournament spectator mode'
        ],
        image: 'tournament',
        phase: 'battle'
    }
];

const RoadmapFeatures: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedPhase, setSelectedPhase] = useState<string>('all');
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

    // Filter features by category and phase
    const filteredFeatures = upcomingFeatures.filter(feature => {
        const categoryMatch = selectedCategory === 'all' || 
            feature.category.toLowerCase() === selectedCategory.toLowerCase();
        const phaseMatch = selectedPhase === 'all' || 
            feature.phase === selectedPhase;
        return categoryMatch && phaseMatch;
    });

    const categories = [
        { id: 'all', name: 'ALL FEATURES' },
        { id: 'economy', name: 'ECONOMY' },
        { id: 'gameplay', name: 'GAMEPLAY' },
        { id: 'battle', name: 'BATTLE' }
    ];

    const phases = [
        { id: 'all', name: 'ALL PHASES' },
        { id: 'pre-game', name: 'PRE-GAME PHASE' },
        { id: 'battle', name: 'BATTLE PHASE' }
    ];

    return (
        <section className="roadmap-features-section">
            <SectionTitle title="UPCOMING FEATURES" />
            <div className="feature-subtitle">Detailed look at our planned features across different development phases</div>

            <div className="filter-container">
                <div className="filter-group">
                    <div className="filter-label">FILTER BY CATEGORY:</div>
                    <div className="feature-categories">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-button ${selectedCategory === category.id.toLowerCase() ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id.toLowerCase())}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="filter-group">
                    <div className="filter-label">FILTER BY PHASE:</div>
                    <div className="phase-categories">
                        {phases.map(phase => (
                            <button
                                key={phase.id}
                                className={`phase-button ${selectedPhase === phase.id ? 'active' : ''}`}
                                onClick={() => setSelectedPhase(phase.id)}
                            >
                                {phase.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="features-grid">
                {filteredFeatures.map(feature => (
                    <div
                        key={feature.id}
                        className={`feature-card ${feature.phase === 'pre-game' ? 'border-purple' : 'border-blue'} ${selectedFeature === feature.id ? 'selected' : ''}`}
                        onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
                    >
                        <div className={`accent-border top ${feature.phase === 'pre-game' ? 'purple' : 'blue'}`}></div>
                        <div className={`phase-tag ${feature.phase}`}>
                            {feature.phase === 'pre-game' ? 'PRE-GAME PHASE' : 'BATTLE PHASE'}
                        </div>

                        <div className="feature-header">
                            <div className="feature-title-container">
                                <h3 className="feature-card-title">{feature.title}</h3>
                                <div className="feature-category">{feature.category}</div>
                            </div>
                            <div className="feature-image-container">
                                <div className={`feature-image ${feature.image}`}></div>
                            </div>
                        </div>

                        <div className="feature-info">
                            <div className="info-row">
                                <div className="info-label">Estimated Release:</div>
                                <div className="info-value">{feature.eta}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Priority:</div>
                                <div className={`info-value priority-${feature.priority.toLowerCase()}`}>{feature.priority}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Development Progress:</div>
                                <div className="info-value">
                                    <div className="progress-bar-bg small">
                                        <div 
                                            className={`progress-bar ${feature.phase === 'pre-game' ? 'purple' : 'blue'}`} 
                                            style={{ width: `${feature.progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="progress-percentage">{feature.progress}%</div>
                                </div>
                            </div>
                        </div>

                        <div className="feature-description">
                            {feature.description}
                        </div>

                        {selectedFeature === feature.id && (
                            <div className="feature-details">
                                <h4 className="details-title">Feature Details</h4>
                                <ul className="details-list">
                                    {feature.details.map((detail, idx) => (
                                        <li key={idx} className="detail-item">
                                            <div className={`detail-dot ${feature.phase === 'pre-game' ? 'purple' : 'blue'}`}></div>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="feature-action">
                                    <Button
                                        text="VOTE FOR PRIORITY"
                                        color={feature.phase === 'pre-game' ? 'purple' : 'blue'}
                                        onClick={() => console.log(`Voted for ${feature.id}`)}
                                    />
                                </div>
                            </div>
                        )}

                        {selectedFeature === feature.id && (
                            <>
                                <div className="corner-accent top-right"></div>
                                <div className="corner-accent bottom-left"></div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RoadmapFeatures;