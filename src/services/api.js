// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Change this to your deployed backend URL later

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Authentication endpoints
export const authService = {
    connectWallet: (walletAddress) => api.post('/auth/connect', { walletAddress }),
    getNonceMessage: (walletAddress) => api.get(`/auth/message/${walletAddress}`),
    verifySignature: (walletAddress, signature) => api.post('/auth/sign', { walletAddress, signature })
};

// Wallet endpoints
export const walletService = {
    getBalance: (walletAddress) => api.get(`/wallet/balance/${walletAddress}`)
};

// Assets endpoints
export const assetService = {
    getAllAssets: (walletAddress) => api.get(`/assets/all/${walletAddress}`),
    getHeroes: (walletAddress) => api.get(`/assets/heroes/${walletAddress}`),
    getFarmers: (walletAddress) => api.get(`/assets/farmers/${walletAddress}`),
    getItems: (walletAddress) => api.get(`/assets/items/${walletAddress}`)
};

// Pack endpoints
export const packService = {
    getPackTypes: (assetType) => api.get(`/packs/types${assetType ? `?assetType=${assetType}` : ''}`),
    buyPack: (walletAddress, packId, assetType) => api.post('/packs/buy', { walletAddress, packId, assetType }),
    getPackInventory: (walletAddress, assetType) => api.get(`/packs/inventory/${walletAddress}${assetType ? `?assetType=${assetType}` : ''}`),
    openPack: (walletAddress, packId) => api.post('/packs/open', { walletAddress, packId })
};

// Staking endpoints
export const stakingService = {
    getPools: () => api.get('/staking/pools'),
    stake: (walletAddress, amount, poolId) => api.post('/staking/stake', { walletAddress, amount, poolId }),
    getInfo: (walletAddress) => api.get(`/staking/info/${walletAddress}`),
    unstake: (walletAddress, stakingId) => api.post('/staking/unstake', { walletAddress, stakingId }),
    claimRewards: (walletAddress, stakingId) => api.post('/staking/claim', { walletAddress, stakingId })
};

// Farmer endpoints
export const farmerService = {
    getFarmers: (walletAddress) => api.get(`/farmers/${walletAddress}`),
    harvestAll: (walletAddress) => api.post('/farmers/harvest', { walletAddress }),
    levelUpFarmer: (walletAddress, farmerId) => api.post('/farmers/levelup', { walletAddress, farmerId })
};