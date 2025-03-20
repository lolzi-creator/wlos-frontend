import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';

// Mock transaction data
const transactionsData = [
    {
        id: 'tx001',
        type: 'Purchase',
        item: 'Quantum Shield',
        amount: -240,
        token: 'WLOS',
        date: '2025-03-18',
        time: '14:32:45',
        status: 'Confirmed',
        hash: '7X3cD8eJ5K9w...K9w',
        category: 'Marketplace'
    },
    {
        id: 'tx002',
        type: 'Battle Reward',
        item: 'Victory Bonus',
        amount: 35,
        token: 'WLOS',
        date: '2025-03-18',
        time: '11:45:12',
        status: 'Confirmed',
        hash: '9B4fG7hK2L1m...L1m',
        category: 'Battle'
    },
    {
        id: 'tx003',
        type: 'Staking Reward',
        item: 'Knight Pool',
        amount: 12.5,
        token: 'WLOS',
        date: '2025-03-17',
        time: '00:00:05',
        status: 'Confirmed',
        hash: '3P9qR4sT5v6w...v6w',
        category: 'Staking'
    },
    {
        id: 'tx004',
        type: 'Purchase',
        item: 'Energy Matrix',
        amount: -95,
        token: 'WLOS',
        date: '2025-03-15',
        time: '09:23:57',
        status: 'Confirmed',
        hash: '2A7bC9dE1f3G...f3G',
        category: 'Marketplace'
    },
    {
        id: 'tx005',
        type: 'Deposit',
        item: 'Wallet Funding',
        amount: 500,
        token: 'WLOS',
        date: '2025-03-14',
        time: '18:05:33',
        status: 'Confirmed',
        hash: '5H8jK2lM4nP...4nP',
        category: 'Wallet'
    },
    {
        id: 'tx006',
        type: 'Staking',
        item: 'Knight Pool Deposit',
        amount: -1000,
        token: 'WLOS',
        date: '2025-03-12',
        time: '15:45:21',
        status: 'Confirmed',
        hash: '7Q9wE5rT3y2U...y2U',
        category: 'Staking'
    },
    {
        id: 'tx007',
        type: 'Battle Entry',
        item: 'Tournament Registration',
        amount: -25,
        token: 'WLOS',
        date: '2025-03-11',
        time: '20:12:08',
        status: 'Confirmed',
        hash: '1A3sD5fG7hJ...7hJ',
        category: 'Battle'
    },
    {
        id: 'tx008',
        type: 'Battle Reward',
        item: 'Tournament Victory',
        amount: 250,
        token: 'WLOS',
        date: '2025-03-11',
        time: '23:45:19',
        status: 'Confirmed',
        hash: '8K2lM4nP6qR...6qR',
        category: 'Battle'
    },
    {
        id: 'tx009',
        type: 'Purchase',
        item: 'Void Disruptor',
        amount: -320,
        token: 'WLOS',
        date: '2025-03-10',
        time: '10:37:42',
        status: 'Confirmed',
        hash: '3S5tU7vW9xY...9xY',
        category: 'Marketplace'
    },
    {
        id: 'tx010',
        type: 'Swap',
        item: 'SOL to WLOS',
        amount: 1240,
        token: 'WLOS',
        date: '2025-03-08',
        time: '14:22:57',
        status: 'Confirmed',
        hash: '6Z8xC2vB4nM...4nM',
        category: 'Wallet'
    }
];

