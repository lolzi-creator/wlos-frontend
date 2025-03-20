import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import Button from '../../common/Button';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';

// Mock data for heroes/warlords
const heroesData = [
    {
        id: 1,
        name: 'Quantum Striker',
        rarity: 'Legendary',
        level: 24,
        power: 1245,
        type: 'Attack',
        stats: {
            attack: 85,
            defense: 62,
            speed: 78,
            energy: 91
        },
        equipped: [
            { slot: 'Weapon', item: 'Void Disruptor', rarity: 'Legendary' },
            { slot: 'Armor', item: 'Quantum Shield', rarity: 'Rare' },
            { slot: 'Accessory', item: 'Neural Amplifier', rarity: 'Epic' }
        ],
        abilities: [
            { name: 'Quantum Strike', type: 'Attack', cooldown: '3 turns' },
            { name: 'Energy Field', type: 'Defense', cooldown: '4 turns' },
            { name: 'Void Shift', type: 'Utility', cooldown: '5 turns' }
        ],
        image: 'striker'
    },
    {
        id: 2,
        name: 'Cyber Sentinel',
        rarity: 'Epic',
        level: 18,
        power: 987,
        type: 'Defense',
        stats: {
            attack: 63,
            defense: 92,
            speed: 55,
            energy: 75
        },
        equipped: [
            { slot: 'Weapon', item: 'Plasma Lance', rarity: 'Epic' },
            { slot: 'Armor', item: 'Sentinel Plating', rarity: 'Epic' },
            { slot: 'Accessory', item: 'Shield Generator', rarity: 'Rare' }
        ],
        abilities: [
            { name: 'Defensive Matrix', type: 'Defense', cooldown: '3 turns' },
            { name: 'Energy Barrier', type: 'Defense', cooldown: '4 turns' },
            { name: 'Counter Protocol', type: 'Attack', cooldown: '4 turns' }
        ],
        image: 'sentinel'
    },
    {
        id: 3,
        name: 'Neon Assassin',
        rarity: 'Rare',
        level: 15,
        power: 863,
        type: 'Speed',
        stats: {
            attack: 78,
            defense: 45,
            speed: 95,
            energy: 68
        },
        equipped: [
            { slot: 'Weapon', item: 'Photon Blade', rarity: 'Epic' },
            { slot: 'Armor', item: 'Stealth Suit', rarity: 'Uncommon' },
            { slot: 'Accessory', item: 'Hyperspace Boots', rarity: 'Rare' }
        ],
        abilities: [
            { name: 'Shadow Strike', type: 'Attack', cooldown: '2 turns' },
            { name: 'Phantom Dash', type: 'Movement', cooldown: '3 turns' },
            { name: 'Stealth Field', type: 'Utility', cooldown: '5 turns' }
        ],
        image: 'assassin'
    }
];

