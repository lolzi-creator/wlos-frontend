import React, { useState } from 'react';
import { useStaking } from '../../../../context/StakingContext';
import Button from '../../../common/Button';
import '../../../../styles/modules/staking/new/StakingPoolsSection.css';

export const StakingPoolsSection: React.FC = () => {
    const { pools, isLoading } = useStaking();
    const [activePool, setActivePool] = useState<string | null>(null);
    const [stakeAmount, setStakeAmount] = useState<string>('');
    
    // Dummy data for development
    const stakingPools = isLoading || pools.length === 0 
        ? [
            { id: '1', name: 'Warrior', minStake: 100, lockPeriod: 30, apy: 15.2, totalStaked: 236841, color: 'purple' },
            { id: '2', name: 'Knight', minStake: 500, lockPeriod: 90, apy: 22.4, totalStaked: 892351, color: 'green' },
            { id: '3', name: 'Warlord', minStake: 1000, lockPeriod: 180, apy: 25.7, totalStaked: 437124, color: 'yellow' }
        ] 
        : pools.map((pool, index) => ({
            ...pool,
            totalStaked: pool.totalStaked || 0, // Ensure totalStaked has a default value
            color: index === 0 ? 'purple' : index === 1 ? 'green' : 'yellow'
        }));
    
    const handleStake = (poolId: string) => {
        console.log('Staking in pool:', poolId);
        console.log('Amount:', stakeAmount);
        // Implement staking logic
    };
    
    const handlePoolSelect = (poolId: string) => {
        setActivePool(activePool === poolId ? null : poolId);
    };
    
    // Stop propagation for input field events
    const handleInputClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setStakeAmount(e.target.value);
    };

    return (
        <section className="staking-pools-section">
            <div className="section-header">
                <h2 className="section-title">STAKING POOLS</h2>
                <div className="section-subtitle">Select a pool to stake your WLOS tokens</div>
            </div>
            
            <div className="pools-grid">
                {stakingPools.map((pool) => (
                    <div 
                        key={pool.id} 
                        className={`pool-card ${pool.color} ${activePool === pool.id ? 'active' : ''}`}
                        onClick={() => handlePoolSelect(pool.id)}
                    >
                        <div className="pool-header">
                            <div className="pool-name">{pool.name} Pool</div>
                            <div className="pool-apy">{pool.apy}% APY</div>
                        </div>
                        
                        <div className="pool-content">
                            <div className="pool-info-row">
                                <div className="info-label">Lock Period</div>
                                <div className="info-value">{pool.lockPeriod} Days</div>
                            </div>
                            <div className="pool-info-row">
                                <div className="info-label">Min. Amount</div>
                                <div className="info-value">{pool.minStake} WLOS</div>
                            </div>
                            <div className="pool-info-row">
                                <div className="info-label">Total Value Locked</div>
                                <div className="info-value">{(pool.totalStaked || 0).toLocaleString()} WLOS</div>
                            </div>
                            
                            <div className="pool-capacity">
                                <div className="capacity-bar">
                                    <div 
                                        className="capacity-fill" 
                                        style={{width: `${Math.min(85, Math.random() * 100)}%`}}
                                    ></div>
                                </div>
                                <div className="capacity-text">Pool Capacity</div>
                            </div>
                        </div>
                        
                        {activePool === pool.id && (
                            <div className="pool-actions" onClick={(e) => e.stopPropagation()}>
                                <div className="stake-form">
                                    <div className="stake-form-header">Amount to stake</div>
                                    <div className="stake-input-container" onClick={handleInputClick}>
                                        <input 
                                            type="number" 
                                            className="stake-input" 
                                            placeholder="Enter amount" 
                                            value={stakeAmount}
                                            onChange={handleInputChange}
                                            onClick={handleInputClick}
                                            min={pool.minStake}
                                            step="1"
                                        />
                                        <span className="token-symbol">WLOS</span>
                                    </div>
                                    
                                    <div className="action-buttons">
                                        <Button 
                                            text="STAKE WLOS" 
                                            color={pool.color as any} 
                                            onClick={() => handleStake(pool.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="card-background">
                            <div className="glow-effect"></div>
                            <div className="grid-pattern"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StakingPoolsSection; 