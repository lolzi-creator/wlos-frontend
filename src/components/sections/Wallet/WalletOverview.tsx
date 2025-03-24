import React from 'react';
import Button from '../../common/Button';
import SectionTitle from '../../common/SectionTitle';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';
import { useHero } from '../../../context/HeroContext';
import { useFarmer } from '../../../context/FarmerContext';
import { useMarketplace } from '../../../context/MarketplaceContext';

const WalletOverview: React.FC = () => {
    const { walletAddress, balance, disconnect, isLoading, error, refreshBalance, isConnected } = useWalletConnection();

    // Mock recent activity data - would normally come from an API or blockchain scanner
    const recentActivity = [
        { type: 'Purchase', item: 'Quantum Shield', amount: -240, token: 'WLOS', time: '2 hours ago' },
        { type: 'Battle Reward', item: 'Victory Bonus', amount: 35, token: 'WLOS', time: '5 hours ago' },
        { type: 'Staking Reward', item: 'Knight Pool', amount: 12.5, token: 'WLOS', time: '1 day ago' },
        { type: 'Purchase', item: 'Energy Matrix', amount: -95, token: 'WLOS', time: '3 days ago' }
    ];

    // Get real counts from contexts
    const { ownedHeroes } = useHero();
    const { ownedFarmers } = useFarmer();
    const { ownedItems } = useMarketplace();

    // Calculate actual stats
    const stats = {
        heroes: ownedHeroes?.length || 0,
        farmers: ownedFarmers?.length || 0,
        items: ownedItems?.length || 0
    };

    // If not connected, don't render anything - the connection UI is handled in WalletPage
    if (!isConnected) {
        return null;
    }

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
                                {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 6)}
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
            </div>

            <style jsx>{`
                .wallet-overview-section {
                    padding-bottom: 2rem;
                }

                .wallet-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }

                @media (max-width: 1024px) {
                    .wallet-grid {
                        grid-template-columns: 1fr;
                    }
                }

                .wallet-info-column, .stats-activity-column {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .wallet-address-container, .network-info, .wallet-balance-header,
                .token-balances, .wallet-actions, .stats-card, .activity-card {
                    background-color: rgba(8, 8, 30, 0.7);
                    border-radius: 8px;
                    padding: 16px;
                    border: 1px solid rgba(0, 194, 255, 0.3);
                }

                .address-label, .stats-title, .activity-title {
                    color: #00C2FF;
                    font-size: 1rem;
                    font-weight: bold;
                    margin-bottom: 12px;
                }

                .address-value {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.3);
                    padding: 8px 12px;
                    border-radius: 4px;
                    border: 1px solid rgba(0, 194, 255, 0.3);
                }

                .address-text {
                    font-family: monospace;
                    font-size: 1rem;
                    color: #ffffff;
                }

                .copy-button {
                    background: none;
                    border: none;
                    color: #00C2FF;
                    cursor: pointer;
                }

                .copy-icon {
                    width: 20px;
                    height: 20px;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2300C2FF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'%3E%3C/path%3E%3C/svg%3E");
                    background-size: contain;
                    background-repeat: no-repeat;
                }

                .network-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .network-status {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #00C2FF;
                    box-shadow: 0 0 8px #00C2FF;
                }

                .status-text {
                    font-size: 0.875rem;
                    color: #ffffff;
                }

                .disconnect-button {
                    background: none;
                    border: 1px solid #FF4D4D;
                    color: #FF4D4D;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .disconnect-button:hover {
                    background-color: rgba(255, 77, 77, 0.1);
                }

                .wallet-balance-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .balance-title {
                    color: #00C2FF;
                    font-size: 1rem;
                    font-weight: bold;
                }

                .balance-usd {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #00C2FF;
                }

                .token-balances {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .token-balance {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    background-color: rgba(0, 0, 0, 0.3);
                    border-radius: 6px;
                }

                .token-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                }

                .token-icon.sol {
                    background-color: #14F195;
                    color: #000000;
                }

                .token-icon.wlos {
                    background-color: #9945FF;
                    color: #000000;
                }

                .token-info {
                    display: flex;
                    flex-direction: column;
                }

                .token-amount {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #ffffff;
                }

                .token-name {
                    font-size: 0.875rem;
                    color: #8B8DA0;
                }

                .wallet-actions {
                    display: flex;
                    gap: 12px;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 16px;
                    background-color: rgba(0, 0, 0, 0.3);
                    border-radius: 6px;
                }

                .stat-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    margin-bottom: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .stat-icon.warlords {
                    background-color: #9945FF;
                    color: #000000;
                }

                .stat-icon.items {
                    background-color: #9945FF;
                    color: #000000;
                }

                .stat-icon.transactions {
                    background-color: #00C2FF;
                    color: #000000;
                }

                .stat-value {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #ffffff;
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: #8B8DA0;
                }

                .activity-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .activity-item {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    background-color: rgba(0, 0, 0, 0.3);
                    border-radius: 6px;
                }

                .activity-type-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    margin-right: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0, 194, 255, 0.2);
                }

                .activity-details {
                    flex-grow: 1;
                }

                .activity-primary {
                    display: flex;
                    gap: 8px;
                }

                .activity-type {
                    font-weight: bold;
                    color: #ffffff;
                }

                .activity-item-name {
                    color: #8B8DA0;
                }

                .activity-time {
                    font-size: 0.75rem;
                    color: #8B8DA0;
                }

                .activity-amount {
                    text-align: right;
                }

                .amount-value {
                    font-weight: bold;
                }

                .amount-value.positive {
                    color: #14F195;
                }

                .amount-value.negative {
                    color: #FF4D4D;
                }

                .amount-token {
                    font-size: 0.75rem;
                    color: #8B8DA0;
                }

                .view-all-container {
                    margin-top: 16px;
                }
            `}</style>
        </section>
    );
};

export default WalletOverview;