import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface WalletConnectionContextType {
    isConnected: boolean;
    publicKey: PublicKey | null;
    walletAddress: string;
    connect: () => void;
    disconnect: () => void;
    balance: {
        sol: number;
        wlos: number;
        usd: number;
    };
    isLoading: boolean;
    error: string | null;
    refreshBalance: () => Promise<void>;
}

const defaultContext: WalletConnectionContextType = {
    isConnected: false,
    publicKey: null,
    walletAddress: '',
    connect: () => {},
    disconnect: () => {},
    balance: {
        sol: 0,
        wlos: 0,
        usd: 0
    },
    isLoading: false,
    error: null,
    refreshBalance: async () => {}
};

const WalletConnectionContext = createContext<WalletConnectionContextType>(defaultContext);

export const useWalletConnection = () => useContext(WalletConnectionContext);

interface WalletConnectionProviderProps {
    children: ReactNode;
}

// SOL price in USD - in a real app you'd fetch this from an API
const SOL_PRICE_USD = 146.75;

export const WalletConnectionProvider: React.FC<WalletConnectionProviderProps> = ({ children }) => {
    const { publicKey, wallet, connect, disconnect, connected } = useWallet();
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Create a Solana connection
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    // Set up real balance state
    const [balance, setBalance] = useState({
        sol: 0,
        wlos: 0, // This would come from a token account in a real app
        usd: 0
    });

    // Fetch the SOL balance for the connected wallet
    const fetchSolBalance = async (publicKey: PublicKey) => {
        try {
            setIsLoading(true);
            setError(null);

            // Get SOL balance
            const solBalance = await connection.getBalance(publicKey);
            const solInWallet = solBalance / LAMPORTS_PER_SOL;

            // For now, we'll use a mock WLOS balance
            // In a real app, you'd fetch the token balance from the blockchain
            const wlosBalance = 0;

            // Calculate USD value
            const usdValue = solInWallet * SOL_PRICE_USD;

            setBalance({
                sol: solInWallet,
                wlos: wlosBalance,
                usd: usdValue
            });
        } catch (err) {
            console.error('Error fetching balance:', err);
            setError('Failed to load wallet balance');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsConnected(connected);
        if (publicKey) {
            setWalletAddress(publicKey.toString());
            fetchSolBalance(publicKey);
        } else {
            setWalletAddress('');
            // Reset balance when disconnected
            setBalance({
                sol: 0,
                wlos: 0,
                usd: 0
            });
        }
    }, [publicKey, connected]);

    const handleConnect = async () => {
        try {
            if (wallet) {
                await connect();
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            setError('Failed to connect wallet');
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.error('Failed to disconnect wallet:', error);
            setError('Failed to disconnect wallet');
        }
    };

    const refreshBalance = async () => {
        if (publicKey) {
            await fetchSolBalance(publicKey);
        }
    };

    const value = {
        isConnected,
        publicKey,
        walletAddress,
        connect: handleConnect,
        disconnect: handleDisconnect,
        balance,
        isLoading,
        error,
        refreshBalance
    };

    return (
        <WalletConnectionContext.Provider value={value}>
            {children}
        </WalletConnectionContext.Provider>
    );
};