import React from 'react';
import { useStaking } from '../../../context/StakingContext';
import '../../../styles/modules/staking/StakingStats.css';

const StakingStats: React.FC = () => {
    const { stats, pools, isLoading } = useStaking();
    
    // Format numbers with commas, handling potential undefined values
    const formatNumber = (value: number | undefined): string => {
        if (value === undefined) return '0';
        return value.toLocaleString();
    };
    
    // Use real data or placeholders if loading
    const totalStaked = isLoading ? '1,566,116' : formatNumber(stats.totalStaked);
    const activePositions = isLoading ? '4,237' : formatNumber(stats.activePositions);
    const pendingRewards = isLoading ? '246,892' : formatNumber(stats.totalPendingRewards);

    return (
        <section className="staking-stats">
            <div className="stats-cards">
                <div className="stat-card-wrapper">
                    <div className="stat-card-content">
                        <h3 className="stat-title">TOTAL WLOS STAKED</h3>
                        <div className="stat-digit-value">{totalStaked}</div>
                        <div className="stat-trend">Platform-wide staking</div>
                    </div>
                    <div className="card-glow"></div>
                    <div className="card-border"></div>
                </div>

                <div className="stat-card-wrapper">
                    <div className="stat-card-content">
                        <h3 className="stat-title">ACTIVE STAKERS</h3>
                        <div className="stat-digit-value">{activePositions}</div>
                        <div className="stat-trend">Active staking positions</div>
                    </div>
                    <div className="card-glow"></div>
                    <div className="card-border"></div>
                </div>

                <div className="stat-card-wrapper">
                    <div className="stat-card-content">
                        <h3 className="stat-title">REWARDS DISTRIBUTED</h3>
                        <div className="stat-digit-value">{pendingRewards} <span className="token-name">WLOS</span></div>
                        <div className="stat-trend">Current pending rewards</div>
                    </div>
                    <div className="card-glow"></div>
                    <div className="card-border"></div>
                </div>
            </div>

            <div className="apy-chart-container">
                <h3 className="chart-title">APY COMPARISON</h3>
                
                <div className="chart-content">
                    <div className="chart-labels">
                        <div className="label">30%</div>
                        <div className="label">25%</div>
                        <div className="label">20%</div>
                        <div className="label">15%</div>
                        <div className="label">10%</div>
                        <div className="label">5%</div>
                        <div className="label">0%</div>
                    </div>
                    
                    <div className="chart-area">
                        <svg className="chart-svg" viewBox="0 0 800 200">
                            {/* Warrior Pool Line */}
                            <path
                                d="M0,132 C60,135 120,130 180,132 C240,134 300,128 360,125 C420,122 480,120 540,118 C600,116 660,115 720,114"
                                className="chart-line warrior"
                            />

                            {/* Knight Pool Line */}
                            <path
                                d="M0,92 C60,95 120,90 180,88 C240,86 300,82 360,80 C420,78 480,75 540,72 C600,69 660,68 720,66"
                                className="chart-line knight"
                            />

                            {/* Warlord Pool Line */}
                            <path
                                d="M0,82 C60,80 120,78 180,75 C240,72 300,70 360,67 C420,64 480,60 540,58 C600,56 660,55 720,53"
                                className="chart-line warlord"
                            />

                            {/* Data Points */}
                            <circle cx="180" cy="88" r="5" className="data-point knight" />
                            <circle cx="360" cy="80" r="5" className="data-point knight" />
                            <circle cx="540" cy="72" r="5" className="data-point knight" />
                            <circle cx="720" cy="66" r="5" className="data-point knight" />
                        </svg>
                    </div>
                </div>

                <div className="chart-timeline">
                    <div className="time-label">3 Months Ago</div>
                    <div className="time-label">2 Months Ago</div>
                    <div className="time-label">1 Month Ago</div>
                    <div className="time-label">Current</div>
                </div>

                <div className="chart-legend">
                    {pools.length > 0 ? (
                        pools.map((pool, index) => (
                            <div className="legend-item" key={pool.id}>
                                <div className={`legend-color ${index === 0 ? 'warrior' : index === 1 ? 'knight' : 'warlord'}`}></div>
                                <div className="legend-label">{pool.name} Pool</div>
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="legend-item">
                                <div className="legend-color warrior"></div>
                                <div className="legend-label">Warrior Pool</div>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color knight"></div>
                                <div className="legend-label">Knight Pool</div>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color warlord"></div>
                                <div className="legend-label">Warlord Pool</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default StakingStats;