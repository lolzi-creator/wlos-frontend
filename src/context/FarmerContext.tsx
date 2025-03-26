// src/context/FarmerContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWalletConnection } from './WalletConnectionProvider';
import { farmerService, packService } from '../services/api';
import { OwnedFarmer } from '../types/FarmerTypes';

// Define the shape of our context
interface FarmerContextType {
    ownedFarmers: OwnedFarmer[];
    ownedPacks: any[];
    pendingRewards: number;
    totalYieldPerHour: number;
    isLoading: boolean;
    error: string | null;
    buyPack: (packId: string) => Promise<boolean>;
    openPack: (packId: string) => Promise<{ success: boolean; farmer?: any; error?: string }>;
    harvestRewards: () => Promise<boolean>;
    levelUpFarmer: (farmerId: string) => Promise<boolean>;
    refresh: () => Promise<void>;
}

const FarmerContext = createContext<FarmerContextType | undefined>(undefined);

// Add interface for backend farmer type
interface BackendFarmer {
    id: number;
    farmer_id: string;
    name: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    level: number;
    base_yield_per_hour: number;
    effectiveYield: number;
    purchased_at: string;
    last_harvested: string;
    equipped_items?: string[];
    image_src?: string;
    description: string;
}

export const FarmerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { walletAddress, isConnected, refreshBalance } = useWalletConnection();
    const [ownedFarmers, setOwnedFarmers] = useState<OwnedFarmer[]>([]);
    const [ownedPacks, setOwnedPacks] = useState<any[]>([]);
    const [pendingRewards, setPendingRewards] = useState<number>(0);
    const [totalYieldPerHour, setTotalYieldPerHour] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch data when wallet is connected
    useEffect(() => {
        if (isConnected && walletAddress) {
            fetchFarmers();
            fetchPacks();
        } else {
            setOwnedFarmers([]);
            setOwnedPacks([]);
            setPendingRewards(0);
            setTotalYieldPerHour(0);
        }
    }, [isConnected, walletAddress]);

    // Fetch farmers from backend
    const fetchFarmers = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await farmerService.getFarmers(walletAddress);

            // Map the backend farmers to our frontend OwnedFarmer format
            const mappedFarmers = response.data.farmers.map((backendFarmer: BackendFarmer) => ({
                id: backendFarmer.id.toString(),
                farmerId: backendFarmer.farmer_id,
                name: backendFarmer.name,
                rarity: backendFarmer.rarity,
                level: backendFarmer.level,
                baseYieldPerHour: backendFarmer.base_yield_per_hour,
                effectiveYield: backendFarmer.effectiveYield,
                purchasedAt: new Date(backendFarmer.purchased_at).getTime(),
                lastHarvested: new Date(backendFarmer.last_harvested).getTime(),
                equippedItems: backendFarmer.equipped_items || [],
                imageSrc: backendFarmer.image_src,
                description: backendFarmer.description
            }));

            setOwnedFarmers(mappedFarmers);
            setPendingRewards(response.data.pendingRewards || 0);
            setTotalYieldPerHour(response.data.totalYieldPerHour || 0);

            console.log('Farmers loaded:', mappedFarmers);

        } catch (err) {
            console.error('Error fetching farmers:', err);
            setError('Failed to fetch farmers. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch farmer packs from backend
    const fetchPacks = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const packResponse = await packService.getPackInventory(walletAddress, 'farmer');
            setOwnedPacks(packResponse.data.packs || []);

        } catch (err) {
            console.error('Error fetching packs:', err);
            setError('Failed to fetch packs. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Buy a farmer pack
    const buyPack = async (packId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            await packService.buyPack(walletAddress, packId, 'farmer');

            // Refresh packs and balance after purchase
            await fetchPacks();
            refreshBalance();

            return true;

        } catch (err: any) {
            console.error('Error buying pack:', err);
            setError(err.response?.data?.error || 'Failed to buy pack. Please try again later.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Open a farmer pack
    const openPack = async (packId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const openResponse = await packService.openPack(walletAddress, packId);

            // Refresh farmers and packs after opening
            await fetchFarmers();
            await fetchPacks();

            // Return the farmer from the pack
            const farmer = openResponse.data.contents.farmers[0];
            return { success: true, farmer };

        } catch (err: any) {
            console.error('Error opening pack:', err);
            setError(err.response?.data?.error || 'Failed to open pack. Please try again later.');
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    // Harvest all pending rewards
    const harvestRewards = async () => {
        try {
            setIsLoading(true);
            setError(null);

            await farmerService.harvestAll(walletAddress);

            // Refresh farmers and balance after harvesting
            await fetchFarmers();
            refreshBalance();

            return true;

        } catch (err: any) {
            console.error('Error harvesting rewards:', err);
            setError(err.response?.data?.error || 'Failed to harvest rewards. Please try again later.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Level up a farmer
    const levelUpFarmer = async (farmerId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            await farmerService.levelUpFarmer(walletAddress, farmerId);

            // Refresh farmers after leveling up
            await fetchFarmers();

            return true;

        } catch (err: any) {
            console.error('Error leveling up farmer:', err);

            // Format the error message for better user experience
            let errorMessage = err.response?.data?.error || 'Failed to level up farmer.';

            // If the error contains information about needing more farmers
            if (errorMessage.includes('Not enough farmers to merge')) {
                errorMessage = errorMessage; // The backend error is already user-friendly
            } else if (errorMessage.includes('already at maximum level')) {
                errorMessage = 'This farmer is already at maximum level (5).';
            }

            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FarmerContext.Provider
            value={{
                ownedFarmers,
                ownedPacks,
                pendingRewards,
                totalYieldPerHour,
                isLoading,
                error,
                buyPack,
                openPack,
                harvestRewards,
                levelUpFarmer,
                refresh: fetchFarmers
            }}
        >
            {children}
        </FarmerContext.Provider>
    );
};

export const useFarmer = (): FarmerContextType => {
    const context = useContext(FarmerContext);
    if (context === undefined) {
        throw new Error('useFarmer must be used within a FarmerProvider');
    }
    return context;
};