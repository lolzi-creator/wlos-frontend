import React, { useState, useEffect } from 'react';
import SectionTitle from '../../common/SectionTitle';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';


const WalletTransactions: React.FC = () => {
    const {
        isConnected,
        walletAddress,
        transactions,
        refreshTransactions,
        isLoading,
        error
    } = useWalletConnection();

    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');
    const [expandedTx, setExpandedTx] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
    const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);

    // Fetch transactions when component mounts
    useEffect(() => {
        if (isConnected && walletAddress) {
            loadTransactions();
        }
    }, [isConnected, walletAddress, currentPage]);

    // Process transactions when they change
    useEffect(() => {
        if (transactions && transactions.length > 0) {
            // Get unique types and categories
            const types = Array.from(new Set(transactions.map(tx => tx.type)));
            const categories = Array.from(new Set(transactions.map(tx => tx.category)));

            setUniqueTypes(types);
            setUniqueCategories(categories);

            // Apply filters
            filterTransactions();
        } else {
            setFilteredTransactions([]);
        }
    }, [transactions, filterCategory, filterType]);

    const loadTransactions = async () => {
        try {
            const result = await refreshTransactions(currentPage, 10);

            if (result && result.pagination) {
                setTotalPages(result.pagination.totalPages || 1);
            }
        } catch (error) {
            console.error('Error loading transactions:', error);
        }
    };

    const filterTransactions = () => {
        let filtered = [...transactions];

        // Apply category filter
        if (filterCategory !== 'all') {
            filtered = filtered.filter(tx =>
                tx.category && tx.category.toLowerCase() === filterCategory.toLowerCase()
            );
        }

        // Apply type filter
        if (filterType !== 'all') {
            filtered = filtered.filter(tx =>
                tx.type && tx.type.toLowerCase() === filterType.toLowerCase()
            );
        }

        setFilteredTransactions(filtered);
    };

    const handleFilterChange = async (category: string, type: string) => {
        setFilterCategory(category);
        setFilterType(type);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // If not connected, don't render anything
    if (!isConnected) {
        return null;
    }

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
                                onClick={() => handleFilterChange('all', filterType)}
                            >
                                All
                            </button>
                            {uniqueCategories.map((category, index) => (
                                <button
                                    key={index}
                                    className={`filter-option ${filterCategory === category.toLowerCase() ? 'active' : ''}`}
                                    onClick={() => handleFilterChange(category.toLowerCase(), filterType)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-control">
                        <span className="filter-label">Type:</span>
                        <div className="filter-options">
                            <button
                                className={`filter-option ${filterType === 'all' ? 'active' : ''}`}
                                onClick={() => handleFilterChange(filterCategory, 'all')}
                            >
                                All
                            </button>
                            {uniqueTypes.map((type, index) => (
                                <button
                                    key={index}
                                    className={`filter-option ${filterType === type.toLowerCase() ? 'active' : ''}`}
                                    onClick={() => handleFilterChange(filterCategory, type.toLowerCase())}
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

                {isLoading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading transactions...</p>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

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
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((tx) => (
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
                                                                    <span className="hash-text">{tx.hash || 'Not available'}</span>
                                                                    {tx.hash && (
                                                                        <button className="copy-button" onClick={() => {
                                                                            navigator.clipboard.writeText(tx.hash);
                                                                            alert('Hash copied to clipboard!');
                                                                        }}>
                                                                            <div className="copy-icon"></div>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="detail-row">
                                                                <div className="detail-label">Category:</div>
                                                                <div className="detail-value">{tx.category || 'Unknown'}</div>
                                                            </div>

                                                            <div className="detail-row">
                                                                <div className="detail-label">Fee:</div>
                                                                <div className="detail-value">{tx.fee ? `${tx.fee} SOL` : 'N/A'}</div>
                                                            </div>
                                                        </div>

                                                        <div className="transaction-actions">
                                                            {tx.hash && (
                                                                <button
                                                                    className="tx-action-button"
                                                                    onClick={() => window.open(`https://explorer.solana.com/tx/${tx.hash}?cluster=devnet`, '_blank')}
                                                                >
                                                                    <div className="action-icon explorer"></div>
                                                                    <span>View on Explorer</span>
                                                                </button>
                                                            )}

                                                            <button
                                                                className="tx-action-button"
                                                                onClick={() => console.log('Receipt requested for transaction:', tx.id)}
                                                            >
                                                                <div className="action-icon receipt"></div>
                                                                <span>Download Receipt</span>
                                                            </button>

                                                            {tx.category === 'Marketplace' && tx.amount < 0 && (
                                                                <button
                                                                    className="tx-action-button"
                                                                    onClick={() => window.location.href = '/marketplace'}
                                                                >
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="no-transactions">
                                            <div className="no-data-icon"></div>
                                            <p className="no-data-message">No transactions found with the selected filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Logic to show pagination around current page
                        let pageNum = 1;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }

                        return (
                            <button
                                key={i}
                                className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
};

export default WalletTransactions;