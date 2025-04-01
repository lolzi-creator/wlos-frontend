import axios, { AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://wlos-backend-production.up.railway.app';

// Add some debugging
console.log('API URL:', API_URL);

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Types for API responses
interface BalanceResponse {
    walletAddress: string;
    sol: number;
    wlos: number;
}

interface TransactionResponse {
    id: string;
    type: string;
    item: string;
    amount: number;
    token: string;
    timestamp: string;
    status: string;
    hash?: string;
    category: string;
}

interface TransactionsResponse {
    transactions: TransactionResponse[];
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
}

interface AssetResponse {
    wallet: string;
    heroes: any[];
    farmers: any[];
    items: any[];
}

interface NonceMessageResponse {
    message: string;
}

interface SignatureResponse {
    message: string;
    wallet: string;
}

// Type for filter parameters
interface TransactionFilters {
    category?: string;
    type?: string;
    page?: number;
    limit?: number;
}

// Authentication endpoints
export const authService = {
    connectWallet: (walletAddress: string): Promise<AxiosResponse<{ message: string, wallet: string }>> =>
api.post('/auth/connect', { walletAddress }),

    getNonceMessage: (walletAddress: string): Promise<AxiosResponse<NonceMessageResponse>> =>
api.get(`/auth/message/${walletAddress}`),

    verifySignature: (walletAddress: string, signature: string): Promise<AxiosResponse<SignatureResponse>> =>
api.post('/auth/sign', { walletAddress, signature })
};

// Wallet endpoints
export const walletService = {
    getBalance: (walletAddress: string): Promise<AxiosResponse<BalanceResponse>> =>
api.get(`/wallet/balance/${walletAddress}`),

    getTransactions: (walletAddress: string, page: number = 1, limit: number = 10): Promise<AxiosResponse<TransactionsResponse>> =>
api.get(`/wallet/transactions/${walletAddress}?page=${page}&limit=${limit}`)
};

// Asset endpoints
export const assetService = {
    getAllAssets: (walletAddress: string): Promise<AxiosResponse<AssetResponse>> =>
api.get(`/assets/all/${walletAddress}`),

    getHeroes: (walletAddress: string): Promise<AxiosResponse<{ wallet: string, heroes: any[] }>> =>
api.get(`/assets/heroes/${walletAddress}`),

    getFarmers: (walletAddress: string): Promise<AxiosResponse<{ wallet: string, farmers: any[] }>> =>
api.get(`/assets/farmers/${walletAddress}`),

    getItems: (walletAddress: string): Promise<AxiosResponse<{ wallet: string, items: any[] }>> =>
api.get(`/assets/items/${walletAddress}`)
};

// Transaction endpoints
export const transactionService = {
    getTransactions: (walletAddress: string, page: number = 1, limit: number = 10): Promise<AxiosResponse<TransactionsResponse>> =>
api.get(`/transactions/${walletAddress}?page=${page}&limit=${limit}`),

    filterTransactions: (walletAddress: string, filters: TransactionFilters): Promise<AxiosResponse<TransactionsResponse>> =>
api.post(`/transactions/${walletAddress}/filter`, filters),

    getTransactionDetails: (walletAddress: string, transactionId: string): Promise<AxiosResponse<TransactionResponse>> =>
api.get(`/transactions/${walletAddress}/${transactionId}`),

    getTransactionReceipt: (walletAddress: string, transactionId: string): Promise<AxiosResponse<any>> =>
api.get(`/transactions/${walletAddress}/${transactionId}/receipt`)
};

// Pack endpoints
export const packService = {
    getPackTypes: (assetType?: string): Promise<AxiosResponse<any>> =>
api.get(`/packs/types${assetType ? `?assetType=${assetType}` : ''}`),

    buyPack: (walletAddress: string, packId: string, assetType?: string): Promise<AxiosResponse<any>> =>
api.post('/packs/buy', { walletAddress, packId, assetType }),

    getPackInventory: (walletAddress: string, assetType?: string): Promise<AxiosResponse<any>> =>
api.get(`/packs/inventory/${walletAddress}${assetType ? `?assetType=${assetType}` : ''}`),

    openPack: (walletAddress: string, packId: string): Promise<AxiosResponse<any>> =>
api.post('/packs/open', { walletAddress, packId })
};

// Staking endpoints
export const stakingService = {
    getPools: (): Promise<AxiosResponse<any>> =>
api.get('/staking/pools'),

    stake: (walletAddress: string, amount: number, poolId: string): Promise<AxiosResponse<any>> =>
api.post('/staking/stake', { walletAddress, amount, poolId }),

    getInfo: (walletAddress: string): Promise<AxiosResponse<any>> =>
api.get(`/staking/info/${walletAddress}`),

    unstake: (walletAddress: string, stakingId: string): Promise<AxiosResponse<any>> =>
api.post('/staking/unstake', { walletAddress, stakingId }),

    claimRewards: (walletAddress: string, stakingId: string): Promise<AxiosResponse<any>> =>
api.post('/staking/claim', { walletAddress, stakingId })
};

// Farmer endpoints
export const farmerService = {
    getFarmers: (walletAddress: string): Promise<AxiosResponse<any>> =>
api.get(`/farmers/${walletAddress}`),

    harvestAll: (walletAddress: string): Promise<AxiosResponse<any>> =>
api.post('/farmers/harvest', { walletAddress }),

    levelUpFarmer: (walletAddress: string, farmerId: string): Promise<AxiosResponse<any>> =>
api.post('/farmers/levelup', { walletAddress, farmerId })
};

// Add this at the end of your existing src/services/api.ts file

// Hero endpoints
export const heroService = {
    getHeroes: (walletAddress: string): Promise<AxiosResponse<any>> =>
        api.get(`/heroes/${walletAddress}`),

    levelUpHero: (walletAddress: string, heroId: string): Promise<AxiosResponse<any>> =>
        api.post('/heroes/levelup', { walletAddress, heroId }),

    equipItem: (walletAddress: string, heroId: string, itemId: string): Promise<AxiosResponse<any>> =>
        api.post('/heroes/equip', { walletAddress, heroId, itemId }),

    unequipItem: (walletAddress: string, heroId: string, itemId: string): Promise<AxiosResponse<any>> =>
        api.post('/heroes/unequip', { walletAddress, heroId, itemId })
};

// Marketplace endpoints
export const marketplaceService = {
    // Get all marketplace listings with optional filters
    getListings: (filters?: { 
        category?: string; 
        rarity?: string; 
        minPrice?: number; 
        maxPrice?: number;
        sortBy?: string;
        page?: number; 
        limit?: number; 
    }): Promise<AxiosResponse<any>> => {
        let queryParams = '';
        if (filters) {
            const params = new URLSearchParams();
            if (filters.category) params.append('category', filters.category);
            if (filters.rarity) params.append('rarity', filters.rarity);
            if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
            if (filters.sortBy) params.append('sortBy', filters.sortBy);
            if (filters.page) params.append('page', filters.page.toString());
            if (filters.limit) params.append('limit', filters.limit.toString());
            queryParams = `?${params.toString()}`;
        }
        
        console.log(`Fetching marketplace listings with params: ${queryParams || 'none'}`);
        return api.get(`/marketplace/listings${queryParams}`);
    },
    
    // Get marketplace statistics
    getMarketplaceStats: (): Promise<AxiosResponse<any>> =>
        api.get('/marketplace/stats'),
    
    // Get listings for a specific wallet
    getMyListings: (walletAddress: string): Promise<AxiosResponse<any>> =>
        api.get(`/marketplace/listings/${walletAddress}`),
    
    // Create a new listing
    createListing: (
        walletAddress: string, 
        itemId: string | number, 
        price: number,
        assetType: string = 'item',
        assetDetails?: {
            name?: string;
            type?: string;
            subType?: string;
            category?: string;
            rarity?: string;
            image?: string;
            description?: string;
        }
    ): Promise<AxiosResponse<any>> => {
        console.log('Creating listing with EXACT original ID:', { 
            walletAddress, 
            itemId, 
            itemIdType: typeof itemId,
            price, 
            assetType 
        });
        
        // Use provided asset details or create minimal ones
        const details = assetDetails || {
            name: `Item #${typeof itemId === 'string' ? itemId.substring(0, 4) : itemId}`,
            category: 'items',
            type: 'Item'
        };
        
        // Important: Send the itemId exactly as it comes from the backend
        // Do NOT convert it to a string or modify it in any way
        return api.post('/marketplace/list', { 
            walletAddress,
            assetId: itemId,  // Send the exact original ID
            assetType,
            price,
            assetDetails: details
        })
        .then(response => {
            console.log('Create listing response:', response.data);
            return response;
        })
        .catch(error => {
            console.error('Create listing error details:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                request: {
                    walletAddress,
                    assetId: itemId,
                    assetType,
                    price,
                    assetDetails: details
                }
            });
            throw error;
        });
    },
    
    // Buy an item - updated to match the exact backend API requirements
    purchaseItem: (walletAddress: string, listingId: string): Promise<AxiosResponse<any>> => {
        console.log('Purchasing item:', { walletAddress, listingId });
        
        // From the controller code, the endpoint expects buyerWalletAddress in the body
        return api.post(`/marketplace/buy/${listingId}`, { 
            buyerWalletAddress: walletAddress
        })
            .then(response => {
                console.log('Purchase response success:', response.data);
                return response;
            })
            .catch(error => {
                // Enhanced error logging with more details about the request
                const errorDetails = {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data,
                    message: error.message,
                    request: { 
                        listingId,
                        buyerWalletAddress: walletAddress,
                        url: `/marketplace/buy/${listingId}`
                    }
                };
                
                console.error('Purchase error details:', errorDetails);
                throw error;
            });
    },
    
    // Get estimated value for an asset
    getEstimatedValue: (assetId: string, assetType: string): Promise<AxiosResponse<any>> =>
        api.get(`/marketplace/estimate/${assetType}/${assetId}`),
    
    // Instant sell an asset (no listing needed)
    instantSell: (walletAddress: string, itemId: string | number, assetType: string = 'item'): Promise<AxiosResponse<any>> => {
        console.log('Instant selling item with EXACT original ID:', { 
            walletAddress, 
            itemId, 
            itemIdType: typeof itemId,
            assetType 
        });
        
        // Send the request with assetId parameter instead of itemId
        return api.post('/marketplace/instant-sell', { 
            walletAddress, 
            assetId: itemId, // Changed from itemId to assetId to match backend expectation
            assetType 
        })
            .then(response => {
                console.log('Instant sell response:', response.data);
                
                // Check if the response includes transaction details
                if (response.data?.transaction) {
                    console.log('Transaction details:', response.data.transaction);
                }
                
                // Check if the response includes credits or balance update
                if (response.data?.credits || response.data?.balance) {
                    console.log('Credits/Balance details:', {
                        credits: response.data.credits,
                        balance: response.data.balance
                    });
                }
                
                // Check if there's a success message
                if (response.data?.message) {
                    console.log('Response message:', response.data.message);
                }
                
                return response;
            })
            .catch(error => {
                console.error('Instant sell error details:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                    request: { walletAddress, assetId: itemId, assetType }
                });
                throw error;
            });
    },
    
    // Update a listing (e.g., change price)
    updateListing: (walletAddress: string, listingId: string, price: number): Promise<AxiosResponse<any>> => {
        console.log('Updating listing price:', { walletAddress, listingId, price });
        
        return api.put(`/marketplace/listings/${listingId}`, { walletAddress, price })
            .then(response => {
                console.log('Update listing response:', response.data);
                return response;
            })
            .catch(error => {
                console.error('Update listing error details:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                    request: { walletAddress, listingId, price }
                });
                throw error;
            });
    },
    
    // Cancel a listing
    cancelListing: (walletAddress: string, listingId: string): Promise<AxiosResponse<any>> => {
        console.log('Canceling listing:', { walletAddress, listingId });
        
        return api.delete(`/marketplace/listings/${listingId}`, { 
                data: { walletAddress } 
            })
            .then(response => {
                console.log('Cancel listing response:', response.data);
                return response;
            })
            .catch(error => {
                console.error('Cancel listing error details:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                    request: { walletAddress, listingId }
                });
                throw error;
            });
    },

    // Get user's inventory (not in the provided marketplace.js, but needed for our UI)
    getUserInventory: (walletAddress: string): Promise<AxiosResponse<any>> => {
        console.log('Fetching all assets for wallet:', walletAddress);
        
        // Use getAllAssets to get everything at once
        return assetService.getAllAssets(walletAddress)
            .then(response => {
                console.log('Raw all assets response:', response);
                // Combine items, heroes, and farmers into a unified inventory
                const allAssets = [];
                
                // Process items
                if (response?.data?.items && Array.isArray(response.data.items)) {
                    console.log('Processing items:', response.data.items.length);
                    const processedItems = response.data.items.map((item: any) => {
                        console.log('Raw item from API:', item);
                        return {
                            // IMPORTANT: Keep the exact original ID without any modification
                            id: item.id,
                            name: item.name || `Item #${typeof item.id === 'string' ? item.id.substring(0, 8) : item.id}`,
                            type: 'Item',
                            subType: item.type || "Gadget",
                            category: item.category || "gadgets",
                            rarity: item.rarity || "common",
                            image: item.image,
                            acquired: item.acquiredAt || new Date().toISOString(),
                            equipped: item.equipped || false,
                            assetType: 'item'
                        };
                    });
                    allAssets.push(...processedItems);
                }
                
                // Process heroes
                if (response?.data?.heroes && Array.isArray(response.data.heroes)) {
                    console.log('Processing heroes:', response.data.heroes.length);
                    const processedHeroes = response.data.heroes.map((hero: any) => {
                        console.log('Raw hero from API:', hero);
                        return {
                            // IMPORTANT: Keep the exact original ID without any modification
                            id: hero.id,
                            name: hero.name || `Hero #${typeof hero.id === 'string' ? hero.id.substring(0, 8) : hero.id}`,
                            type: 'Hero',
                            subType: hero.class || "Warrior",
                            category: "heroes",
                            rarity: hero.rarity || "rare",
                            image: hero.image || '/images/marketplace/heroes/hero1.png',
                            acquired: hero.acquiredAt || new Date().toISOString(),
                            equipped: false,
                            level: hero.level || 1,
                            assetType: 'hero'
                        };
                    });
                    allAssets.push(...processedHeroes);
                }
                
                // Process farmers
                if (response?.data?.farmers && Array.isArray(response.data.farmers)) {
                    console.log('Processing farmers:', response.data.farmers.length);
                    const processedFarmers = response.data.farmers.map((farmer: any) => {
                        console.log('Raw farmer from API:', farmer);
                        return {
                            // IMPORTANT: Keep the exact original ID without any modification
                            id: farmer.id,
                            name: farmer.name || `Farmer #${typeof farmer.id === 'string' ? farmer.id.substring(0, 8) : farmer.id}`,
                            type: 'Farmer',
                            subType: farmer.specialization || "General",
                            category: "farmers",
                            rarity: farmer.rarity || "common",
                            image: farmer.image || '/images/marketplace/farmers/farmer1.png',
                            acquired: farmer.acquiredAt || new Date().toISOString(),
                            equipped: false,
                            level: farmer.level || 1,
                            yield: farmer.yield || 0,
                            assetType: 'farmer'
                        };
                    });
                    allAssets.push(...processedFarmers);
                }
                
                // Create a modified response with the unified inventory
                const adaptedResponse = {
                    ...response,
                    data: {
                        ...response.data,
                        items: allAssets
                    }
                };
                
                console.log('Adapted inventory items count:', allAssets.length);
                if (allAssets.length > 0) {
                    console.log('First inventory item example:', allAssets[0]);
                }
                return adaptedResponse;
            });
    }
};