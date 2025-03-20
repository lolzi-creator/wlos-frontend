import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import Button from '../../common/Button';

// Feature data
const upcomingFeatures = [
    {
        id: 'tournament',
        title: 'TOURNAMENT SYSTEM',
        category: 'Battle',
        eta: 'April 2025',
        priority: 'High',
        progress: 65,
        description: 'A competitive tournament system allowing players to compete in scheduled events for exclusive rewards and leaderboard rankings.',
        details: [
            'Bracketed elimination rounds',
            'Weekly and monthly tournaments',
            'Special tournament-only rewards',
            'Tournament leaderboards',
            'Clan-based tournaments'
        ],
        image: 'tournament'
    },
    {
        id: 'enhanced-staking',
        title: 'ENHANCED STAKING',
        category: 'Economy',
        eta: 'May 2025',
        priority: 'High',
        progress: 35,
        description: 'Advanced staking mechanisms with additional tiers, special rewards, and more flexible lock periods.',
        details: [
            'Additional staking pools',
            'Special ability unlocks',
            'Flexible lock/unlock periods',
            'Staking-based governance weight',
            'NFT staking integration'
        ],
        image: 'staking'
    },
    {
        id: 'clan-system',
        title: 'CLAN SYSTEM',
        category: 'Social',
        eta: 'July 2025',
        priority: 'Medium',
        progress: 20,
        description: 'A social system allowing players to form clans, compete together, share resources, and build clan reputation.',
        details: [
            'Clan formation and management',
            'Clan treasury and resource sharing',
            'Clan-vs-clan battles',
            'Clan territories and benefits',
            'Clan rankings and reputation'
        ],
        image: 'clan'
    },
    {
        id: 'special-events',
        title: 'SPECIAL EVENTS',
        category: 'Content',
        eta: 'August 2025',
        priority: 'Medium',
        progress: 15,
        description: 'Limited-time special events with unique challenges, rewards, and gameplay mechanics.',
        details: [
            'Seasonal themed events',
            'Special challenge modes',
            'Limited-edition rewards',
            'Collaborative event objectives',
            'Event leaderboards'
        ],
        image: 'events'
    },
    {
        id: 'warlord-evolution',
        title: 'WARLORD EVOLUTION',
        category: 'Gameplay',
        eta: 'October 2025',
        priority: 'High',
        progress: 10,
        description: 'Advanced evolution mechanics allowing warlords to transform, upgrade, and unlock new abilities over time.',
        details: [
            'Multiple evolution paths',
            'Specialty class system',
            'Ability trees and skill points',
            'Evolution materials and requirements',
            'Visual transformations'
        ],
        image: 'evolution'
    },
    {
        id: 'cross-chain',
        title: 'CROSS-CHAIN INTEGRATION',
        category: 'Technology',
        eta: 'January 2026',
        priority: 'Low',
        progress: 5,
        description: 'Expanding the ecosystem to integrate with other blockchain networks for broader interoperability.',
        details: [
            'Multi-chain asset support',
            'Cross-chain battles',
            'Asset bridging mechanisms',
            'Expanded marketplace reach',
            'Multi-chain governance'
        ],
        image: 'cross-chain'
    }
];

const RoadmapFeatures: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

    // Filter features by category
    const filteredFeatures = selectedCategory === 'all'
        ? upcomingFeatures
        : upcomingFeatures.filter(feature => feature.category.toLowerCase() === selectedCategory.toLowerCase());


    const categories = [
        { id: 'all', name: 'ALL FEATURES' },
        { id: 'battle', name: 'BATTLE' },
        { id: 'economy', name: 'ECONOMY' },
        { id: 'social', name: 'SOCIAL' },
        { id: 'content', name: 'CONTENT' },
        { id: 'gameplay', name: 'GAMEPLAY' },
        { id: 'technology', name: 'TECHNOLOGY' }
    ];

    return (
        <section className="roadmap-features-section">
            <SectionTitle title="UPCOMING FEATURES" />

            <div className="feature-categories">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`category-button ${selectedCategory === category.id.toLowerCase() ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id.toLowerCase())}
                    >
                        {category.name}
                        {selectedCategory === category.id.toLowerCase() && (
                            <>
                                <div className="corner-accent top-right"></div>
                                <div className="corner-accent bottom-left"></div>
                            </>
                        )}
                    </button>
                ))}
            </div>

            <div className="features-grid">
                {filteredFeatures.map(feature => (
                    <div
                        key={feature.id}
                        className={`feature-card border-blue ${selectedFeature === feature.id ? 'selected' : ''}`}
                        onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
                    >
                        <div className="accent-border top blue"></div>

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
                                        <div className="progress-bar blue" style={{ width: `${feature.progress}%` }}></div>
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
                                            <div className="detail-dot blue"></div>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="feature-action">
                                    <Button
                                        text="VOTE FOR PRIORITY"
                                        color="purple"
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