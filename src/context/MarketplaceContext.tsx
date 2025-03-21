// src/context/MarketplaceContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWalletConnection } from './WalletConnectionProvider';
import { Item, OwnedItem, MARKETPLACE_ITEMS } from '../types/ItemTypes';

interface MarketplaceListingItem {
    id: string;
    ownedItemId: string;
    itemId: string;
    price: number;
    seller: string;
    listedAt: number;
}

interface MarketplaceContextType {
    // User's inventory
    ownedItems: OwnedItem[];

    // Marketplace listings (including from other users)
    marketListings: MarketplaceListingItem[];

    // User's personal listings
    myListings: MarketplaceListingItem[];

    // Functions
    buyItem: (itemId: string) => Promise<boolean>;
    sellItem: (ownedItemId: string, price: number) => Promise<boolean>;
    cancelListing: (listingId: string) => Promise<boolean>;
    useItem: (ownedItemId: string) => Promise<boolean>;
    equipItem: (ownedItemId: string, warlordId: string | null) => Promise<boolean>;
    updateListingPrice: (listingId: string, newPrice: number) => Promise<boolean>;

    // State
    isLoading: boolean;
    error: string | null;
}

const MarketplaceContext = createContext<MarketplaceContextType | null>(null);

export const useMarketplace = () => {
    const context = useContext(MarketplaceContext);
    if (!context) {
        throw new Error('useMarketplace must be used within a MarketplaceProvider');
    }
    return context;
};

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isConnected, walletAddress, balance } = useWalletConnection();
    const [ownedItems, setOwnedItems] = useState<OwnedItem[]>([]);
    const [marketListings, setMarketListings] = useState<MarketplaceListingItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Load data from localStorage when wallet connects
    useEffect(() => {
        if (isConnected && walletAddress) {
            loadData();
        } else {
            setOwnedItems([]);
            setMarketListings([]);
        }
    }, [isConnected, walletAddress]);

    // Load data from localStorage
    const loadData = () => {
        setIsLoading(true);
        try {
            // Load owned items
            const storedItems = localStorage.getItem(`items_${walletAddress}`);
            if (storedItems) {
                setOwnedItems(JSON.parse(storedItems));
            }

            // Load marketplace listings
            const storedListings = localStorage.getItem(`marketplace_listings`);
            if (storedListings) {
                setMarketListings(JSON.parse(storedListings));
            }
        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load your inventory data');
        } finally {
            setIsLoading(false);
        }
    };

    // Save functions
    const saveOwnedItems = (updatedItems: OwnedItem[]) => {
        try {
            localStorage.setItem(`items_${walletAddress}`, JSON.stringify(updatedItems));
        } catch (err) {
            console.error('Error saving items:', err);
        }
    };

    const saveMarketListings = (updatedListings: MarketplaceListingItem[]) => {
        try {
            localStorage.setItem('marketplace_listings', JSON.stringify(updatedListings));
        } catch (err) {
            console.error('Error saving listings:', err);
        }
    };

    // Get user's own listings
    const myListings = marketListings.filter(
        listing => listing.seller === walletAddress
    );

    // Buy an item from the marketplace - now only for player listings
    const buyItem = async (itemId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Only purchase player listings - no direct catalog purchases
            const listingIndex = marketListings.findIndex(listing => listing.id === itemId);

            if (listingIndex >= 0) {
                // It's a marketplace listing
                const listing = marketListings[listingIndex];
                const itemDetails = MARKETPLACE_ITEMS.find(item => item.id === listing.itemId);

                if (!itemDetails) {
                    throw new Error('Item not found in marketplace catalog');
                }

                // Check if user has enough balance
                if (balance.wlos < listing.price) {
                    throw new Error('Insufficient WLOS balance');
                }

                // Create a new owned item
                const newOwnedItem: OwnedItem = {
                    id: `${listing.itemId}_${Date.now()}`,
                    itemId: listing.itemId,
                    purchasedAt: Date.now(),
                    equipped: null
                };

                // Add durability for equipment or charges for consumables
                if (itemDetails.type === 'consumable') {
                    newOwnedItem.charges = 1;
                } else {
                    newOwnedItem.durability = 100;
                }

                // Add to user's inventory
                const updatedOwnedItems = [...ownedItems, newOwnedItem];
                setOwnedItems(updatedOwnedItems);
                saveOwnedItems(updatedOwnedItems);

                // Remove from marketplace listings
                const updatedListings = [...marketListings];
                updatedListings.splice(listingIndex, 1);
                setMarketListings(updatedListings);
                saveMarketListings(updatedListings);

                return true;
            } else {
                // Items can only be obtained through packs or player listings
                throw new Error('This item is not available for direct purchase. Items can only be acquired through packs or player listings.');
            }
        } catch (err: any) {
            console.error('Error buying item:', err);
            setError(err.message || 'Failed to purchase item');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // List an item for sale
    const sellItem = async (ownedItemId: string, price: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Find the owned item
            const itemIndex = ownedItems.findIndex(item => item.id === ownedItemId);
            if (itemIndex === -1) {
                throw new Error('Item not found in your inventory');
            }

            const ownedItem = ownedItems[itemIndex];

            // Check if item is equipped
            if (ownedItem.equipped) {
                throw new Error('Please unequip the item before selling');
            }

            // Create new listing
            const newListing: MarketplaceListingItem = {
                id: `listing_${Date.now()}`,
                ownedItemId: ownedItemId,
                itemId: ownedItem.itemId,
                price: price,
                seller: walletAddress,
                listedAt: Date.now()
            };

            // Add to marketplace listings
            const updatedListings = [...marketListings, newListing];
            setMarketListings(updatedListings);
            saveMarketListings(updatedListings);

            // Remove from owned items
            const updatedOwnedItems = [...ownedItems];
            updatedOwnedItems.splice(itemIndex, 1);
            setOwnedItems(updatedOwnedItems);
            saveOwnedItems(updatedOwnedItems);

            return true;
        } catch (err: any) {
            console.error('Error selling item:', err);
            setError(err.message || 'Failed to list item for sale');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Cancel a marketplace listing
    const cancelListing = async (listingId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Find the listing
            const listingIndex = marketListings.findIndex(listing => listing.id === listingId);
            if (listingIndex === -1) {
                throw new Error('Listing not found');
            }

            const listing = marketListings[listingIndex];

            // Check if user is the seller
            if (listing.seller !== walletAddress) {
                throw new Error('You can only cancel your own listings');
            }

            // Get the original item details
            const itemDetails = MARKETPLACE_ITEMS.find(item => item.id === listing.itemId);
            if (!itemDetails) {
                throw new Error('Item details not found');
            }

            // Create a new owned item (returning to inventory)
            const newOwnedItem: OwnedItem = {
                id: `${listing.itemId}_${Date.now()}`,
                itemId: listing.itemId,
                purchasedAt: listing.listedAt, // Use the original listing time
                equipped: null
            };

            // Add durability for equipment or charges for consumables
            if (itemDetails.type === 'consumable') {
                newOwnedItem.charges = 1;
            } else {
                newOwnedItem.durability = 100;
            }

            // Add back to user's inventory
            const updatedOwnedItems = [...ownedItems, newOwnedItem];
            setOwnedItems(updatedOwnedItems);
            saveOwnedItems(updatedOwnedItems);

            // Remove from marketplace listings
            const updatedListings = [...marketListings];
            updatedListings.splice(listingIndex, 1);
            setMarketListings(updatedListings);
            saveMarketListings(updatedListings);

            return true;
        } catch (err: any) {
            console.error('Error canceling listing:', err);
            setError(err.message || 'Failed to cancel listing');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Use a consumable item
    const useItem = async (ownedItemId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Find the owned item
            const itemIndex = ownedItems.findIndex(item => item.id === ownedItemId);
            if (itemIndex === -1) {
                throw new Error('Item not found in your inventory');
            }

            const ownedItem = ownedItems[itemIndex];

            // Get the original item details
            const itemDetails = MARKETPLACE_ITEMS.find(item => item.id === ownedItem.itemId);
            if (!itemDetails) {
                throw new Error('Item details not found');
            }

            // Check if item is a consumable
            if (itemDetails.type !== 'consumable') {
                throw new Error('Only consumable items can be used');
            }

            // Check if item has charges left
            if (!ownedItem.charges || ownedItem.charges <= 0) {
                throw new Error('Item has no charges left');
            }

            // Apply the item effect (in a real app, this would apply buffs to the character)
            console.log(`Applied effect: ${itemDetails.effect}`);

            // Reduce charges by 1
            const updatedOwnedItems = [...ownedItems];
            updatedOwnedItems[itemIndex] = {
                ...ownedItem,
                charges: (ownedItem.charges || 1) - 1
            };

            // If no charges left, remove from inventory
            if (updatedOwnedItems[itemIndex].charges <= 0) {
                updatedOwnedItems.splice(itemIndex, 1);
            }

            // Update state and save
            setOwnedItems(updatedOwnedItems);
            saveOwnedItems(updatedOwnedItems);

            return true;
        } catch (err: any) {
            console.error('Error using item:', err);
            setError(err.message || 'Failed to use item');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Equip or unequip an item
    const equipItem = async (ownedItemId: string, warlordId: string | null): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Find the owned item
            const itemIndex = ownedItems.findIndex(item => item.id === ownedItemId);
            if (itemIndex === -1) {
                throw new Error('Item not found in your inventory');
            }

            const ownedItem = ownedItems[itemIndex];

            // Get the original item details
            const itemDetails = MARKETPLACE_ITEMS.find(item => item.id === ownedItem.itemId);
            if (!itemDetails) {
                throw new Error('Item details not found');
            }

            // Check if item is equippable
            if (itemDetails.type === 'consumable') {
                throw new Error('Consumable items cannot be equipped');
            }

            // Update the equipped status
            const updatedOwnedItems = [...ownedItems];
            updatedOwnedItems[itemIndex] = {
                ...ownedItem,
                equipped: warlordId
            };

            // Update state and save
            setOwnedItems(updatedOwnedItems);
            saveOwnedItems(updatedOwnedItems);

            return true;
        } catch (err: any) {
            console.error('Error equipping item:', err);
            setError(err.message || 'Failed to equip item');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Update listing price
    const updateListingPrice = async (listingId: string, newPrice: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Find the listing
            const listingIndex = marketListings.findIndex(listing => listing.id === listingId);
            if (listingIndex === -1) {
                throw new Error('Listing not found');
            }

            const listing = marketListings[listingIndex];

            // Check if user is the seller
            if (listing.seller !== walletAddress) {
                throw new Error('You can only update prices for your own listings');
            }

            // Update the price
            const updatedListings = [...marketListings];
            updatedListings[listingIndex] = {
                ...listing,
                price: newPrice
            };

            // Update state and save
            setMarketListings(updatedListings);
            saveMarketListings(updatedListings);

            return true;
        } catch (err: any) {
            console.error('Error updating listing price:', err);
            setError(err.message || 'Failed to update listing price');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Context value
    const value = {
        ownedItems,
        marketListings,
        myListings,
        buyItem,
        sellItem,
        cancelListing,
        useItem,
        equipItem,
        updateListingPrice,
        isLoading,
        error
    };

    return (
        <MarketplaceContext.Provider value={value}>
            {children}
        </MarketplaceContext.Provider>
    );
};