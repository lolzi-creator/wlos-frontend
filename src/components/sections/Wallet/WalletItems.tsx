import React, { useState } from 'react';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';

// Define types for the different item categories
interface BaseItem {
    id: number;
    name: string;
    rarity: string;
    type: string;
    boost: string;
    description: string;
    image: string;
}

interface EquippableItem extends BaseItem {
    equipped: string | null;
    stats: {
        [key: string]: string;
    };
    durability: number;
}

interface ConsumableItem extends BaseItem {
    quantity: number;
    effect: string;
}

type Item = EquippableItem | ConsumableItem;

// Function to check if an item is equippable
const isEquippableItem = (item: Item): item is EquippableItem => {
    return 'stats' in item && 'durability' in item;
};

// Function to check if an item is consumable
const isConsumableItem = (item: Item): item is ConsumableItem => {
    return 'quantity' in item && 'effect' in item;
};

// Mock data for items
const mockItems: Item[] = [
    {
        id: 1,
        name: 'Quantum Shield',
        rarity: 'Rare',
        type: 'Armor',
        boost: '+35% Defense',
        description: 'Advanced energy shield that absorbs incoming damage and converts it to power.',
        equipped: 'Cyber Sentinel',
        stats: {
            defense: '+35',
            energy: '+10',
            speed: '-5'
        },
        durability: 92,
        image: 'shield'
    },
    {
        id: 2,
        name: 'Neural Amplifier',
        rarity: 'Epic',
        type: 'Accessory',
        boost: '+25% Attack Speed',
        description: 'Enhances neural pathways to accelerate combat reactions and decision making.',
        equipped: null,
        stats: {
            speed: '+25',
            attack: '+15',
            defense: '-5'
        },
        durability: 78,
        image: 'amplifier'
    },
    {
        id: 3,
        name: 'Void Disruptor',
        rarity: 'Legendary',
        type: 'Weapon',
        boost: '+40% Attack Power',
        description: 'Harnesses void energy to create devastating attacks that pierce through defenses.',
        equipped: 'Quantum Striker',
        stats: {
            attack: '+40',
            energy: '+15',
            defense: '-10'
        },
        durability: 85,
        image: 'disruptor'
    },
    {
        id: 4,
        name: 'Energy Matrix',
        rarity: 'Common',
        type: 'Consumable',
        boost: '+15% Energy for 24h',
        description: 'Single-use matrix that enhances energy regeneration for 24 hours.',
        quantity: 3,
        effect: 'Temporarily increases energy regeneration by 15% for 24 hours in battle.',
        image: 'matrix'
    }
];