const WalletHeroes: React.FC = () => {
    const { isConnected } = useWalletConnection();
    const [selectedHero, setSelectedHero] = useState<number | null>(null);
    const [filterRarity, setFilterRarity] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('power');

    // Filter heroes based on rarity
    const filteredHeroes = filterRarity === 'all'
        ? heroesData
        : heroesData.filter(hero => hero.rarity.toLowerCase() === filterRarity.toLowerCase());

    // Sort heroes based on criteria
    const sortedHeroes = [...filteredHeroes].sort((a, b) => {
        if (sortBy === 'power') return b.power - a.power;
        if (sortBy === 'level') return b.level - a.level;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    // If not connected, don't render anything - the connection UI is handled in the parent component
    if (!isConnected) {
        return null;
    }

    return (
        <section className="wallet-heroes-section">
            <SectionTitle title="YOUR WARLORDS" />

            <div className="heroes-controls">
                <div className="filter-controls">
                    <span className="filter-label">Filter By:</span>
                    <div className="filter-options">
                        <button
                            className={`filter-option ${filterRarity === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-option ${filterRarity === 'legendary' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('legendary')}
                        >
                            Legendary
                        </button>
                        <button
                            className={`filter-option ${filterRarity === 'epic' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('epic')}
                        >
                            Epic
                        </button>
                        <button
                            className={`filter-option ${filterRarity === 'rare' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('rare')}
                        >
                            Rare
                        </button>
                    </div>
                </div>

                <div className="sort-controls">
                    <span className="sort-label">Sort By:</span>
                    <div className="sort-options">
                        <button
                            className={`sort-option ${sortBy === 'power' ? 'active' : ''}`}
                            onClick={() => setSortBy('power')}
                        >
                            Power
                        </button>
                        <button
                            className={`sort-option ${sortBy === 'level' ? 'active' : ''}`}
                            onClick={() => setSortBy('level')}
                        >
                            Level
                        </button>
                        <button
                            className={`sort-option ${sortBy === 'name' ? 'active' : ''}`}
                            onClick={() => setSortBy('name')}
                        >
                            Name
                        </button>
                    </div>
                </div>
            </div>

            <div className="heroes-grid">
                {sortedHeroes.map(hero => (
                    <div
                        key={hero.id}
                        className={`hero-card clip-card border-cyan ${hero.rarity.toLowerCase()} ${selectedHero === hero.id ? 'selected' : ''}`}
                        onClick={() => setSelectedHero(selectedHero === hero.id ? null : hero.id)}
                    >
                        <div className="accent-border top cyan"></div>

                        <div className="hero-header">
                            <div className="hero-rarity-badge">
                                {hero.rarity.toUpperCase()}
                            </div>
                            <div className="hero-type-badge">
                                {hero.type.toUpperCase()}
                            </div>
                        </div>

                        <div className="hero-image-container">
                            <div className={`hero-image ${hero.image}`}></div>
                            <div className="hero-level">
                                <div className="level-label">LVL</div>
                                <div className="level-value">{hero.level}</div>
                            </div>
                        </div>

                        <div className="hero-info">
                            <h3 className="hero-name">{hero.name}</h3>

                            <div className="hero-power">
                                <div className="power-label">Battle Power</div>
                                <div className="power-value cyan-text">{hero.power}</div>
                            </div>

                            <div className="hero-stats">
                                <div className="stat-bar">
                                    <div className="stat-label">ATK</div>
                                    <div className="stat-bar-bg">
                                        <div
                                            className="stat-bar-fill attack"
                                            style={{ width: `${hero.stats.attack}%` }}
                                        ></div>
                                    </div>
                                    <div className="stat-value">{hero.stats.attack}</div>
                                </div>

                                <div className="stat-bar">
                                    <div className="stat-label">DEF</div>
                                    <div className="stat-bar-bg">
                                        <div
                                            className="stat-bar-fill defense"
                                            style={{ width: `${hero.stats.defense}%` }}
                                        ></div>
                                    </div>
                                    <div className="stat-value">{hero.stats.defense}</div>
                                </div>

                                <div className="stat-bar">
                                    <div className="stat-label">SPD</div>
                                    <div className="stat-bar-bg">
                                        <div
                                            className="stat-bar-fill speed"
                                            style={{ width: `${hero.stats.speed}%` }}
                                        ></div>
                                    </div>
                                    <div className="stat-value">{hero.stats.speed}</div>
                                </div>

                                <div className="stat-bar">
                                    <div className="stat-label">NRG</div>
                                    <div className="stat-bar-bg">
                                        <div
                                            className="stat-bar-fill energy"
                                            style={{ width: `${hero.stats.energy}%` }}
                                        ></div>
                                    </div>
                                    <div className="stat-value">{hero.stats.energy}</div>
                                </div>
                            </div>
                        </div>

                        {selectedHero === hero.id && (
                            <div className="hero-details">
                                <div className="equipment-section">
                                    <h4 className="section-title">Equipment</h4>
                                    <div className="equipment-slots">
                                        {hero.equipped.map((item, idx) => (
                                            <div key={idx} className="equipment-item">
                                                <div className="slot-name">{item.slot}</div>
                                                <div className={`item-name ${item.rarity.toLowerCase()}-text`}>{item.item}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="abilities-section">
                                    <h4 className="section-title">Abilities</h4>
                                    <div className="abilities-list">
                                        {hero.abilities.map((ability, idx) => (
                                            <div key={idx} className="ability-item">
                                                <div className="ability-name">{ability.name}</div>
                                                <div className="ability-info">
                                                    <span className="ability-type">{ability.type}</span>
                                                    <span className="ability-cooldown">{ability.cooldown}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="hero-actions">
                                    <Button
                                        text="DEPLOY"
                                        color="cyan"
                                        onClick={() => console.log(`Deploy ${hero.name}`)}
                                    />
                                    <Button
                                        text="UPGRADE"
                                        color="cyan"
                                        onClick={() => console.log(`Upgrade ${hero.name}`)}
                                    />
                                </div>
                            </div>
                        )}

                        {selectedHero === hero.id && (
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

export default WalletHeroes;