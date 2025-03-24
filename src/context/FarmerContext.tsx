// src/context/FarmerContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWalletConnection } from './WalletConnectionProvider';
import { farmerService, packService } from '../services/api.ts';

const FarmerContext = createContext();

export const FarmerProvider = ({ children }) => {
    const { walletAddress, isConnected, refreshBalance } = useWalletConnection();
    const [ownedFarmers, setOwnedFarmers] = useState([]);
    const [ownedPacks, setOwnedPacks] = useState([]);
    const [pendingRewards, setPendingRewards] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch data when wallet is connected
    useEffect(() => {
        if (isConnected && walletAddress) {
            fetchFarmers();
            fetchPacks();
        } else {
            setOwnedFarmers([]);
            setOwnedPacks([]);
            setPendingRewards(0);
        }
    }, [isConnected, walletAddress]);

    // Fetch farmers from backend
    const fetchFarmers = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await farmerService.getFarmers(walletAddress);

            setOwnedFarmers(response.data.farmers || []);
            setPendingRewards(response.data.pendingRewards || 0);

        } catch (err) {
            console.error('Error fetching farmers:', err);
            setError('Failed to fetch farmers');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch farmer packs from backend
    const fetchPacks = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await packService.getPackInventory(walletAddress, 'farmer');

            setOwnedPacks(response.data.packs || []);

        } catch (err) {
            console.error('Error fetching packs:', err);
            setError('Failed to fetch packs');
        } finally {
            setIsLoading(false);
        }
    };

    // Buy a farmer pack
    const buyPack = async (packId) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await packService.buyPack(walletAddress, packId, 'farmer');

            // Refresh packs and balance after purchase
            await fetchPacks();
            refreshBalance();

            return true;

        } catch (err) {
            console.error('Error buying pack:', err);
            setError(err.response?.data?.error || 'Failed to buy pack');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Open a farmer pack
    const openPack = async (packId) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await packService.openPack(walletAddress, packId);

            // Refresh farmers and packs after opening
            await fetchFarmers();
            await fetchPacks();

            // Return the farmer from the pack
            const farmer = response.data.contents.farmers[0];
            return { success: true, farmer };

        } catch (err) {
            console.error('Error opening pack:', err);
            setError(err.response?.data?.error || 'Failed to open pack');
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

            const response = await farmerService.harvestAll(walletAddress);

            // Refresh farmers and balance after harvesting
            await fetchFarmers();
            refreshBalance();

            return true;

        } catch (err) {
            console.error('Error harvesting rewards:', err);
            setError(err.response?.data?.error || 'Failed to harvest rewards');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Level up a farmer
    const levelUpFarmer = async (farmerId) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await farmerService.levelUpFarmer(walletAddress, farmerId);

            // Refresh farmers after leveling up
            await fetchFarmers();

            return true;

        } catch (err) {
            console.error('Error leveling up farmer:', err);
            setError(err.response?.data?.error || 'Failed to level up farmer');
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

export const useFarmer = () => useContext(FarmerContext);