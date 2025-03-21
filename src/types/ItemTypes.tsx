// src/types/ItemTypes.ts
// src/types/ItemTypes.ts
// Add to the existing file:

export interface OwnedItem {
    id: string;
    itemId: string;
    purchasedAt: number;
    equipped?: string | null; // Warlord ID if equipped
    durability?: number; // For equipment
    charges?: number; // For consumables
}

// Mock user inventory data
export const USER_INVENTORY: OwnedItem[] = [
    {
        id: 'owned-quantum-blade-1',
        itemId: 'quantum-blade',
        purchasedAt: Date.now() - 1000000,
        equipped: 'warlord-1',
        durability: 95
    },
    {
        id: 'owned-phase-armor-1',
        itemId: 'phase-armor',
        purchasedAt: Date.now() - 500000,
        equipped: 'warlord-1',
        durability: 88
    },
    {
        id: 'owned-chrono-pendant-1',
        itemId: 'chrono-pendant',
        purchasedAt: Date.now() - 300000,
        equipped: null,
        durability: 100
    },
    {
        id: 'owned-energy-matrix-1',
        itemId: 'energy-matrix',
        purchasedAt: Date.now() - 200000,
        charges: 1
    },
    {
        id: 'owned-energy-matrix-2',
        itemId: 'energy-matrix',
        purchasedAt: Date.now() - 100000,
        charges: 1
    },
    {
        id: 'owned-combat-stim-1',
        itemId: 'combat-stim',
        purchasedAt: Date.now() - 50000,
        charges: 1
    }
];

export interface Item {
    id: string;
    name: string;
    type: 'weapon' | 'armor' | 'accessory' | 'consumable';
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    price: number;
    stats: {
        [key: string]: number;  // Like attack: 10, defense: 5
    };
    effect?: string;  // For consumables
    duration?: string;  // For consumables
    description: string;
    imageSrc: string;
}

// Sample items data
export const MARKETPLACE_ITEMS: Item[] = [
    // WEAPONS
    {
        id: 'quantum-blade',
        name: 'Quantum Blade',
        type: 'weapon',
        rarity: 'epic',
        price: 0,
        stats: {
            attack: 35,
            critChance: 15
        },
        description: 'A blade forged from quantum particles that can slice through dimensional barriers.',
        imageSrc: '/assets/items/quantum-blade.png'
    },
    {
        id: 'plasma-rifle',
        name: 'Plasma Rifle',
        type: 'weapon',
        rarity: 'rare',
        price: 0,
        stats: {
            attack: 25,
            range: 30
        },
        description: 'Long-range energy weapon that fires concentrated plasma bolts.',
        imageSrc: '/assets/items/plasma-rifle.png'
    },
    {
        id: 'void-hammer',
        name: 'Void Hammer',
        type: 'weapon',
        rarity: 'legendary',
        price: 1200,
        stats: {
            attack: 50,
            aoeRadius: 20
        },
        description: 'Ancient hammer that creates ripples in space-time with each impact.',
        imageSrc: '/assets/items/void-hammer.png'
    },

    // ARMOR
    {
        id: 'quantum-shield',
        name: 'Quantum Shield',
        type: 'armor',
        rarity: 'rare',
        price: 480,
        stats: {
            defense: 28,
            energyResistance: 15
        },
        description: 'Advanced shield that can absorb energy attacks and convert them to power.',
        imageSrc: '/assets/items/quantum-shield.png'
    },
    {
        id: 'phase-armor',
        name: 'Phase Armor',
        type: 'armor',
        rarity: 'epic',
        price: 820,
        stats: {
            defense: 40,
            evasion: 20
        },
        description: 'Armor that can phase in and out of reality, making some attacks pass through completely.',
        imageSrc: '/assets/items/phase-armor.png'
    },
    {
        id: 'nano-plate',
        name: 'Nano Plate',
        type: 'armor',
        rarity: 'uncommon',
        price: 320,
        stats: {
            defense: 18,
            weight: -10
        },
        description: 'Lightweight armor made of nanomaterials that adapt to incoming damage.',
        imageSrc: '/assets/items/nano-plate.png'
    },

    // ACCESSORIES
    {
        id: 'neural-amplifier',
        name: 'Neural Amplifier',
        type: 'accessory',
        rarity: 'epic',
        price: 680,
        stats: {
            cooldownReduction: 25,
            abilityPower: 15
        },
        description: 'Enhances neural pathways to accelerate combat reactions and ability usage.',
        imageSrc: '/assets/items/neural-amplifier.png'
    },
    {
        id: 'chrono-pendant',
        name: 'Chrono Pendant',
        type: 'accessory',
        rarity: 'legendary',
        price: 1100,
        stats: {
            cooldownReduction: 35,
            timeWarp: 10
        },
        description: 'Mystical pendant that manipulates local time-flow, granting the wearer enhanced reaction time.',
        imageSrc: '/assets/items/chrono-pendant.png'
    },

    // CONSUMABLES
    {
        id: 'energy-matrix',
        name: 'Energy Matrix',
        type: 'consumable',
        rarity: 'common',
        price: 120,
        stats: {
            energyRegen: 15
        },
        effect: 'Energy regeneration increased by 15%',
        duration: '24 hours',
        description: 'Single-use matrix that enhances energy regeneration capabilities.',
        imageSrc: '/assets/items/energy-matrix.png'
    },
    {
        id: 'combat-stim',
        name: 'Combat Stimulant',
        type: 'consumable',
        rarity: 'uncommon',
        price: 180,
        stats: {
            allStats: 10
        },
        effect: 'All combat stats increased by 10%',
        duration: '1 battle',
        description: 'Temporary boost to all combat statistics for one battle session.',
        imageSrc: '/assets/items/combat-stim.png'
    },
    {
        id: 'quantum-catalyst',
        name: 'Quantum Catalyst',
        type: 'consumable',
        rarity: 'rare',
        price: 350,
        stats: {
            critChance: 30,
            critDamage: 50
        },
        effect: 'Critical strike chance +30%, critical damage +50%',
        duration: '4 hours',
        description: 'Unstable quantum particles that dramatically increase critical combat capabilities.',
        imageSrc: '/assets/items/quantum-catalyst.png'
    }
];