// src/context/FarmerContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWalletConnection } from './WalletConnectionProvider';
import { Farmer, OwnedFarmer, FARMERS, FARMER_PACKS } from '../types/FarmerTypes';

// Add new type for owned packs
export interface OwnedPack {
    id: string;
    packId: string;
    purchasedAt: number;
}

interface FarmerContextType {
    // Existing properties
    ownedFarmers: OwnedFarmer[];
    pendingRewards: number;
    buyFarmer: (farmerId: string) => Promise<boolean>;
    harvestRewards: () => Promise<boolean>;
    levelUpFarmer: (ownedFarmerId: string) => Promise<boolean>;

    // New properties for packs
    ownedPacks: OwnedPack[];
    buyPack: (packId: string) => Promise<boolean>;
    openPack: (ownedPackId: string) => Promise<{
        success: boolean;
        farmer?: Farmer;
    }>;
    isLoading: boolean;
    error: string | null;
}

const FarmerContext = createContext<FarmerContextType | null>(null);

export const useFarmer = () => {
    const context = useContext(FarmerContext);
    if (!context) {
        throw new Error('useFarmer must be used within a FarmerProvider');
    }
    return context;
};

export const FarmerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Existing state
    const { isConnected, walletAddress, balance } = useWalletConnection();
    const [ownedFarmers, setOwnedFarmers] = useState<OwnedFarmer[]>([]);
    const [pendingRewards, setPendingRewards] = useState<number>(0);

    // New state for packs
    const [ownedPacks, setOwnedPacks] = useState<OwnedPack[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Load farmers from storage when wallet connects
    useEffect(() => {
        if (isConnected && walletAddress) {
            loadData();
        } else {
            setOwnedFarmers([]);
            setOwnedPacks([]);
            setPendingRewards(0);
        }
    }, [isConnected, walletAddress]);

    // Calculate pending rewards every minute
    useEffect(() => {
        if (!isConnected || ownedFarmers.length === 0) return;

        calculatePendingRewards();
        const interval = setInterval(calculatePendingRewards, 60000);
        return () => clearInterval(interval);
    }, [isConnected, ownedFarmers]);

    // Load all data from localStorage
    const loadData = () => {
        setIsLoading(true);
        try {
            // Load farmers
            const storedFarmers = localStorage.getItem(`farmers_${walletAddress}`);
            if (storedFarmers) {
                setOwnedFarmers(JSON.parse(storedFarmers));
            }

            // Load packs
            const storedPacks = localStorage.getItem(`farmer_packs_${walletAddress}`);
            if (storedPacks) {
                setOwnedPacks(JSON.parse(storedPacks));
            }
        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load your data');
        } finally {
            setIsLoading(false);
        }
    };

    // Save functions
    const saveFarmers = (updatedFarmers: OwnedFarmer[]) => {
        try {
            localStorage.setItem(`farmers_${walletAddress}`, JSON.stringify(updatedFarmers));
        } catch (err) {
            console.error('Error saving farmers:', err);
        }
    };

    const savePacks = (updatedPacks: OwnedPack[]) => {
        try {
            localStorage.setItem(`farmer_packs_${walletAddress}`, JSON.stringify(updatedPacks));
        } catch (err) {
            console.error('Error saving packs:', err);
        }
    };

    // Calculate pending rewards based on elapsed time
    const calculatePendingRewards = () => {
        const now = Date.now();
        let totalRewards = 0;

        ownedFarmers.forEach(farmer => {
            const farmerInfo = FARMERS.find(f => f.id === farmer.farmerId);
            if (!farmerInfo) return;

            const hoursPassed = (now - farmer.lastHarvested) / (1000 * 60 * 60);
            const levelMultiplier = 1 + (farmer.level * 0.1); // 10% boost per level
            const farmerReward = farmerInfo.baseYieldPerHour * hoursPassed * levelMultiplier;

            totalRewards += farmerReward;
        });

        setPendingRewards(totalRewards);
    };

    // Buy a new farmer
    const buyFarmer = async (farmerId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const farmerInfo = FARMERS.find(f => f.id === farmerId);
            if (!farmerInfo) {
                throw new Error('Farmer not found');
            }

            // Check if user has enough balance
            if (balance.wlos < farmerInfo.cost) {
                throw new Error('Insufficient WLOS balance');
            }

            // Create new owned farmer
            const newFarmer: OwnedFarmer = {
                id: `${farmerId}_${Date.now()}`,
                farmerId: farmerId,
                level: 1,
                purchasedAt: Date.now(),
                lastHarvested: Date.now(),
                equippedItems: []
            };

            const updatedFarmers = [...ownedFarmers, newFarmer];
            setOwnedFarmers(updatedFarmers);
            saveFarmers(updatedFarmers);

            return true;
        } catch (err: any) {
            console.error('Error buying farmer:', err);
            setError(err.message || 'Failed to purchase farmer');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Harvest pending rewards
    const harvestRewards = async (): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            if (pendingRewards <= 0) {
                throw new Error('No rewards to harvest');
            }

            // Update last harvested time for all farmers
            const now = Date.now();
            const updatedFarmers = ownedFarmers.map(farmer => ({
                ...farmer,
                lastHarvested: now
            }));

            setOwnedFarmers(updatedFarmers);
            saveFarmers(updatedFarmers);
            setPendingRewards(0);

            return true;
        } catch (err: any) {
            console.error('Error harvesting rewards:', err);
            setError(err.message || 'Failed to harvest rewards');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Level up a farmer
    const levelUpFarmer = async (ownedFarmerId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const farmerIndex = ownedFarmers.findIndex(f => f.id === ownedFarmerId);
            if (farmerIndex === -1) {
                throw new Error('Farmer not found');
            }

            const farmer = ownedFarmers[farmerIndex];
            const levelUpCost = 50 * farmer.level; // Example cost formula

            // Check if user has enough balance
            if (balance.wlos < levelUpCost) {
                throw new Error('Insufficient WLOS balance');
            }

            // Update farmer level
            const updatedFarmers = [...ownedFarmers];
            updatedFarmers[farmerIndex] = {
                ...farmer,
                level: farmer.level + 1
            };

            setOwnedFarmers(updatedFarmers);
            saveFarmers(updatedFarmers);

            return true;
        } catch (err: any) {
            console.error('Error leveling up farmer:', err);
            setError(err.message || 'Failed to level up farmer');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Add buyPack function
    const buyPack = async (packId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const packInfo = FARMER_PACKS.find(p => p.id === packId);
            if (!packInfo) {
                throw new Error('Pack not found');
            }

            // Check if user has enough balance
            if (balance.wlos < packInfo.cost) {
                throw new Error('Insufficient WLOS balance');
            }

            // Create a new owned pack
            const newPack: OwnedPack = {
                id: `${packId}_${Date.now()}`,
                packId,
                purchasedAt: Date.now()
            };

            const updatedPacks = [...ownedPacks, newPack];
            setOwnedPacks(updatedPacks);
            savePacks(updatedPacks);

            return true;
        } catch (err: any) {
            console.error('Error buying pack:', err);
            setError(err.message || 'Failed to purchase pack');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Add openPack function
    const openPack = async (ownedPackId: string): Promise<{ success: boolean; farmer?: Farmer }> => {
        setIsLoading(true);
        setError(null);

        try {
            // Find the pack in the inventory
            const packIndex = ownedPacks.findIndex(p => p.id === ownedPackId);
            if (packIndex === -1) {
                throw new Error('Pack not found in your inventory');
            }

            const ownedPack = ownedPacks[packIndex];
            const packInfo = FARMER_PACKS.find(p => p.id === ownedPack.packId);
            if (!packInfo) {
                throw new Error('Pack type not found');
            }

            // Remove the pack from inventory
            const updatedPacks = [...ownedPacks];
            updatedPacks.splice(packIndex, 1);
            setOwnedPacks(updatedPacks);
            savePacks(updatedPacks);

            // Determine which rarity the farmer will be based on chances
            let rarity: 'common' | 'rare' | 'epic' | 'legendary';
            const roll = Math.random();
            let cumulativeProbability = 0;

            if (roll < (cumulativeProbability + packInfo.rarityChances.common)) {
                rarity = 'common';
            } else {
                cumulativeProbability += packInfo.rarityChances.common;
                if (roll < (cumulativeProbability + packInfo.rarityChances.rare)) {
                    rarity = 'rare';
                } else {
                    cumulativeProbability += packInfo.rarityChances.rare;
                    if (roll < (cumulativeProbability + packInfo.rarityChances.epic)) {
                        rarity = 'epic';
                    } else {
                        rarity = 'legendary';
                    }
                }
            }

            // Get a random farmer of the selected rarity
            const rarityFarmers = FARMERS.filter(f => f.rarity === rarity);
            if (rarityFarmers.length === 0) {
                // Fallback in case no farmers of this rarity exist
                throw new Error(`No farmers of ${rarity} rarity available`);
            }

            const randomFarmer = rarityFarmers[Math.floor(Math.random() * rarityFarmers.length)];

            // Add the farmer to the user's collection
            const newFarmer: OwnedFarmer = {
                id: `${randomFarmer.id}_${Date.now()}`,
                farmerId: randomFarmer.id,
                level: 1,
                purchasedAt: Date.now(),
                lastHarvested: Date.now(),
                equippedItems: []
            };

            const updatedFarmers = [...ownedFarmers, newFarmer];
            setOwnedFarmers(updatedFarmers);
            saveFarmers(updatedFarmers);

            return { success: true, farmer: randomFarmer };
        } catch (err: any) {
            console.error('Error opening pack:', err);
            setError(err.message || 'Failed to open pack');
            return { success: false };
        } finally {
            setIsLoading(false);
        }
    };

    // Value object to provide to the context
    const value = {
        ownedFarmers,
        pendingRewards,
        buyFarmer,
        harvestRewards,
        levelUpFarmer,
        ownedPacks,
        buyPack,
        openPack,
        isLoading,
        error
    };

    return (
        <FarmerContext.Provider value={value}>
            {children}
        </FarmerContext.Provider>
    );
};