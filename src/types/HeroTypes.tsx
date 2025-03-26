// src/types/HeroTypes.ts

export interface HeroPack {
    id: string;
    name: string;
    description: string;
    cost: number;
    imageSrc: string;
    rarityChances: {
        common: number;    // e.g., 0.7 (70%)
        rare: number;      // e.g., 0.2 (20%)
        epic: number;      // e.g., 0.08 (8%)
        legendary: number; // e.g., 0.02 (2%)
    };
}

export const HERO_PACKS: HeroPack[] = [
    {
        id: 'basic-pack',
        name: 'Basic Hero Pack',
        description: 'A standard pack with a chance to get common and rare heroes.',
        cost: 0,
        imageSrc: '/assets/packs/basic-pack.jpeg',
        rarityChances: {
            common: 0.8,
            rare: 0.18,
            epic: 0.02,
            legendary: 0
        }
    },
    {
        id: 'premium-pack',
        name: 'Premium Hero Pack',
        description: 'A premium pack with improved chances for rare and epic heroes.',
        cost: 500,
        imageSrc: '/assets/packs/premium-pack.jpeg',
        rarityChances: {
            common: 0.5,
            rare: 0.35,
            epic: 0.12,
            legendary: 0.03
        }
    },
    {
        id: 'legendary-pack',
        name: 'Legendary Hero Pack',
        description: 'An exclusive pack with guaranteed epic and increased legendary chances.',
        cost: 0,
        imageSrc: '/assets/packs/legendary-pack.jpeg',
        rarityChances: {
            common: 0,
            rare: 0.3,
            epic: 0.55,
            legendary: 0.15
        }
    }
]

export interface Hero {
    id: string;
    name: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    type: 'attack' | 'defense' | 'speed' | 'balanced' | 'magic';
    power: number;
    imageSrc: string;
    cost: number;
    description: string;
    stats: {
        attack: number;
        defense: number;
        speed: number;
        energy: number;
    };
    abilities: {
        name: string;
        type: string;
        cooldown: string;
        description: string;
    }[];
}

export interface OwnedHero {
    id: string;
    heroId: string;
    name: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    type: 'attack' | 'defense' | 'speed' | 'balanced' | 'magic';
    power: number;
    level: number;
    purchasedAt: number;
    experience: number;
    equippedItems?: string[];
    description: string;
    imageSrc: string;
    stats: {
        attack: number;
        defense: number;
        speed: number;
        energy: number;
    };
    abilities: {
        name: string;
        type: string;
        cooldown: string;
        description: string;
    }[];
}

