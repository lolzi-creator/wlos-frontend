import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { authService, walletService, assetService } from '../services/api.ts';

// Define types for our context
interface WalletContextProps {
    isConnected: boolean;
    walletAddress: string;
    balance: {
        sol: number;
        wlos: number;
        usd: number;
    };
    walletBalance: {
        sol: number;
        wlos: number;
        usd: number;
    };
    assets: {
        heroes: any[];
        farmers: any[];
        items: any[];
    };
    transactions: any[];
    isLoading: boolean;
    error: string | null;
    disconnect: () => Promise<void>;
    refreshBalance: (address?: string) => Promise<any>;
    refreshAssets: (address?: string) => Promise<any>;
    refreshTransactions: (page?: number, limit?: number) => Promise<any>;
    refreshWallet: () => Promise<void>;
}

// Create context with default values
const WalletConnectionContext = createContext<WalletContextProps>({
    isConnected: false,
    walletAddress: '',
    balance: { sol: 0, wlos: 0, usd: 0 },
    walletBalance: { sol: 0, wlos: 0, usd: 0 },
    assets: { heroes: [], farmers: [], items: [] },
    transactions: [],
    isLoading: false,
    error: null,
    disconnect: async () => {},
    refreshBalance: async () => ({}),
    refreshAssets: async () => ({}),
    refreshTransactions: async () => ({}),
    refreshWallet: async () => {},
});

interface WalletConnectionProviderProps {
    children: ReactNode;
}

export const WalletConnectionProvider: React.FC<WalletConnectionProviderProps> = ({ children }) => {
    const { publicKey, disconnect } = useWallet();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [balance, setBalance] = useState<{ sol: number; wlos: number; usd: number }>({ sol: 0, wlos: 0, usd: 0 });
    const [assets, setAssets] = useState<{ heroes: any[]; farmers: any[]; items: any[] }>({ heroes: [], farmers: [], items: [] });
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Connect wallet and fetch initial data
    useEffect(() => {
        if (publicKey) {
            const address = publicKey.toString();
            handleConnect(address);
        } else {
            setIsConnected(false);
            setWalletAddress('');
            setBalance({ sol: 0, wlos: 0, usd: 0 });
            setAssets({ heroes: [], farmers: [], items: [] });
            setTransactions([]);
        }
    }, [publicKey]);

    // Handle connect wallet
    const handleConnect = async (address: string) => {
        try {
            setIsLoading(true);
            setError(null);
            setWalletAddress(address);

            // Register wallet in the backend
            await authService.connectWallet(address);

            // Fetch wallet balance
            await fetchBalance(address);

            // Fetch wallet assets
            await fetchAssets(address);

            // Fetch transactions
            await fetchTransactions(address);

            setIsConnected(true);
        } catch (err) {
            console.error('Error connecting wallet:', err);
            setError('Failed to connect wallet. Please try again.');
            setIsConnected(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch balance from backend
    const fetchBalance = async (address: string) => {
        try {
            const response = await walletService.getBalance(address);

            // Calculate USD value (fictional exchange rates)
            const solUsdValue = response.data.sol * 150; // SOL at $150
            const wlosUsdValue = response.data.wlos * 1.5; // WLOS at $1.50

            setBalance({
                sol: response.data.sol,
                wlos: response.data.wlos,
                usd: solUsdValue + wlosUsdValue
            });

            return response.data;
        } catch (err) {
            console.error('Error fetching balance:', err);
            setError('Failed to fetch wallet balance');
            throw err;
        }
    };

    // Fetch assets from backend
    const fetchAssets = async (address: string) => {
        try {
            const response = await assetService.getAllAssets(address);

            setAssets({
                heroes: response.data.heroes || [],
                farmers: response.data.farmers || [],
                items: response.data.items || []
            });

            return response.data;
        } catch (err) {
            console.error('Error fetching assets:', err);
            setError('Failed to fetch wallet assets');
            throw err;
        }
    };

    // Fetch transactions from backend
    const fetchTransactions = async (address: string, page: number = 1, limit: number = 10) => {
        try {
            const response = await walletService.getTransactions(address, page, limit);

            // Format transactions for UI
            const formattedTransactions = response.data.transactions.map((tx: any) => ({
                id: tx.id,
                type: tx.type,
                item: tx.item,
                amount: tx.amount,
                token: tx.token,
                date: new Date(tx.timestamp).toISOString().split('T')[0],
                time: new Date(tx.timestamp).toTimeString().slice(0, 8),
                status: tx.status.charAt(0).toUpperCase() + tx.status.slice(1), // Capitalize first letter
                hash: tx.hash,
                category: tx.category,
                timestamp: tx.timestamp
            }));

            setTransactions(formattedTransactions);
            return {
                transactions: formattedTransactions,
                pagination: response.data.pagination
            };
        } catch (err) {
            console.error('Error fetching transactions:', err);
            setError('Failed to fetch transaction history');
            throw err;
        }
    };

    // Manual refresh
    const refreshWallet = async () => {
        if (!walletAddress || !isConnected) return;

        try {
            setIsLoading(true);
            setError(null);

            await Promise.all([
                fetchBalance(walletAddress),
                fetchAssets(walletAddress),
                fetchTransactions(walletAddress)
            ]);

        } catch (err) {
            console.error('Error refreshing wallet data:', err);
            setError('Failed to refresh wallet data');
        } finally {
            setIsLoading(false);
        }
    };

    // Disconnect wallet
    const handleDisconnect = async () => {
        if (disconnect) {
            try {
                await disconnect();
            } catch (err) {
                console.error('Error disconnecting wallet:', err);
            }

            setIsConnected(false);
            setWalletAddress('');
            setBalance({ sol: 0, wlos: 0, usd: 0 });
            setAssets({ heroes: [], farmers: [], items: [] });
            setTransactions([]);
        }
    };

    return (
        <WalletConnectionContext.Provider
            value={{
                isConnected,
                walletAddress,
                balance,
                walletBalance: balance,
                assets,
                transactions,
                isLoading,
                error,
                disconnect: handleDisconnect,
                refreshBalance: (address?: string) => fetchBalance(address || walletAddress),
                refreshAssets: (address?: string) => fetchAssets(address || walletAddress),
                refreshTransactions: (page?: number, limit?: number) => fetchTransactions(walletAddress, page, limit),
                refreshWallet
            }}
        >
            {children}
        </WalletConnectionContext.Provider>
    );
};

export const useWalletConnection = () => useContext(WalletConnectionContext);