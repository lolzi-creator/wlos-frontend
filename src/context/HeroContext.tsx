// src/context/HeroContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWalletConnection } from './WalletConnectionProvider';
import { Hero, OwnedHero, HEROES, HERO_PACKS } from '../types/HeroTypes';

// Add new type for owned packs
export interface OwnedPack {
    id: string;
    packId: string;
    purchasedAt: number;
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
    const { isConnected, walletAddress, balance } = useWalletConnection();
    const [ownedHeroes, setOwnedHeroes] = useState<OwnedHero[]>([]);
    const [ownedPacks, setOwnedPacks] = useState<OwnedPack[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Load heroes from storage when wallet connects
    useEffect(() => {
        if (isConnected && walletAddress) {
            loadData();
        } else {
            setOwnedHeroes([]);
            setOwnedPacks([]);
        }
    }, [isConnected, walletAddress]);

    // Load all data from localStorage
    const loadData = () => {
        setIsLoading(true);
        try {
            // Load heroes
            const storedHeroes = localStorage.getItem(`heroes_${walletAddress}`);
            if (storedHeroes) {
                setOwnedHeroes(JSON.parse(storedHeroes));
            }

            // Load packs
            const storedPacks = localStorage.getItem(`hero_packs_${walletAddress}`);
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
    const saveHeroes = (updatedHeroes: OwnedHero[]) => {
        try {
            localStorage.setItem(`heroes_${walletAddress}`, JSON.stringify(updatedHeroes));
        } catch (err) {
            console.error('Error saving heroes:', err);
        }
    };

    const savePacks = (updatedPacks: OwnedPack[]) => {
        try {
            localStorage.setItem(`hero_packs_${walletAddress}`, JSON.stringify(updatedPacks));
        } catch (err) {
            console.error('Error saving packs:', err);
        }
    };

    // Buy a new hero (not really needed as heroes will primarily come from packs)
    const buyHero = async (heroId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const heroInfo = HEROES.find(h => h.id === heroId);
            if (!heroInfo) {
                throw new Error('Hero not found');
            }

            // Check if user has enough balance
            if (balance.wlos < heroInfo.cost) {
                throw new Error('Insufficient WLOS balance');
            }

            // Create new owned hero
            const newHero: OwnedHero = {
                id: `${heroId}_${Date.now()}`,
                heroId: heroId,
                level: 1,
                purchasedAt: Date.now(),
                experience: 0,
                equippedItems: []
            };

            const updatedHeroes = [...ownedHeroes, newHero];
            setOwnedHeroes(updatedHeroes);
            saveHeroes(updatedHeroes);

            return true;
        } catch (err: any) {
            console.error('Error buying hero:', err);
            setError(err.message || 'Failed to purchase hero');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Level up a hero
    const levelUpHero = async (ownedHeroId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const heroIndex = ownedHeroes.findIndex(h => h.id === ownedHeroId);
            if (heroIndex === -1) {
                throw new Error('Hero not found');
            }

            const hero = ownedHeroes[heroIndex];
            const levelUpCost = 75 * hero.level; // Example cost formula

            // Check if user has enough balance
            if (balance.wlos < levelUpCost) {
                throw new Error('Insufficient WLOS balance');
            }

            // Update hero level
            const updatedHeroes = [...ownedHeroes];
            updatedHeroes[heroIndex] = {
                ...hero,
                level: hero.level + 1
            };

            setOwnedHeroes(updatedHeroes);
            saveHeroes(updatedHeroes);

            return true;
        } catch (err: any) {
            console.error('Error leveling up hero:', err);
            setError(err.message || 'Failed to level up hero');
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
            const packInfo = HERO_PACKS.find(p => p.id === packId);
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
    const openPack = async (ownedPackId: string): Promise<{ success: boolean; hero?: Hero }> => {
        setIsLoading(true);
        setError(null);

        try {
            // Find the pack in the inventory
            const packIndex = ownedPacks.findIndex(p => p.id === ownedPackId);
            if (packIndex === -1) {
                throw new Error('Pack not found in your inventory');
            }

            const ownedPack = ownedPacks[packIndex];
            const packInfo = HERO_PACKS.find(p => p.id === ownedPack.packId);
            if (!packInfo) {
                throw new Error('Pack type not found');
            }

            // Remove the pack from inventory
            const updatedPacks = [...ownedPacks];
            updatedPacks.splice(packIndex, 1);
            setOwnedPacks(updatedPacks);
            savePacks(updatedPacks);

            // Determine which rarity the hero will be based on chances
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

            // Get a random hero of the selected rarity
            const rarityHeroes = HEROES.filter(h => h.rarity === rarity);
            if (rarityHeroes.length === 0) {
                // Fallback in case no heroes of this rarity exist
                throw new Error(`No heroes of ${rarity} rarity available`);
            }

            const randomHero = rarityHeroes[Math.floor(Math.random() * rarityHeroes.length)];

            // Add the hero to the user's collection
            const newHero: OwnedHero = {
                id: `${randomHero.id}_${Date.now()}`,
                heroId: randomHero.id,
                level: 1,
                purchasedAt: Date.now(),
                experience: 0,
                equippedItems: []
            };

            const updatedHeroes = [...ownedHeroes, newHero];
            setOwnedHeroes(updatedHeroes);
            saveHeroes(updatedHeroes);

            return { success: true, hero: randomHero };
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
        ownedHeroes,
        buyHero,
        levelUpHero,
        ownedPacks,
        buyPack,
        openPack,
        isLoading,
        error
    };

    return (
        <HeroContext.Provider value={value}>
            {children}
        </HeroContext.Provider>
    );
};