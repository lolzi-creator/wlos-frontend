import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3000'; // Change this to your deployed backend URL later

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