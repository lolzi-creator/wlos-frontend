// src/context/HeroContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWalletConnection } from './WalletConnectionProvider';
import { Hero, OwnedHero } from '../types/HeroTypes';
import { assetService, packService, heroService } from '../services/api';

// Add new type for owned packs
export interface OwnedPack {
    id: string;
    packId: string;
    name: string;
    description?: string;
    cost: number;
    imageSrc?: string;
    purchased: string;
    opened: boolean;
    assetType: string;
    rarityChances?: {
        common: number;
        rare: number;
        epic: number;
        legendary: number;
    };
}

interface HeroContextType {
    // Existing properties
    ownedHeroes: OwnedHero[];
    buyHero: (heroId: string) => Promise<boolean>;
    levelUpHero: (ownedHeroId: string) => Promise<boolean>;

    // Pack properties
    ownedPacks: OwnedPack[];
    buyPack: (packId: string) => Promise<boolean>;
    openPack: (ownedPackId: string) => Promise<{
        success: boolean;
        hero?: Hero;
    }>;

    // State properties
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

const HeroContext = createContext<HeroContextType | null>(null);

export const useHero = () => {
    const context = useContext(HeroContext);
    if (!context) {
        throw new Error('useHero must be used within a HeroProvider');
    }
    return context;
};

export const HeroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State
    const { isConnected, walletAddress, refreshBalance } = useWalletConnection();
    const [ownedHeroes, setOwnedHeroes] = useState<OwnedHero[]>([]);
    const [ownedPacks, setOwnedPacks] = useState<OwnedPack[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Load heroes from API when wallet connects
    useEffect(() => {
        if (isConnected && walletAddress) {
            fetchHeroes();
            fetchPacks();
        } else {
            setOwnedHeroes([]);
            setOwnedPacks([]);
        }
    }, [isConnected, walletAddress]);

    // Fetch heroes from backend
    const fetchHeroes = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await assetService.getHeroes(walletAddress);

            // Map the backend heroes to our frontend OwnedHero format
            const mappedHeroes = response.data.heroes.map(backendHero => ({
                id: backendHero.id.toString(),
                heroId: backendHero.hero_id,
                name: backendHero.name,
                rarity: backendHero.rarity,
                type: backendHero.type,
                power: backendHero.power,
                level: backendHero.level,
                purchasedAt: new Date(backendHero.purchased_at).getTime(),
                experience: backendHero.experience,
                equippedItems: backendHero.equipped_items || [],
                imageSrc: backendHero.image_src,
                description: backendHero.description,
                stats: backendHero.stats,
                abilities: backendHero.abilities
            }));

            setOwnedHeroes(mappedHeroes);
            console.log('Heroes loaded:', mappedHeroes);

        } catch (err) {
            console.error('Error fetching heroes:', err);
            setError('Failed to fetch heroes. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch hero packs from backend
    const fetchPacks = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await packService.getPackInventory(walletAddress, 'hero');

            setOwnedPacks(response.data.packs || []);
            console.log('Hero packs loaded:', response.data.packs);

        } catch (err) {
            console.error('Error fetching packs:', err);
            setError('Failed to fetch packs. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Buy a hero (not really needed as heroes primarily come from packs)
    const buyHero = async (): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // This function isn't really used since heroes come from packs
            // But we'll keep it for compatibility
            setError("Heroes can only be obtained from packs");
            return false;
        } catch (err: any) {
            console.error('Error buying hero:', err);
            setError(err.message || 'Failed to purchase hero');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Level up a hero using the backend API
    const levelUpHero = async (ownedHeroId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Call the backend API to level up the hero
            await heroService.levelUpHero(walletAddress, ownedHeroId);
// Refresh heroes to get updated data
            await fetchHeroes();

            // Refresh the wallet balance since leveling up costs WLOS
            refreshBalance();

            return true;
        } catch (err: any) {
            console.error('Error leveling up hero:', err);
            setError(err.message || 'Failed to level up hero');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Buy a pack using the API
    const buyPack = async (packId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            await packService.buyPack(walletAddress, packId, 'hero');
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

    // Open a pack using the API
    const openPack = async (ownedPackId: string): Promise<{ success: boolean; hero?: Hero }> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await packService.openPack(walletAddress, ownedPackId);

            // Refresh heroes and packs after opening
            await fetchHeroes();
            await fetchPacks();

            // Return the hero from the pack
            const hero = response.data.contents.heroes[0];
            return { success: true, hero };

        } catch (err: any) {
            console.error('Error opening pack:', err);
            setError(err.response?.data?.error || 'Failed to open pack. Please try again later.');
            return { success: false };
        } finally {
            setIsLoading(false);
        }
    };

    // Value object to provide to the context
    const value = {
        ownedHeroes,
        buyHero,
        levelUpHero,
        ownedPacks,
        buyPack,
        openPack,
        isLoading,
        error,
        refresh: fetchHeroes
    };

    return (
        <HeroContext.Provider value={value}>
            {children}
        </HeroContext.Provider>
    );
};