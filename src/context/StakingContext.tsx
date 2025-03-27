import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWalletConnection } from './WalletConnectionProvider';
import { stakingService } from '../services/api';

// Types
interface StakingPool {
    id: string;
    name: string;
    description: string;
    lockPeriod: number; // in days
    apy: number;
    minStake: number;
    battlePowerBoost: number;
    earlyUnstakeFee: number;
    totalStaked: number;
}

interface StakingPosition {
    id: string;
    poolId: string;
    poolName: string;
    amount: number;
    startTime: string;
    endTime: string;
    lastClaimTime: string;
    pendingRewards: number;
    isActive: boolean;
    isLocked: boolean;
    earlyUnstakeFee: number;
    battlePowerBoost: number;
}

interface StakingStats {
    totalStaked: number;
    totalPendingRewards: number;
    totalBattlePower: number;
    activePositions: number;
}

interface StakingContextProps {
    pools: StakingPool[];
    positions: StakingPosition[];
    stats: StakingStats;
    isLoading: boolean;
    error: string | null;
    fetchPools: () => Promise<void>;
    fetchStakingInfo: () => Promise<void>;
    stakeTokens: (amount: number, poolId: string) => Promise<any>;
    unstakeTokens: (stakingId: string) => Promise<any>;
    claimRewards: (stakingId: string) => Promise<any>;
    refreshStaking: () => Promise<void>;
}

// Create context with default values
const StakingContext = createContext<StakingContextProps>({
    pools: [],
    positions: [],
    stats: {
        totalStaked: 0,
        totalPendingRewards: 0,
        totalBattlePower: 0,
        activePositions: 0
    },
    isLoading: false,
    error: null,
    fetchPools: async () => {},
    fetchStakingInfo: async () => {},
    stakeTokens: async () => ({}),
    unstakeTokens: async () => ({}),
    claimRewards: async () => ({}),
    refreshStaking: async () => {}
});

interface StakingProviderProps {
    children: ReactNode;
}

export const StakingProvider: React.FC<StakingProviderProps> = ({ children }) => {
    const { isConnected, walletAddress, refreshBalance } = useWalletConnection();
    
    // State
    const [pools, setPools] = useState<StakingPool[]>([]);
    const [positions, setPositions] = useState<StakingPosition[]>([]);
    const [stats, setStats] = useState<StakingStats>({
        totalStaked: 0,
        totalPendingRewards: 0,
        totalBattlePower: 0,
        activePositions: 0
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch staking pools on mount
    useEffect(() => {
        fetchPools();
    }, []);

    // Fetch user staking info when wallet is connected
    useEffect(() => {
        if (isConnected && walletAddress) {
            fetchStakingInfo();
        } else {
            // Reset positions when wallet disconnects
            setPositions([]);
            setStats({
                totalStaked: 0,
                totalPendingRewards: 0,
                totalBattlePower: 0,
                activePositions: 0
            });
        }
    }, [isConnected, walletAddress]);

    // Fetch all available staking pools
    const fetchPools = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await stakingService.getPools();
            
            // Map backend data to our frontend format
            const mappedPools = response.data.pools.map((pool: any) => ({
                id: pool.id,
                name: pool.name,
                description: pool.description,
                lockPeriod: pool.lockPeriod,
                apy: pool.apy,
                minStake: pool.minStake,
                battlePowerBoost: pool.battlePowerBoost,
                earlyUnstakeFee: pool.earlyUnstakeFee,
                totalStaked: pool.totalStaked
            }));
            
            setPools(mappedPools);
        } catch (err) {
            console.error('Error fetching staking pools:', err);
            setError('Failed to fetch staking pools');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch user's staking information
    const fetchStakingInfo = async () => {
        if (!isConnected || !walletAddress) return;
        
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await stakingService.getInfo(walletAddress);
            
            setPositions(response.data.positions);
            setStats({
                totalStaked: response.data.totalStaked,
                totalPendingRewards: response.data.totalPendingRewards,
                totalBattlePower: response.data.totalBattlePower,
                activePositions: response.data.positions.length
            });
        } catch (err) {
            console.error('Error fetching staking info:', err);
            setError('Failed to fetch your staking information');
        } finally {
            setIsLoading(false);
        }
    };

    // Stake tokens
    const stakeTokens = async (amount: number, poolId: string) => {
        if (!isConnected || !walletAddress) {
            throw new Error('Wallet not connected');
        }
        
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await stakingService.stake(walletAddress, amount, poolId);
            
            // Refresh staking info and balance after staking
            await Promise.all([
                fetchStakingInfo(),
                refreshBalance()
            ]);
            
            return response.data;
        } catch (err: any) {
            console.error('Error staking tokens:', err);
            setError(err.response?.data?.error || 'Failed to stake tokens');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Unstake tokens
    const unstakeTokens = async (stakingId: string) => {
        if (!isConnected || !walletAddress) {
            throw new Error('Wallet not connected');
        }
        
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await stakingService.unstake(walletAddress, stakingId);
            
            // Refresh staking info and balance after unstaking
            await Promise.all([
                fetchStakingInfo(),
                refreshBalance()
            ]);
            
            return response.data;
        } catch (err: any) {
            console.error('Error unstaking tokens:', err);
            setError(err.response?.data?.error || 'Failed to unstake tokens');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Claim rewards
    const claimRewards = async (stakingId: string) => {
        if (!isConnected || !walletAddress) {
            throw new Error('Wallet not connected');
        }
        
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await stakingService.claimRewards(walletAddress, stakingId);
            
            // Refresh staking info and balance after claiming
            await Promise.all([
                fetchStakingInfo(),
                refreshBalance()
            ]);
            
            return response.data;
        } catch (err: any) {
            console.error('Error claiming rewards:', err);
            setError(err.response?.data?.error || 'Failed to claim rewards');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Refresh all staking data
    const refreshStaking = async () => {
        if (!isConnected || !walletAddress) return;
        
        try {
            setIsLoading(true);
            setError(null);
            
            await Promise.all([
                fetchPools(),
                fetchStakingInfo()
            ]);
        } catch (err) {
            console.error('Error refreshing staking data:', err);
            setError('Failed to refresh staking data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <StakingContext.Provider
            value={{
                pools,
                positions,
                stats,
                isLoading,
                error,
                fetchPools,
                fetchStakingInfo,
                stakeTokens,
                unstakeTokens,
                claimRewards,
                refreshStaking
            }}
        >
            {children}
        </StakingContext.Provider>
    );
};

export const useStaking = () => useContext(StakingContext); 