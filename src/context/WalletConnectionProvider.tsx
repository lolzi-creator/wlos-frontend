import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { walletService, assetService, authService } from '../services/api';

const WalletConnectionContext = createContext();

export const WalletConnectionProvider = ({ children }) => {
    const { wallet, publicKey, disconnect, signMessage } = useWallet();
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState({ sol: 0, wlos: 0, usd: 0 });
    const [assets, setAssets] = useState({ heroes: [], farmers: [], items: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
        }
    }, [publicKey]);

    // Handle connect wallet
    const handleConnect = async (address) => {
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

            setIsConnected(true);
        } catch (err) {
            console.error('Error connecting wallet:', err);
            setError('Failed to connect wallet');
            setIsConnected(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch balance from backend
    const fetchBalance = async (address) => {
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

        } catch (err) {
            console.error('Error fetching balance:', err);
            throw err;
        }
    };

    // Fetch assets from backend
    const fetchAssets = async (address) => {
        try {
            const response = await assetService.getAllAssets(address);

            setAssets({
                heroes: response.data.heroes || [],
                farmers: response.data.farmers || [],
                items: response.data.items || []
            });

        } catch (err) {
            console.error('Error fetching assets:', err);
            throw err;
        }
    };

    // Manual refresh
    const refreshWallet = async () => {
        if (!walletAddress) return;

        try {
            setIsLoading(true);
            setError(null);

            await Promise.all([
                fetchBalance(walletAddress),
                fetchAssets(walletAddress)
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
            await disconnect();
            setIsConnected(false);
            setWalletAddress('');
            setBalance({ sol: 0, wlos: 0, usd: 0 });
            setAssets({ heroes: [], farmers: [], items: [] });
        }
    };

    return (
        <WalletConnectionContext.Provider
            value={{
                isConnected,
                walletAddress,
                balance,
                assets,
                isLoading,
                error,
                disconnect: handleDisconnect,
                refreshBalance: fetchBalance,
                refreshAssets: fetchAssets,
                refreshWallet
            }}
        >
            {children}
        </WalletConnectionContext.Provider>
    );
};

export const useWalletConnection = () => useContext(WalletConnectionContext);