// Define your hero catalog based on the images provided
export const HEROES: Hero[] = [
    // COMMON HEROES (Green background)
    {
        id: 'hunter-ranger',
        name: 'Hunter Ranger',
        rarity: 'common',
        type: 'attack',
        power: 850,
        imageSrc: '/assets/heroes/hunter-ranger.jpg', // Using .jpg extension to match your files
        cost: 0,
        description: 'A skilled archer with exceptional range who excels at picking off targets from a distance.',
        stats: {
            attack: 70,
            defense: 40,
            speed: 80,
            energy: 60
        },
        abilities: [
            {
                name: 'Rapid Shot',
                type: 'Attack',
                cooldown: '3 turns',
                description: 'Fires multiple arrows in quick succession for moderate damage'
            },
            {
                name: 'Piercing Arrow',
                type: 'Attack',
                cooldown: '4 turns',
                description: 'Launches an arrow that ignores 50% of enemy defense'
            }
        ]
    },
    {
        id: 'forest-druid',
        name: 'Forest Druid',
        rarity: 'common',
        type: 'magic',
        power: 820,
        imageSrc: '/assets/heroes/forest-druid.jpg', // Using .jpg extension
        cost: 0,
        description: 'A nature-attuned magic user who can heal allies and manipulate the battlefield.',
        stats: {
            attack: 45,
            defense: 50,
            speed: 65,
            energy: 90
        },
        abilities: [
            {
                name: 'Nature\'s Blessing',
                type: 'Heal',
                cooldown: '3 turns',
                description: 'Heals an ally for 30% of their max health'
            },
            {
                name: 'Entangling Roots',
                type: 'Control',
                cooldown: '4 turns',
                description: 'Reduces enemy movement speed by 50% for 2 turns'
            }
        ]
    },

    // RARE HEROES (Blue background)
    {
        id: 'knight-champion',
        name: 'Knight Champion',
        rarity: 'rare',
        type: 'defense',
        power: 1100,
        imageSrc: '/assets/heroes/knight-champion.jpg', // Using .jpg extension
        cost: 0,
        description: 'A stalwart defender trained in the arts of sword and shield combat.',
        stats: {
            attack: 65,
            defense: 85,
            speed: 50,
            energy: 65
        },
        abilities: [
            {
                name: 'Shield Bash',
                type: 'Attack',
                cooldown: '3 turns',
                description: 'Stuns target for 1 turn and deals moderate damage'
            },
            {
                name: 'Defensive Stance',
                type: 'Defense',
                cooldown: '4 turns',
                description: 'Increases defense by 50% for 2 turns'
            }
        ]
    },
    {
        id: 'royal-knight',
        name: 'Royal Knight',
        rarity: 'rare',
        type: 'balanced',
        power: 1150,
        imageSrc: '/assets/heroes/royal-knight.jpg', // Using .jpg extension
        cost: 0,
        description: 'A well-trained knight of the royal guard with balanced offensive and defensive capabilities.',
        stats: {
            attack: 70,
            defense: 70,
            speed: 60,
            energy: 70
        },
        abilities: [
            {
                name: 'Honor Strike',
                type: 'Attack',
                cooldown: '3 turns',
                description: 'Deals bonus damage against enemies with higher health'
            },
            {
                name: 'Royal Command',
                type: 'Buff',
                cooldown: '4 turns',
                description: 'Increases all allies\' attack by 20% for 2 turns'
            }
        ]
    },

    // EPIC HEROES (Purple background)
    {
        id: 'shadow-assassin',
        name: 'Shadow Assassin',
        rarity: 'epic',
        type: 'speed',
        power: 1450,
        imageSrc: '/assets/heroes/shadow-assassin.jpg', // Using .jpg extension
        cost: 0,
        description: 'A deadly assassin who moves through shadows, dealing lethal damage to unsuspecting foes.',
        stats: {
            attack: 85,
            defense: 40,
            speed: 95,
            energy: 75
        },
        abilities: [
            {
                name: 'Shadowstrike',
                type: 'Attack',
                cooldown: '3 turns',
                description: '80% chance of critical hit with bonus damage'
            },
            {
                name: 'Vanish',
                type: 'Utility',
                cooldown: '5 turns',
                description: 'Becomes untargetable for 1 turn and next attack has guaranteed critical hit'
            }
        ]
    },
    {
        id: 'dragon-knight',
        name: 'Dragon Knight',
        rarity: 'epic',
        type: 'attack',
        power: 1480,
        imageSrc: '/assets/heroes/dragon-knight.jpg', // Using .jpg extension
        cost: 0,
        description: 'A fearsome warrior who has bonded with dragon essence, gaining incredible offensive power.',
        stats: {
            attack: 90,
            defense: 65,
            speed: 70,
            energy: 80
        },
        abilities: [
            {
                name: 'Dragon\'s Fury',
                type: 'Attack',
                cooldown: '4 turns',
                description: 'Deals massive fire damage to a single target'
            },
            {
                name: 'Dragon Scales',
                type: 'Defense',
                cooldown: '5 turns',
                description: 'Gains 50% fire resistance and reflects 25% of damage taken'
            }
        ]
    },
    {
        id: 'arcane-mage',
        name: 'Arcane Mage',
        rarity: 'epic',
        type: 'magic',
        power: 1425,
        imageSrc: '/assets/heroes/arcane-mage.jpg', // Using .jpg extension
        cost: 0,
        description: 'A master of arcane magic who can unleash devastating spells against multiple enemies.',
        stats: {
            attack: 95,
            defense: 35,
            speed: 65,
            energy: 100
        },
        abilities: [
            {
                name: 'Arcane Explosion',
                type: 'AoE',
                cooldown: '4 turns',
                description: 'Deals moderate damage to all enemies'
            },
            {
                name: 'Mana Surge',
                type: 'Buff',
                cooldown: '5 turns',
                description: 'Restores 50% energy and increases magic damage by 40% for 2 turns'
            }
        ]
    },

    // LEGENDARY HEROES (Orange/Gold background)
    {
        id: 'mountain-king',
        name: 'Mountain King',
        rarity: 'legendary',
        type: 'defense',
        power: 1850,
        imageSrc: '/assets/heroes/mountain-king.jpg', // Using .jpg extension
        cost: 0,
        description: 'A legendary dwarven king with unmatched resilience and the strength to cleave through armies.',
        stats: {
            attack: 85,
            defense: 95,
            speed: 50,
            energy: 85
        },
        abilities: [
            {
                name: 'Titanic Swing',
                type: 'AoE',
                cooldown: '4 turns',
                description: 'Deals heavy damage to all enemies in front'
            },
            {
                name: 'Mountain\'s Resilience',
                type: 'Defense',
                cooldown: '5 turns',
                description: 'Becomes immune to crowd control for 2 turns and heals 30% health'
            }
        ]
    },
    {
        id: 'thunder-lord',
        name: 'Thunder Lord',
        rarity: 'legendary',
        type: 'attack',
        power: 1900,
        imageSrc: '/assets/heroes/thunder-lord.jpg', // Using .jpg extension
        cost: 0,
        description: 'A legendary warrior blessed by thunder gods, wielding devastating lightning attacks.',
        stats: {
            attack: 95,
            defense: 75,
            speed: 80,
            energy: 90
        },
        abilities: [
            {
                name: 'Thunder Strike',
                type: 'Attack',
                cooldown: '3 turns',
                description: 'Calls down lightning to strike a target and adjacent enemies'
            },
            {
                name: 'Storm Aura',
                type: 'Passive',
                cooldown: 'Passive',
                description: 'Each attack has 30% chance to stun target for 1 turn'
            }
        ]
    },
    {
        id: 'guardian-paladin',
        name: 'Guardian Paladin',
        rarity: 'legendary',
        type: 'balanced',
        power: 1880,
        imageSrc: '/assets/heroes/guardian-paladin.jpg', // Using .jpg extension
        cost: 0,
        description: 'A divine champion chosen to protect the realm, wielding both holy magic and martial prowess.',
        stats: {
            attack: 85,
            defense: 90,
            speed: 65,
            energy: 85
        },
        abilities: [
            {
                name: 'Holy Smite',
                type: 'Attack',
                cooldown: '3 turns',
                description: 'Deals heavy holy damage with 50% healing based on damage dealt'
            },
            {
                name: 'Divine Shield',
                type: 'Defense',
                cooldown: '5 turns',
                description: 'Becomes invulnerable for 1 turn and cleanses all negative effects'
            }
        ]
    }
];

// Helper functions for heroes
export const getRarityColor = (rarity: string): string => {
    switch(rarity) {
        case 'common': return '#14F195'; // Green
        case 'rare': return '#00C2FF';   // Blue
        case 'epic': return '#9945FF';   // Purple
        case 'legendary': return '#FFB800'; // Orange/Gold
        default: return '#14F195';
    }
};

export const getHeroPower = (hero: Hero, level: number, equippedItems: string[] = []): number => {
    // Base power with level boost (10% per level)
    let totalPower = hero.power * (1 + (level - 1) * 0.1);

    // Add boosts from any equipped items (simplified for now)
    if (equippedItems.length > 0) {
        // Add 5% power per equipped item
        totalPower *= (1 + (equippedItems.length * 0.05));
    }

    return Math.round(totalPower);
};