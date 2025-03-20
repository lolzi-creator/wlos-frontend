import React from 'react';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';

interface WalletOverviewProps {
    isConnected: boolean;
    onConnect: () => void;
}

const WalletOverview: React.FC<WalletOverviewProps> = ({ isConnected, onConnect }) => {
    // Mock wallet data
    const walletData = {
        address: '7X3cD8eJ5K9wBJ2U7fJQPKmG5Z8eJ5K9w',
        balance: {
            sol: 42.37,
            wlos: 1245.92,
            usd: 6428.55
        },
        stats: {
            warlords: 3,
            items: 17,
            transactions: 56
        },
        recentActivity: [
            { type: 'Purchase', item: 'Quantum Shield', amount: -240, token: 'WLOS', time: '2 hours ago' },
            { type: 'Battle Reward', item: 'Victory Bonus', amount: 35, token: 'WLOS', time: '5 hours ago' },
            { type: 'Staking Reward', item: 'Knight Pool', amount: 12.5, token: 'WLOS', time: '1 day ago' },
            { type: 'Purchase', item: 'Energy Matrix', amount: -95, token: 'WLOS', time: '3 days ago' }
        ]
    };

    return (
        <section className="wallet-overview-section">
            {isConnected ? (
                <>
                    <SectionTitle title="NEURAL WALLET" />

                    <div className="wallet-grid">
                        {/* Wallet Info Card */}
                        <div className="wallet-card clip-card border-cyan">
                            <div className="accent-border top cyan"></div>

                            <div className="wallet-address-container">
                                <div className="address-label">Wallet Address</div>
                                <div className="address-value">
                                    <span className="address-text">{walletData.address.substring(0, 6)}...{walletData.address.substring(walletData.address.length - 6)}</span>
                                    <button className="copy-button">
                                        <div className="copy-icon"></div>
                                    </button>
                                </div>
                            </div>

                            <div className="network-info">
                                <div className="network-status">
                                    <div className="status-dot cyan"></div>
                                    <span className="status-text">Connected to Solana Mainnet</span>
                                </div>
                                <button className="disconnect-button">
                                    Disconnect
                                </button>
                            </div>

                            <div className="wallet-balance-header">
                                <h3 className="balance-title">Your Balance</h3>
                                <div className="balance-usd">${walletData.balance.usd.toLocaleString()}</div>
                            </div>

                            <div className="token-balances">
                                <div className="token-balance">
                                    <div className="token-icon sol"></div>
                                    <div className="token-info">
                                        <div className="token-amount">{walletData.balance.sol.toFixed(2)}</div>
                                        <div className="token-name">SOL</div>
                                    </div>
                                </div>

                                <div className="token-balance">
                                    <div className="token-icon wlos"></div>
                                    <div className="token-info">
                                        <div className="token-amount">{walletData.balance.wlos.toFixed(2)}</div>
                                        <div className="token-name">WLOS</div>
                                    </div>
                                </div>
                            </div>

                            <div className="wallet-actions">
                                <Button
                                    text="SEND"
                                    color="cyan"
                                    onClick={() => console.log('Send clicked')}
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
                                        <div className="stat-value">{walletData.stats.warlords}</div>
                                        <div className="stat-label">Warlords</div>
                                    </div>
                                </div>

                                <div className="stat-item">
                                    <div className="stat-icon items"></div>
                                    <div className="stat-info">
                                        <div className="stat-value">{walletData.stats.items}</div>
                                        <div className="stat-label">Items</div>
                                    </div>
                                </div>

                                <div className="stat-item">
                                    <div className="stat-icon transactions"></div>
                                    <div className="stat-info">
                                        <div className="stat-value">{walletData.stats.transactions}</div>
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
                                {walletData.recentActivity.map((activity, index) => (
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
                </>
            ) : (
                <div className="wallet-connect-hero">
                    <h2 className="hero-title glow-text">CONNECT YOUR NEURAL WALLET</h2>
                    <p className="hero-subtitle">ACCESS YOUR ASSETS | MANAGE INVENTORY | TRACK TRANSACTIONS</p>

                    <Button
                        text="CONNECT WALLET"
                        color="cyan"
                        onClick={onConnect}
                    />
                </div>
            )}
        </section>
    );
};

export default WalletOverview;