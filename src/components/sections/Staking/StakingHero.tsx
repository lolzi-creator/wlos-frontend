// src/components/sections/Staking/StakingHero.tsx
import React from 'react';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';
import { useStaking } from '../../../context/StakingContext';
import '../../../styles/modules/staking/StakingHero.css';

const StakingHero: React.FC = () => {
    const { isConnected, balance } = useWalletConnection();
    const { stats, pools, isLoading } = useStaking();
    
    // Format numbers with commas, handling potential undefined values
    const formatNumber = (value: number | undefined): string => {
        if (value === undefined) return '0';
        return value.toLocaleString();
    };
    
    // Get the maximum APY from pools
    const maxApy = pools.length > 0 
        ? Math.max(...pools.map(pool => pool.apy))
        : 25.7; // Default value if no pools loaded yet

    return (
        <section className="staking-hero">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">STAKE YOUR WARLORDS</h1>
                        <p className="hero-subtitle">
                            EARN PASSIVE REWARDS | INCREASE BATTLE POWER | UNLOCK SPECIAL ABILITIES
                        </p>
                        
                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 0L10.9282 5.07179L16 8L10.9282 10.9282L8 16L5.07179 10.9282L0 8L5.07179 5.07179L8 0Z" fill="#14F195" />
                                    </svg>
                                </div>
                                <span>Up to {maxApy}% APY rewards</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 0L10.9282 5.07179L16 8L10.9282 10.9282L8 16L5.07179 10.9282L0 8L5.07179 5.07179L8 0Z" fill="#14F195" />
                                    </svg>
                                </div>
                                <span>Boost battle performance by 50%</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 0L10.9282 5.07179L16 8L10.9282 10.9282L8 16L5.07179 10.9282L0 8L5.07179 5.07179L8 0Z" fill="#14F195" />
                                    </svg>
                                </div>
                                <span>Early unstaking available with 5% fee</span>
                            </div>
                        </div>
                    </div>

                    {isConnected ? (
                        <div className="hero-stats">
                            <div className="stats-grid-hero">
                                <div className="stat-box">
                                    <div className="stat-box-header">AVAILABLE</div>
                                    <div className="stat-box-value">{isLoading ? '...' : formatNumber(balance?.wlos || 0)}</div>
                                    <div className="stat-box-unit">WLOS</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-box-header">STAKED</div>
                                    <div className="stat-box-value">{isLoading ? '...' : formatNumber(stats?.totalStaked)}</div>
                                    <div className="stat-box-unit">WLOS</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-box-header">CURRENT APY</div>
                                    <div className="stat-box-value highlight">{isLoading ? '...' : maxApy}%</div>
                                    <div className="stat-box-unit">&nbsp;</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-box-header">REWARDS</div>
                                    <div className="stat-box-value">{isLoading ? '...' : formatNumber(stats?.totalPendingRewards)}</div>
                                    <div className="stat-box-unit">WLOS</div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                
                <div className="hero-decoration">
                    <div className="glow-line top-left"></div>
                    <div className="glow-line bottom-right"></div>
                </div>
            </div>
        </section>
    );
};

export default StakingHero;