import React, { useState } from 'react';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import { useStaking } from '../../../context/StakingContext';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';
import '../../../styles/modules/staking/StakingPools.css';

const StakingPools: React.FC = () => {
    const { pools, stakeTokens, isLoading } = useStaking();
    const { balance } = useWalletConnection();
    const [selectedPoolId, setSelectedPoolId] = useState<string>('');
    const [stakeAmount, setStakeAmount] = useState<string>('');
    const [isStaking, setIsStaking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Set first pool as selected when pools are loaded
    React.useEffect(() => {
        if (pools.length > 0 && !selectedPoolId) {
            setSelectedPoolId(pools[0].id);
        }
    }, [pools, selectedPoolId]);

    const handleStakeSubmit = async () => {
        if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
            setError('Please enter a valid amount to stake');
            return;
        }
        
        if (parseFloat(stakeAmount) > balance.wlos) {
            setError('Insufficient balance');
            return;
        }
        
        const selectedPool = pools.find(p => p.id === selectedPoolId);
        if (!selectedPool) {
            setError('No pool selected');
            return;
        }
        
        if (parseFloat(stakeAmount) < selectedPool.minStake) {
            setError(`Minimum stake is ${selectedPool.minStake} WLOS`);
            return;
        }
        
        setError(null);
        setIsStaking(true);
        
        try {
            await stakeTokens(parseFloat(stakeAmount), selectedPoolId);
            setStakeAmount('');
            // Success notification could be added here
        } catch (err: any) {
            setError(err.message || 'Failed to stake tokens');
        } finally {
            setIsStaking(false);
        }
    };

    const handleMaxAmount = () => {
        setStakeAmount(balance.wlos.toString());
    };

    const getEstimatedReward = (amount: string, apy: number) => {
        if (!amount) return '0';
        return (parseFloat(amount) * (apy / 100)).toFixed(2);
    };

    // Render placeholder if still loading pools
    if (isLoading || pools.length === 0) {
        return (
            <section className="staking-pools">
                <SectionTitle title="STAKING POOLS" />
                <div className="pools-container loading">
                    <p>Loading staking pools...</p>
                </div>
            </section>
        );
    }

    const selectedPool = pools.find(p => p.id === selectedPoolId) || pools[0];

    const renderPoolDetails = (pool: any) => {
        return (
            <div className="pool-info">
                <div className="pool-header">
                    <h3 className="pool-name">{pool.name}</h3>
                    <p className="pool-description">{pool.description}</p>
                </div>

                <div className="pool-stats-grid">
                    <div className="pool-stat-box">
                        <div className="stat-box-label">LOCK PERIOD</div>
                        <div className="stat-box-value">{pool.lockPeriod}</div>
                        <div className="stat-box-unit">days</div>
                    </div>
                    
                    <div className="pool-stat-box">
                        <div className="stat-box-label">APY</div>
                        <div className="stat-box-value highlight">{pool.apy}</div>
                        <div className="stat-box-unit">%</div>
                    </div>
                    
                    <div className="pool-stat-box">
                        <div className="stat-box-label">MIN STAKE</div>
                        <div className="stat-box-value">{pool.minStake}</div>
                        <div className="stat-box-unit">WLOS</div>
                    </div>
                    
                    <div className="pool-stat-box">
                        <div className="stat-box-label">TOTAL STAKED</div>
                        <div className="stat-box-value">{pool.totalStaked.toLocaleString()}</div>
                        <div className="stat-box-unit">WLOS</div>
                    </div>
                    
                    <div className="pool-stat-box">
                        <div className="stat-box-label">BATTLE BOOST</div>
                        <div className="stat-box-value highlight">{pool.battlePowerBoost}</div>
                        <div className="stat-box-unit">%</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="staking-pools">
            <SectionTitle title="STAKING POOLS" />

            <div className="pools-container">
                <div className="pools-tabs">
                    {pools.map(pool => (
                        <button
                            key={pool.id}
                            className={`pool-tab ${selectedPoolId === pool.id ? 'active' : ''}`}
                            onClick={() => setSelectedPoolId(pool.id)}
                        >
                            {pool.name}
                            {selectedPoolId === pool.id && <div className="tab-active-indicator"></div>}
                        </button>
                    ))}
                </div>

                <div className="pool-details-container">
                    {pools.map(pool => (
                        <div 
                            key={pool.id} 
                            className={`pool-details ${selectedPoolId === pool.id ? 'active' : ''}`}
                        >
                            {renderPoolDetails(pool)}

                            <div className="staking-form">
                                <div className="form-group">
                                    <label className="form-label">Amount to Stake</label>
                                    <div className="amount-input-container">
                                        <input
                                            type="text"
                                            value={stakeAmount}
                                            onChange={(e) => setStakeAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="amount-input"
                                        />
                                        <button 
                                            className="max-button"
                                            onClick={handleMaxAmount}
                                        >
                                            MAX
                                        </button>
                                    </div>
                                    <div className="balance-info">Balance: {balance.wlos.toLocaleString()} WLOS</div>
                                    {error && <div className="error-message">{error}</div>}
                                </div>

                                <div className="stake-summary">
                                    <div className="summary-row">
                                        <div className="summary-label">Lock Period</div>
                                        <div className="summary-value">{pool.lockPeriod} days</div>
                                    </div>
                                    <div className="summary-row">
                                        <div className="summary-label">Estimated Rewards</div>
                                        <div className="summary-value highlight">
                                            {getEstimatedReward(stakeAmount, pool.apy)} WLOS
                                        </div>
                                    </div>
                                    <div className="summary-row">
                                        <div className="summary-label">Battle Power Boost</div>
                                        <div className="summary-value highlight">+{pool.battlePowerBoost}%</div>
                                    </div>
                                </div>

                                <div className="stake-button-container">
                                    <Button
                                        text={isStaking ? "STAKING..." : "STAKE NOW"}
                                        color="green"
                                        onClick={handleStakeSubmit}
                                        fullWidth={true}
                                        disabled={isStaking || !stakeAmount}
                                    />
                                </div>

                                <p className="unstake-notice">
                                    Early unstaking available with {pool.earlyUnstakeFee}% fee. No fee after lock period.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StakingPools;