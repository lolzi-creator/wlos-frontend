// src/types/FarmerTypes.ts

export interface FarmerPack {
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

export const FARMER_PACKS: FarmerPack[] = [
    {
        id: 'basic-pack',
        name: 'Basic Farmer Pack',
        description: 'A standard pack with a chance to get common and rare farmers.',
        cost: 0,
        imageSrc: '/assets/packs/basic-pack.png',
        rarityChances: {
            common: 0.8,
            rare: 0.18,
            epic: 0.02,
            legendary: 0
        }
    },
    {
        id: 'premium-pack',
        name: 'Premium Farmer Pack',
        description: 'A premium pack with improved chances for rare and epic farmers.',
        cost: 300,
        imageSrc: '/assets/packs/premium-pack.png',
        rarityChances: {
            common: 0.5,
            rare: 0.35,
            epic: 0.12,
            legendary: 0.03
        }
    },
    {
        id: 'legendary-pack',
        name: 'Legendary Farmer Pack',
        description: 'An exclusive pack with guaranteed epic and increased legendary chances.',
        cost: 800,
        imageSrc: '/assets/packs/legendary-pack.png',
        rarityChances: {
            common: 0,
            rare: 0.3,
            epic: 0.55,
            legendary: 0.15
        }
    }
]

export interface Farmer {
    id: string;
    name: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    baseYieldPerHour: number;
    imageSrc: string;
    cost: number;
    description: string;
}

export interface OwnedFarmer {
    id: string;
    farmerId: string;
    level: number;
    purchasedAt: number;
    lastHarvested: number;
    equippedItems?: string[];
}


// Define your farmer catalog
export const FARMERS: Farmer[] = [
    // COMMON FARMERS (2)
    {
        id: 'agribot-3000',
        name: 'Agribot 3000',
        rarity: 'common',
        baseYieldPerHour: 1.2,
        imageSrc: '/assets/farmers/green-mech.jpeg', // Image 1
        cost: 100,
        description: 'Basic farming mech designed for efficient crystal harvesting. Standard yield but reliable and affordable.'
    },
    {
        id: 'cyber-harvester',
        name: 'Cyber Harvester',
        rarity: 'common',
        baseYieldPerHour: 1.5,
        imageSrc: '/assets/farmers/farmer-joe.jpeg', // Image 2
        cost: 150,
        description: 'Traditional farmer augmented with cybernetic enhancements. Slightly better yield than standard models.'
    },

    // RARE FARMERS (2)
    {
        id: 'quantum-collector',
        name: 'Quantum Collector',
        rarity: 'rare',
        baseYieldPerHour: 3.2,
        imageSrc: '/assets/farmers/blue-bot.jpeg', // Image 3
        cost: 400,
        description: 'Advanced harvesting robot with quantum stabilizers for improved efficiency. Significant yield boost over common models.'
    },
    {
        id: 'eco-reaper',
        name: 'Eco Reaper',
        rarity: 'rare',
        baseYieldPerHour: 3.8,
        imageSrc: '/assets/farmers/green-reaper.jpeg', // Image 4
        cost: 500,
        description: 'Specialized harvester with advanced rake technology. Optimized for maximum resource collection with minimal waste.'
    },

    // EPIC FARMER (1)
    {
        id: 'neuro-cultivator',
        name: 'Neuro Cultivator',
        rarity: 'epic',
        baseYieldPerHour: 7.5,
        imageSrc: '/assets/farmers/purple-bot.jpeg', // Image 5
        cost: 1200,
        description: 'AI-powered farming unit with neural networking capabilities. Can predict optimal harvest patterns for extraordinary yields.'
    },

    // LEGENDARY FARMER (1)
    {
        id: 'omega-harvester',
        name: 'Omega Harvester',
        rarity: 'legendary',
        baseYieldPerHour: 15.0,
        imageSrc: '/assets/farmers/legendary-mech.jpeg', // Image 6
        cost: 3000,
        description: 'Ultimate harvesting technology with quantum field manipulation. Unparalleled efficiency makes this the apex of farming units.'
    }
];

// Define tools/equipment that can boost farmer productivity
export interface FarmingTool {
    id: string;
    name: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    yieldBoostPercentage: number;
    cost: number;
    imageSrc: string;
    description: string;
}

// Sample tools implementation (you can expand this later)
export const FARMING_TOOLS: FarmingTool[] = [
    {
        id: 'basic-harvester',
        name: 'Basic Harvester',
        rarity: 'common',
        yieldBoostPercentage: 10,
        cost: 50,
        imageSrc: '/assets/tools/basic-harvester.png',
        description: 'A simple harvesting tool that provides a small boost to farming efficiency.'
    },
    {
        id: 'quantum-shovel',
        name: 'Quantum Shovel',
        rarity: 'rare',
        yieldBoostPercentage: 25,
        cost: 200,
        imageSrc: '/assets/tools/quantum-shovel.png',
        description: 'Enhanced with quantum technology to significantly increase harvesting capability.'
    },
    {
        id: 'neural-extractor',
        name: 'Neural Extractor',
        rarity: 'epic',
        yieldBoostPercentage: 40,
        cost: 500,
        imageSrc: '/assets/tools/neural-extractor.png',
        description: 'Advanced tool that forms a neural link with farmers to maximize resource extraction.'
    },
    {
        id: 'void-harvester',
        name: 'Void Harvester',
        rarity: 'legendary',
        yieldBoostPercentage: 75,
        cost: 1200,
        imageSrc: '/assets/tools/void-harvester.png',
        description: 'Legendary tool that harvests resources from parallel dimensions, drastically improving yields.'
    }
];

// Helper functions for farmers
export const getRarityColor = (rarity: string): string => {
    switch(rarity) {
        case 'common': return 'green';
        case 'rare': return 'cyan';
        case 'epic': return 'purple';
        case 'legendary': return 'yellow';
        default: return 'green';
    }
};

export const calculateYield = (farmer: Farmer, level: number, equippedTools: FarmingTool[] = []): number => {
    // Base yield with level boost (10% per level)
    let totalYield = farmer.baseYieldPerHour * (1 + (level * 0.1));

    // Add boosts from any equipped tools
    const toolBoostMultiplier = equippedTools.reduce((total, tool) => {
        return total + (tool.yieldBoostPercentage / 100);
    }, 0);

    totalYield *= (1 + toolBoostMultiplier);

    return totalYield;
};