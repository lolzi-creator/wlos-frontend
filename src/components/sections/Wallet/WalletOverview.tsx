import React from 'react';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';

const WalletOverview: React.FC = () => {
    const { walletAddress, balance, disconnect, isLoading, error, refreshBalance, isConnected } = useWalletConnection();

    // Mock recent activity data - would normally come from an API or blockchain scanner
    const recentActivity = [
        { type: 'Purchase', item: 'Quantum Shield', amount: -240, token: 'WLOS', time: '2 hours ago' },
        { type: 'Battle Reward', item: 'Victory Bonus', amount: 35, token: 'WLOS', time: '5 hours ago' },
        { type: 'Staking Reward', item: 'Knight Pool', amount: 12.5, token: 'WLOS', time: '1 day ago' },
        { type: 'Purchase', item: 'Energy Matrix', amount: -95, token: 'WLOS', time: '3 days ago' }
    ];

    // Mock stats data - would normally come from your game's database
    const stats = {
        warlords: 3,
        items: 17,
        transactions: 56
    };

    // If not connected, don't render anything - the connection UI is handled in WalletPage
    if (!isConnected) {
        return null;
    }

    return (
        <section className="wallet-overview-section">
            <SectionTitle title="NEURAL WALLET" />

            <div className="wallet-grid">
                {/* Wallet Info Card */}
                <div className="wallet-card clip-card border-cyan">
                    <div className="accent-border top cyan"></div>

                    <div className="wallet-address-container">
                        <div className="address-label">Wallet Address</div>
                        <div className="address-value">
                            <span className="address-text">
                                {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 6)}
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
                        <h3 className="balance-title">Your Balance</h3>
                        {isLoading ? (
                            <div className="balance-usd">Loading...</div>
                        ) : (
                            <div className="balance-usd">${balance.usd.toFixed(2)}</div>
                        )}
                    </div>

                    {error && (
                        <div className="error-message mb-4 text-red-500 text-sm">
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
                            onClick={() => refreshBalance()}
                        />
                        <Button
                            text="RECEIVE"
                            color="cyan"
                            onClick={() => console.log('Receive clicked')}
                        />
                        <Button
                            text="BUY"
                            color="cyan"
                            onClick={() => console.log('Buy clicked')}
                        />
                    </div>
                </div>

                {/* Stats Card */}
                <div className="stats-card clip-card border-cyan">
                    <div className="accent-border top cyan"></div>

                    <h3 className="stats-title">Your Stats</h3>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon warlords"></div>
                            <div className="stat-info">
                                <div className="stat-value">{stats.warlords}</div>
                                <div className="stat-label">Warlords</div>
                            </div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon items"></div>
                            <div className="stat-info">
                                <div className="stat-value">{stats.items}</div>
                                <div className="stat-label">Items</div>
                            </div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon transactions"></div>
                            <div className="stat-info">
                                <div className="stat-value">{stats.transactions}</div>
                                <div className="stat-label">Transactions</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Card */}
                <div className="activity-card clip-card border-cyan">
                    <div className="accent-border top cyan"></div>

                    <h3 className="activity-title">Recent Activity</h3>

                    <div className="activity-list">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="activity-item">
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
                        ))}
                    </div>

                    <div className="view-all-container">
                        <Button
                            text="VIEW ALL TRANSACTIONS"
                            color="cyan"
                            onClick={() => console.log('View all transactions clicked')}
                            fullWidth={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WalletOverview;