const WalletItems: React.FC = () => {
    const { isConnected } = useWalletConnection();
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [filterRarity, setFilterRarity] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name');

    // Filter items based on criteria
    const filteredItems = mockItems.filter(item => {
        const rarityMatch = filterRarity === 'all' || item.rarity.toLowerCase() === filterRarity.toLowerCase();
        const typeMatch = filterType === 'all' || item.type.toLowerCase() === filterType.toLowerCase();
        return rarityMatch && typeMatch;
    });

    // Sort items based on criteria
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'rarity') {
            const rarityOrder = { 'legendary': 0, 'epic': 1, 'rare': 2, 'uncommon': 3, 'common': 4 };
            return rarityOrder[a.rarity.toLowerCase() as keyof typeof rarityOrder] -
                rarityOrder[b.rarity.toLowerCase() as keyof typeof rarityOrder];
        }
        if (sortBy === 'type') return a.type.localeCompare(b.type);
        return 0;
    });

    // If not connected, don't render anything - the connection UI is handled in the parent component
    if (!isConnected) {
        return null;
    }

    return (
        <section className="wallet-items-section">
            <SectionTitle title="INVENTORY ITEMS" />

            <div className="items-controls">
                <div className="filter-group">
                    <div className="filter-control">
                        <span className="filter-label">Rarity:</span>
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
                            <button
                                className={`filter-option ${filterRarity === 'common' ? 'active' : ''}`}
                                onClick={() => setFilterRarity('common')}
                            >
                                Common
                            </button>
                        </div>
                    </div>

                    <div className="filter-control">
                        <span className="filter-label">Type:</span>
                        <div className="filter-options">
                            <button
                                className={`filter-option ${filterType === 'all' ? 'active' : ''}`}
                                onClick={() => setFilterType('all')}
                            >
                                All
                            </button>
                            <button
                                className={`filter-option ${filterType === 'weapon' ? 'active' : ''}`}
                                onClick={() => setFilterType('weapon')}
                            >
                                Weapons
                            </button>
                            <button
                                className={`filter-option ${filterType === 'armor' ? 'active' : ''}`}
                                onClick={() => setFilterType('armor')}
                            >
                                Armor
                            </button>
                            <button
                                className={`filter-option ${filterType === 'accessory' ? 'active' : ''}`}
                                onClick={() => setFilterType('accessory')}
                            >
                                Accessories
                            </button>
                            <button
                                className={`filter-option ${filterType === 'consumable' ? 'active' : ''}`}
                                onClick={() => setFilterType('consumable')}
                            >
                                Consumables
                            </button>
                        </div>
                    </div>
                </div>

                <div className="sort-control">
                    <span className="sort-label">Sort By:</span>
                    <div className="sort-options">
                        <button
                            className={`sort-option ${sortBy === 'name' ? 'active' : ''}`}
                            onClick={() => setSortBy('name')}
                        >
                            Name
                        </button>
                        <button
                            className={`sort-option ${sortBy === 'rarity' ? 'active' : ''}`}
                            onClick={() => setSortBy('rarity')}
                        >
                            Rarity
                        </button>
                        <button
                            className={`sort-option ${sortBy === 'type' ? 'active' : ''}`}
                            onClick={() => setSortBy('type')}
                        >
                            Type
                        </button>
                    </div>
                </div>
            </div>

            <div className="items-grid">
                {sortedItems.map(item => (
                    <div
                        key={item.id}
                        className={`inventory-item clip-card border-cyan ${item.rarity.toLowerCase()} ${selectedItem === item.id ? 'selected' : ''}`}
                        onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    >
                        <div className="accent-border top cyan"></div>

                        <div className="item-header">
                            <div className="item-rarity-badge">
                                {item.rarity.toUpperCase()}
                            </div>
                            <div className="item-type-badge">
                                {item.type.toUpperCase()}
                            </div>
                        </div>

                        <div className="item-image-container">
                            <div className={`item-image ${item.image}`}></div>
                            {isConsumableItem(item) && (
                                <div className="item-quantity">
                                    <div className="quantity-label">QTY</div>
                                    <div className="quantity-value">{item.quantity}</div>
                                </div>
                            )}
                        </div>

                        <div className="item-info">
                            <h3 className="item-name">{item.name}</h3>
                            <div className="item-boost cyan-text">{item.boost}</div>
                            <div className="item-description">{item.description}</div>

                            {isEquippableItem(item) && item.equipped && (
                                <div className="equipped-by">
                                    <span className="equipped-label">Equipped by:</span>
                                    <span className="equipped-hero">{item.equipped}</span>
                                </div>
                            )}
                        </div>

                        {selectedItem === item.id && (
                            <div className="item-details">
                                {isEquippableItem(item) && (
                                    <div className="stats-section">
                                        <h4 className="section-title">Item Stats</h4>
                                        <div className="item-stats">
                                            {Object.entries(item.stats).map(([stat, value]) => (
                                                <div key={stat} className="stat-row">
                                                    <div className="stat-name">{stat.charAt(0).toUpperCase() + stat.slice(1)}</div>
                                                    <div className={`stat-value ${value.startsWith('+') ? 'positive' : 'negative'}`}>
                                                        {value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {isEquippableItem(item) && (
                                    <div className="durability-section">
                                        <h4 className="section-title">Durability</h4>
                                        <div className="durability-bar-container">
                                            <div className="durability-bar-bg">
                                                <div
                                                    className={`durability-bar ${
                                                        item.durability > 70 ? 'good' :
                                                            item.durability > 30 ? 'medium' : 'low'
                                                    }`}
                                                    style={{ width: `${item.durability}%` }}
                                                ></div>
                                            </div>
                                            <div className="durability-value">{item.durability}%</div>
                                        </div>
                                    </div>
                                )}

                                {isConsumableItem(item) && (
                                    <div className="consumable-section">
                                        <h4 className="section-title">Effect</h4>
                                        <div className="consumable-effect-description">
                                            {item.effect}
                                        </div>
                                    </div>
                                )}

                                <div className="item-actions">
                                    {isEquippableItem(item) && !item.equipped && (
                                        <Button
                                            text="EQUIP"
                                            color="cyan"
                                            onClick={() => console.log(`Equip ${item.name}`)}
                                        />
                                    )}
                                    {isEquippableItem(item) && item.equipped && (
                                        <Button
                                            text="UNEQUIP"
                                            color="cyan"
                                            onClick={() => console.log(`Unequip ${item.name}`)}
                                        />
                                    )}
                                    {isConsumableItem(item) && (
                                        <Button
                                            text="USE"
                                            color="cyan"
                                            onClick={() => console.log(`Use ${item.name}`)}
                                        />
                                    )}
                                    <Button
                                        text="TRADE"
                                        color="cyan"
                                        onClick={() => console.log(`Trade ${item.name}`)}
                                    />
                                </div>
                            </div>
                        )}

                        {selectedItem === item.id && (
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

export default WalletItems;