const WalletTransactions: React.FC = () => {
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');
    const [expandedTx, setExpandedTx] = useState<string | null>(null);

    // Filter transactions
    const filteredTransactions = transactionsData.filter(tx => {
        const categoryMatch = filterCategory === 'all' || tx.category.toLowerCase() === filterCategory.toLowerCase();
        const typeMatch = filterType === 'all' || tx.type.toLowerCase() === filterType.toLowerCase();
        return categoryMatch && typeMatch;
    });

    // Get unique types for filter options
    const uniqueTypes = Array.from(new Set(transactionsData.map(tx => tx.type)));

    return (
        <section className="wallet-transactions-section">
            <SectionTitle title="TRANSACTION HISTORY" />

            <div className="transactions-controls">
                <div className="filter-group">
                    <div className="filter-control">
                        <span className="filter-label">Category:</span>
                        <div className="filter-options">
                            <button
                                className={`filter-option ${filterCategory === 'all' ? 'active' : ''}`}
                                onClick={() => setFilterCategory('all')}
                            >
                                All
                            </button>
                            <button
                                className={`filter-option ${filterCategory === 'marketplace' ? 'active' : ''}`}
                                onClick={() => setFilterCategory('marketplace')}
                            >
                                Marketplace
                            </button>
                            <button
                                className={`filter-option ${filterCategory === 'battle' ? 'active' : ''}`}
                                onClick={() => setFilterCategory('battle')}
                            >
                                Battle
                            </button>
                            <button
                                className={`filter-option ${filterCategory === 'staking' ? 'active' : ''}`}
                                onClick={() => setFilterCategory('staking')}
                            >
                                Staking
                            </button>
                            <button
                                className={`filter-option ${filterCategory === 'wallet' ? 'active' : ''}`}
                                onClick={() => setFilterCategory('wallet')}
                            >
                                Wallet
                            </button>
                        </div>
                    </div>

                    <div className="filter-control">
                        <span className="filter-label">Type:</span>
                        <div className="filter-options">
                            <button
                                className={`filter-option ${filterType === 'all' ? 'active' : ''}`}
                                onClick={() => setFilterType('all')}
                            >
                                All
                            </button>
                            {uniqueTypes.map((type, index) => (
                                <button
                                    key={index}
                                    className={`filter-option ${filterType === type.toLowerCase() ? 'active' : ''}`}
                                    onClick={() => setFilterType(type.toLowerCase())}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="transactions-list clip-card border-cyan">
                <div className="accent-border top cyan"></div>

                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Item</th>
                            <th>Amount</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map(tx => (
                            <React.Fragment key={tx.id}>
                                <tr className={`transaction-row ${expandedTx === tx.id ? 'expanded' : ''}`}>
                                    <td>
                                        <div className="transaction-type">
                                            <div className={`type-icon ${tx.type.toLowerCase().replace(' ', '-')}`}></div>
                                            <span className="type-text">{tx.type}</span>
                                        </div>
                                    </td>
                                    <td>{tx.item}</td>
                                    <td className={`amount-cell ${tx.amount >= 0 ? 'positive' : 'negative'}`}>
                                        {tx.amount >= 0 ? '+' : ''}{tx.amount} {tx.token}
                                    </td>
                                    <td>
                                        <div className="date-time">
                                            <div className="date">{tx.date}</div>
                                            <div className="time">{tx.time}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`status-badge ${tx.status.toLowerCase()}`}>
                                            {tx.status}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className="details-toggle"
                                            onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
                                        >
                                            {expandedTx === tx.id ? 'Hide' : 'View'}
                                        </button>
                                    </td>
                                </tr>

                                {expandedTx === tx.id && (
                                    <tr className="transaction-details-row">
                                        <td colSpan={6}>
                                            <div className="transaction-details">
                                                <div className="detail-rows">
                                                    <div className="detail-row">
                                                        <div className="detail-label">Transaction Hash:</div>
                                                        <div className="detail-value hash">
                                                            <span className="hash-text">{tx.hash}</span>
                                                            <button className="copy-button">
                                                                <div className="copy-icon"></div>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="detail-row">
                                                        <div className="detail-label">Category:</div>
                                                        <div className="detail-value">{tx.category}</div>
                                                    </div>

                                                    <div className="detail-row">
                                                        <div className="detail-label">Network Fee:</div>
                                                        <div className="detail-value">0.000005 SOL</div>
                                                    </div>
                                                </div>

                                                <div className="transaction-actions">
                                                    <button className="tx-action-button">
                                                        <div className="action-icon explorer"></div>
                                                        <span>View on Explorer</span>
                                                    </button>

                                                    <button className="tx-action-button">
                                                        <div className="action-icon receipt"></div>
                                                        <span>Download Receipt</span>
                                                    </button>

                                                    {tx.category === 'Marketplace' && tx.amount < 0 && (
                                                        <button className="tx-action-button">
                                                            <div className="action-icon view"></div>
                                                            <span>View Item</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                {filteredTransactions.length === 0 && (
                    <div className="no-transactions">
                        <div className="no-data-icon"></div>
                        <p className="no-data-message">No transactions found with the selected filters.</p>
                    </div>
                )}
            </div>

            <div className="pagination">
                <button className="pagination-button active">1</button>
                <button className="pagination-button">2</button>
                <button className="pagination-button">3</button>
                <span className="pagination-ellipsis">...</span>
                <button className="pagination-button">5</button>
            </div>
        </section>
    );
};

export default WalletTransactions;