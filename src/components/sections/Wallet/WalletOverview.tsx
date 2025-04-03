import React, { useEffect, useState } from 'react';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';

// Define types for activity items
interface ActivityItem {
    id: string;
    type: string;
    item: string;
    amount: number;
    token: string;
    time: string;
}

const WalletOverview: React.FC = () => {
    const {
        walletAddress,
        balance,
        transactions,
        assets,
        disconnect,
        isLoading,
        error,
        refreshBalance,
        refreshTransactions,
        refreshAssets,
        isConnected
    } = useWalletConnection();

    const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
    const [isMobileView, setIsMobileView] = useState<boolean>(false);

    // Check screen size for responsive layout
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobileView(window.innerWidth <= 768);
        };
        
        // Check initially
        checkIfMobile();
        
        // Add resize listener
        window.addEventListener('resize', checkIfMobile);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Update recent activity when transactions change
    useEffect(() => {
        if (transactions && transactions.length > 0) {
            // Take just the first 4 transactions for recent activity
            const recent = transactions.slice(0, 4).map(tx => {
                // Calculate relative time (e.g., "2 hours ago")
                const txDate = new Date(tx.timestamp || new Date(`${tx.date}T${tx.time}`));
                const relativeTime = getRelativeTime(txDate);

                return {
                    id: tx.id,
                    type: tx.type,
                    item: tx.item,
                    amount: tx.amount,
                    token: tx.token,
                    time: relativeTime
                };
            });

            setRecentActivity(recent);
        }
    }, [transactions]);

    // Helper function to format relative time
    const getRelativeTime = (date: Date): string => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMin = Math.round(diffMs / 60000);

        if (diffMin < 1) return 'just now';
        if (diffMin < 60) return `${diffMin} minutes ago`;

        const diffHr = Math.floor(diffMin / 60);
        if (diffHr < 24) return `${diffHr} hours ago`;

        const diffDays = Math.floor(diffHr / 24);
        if (diffDays < 30) return `${diffDays} days ago`;

        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths} months ago`;
    };

    // If not connected, don't render anything - the connection UI is handled in WalletPage
    if (!isConnected) {
        return null;
    }

    // Calculate actual stats directly from the assets data
    const stats = {
        heroes: assets?.heroes?.length || 0,
        farmers: assets?.farmers?.length || 0,
        items: assets?.items?.length || 0
    };

    // Handle refresh button click
    const handleRefresh = () => {
        refreshBalance(walletAddress);
        refreshTransactions();
        refreshAssets(walletAddress);  // Add this to refresh assets as well
    };

    // Truncate wallet address for display
    const displayAddress = isMobileView 
        ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
        : `${walletAddress.substring(0, 8)}...${walletAddress.substring(walletAddress.length - 6)}`;

    return (
        <section className="wallet-overview-section">
            <SectionTitle title="NEURAL WALLET" />

            <div className="wallet-grid">
                {/* Left Column - Wallet Info */}
                <div className="wallet-info-column">
                    <div className="wallet-address-container">
                        <div className="address-label">WALLET ADDRESS</div>
                        <div className="address-value">
                            <span className="address-text">
                                {displayAddress}
                            </span>
                            <button className="copy-button" onClick={() => {
                                navigator.clipboard.writeText(walletAddress);
                                alert('Address copied to clipboard!');
                            }}>
                                <div className="copy-icon"></div>
                            </button>
                        </div>
                    </div>

                    <div className="network-info">
                        <div className="network-status">
                            <div className="status-dot cyan"></div>
                            <span className="status-text">Connected to Solana Devnet</span>
                        </div>
                        <button className="disconnect-button" onClick={disconnect}>
                            Disconnect
                        </button>
                    </div>

                    <div className="wallet-balance-header">
                        <h3 className="balance-title">YOUR BALANCE</h3>
                        {isLoading ? (
                            <div className="balance-usd">Loading...</div>
                        ) : (
                            <div className="balance-usd">${balance.usd.toFixed(2)}</div>
                        )}
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="token-balances">
                        <div className="token-balance">
                            <div className="token-icon sol"></div>
                            <div className="token-info">
                                {isLoading ? (
                                    <div className="token-amount">Loading...</div>
                                ) : (
                                    <div className="token-amount">{balance.sol.toFixed(4)}</div>
                                )}
                                <div className="token-name">SOL</div>
                            </div>
                        </div>

                        <div className="token-balance">
                            <div className="token-icon wlos"></div>
                            <div className="token-info">
                                {isLoading ? (
                                    <div className="token-amount">Loading...</div>
                                ) : (
                                    <div className="token-amount">{balance.wlos.toFixed(2)}</div>
                                )}
                                <div className="token-name">WLOS</div>
                            </div>
                        </div>
                    </div>

                    <div className="wallet-actions">
                        <Button
                            text="REFRESH"
                            color="cyan"
                            onClick={handleRefresh}
                            disabled={isLoading}
                        />
                        <Button
                            text="RECEIVE"
                            color="cyan"
                            onClick={() => {
                                navigator.clipboard.writeText(walletAddress);
                                alert('Address copied to clipboard! Share this address to receive tokens.');
                            }}
                        />
                        <Button
                            text="BUY"
                            color="cyan"
                            onClick={() => window.location.href = '/wlos-token'}
                        />
                    </div>
                </div>

                {/* Right Column - Stats and Activity */}
                <div className="stats-activity-column">
                    {/* Stats Card */}
                    <div className="stats-card">
                        <h3 className="stats-title">YOUR STATS</h3>

                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-icon heroes"></div>
                                <div className="stat-info">
                                    <div className="stat-value">{stats.heroes}</div>
                                    <div className="stat-label">HEROES</div>
                                </div>
                            </div>

                            <div className="stat-item">
                                <div className="stat-icon farmers"></div>
                                <div className="stat-info">
                                    <div className="stat-value">{stats.farmers}</div>
                                    <div className="stat-label">FARMERS</div>
                                </div>
                            </div>

                            <div className="stat-item">
                                <div className="stat-icon items"></div>
                                <div className="stat-info">
                                    <div className="stat-value">{stats.items}</div>
                                    <div className="stat-label">ITEMS</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Card */}
                    <div className="activity-card">
                        <h3 className="activity-title">RECENT ACTIVITY</h3>

                        <div className="activity-list">
                            {recentActivity.length > 0 ? (
                                recentActivity.map((activity) => (
                                    <div key={activity.id} className="activity-item">
                                        <div className="activity-type-icon">
                                            <div className={`type-icon ${activity.type.toLowerCase().replace(' ', '-')}`}></div>
                                        </div>

                                        <div className="activity-details">
                                            <div className="activity-primary">
                                                <div className="activity-type">{activity.type}</div>
                                                <div className="activity-item-name">{activity.item}</div>
                                            </div>
                                            <div className="activity-time">{activity.time}</div>
                                        </div>

                                        <div className="activity-amount">
                                            <div className={`amount-value ${activity.amount >= 0 ? 'positive' : 'negative'}`}>
                                                {activity.amount >= 0 ? '+' : ''}{activity.amount}
                                            </div>
                                            <div className="amount-token">{activity.token}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-activity">
                                    <p>No recent activity found.</p>
                                </div>
                            )}
                        </div>

                        <div className="view-all-container">
                            <Button
                                text="VIEW ALL TRANSACTIONS"
                                color="cyan"
                                onClick={() => {
                                    // Scroll to transactions section or open transactions tab
                                    const transactionsSection = document.querySelector('.wallet-transactions-section');
                                    if (transactionsSection) {
                                        transactionsSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                fullWidth={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WalletOverview;