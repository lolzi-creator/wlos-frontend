import React, { useState } from 'react';
import { useStaking } from '../../../context/StakingContext';
import '../../../styles/modules/staking/StakingRewards.css';

const StakingRewards: React.FC = () => {
    const { positions, stats, claimRewards, unstakeTokens, isLoading } = useStaking();
    const [actionInProgress, setActionInProgress] = useState<{id: string, action: 'claim' | 'unstake'} | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Format numbers with commas, handling potential undefined values
    const formatNumber = (value: number | undefined): string => {
        if (value === undefined) return '0';
        return value.toLocaleString();
    };

    const handleClaimAll = async () => {
        if (positions.length === 0 || stats.totalPendingRewards === 0) return;
        
        // Implement claiming all rewards in sequence
        try {
            setError(null);
            
            for (const position of positions) {
                if (position.pendingRewards > 0) {
                    setActionInProgress({ id: position.id, action: 'claim' });
                    await claimRewards(position.id);
                }
            }
        } catch (err: any) {
            console.error('Error claiming all rewards:', err);
            setError(err.message || 'Failed to claim all rewards');
        } finally {
            setActionInProgress(null);
        }
    };

    const handleClaim = async (stakingId: string) => {
        try {
            setError(null);
            setActionInProgress({ id: stakingId, action: 'claim' });
            await claimRewards(stakingId);
        } catch (err: any) {
            console.error('Error claiming rewards:', err);
            setError(err.message || 'Failed to claim rewards');
        } finally {
            setActionInProgress(null);
        }
    };

    const handleUnstake = async (stakingId: string) => {
        try {
            setError(null);
            setActionInProgress({ id: stakingId, action: 'unstake' });
            await unstakeTokens(stakingId);
        } catch (err: any) {
            console.error('Error unstaking:', err);
            setError(err.message || 'Failed to unstake');
        } finally {
            setActionInProgress(null);
        }
    };

    // Format date from ISO string
    const formatDate = (dateString: string) => {
        if (!dateString || dateString === "Invalid Date") return "N/A";
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "N/A";
            return date.toLocaleDateString();
        } catch (err) {
            return "N/A";
        }
    };

    // Calculate days left in staking period
    const getDaysLeft = (endDate: string) => {
        if (!endDate) return 0;
        try {
            const end = new Date(endDate);
            if (isNaN(end.getTime())) return 0;
            
            const now = new Date();
            const diffTime = end.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 ? diffDays : 0;
        } catch (err) {
            return 0;
        }
    };

    return (
        <section className="rewards-dashboard">
            <div className="dashboard-header">
                <h2 className="section-title">YOUR STAKING REWARDS</h2>
                <div className="accent-line"></div>
            </div>
            
            <div className="rewards-summary">
                <h3 className="summary-title">REWARDS SUMMARY</h3>
                
                <div className="summary-cards">
                    <div className="summary-card">
                        <div className="card-content">
                            <div className="card-label">TOTAL STAKED</div>
                            <div className="card-value">{isLoading ? '...' : formatNumber(stats.totalStaked)}</div>
                            <div className="card-unit">WLOS</div>
                        </div>
                        <div className="card-glow"></div>
                    </div>
                    
                    <div className="summary-card">
                        <div className="card-content">
                            <div className="card-label">ACTIVE POOLS</div>
                            <div className="card-value">{isLoading ? '...' : positions.filter(p => p.isActive).length}</div>
                            <div className="card-unit">POOLS</div>
                        </div>
                        <div className="card-glow"></div>
                    </div>
                    
                    <div className="summary-card">
                        <div className="card-content">
                            <div className="card-label">PENDING REWARDS</div>
                            <div className="card-value">{isLoading ? '...' : formatNumber(stats.totalPendingRewards)}</div>
                            <div className="card-unit">WLOS</div>
                        </div>
                        <div className="card-glow"></div>
                    </div>
                </div>
                
                <button 
                    className="claim-all-button" 
                    onClick={handleClaimAll}
                    disabled={isLoading || positions.length === 0 || stats.totalPendingRewards === 0 || actionInProgress !== null}
                >
                    <span className="button-text">
                        {actionInProgress && actionInProgress.action === 'claim' 
                            ? 'CLAIMING...' 
                            : 'CLAIM ALL REWARDS'}
                    </span>
                    <div className="button-glow"></div>
                </button>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="active-stakes">
                <h3 className="stakes-title">ACTIVE STAKES & REWARDS</h3>
                
                {positions.length === 0 ? (
                    <div className="no-stakes-message">
                        No active staking positions. Start staking to earn rewards!
                    </div>
                ) : (
                    <div className="stakes-table-container">
                        <table className="stakes-table">
                            <thead>
                                <tr>
                                    <th>POOL</th>
                                    <th>AMOUNT STAKED</th>
                                    <th>START DATE</th>
                                    <th>END DATE</th>
                                    <th>PENDING REWARDS</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {positions.map((position) => {
                                    const daysLeft = getDaysLeft(position.endTime);
                                    
                                    return (
                                        <tr key={position.id} className="stake-row">
                                            <td className="pool-cell">{position.poolName}</td>
                                            <td>{formatNumber(position.amount)} WLOS</td>
                                            <td>{formatDate(position.startTime)}</td>
                                            <td>{formatDate(position.endTime)}</td>
                                            <td className="rewards-cell">{formatNumber(position.pendingRewards)} WLOS</td>
                                            <td>
                                                {position.isActive ? (
                                                    <div className="status-badge active">
                                                        ACTIVE ({daysLeft} DAYS)
                                                        <div className="status-pulse"></div>
                                                    </div>
                                                ) : (
                                                    <div className="status-badge completed">COMPLETED</div>
                                                )}
                                            </td>
                                            <td className="actions-cell">
                                                <button 
                                                    className="action-button claim" 
                                                    onClick={() => handleClaim(position.id)}
                                                    disabled={position.pendingRewards <= 0 || 
                                                        (actionInProgress !== null && 
                                                        (actionInProgress.id !== position.id || 
                                                        actionInProgress.action !== 'claim'))}
                                                >
                                                    {actionInProgress && 
                                                    actionInProgress.id === position.id && 
                                                    actionInProgress.action === 'claim' 
                                                        ? 'CLAIMING...' 
                                                        : 'CLAIM'}
                                                </button>
                                                <button 
                                                    className="action-button unstake" 
                                                    onClick={() => handleUnstake(position.id)}
                                                    disabled={actionInProgress !== null && 
                                                        (actionInProgress.id !== position.id || 
                                                        actionInProgress.action !== 'unstake')}
                                                >
                                                    {actionInProgress && 
                                                    actionInProgress.id === position.id && 
                                                    actionInProgress.action === 'unstake' 
                                                        ? 'UNSTAKING...' 
                                                        : 'UNSTAKE'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                
                <div className="unstake-note">
                    <span className="note-icon">ⓘ</span> Early unstaking incurs a 5% fee. Completed stakes can be unstaked with no fee.
                </div>
            </div>
        </section>
    );
};

export default StakingRewards;