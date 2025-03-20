// src/context/FarmerContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWalletConnection } from './WalletConnectionProvider.tsx';
import { Farmer, OwnedFarmer, FARMERS } from '../types/FarmerTypes.tsx';

interface FarmerContextType {
    ownedFarmers: OwnedFarmer[];
    pendingRewards: number;
    buyFarmer: (farmerId: string) => Promise<boolean>;
    harvestRewards: () => Promise<boolean>;
    levelUpFarmer: (ownedFarmerId: string) => Promise<boolean>;
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
    const { isConnected, walletAddress, balance } = useWalletConnection();
    const [ownedFarmers, setOwnedFarmers] = useState<OwnedFarmer[]>([]);
    const [pendingRewards, setPendingRewards] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Load farmers from storage when wallet connects
    useEffect(() => {
        if (isConnected && walletAddress) {
            loadFarmers();
        } else {
            setOwnedFarmers([]);
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

    // Load farmers from localStorage (later replace with blockchain/database)
    const loadFarmers = () => {
        setIsLoading(true);
        try {
            const storedFarmers = localStorage.getItem(`farmers_${walletAddress}`);
            if (storedFarmers) {
                setOwnedFarmers(JSON.parse(storedFarmers));
            }
        } catch (err) {
            console.error('Error loading farmers:', err);
            setError('Failed to load your farmers');
        } finally {
            setIsLoading(false);
        }
    };

    // Save farmers to localStorage
    const saveFarmers = (updatedFarmers: OwnedFarmer[]) => {
        try {
            localStorage.setItem(`farmers_${walletAddress}`, JSON.stringify(updatedFarmers));
        } catch (err) {
            console.error('Error saving farmers:', err);
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

            // In a real implementation, you'd call your blockchain contract here
            // For now, we'll just update local state

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

            // In a real implementation, you'd call your blockchain contract here
            // For now, we'll just update local state

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

    const value = {
        ownedFarmers,
        pendingRewards,
        buyFarmer,
        harvestRewards,
        levelUpFarmer,
        isLoading,
        error
    };

    return (
        <FarmerContext.Provider value={value}>
            {children}
        </FarmerContext.Provider>
    );
};