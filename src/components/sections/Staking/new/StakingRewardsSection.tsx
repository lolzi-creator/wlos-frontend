import React, { useState, useEffect } from 'react';
import { useStaking } from '../../../../context/StakingContext';
import Button from '../../../common/Button';
import '../../../../styles/modules/staking/new/StakingRewardsSection.css';

// Define reward type
interface StakingReward {
    id: string;
    poolName: string;
    amount: number;
    claimable: boolean;
    nextClaim: Date | null;
}

export const StakingRewardsSection: React.FC = () => {
    // Create a safe fallback for rewards if not in context
    const stakingContext = useStaking();
    const [visible, setVisible] = useState(false);
    
    // Use the rewards from context if available, otherwise use dummy data
    const userRewards: StakingReward[] = stakingContext.isLoading || !stakingContext.rewards
        ? [
            { id: '1', poolName: 'Warrior', amount: 238.45, claimable: true, nextClaim: null },
            { id: '2', poolName: 'Knight', amount: 726.19, claimable: true, nextClaim: null },
            { id: '3', poolName: 'Warlord', amount: 1284.72, claimable: false, nextClaim: new Date(Date.now() + 86400000) }
        ] 
        : stakingContext.rewards as StakingReward[];
    
    const totalClaimable = userRewards
        .filter((reward: StakingReward) => reward.claimable)
        .reduce((sum: number, reward: StakingReward) => sum + reward.amount, 0);
    
    useEffect(() => {
        // Animate in after a delay
        const timer = setTimeout(() => {
            setVisible(true);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);
    
    const handleClaim = (rewardId: string) => {
        if (stakingContext.claimRewards) {
            stakingContext.claimRewards(rewardId);
        }
    };
    
    const handleClaimAll = () => {
        if (stakingContext.claimRewards) {
            userRewards
                .filter((reward: StakingReward) => reward.claimable)
                .forEach((reward: StakingReward) => stakingContext.claimRewards(reward.id));
        }
    };
    
    const formatDate = (date: Date | null) => {
        if (!date) return 'Available Now';
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <section className={`staking-rewards-section ${visible ? 'visible' : ''}`}>
            <div className="section-header">
                <h2 className="section-title">STAKING REWARDS</h2>
                <div className="section-subtitle">Claim your WLOS rewards from staking</div>
            </div>
            
            <div className="rewards-overview">
                <div className="total-rewards">
                    <div className="rewards-label">Total Claimable Rewards</div>
                    <div className="rewards-value">{totalClaimable.toLocaleString()} WLOS</div>
                    
                    {totalClaimable > 0 && (
                        <Button 
                            text="CLAIM ALL REWARDS" 
                            color="green" 
                            onClick={handleClaimAll}
                        />
                    )}
                </div>
                
                <div className="rewards-animation">
                    <div className="token-orbit">
                        <div className="token-particle"></div>
                        <div className="token-particle"></div>
                        <div className="token-particle"></div>
                    </div>
                    <div className="token-icon">
                        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="16" fill="#0D121F" stroke="#14F195" strokeWidth="1.5" />
                            <path d="M18 9L11 13.5V22.5L18 27L25 22.5V13.5L18 9Z" fill="#14F195" />
                        </svg>
                    </div>
                </div>
            </div>
            
            <div className="rewards-list">
                {userRewards.map((reward) => (
                    <div key={reward.id} className={`reward-card ${reward.claimable ? 'claimable' : 'locked'}`}>
                        <div className="reward-info">
                            <div className="reward-pool">{reward.poolName} Pool</div>
                            <div className="reward-amount">{reward.amount.toLocaleString()} WLOS</div>
                            <div className="reward-status">
                                {reward.claimable 
                                    ? 'Available to claim' 
                                    : `Available ${formatDate(reward.nextClaim)}`
                                }
                            </div>
                        </div>
                        
                        <div className="reward-action">
                            {reward.claimable ? (
                                <Button 
                                    text="CLAIM" 
                                    color="green" 
                                    onClick={() => handleClaim(reward.id)}
                                />
                            ) : (
                                <div className="time-remaining">
                                    <div className="clock-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" stroke="#FFB800" strokeWidth="2"/>
                                            <path d="M12 6V12L16 14" stroke="#FFB800" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                    <span>Locked</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="card-accents">
                            <div className="accent-top"></div>
                            <div className="accent-bottom"></div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="rewards-info-panel">
                <div className="info-header">Staking Rewards Information</div>
                <div className="info-content">
                    <p>
                        Rewards are distributed daily based on your staked amount and the APY of your chosen pool. 
                        Warrior pool rewards can be claimed anytime, while Knight and Warlord pools have a 
                        vesting period for maximum rewards.
                    </p>
                    <div className="info-details">
                        <div className="info-detail">
                            <div className="detail-label">Rewards Distribution</div>
                            <div className="detail-value">Daily at 00:00 UTC</div>
                        </div>
                        <div className="info-detail">
                            <div className="detail-label">Claim Fee</div>
                            <div className="detail-value">None</div>
                        </div>
                        <div className="info-detail">
                            <div className="detail-label">Early Unstake Fee</div>
                            <div className="detail-value">10% of rewards</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StakingRewardsSection; 