import React, { useState } from 'react';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import '../../../styles/modules/staking/StakingPools.css';

// Define a type for the pool data
interface PoolData {
    id: string;
    name: string;
    lockPeriod: string;
    apy: string;
    minStake: string;
    totalStaked: string;
    description: string;
    battleBoost: string;
}

const poolData: PoolData[] = [
    {
        id: 'warrior',
        name: 'WARRIOR POOL',
        lockPeriod: '7 days',
        apy: '15.2%',
        minStake: '10 WLOS',
        totalStaked: '124,532 WLOS',
        description: 'Short-term staking pool with quick rewards and lower commitment.',
        battleBoost: '+15% Battle Power'
    },
    {
        id: 'knight',
        name: 'KNIGHT POOL',
        lockPeriod: '30 days',
        apy: '22.4%',
        minStake: '100 WLOS',
        totalStaked: '458,910 WLOS',
        description: 'Medium-term staking with balanced rewards and moderate lock period.',
        battleBoost: '+30% Battle Power'
    },
    {
        id: 'warlord',
        name: 'WARLORD POOL',
        lockPeriod: '90 days',
        apy: '25.7%',
        minStake: '500 WLOS',
        totalStaked: '982,674 WLOS',
        description: 'Long-term staking with highest rewards for committed players.',
        battleBoost: '+50% Battle Power'
    }
];

const StakingPools: React.FC = () => {
    const [selectedPool, setSelectedPool] = useState<string>('warrior');
    const [stakeAmount, setStakeAmount] = useState<string>('');

    const handleStakeSubmit = () => {
        console.log(`Staking ${stakeAmount} WLOS in ${selectedPool} pool`);
        // This would later integrate with wallet connection
    };

    const getEstimatedReward = (amount: string, apy: string) => {
        if (!amount) return '0';
        const apyValue = parseFloat(apy.replace('%', '')) / 100;
        return (parseFloat(amount) * apyValue).toFixed(2);
    };

    const renderPoolDetails = (pool: PoolData) => {
        // Parse pool data for proper display
        const lockDays = pool.lockPeriod.split(' ')[0];
        const apyValue = pool.apy.replace('%', '');
        const minStakeValue = pool.minStake.split(' ')[0];
        const totalStakedValue = pool.totalStaked.split(' ')[0];
        const battleBoostValue = pool.battleBoost.replace('Battle Power', '');

        return (
            <div className="pool-info">
                <div className="pool-header">
                    <h3 className="pool-name">{pool.name}</h3>
                    <p className="pool-description">{pool.description}</p>
                </div>

                <div className="pool-stats-grid">
                    <div className="pool-stat-box">
                        <div className="stat-box-label">LOCK PERIOD</div>
                        <div className="stat-box-value">{lockDays}</div>
                        <div className="stat-box-unit">days</div>
                    </div>
                    
                    <div className="pool-stat-box">
                        <div className="stat-box-label">APY</div>
                        <div className="stat-box-value highlight">{apyValue}</div>
                        <div className="stat-box-unit">%</div>
                    </div>
                    
                    <div className="pool-stat-box">
                        <div className="stat-box-label">MIN STAKE</div>
                        <div className="stat-box-value">{minStakeValue}</div>
                        <div className="stat-box-unit">WLOS</div>
                    </div>
                    
                    <div className="pool-stat-box">
                        <div className="stat-box-label">TOTAL STAKED</div>
                        <div className="stat-box-value">{totalStakedValue}</div>
                        <div className="stat-box-unit">WLOS</div>
                    </div>
                    
                    <div className="pool-stat-box">
                        <div className="stat-box-label">BATTLE BOOST</div>
                        <div className="stat-box-value highlight">{battleBoostValue}</div>
                        <div className="stat-box-unit">Battle Power</div>
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
                    {poolData.map(pool => (
                        <button
                            key={pool.id}
                            className={`pool-tab ${selectedPool === pool.id ? 'active' : ''}`}
                            onClick={() => setSelectedPool(pool.id)}
                        >
                            {pool.name}
                            {selectedPool === pool.id && <div className="tab-active-indicator"></div>}
                        </button>
                    ))}
                </div>

                <div className="pool-details-container">
                    {poolData.map(pool => (
                        <div 
                            key={pool.id} 
                            className={`pool-details ${selectedPool === pool.id ? 'active' : ''}`}
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
                                        <button className="max-button">MAX</button>
                                    </div>
                                    <div className="balance-info">Balance: 0 WLOS</div>
                                </div>

                                <div className="stake-summary">
                                    <div className="summary-row">
                                        <div className="summary-label">Lock Period</div>
                                        <div className="summary-value">{pool.lockPeriod}</div>
                                    </div>
                                    <div className="summary-row">
                                        <div className="summary-label">Estimated Rewards</div>
                                        <div className="summary-value highlight">
                                            {getEstimatedReward(stakeAmount, pool.apy)} WLOS
                                        </div>
                                    </div>
                                    <div className="summary-row">
                                        <div className="summary-label">Battle Power Boost</div>
                                        <div className="summary-value highlight">{pool.battleBoost}</div>
                                    </div>
                                </div>

                                <div className="stake-button-container">
                                    <Button
                                        text="STAKE NOW"
                                        color="green"
                                        onClick={handleStakeSubmit}
                                        fullWidth={true}
                                    />
                                </div>

                                <p className="unstake-notice">
                                    Early unstaking available with 5% fee. No fee after lock period.
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