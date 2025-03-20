import React, { useState } from 'react';
import Button from '../common/Button';
import SectionTitle from '../common/SectionTitle';

const poolData = [
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

    return (
        <section className="staking-pools-section">
            <SectionTitle title="STAKING POOLS" />

            <div className="pools-container">
                <div className="pool-tabs">
                    {poolData.map(pool => (
                        <button
                            key={pool.id}
                            className={`pool-tab ${selectedPool === pool.id ? 'active' : ''}`}
                            onClick={() => setSelectedPool(pool.id)}
                        >
                            {pool.name}
                            {selectedPool === pool.id && (
                                <>
                                    <div className="corner-accent top-right"></div>
                                    <div className="corner-accent bottom-left"></div>
                                </>
                            )}
                        </button>
                    ))}
                </div>

                {poolData.map(pool => (
                    <div
                        key={pool.id}
                        className={`pool-details clip-card border-green ${selectedPool === pool.id ? 'active' : 'hidden'}`}
                    >
                        <div className="accent-border top green"></div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="pool-title">{pool.name}</h3>
                                <p className="pool-description">{pool.description}</p>

                                <div className="pool-stats">
                                    <div className="stat-row">
                                        <div className="stat-label">Lock Period</div>
                                        <div className="stat-value">{pool.lockPeriod}</div>
                                    </div>
                                    <div className="stat-row">
                                        <div className="stat-label">APY</div>
                                        <div className="stat-value text-green-text">{pool.apy}</div>
                                    </div>
                                    <div className="stat-row">
                                        <div className="stat-label">Min Stake</div>
                                        <div className="stat-value">{pool.minStake}</div>
                                    </div>
                                    <div className="stat-row">
                                        <div className="stat-label">Total Staked</div>
                                        <div className="stat-value">{pool.totalStaked}</div>
                                    </div>
                                    <div className="stat-row">
                                        <div className="stat-label">Battle Boost</div>
                                        <div className="stat-value text-green-text">{pool.battleBoost}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="staking-form">
                                <div className="form-group">
                                    <label className="form-label">Amount to Stake</label>
                                    <div className="input-with-max">
                                        <input
                                            type="text"
                                            value={stakeAmount}
                                            onChange={(e) => setStakeAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="stake-input"
                                        />
                                        <button className="max-button">MAX</button>
                                    </div>
                                    <div className="balance-display">Balance: 0 WLOS</div>
                                </div>

                                <div className="reward-preview">
                                    <div className="preview-row">
                                        <div className="preview-label">Lock Period</div>
                                        <div className="preview-value">{pool.lockPeriod}</div>
                                    </div>
                                    <div className="preview-row">
                                        <div className="preview-label">Estimated Rewards</div>
                                        <div className="preview-value text-green-text">
                                            {stakeAmount ? parseFloat(stakeAmount) * parseFloat(pool.apy.replace('%', '')) / 100 : 0} WLOS
                                        </div>
                                    </div>
                                    <div className="preview-row">
                                        <div className="preview-label">Battle Power Boost</div>
                                        <div className="preview-value text-green-text">{pool.battleBoost}</div>
                                    </div>
                                </div>

                                <Button
                                    text="STAKE NOW"
                                    color="green"
                                    onClick={handleStakeSubmit}
                                    fullWidth={true}
                                />

                                <p className="unstake-note">
                                    Early unstaking available with 5% fee. No fee after lock period.
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StakingPools;