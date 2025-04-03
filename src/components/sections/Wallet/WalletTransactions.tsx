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
    const [isMobileView, setIsMobileView] = useState<boolean>(false);

    // Check if mobile view on component mount and window resize
    useEffect(() => {
        const checkIfMobile = () => {
            const width = window.innerWidth;
            setIsMobileView(width <= 768);
            
            // Add additional classes for very small screens
            if (width <= 480) {
                document.body.classList.add('very-small-screen');
            } else {
                document.body.classList.remove('very-small-screen');
            }
        };
        
        // Check initially
        checkIfMobile();
        
        // Add resize listener
        window.addEventListener('resize', checkIfMobile);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', checkIfMobile);
            document.body.classList.remove('very-small-screen');
        };
    }, []);

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

    // Format relative time for mobile view
    const getRelativeTime = (date: string, time: string): string => {
        const txDate = new Date(`${date}T${time}`);
        const now = new Date();
        const diffMs = now.getTime() - txDate.getTime();
        const diffMin = Math.round(diffMs / 60000);

        if (diffMin < 1) return 'just now';
        if (diffMin < 60) return `${diffMin}m ago`;
        
        const diffHr = Math.floor(diffMin / 60);
        if (diffHr < 24) return `${diffHr}h ago`;
        
        const diffDays = Math.floor(diffHr / 24);
        if (diffDays < 30) return `${diffDays}d ago`;
        
        return date;
    };

    // If not connected, don't render anything
    if (!isConnected) {
        return null;
    }

    // Render mobile view cards
    const renderMobileTransactionCards = () => {
        if (filteredTransactions.length === 0) {
            return (
                <div className="no-transactions-message">
                    <p>No transactions found</p>
                </div>
            );
        }

        return (
            <div className="mobile-transactions-list">
                {filteredTransactions.map((tx) => (
                    <div 
                        key={tx.id} 
                        className={`mobile-transaction-card ${expandedTx === tx.id ? 'expanded' : ''}`}
                        onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
                    >
                        <div className={`status-badge ${tx.status.toLowerCase()}`}>
                            {tx.status}
                        </div>
                        
                        <div className="mobile-tx-header">
                            <div className="transaction-type">
                                <div className={`type-icon ${tx.type.toLowerCase().replace(' ', '-')}`}></div>
                                <span className="type-text">{tx.type}</span>
                            </div>
                        </div>
                        
                        <div className="mobile-tx-details">
                            <div className="mobile-tx-item">
                                {tx.item || 'Unknown item'}
                            </div>
                            <div className="mobile-tx-info">
                                <div className={`amount-cell ${tx.amount >= 0 ? 'positive' : 'negative'}`}>
                                    {tx.amount >= 0 ? '+' : ''}{tx.amount} {tx.token}
                                </div>
                                <div className="mobile-tx-time">
                                    {getRelativeTime(tx.date, tx.time)}
                                </div>
                            </div>
                        </div>
                        
                        {expandedTx === tx.id && (
                            <div className="mobile-tx-expanded">
                                <div className="detail-rows">
                                    <div className="detail-row">
                                        <div className="detail-label">Date:</div>
                                        <div className="detail-value">{tx.date}</div>
                                    </div>
                                    
                                    <div className="detail-row">
                                        <div className="detail-label">Time:</div>
                                        <div className="detail-value">{tx.time}</div>
                                    </div>
                                    
                                    {tx.category && (
                                        <div className="detail-row">
                                            <div className="detail-label">Category:</div>
                                            <div className="detail-value">{tx.category}</div>
                                        </div>
                                    )}
                                    
                                    {tx.fee && (
                                        <div className="detail-row">
                                            <div className="detail-label">Fee:</div>
                                            <div className="detail-value">{tx.fee} SOL</div>
                                        </div>
                                    )}
                                    
                                    {tx.hash && (
                                        <div className="detail-row">
                                            <div className="detail-label">Hash:</div>
                                            <div className="detail-value hash">
                                                <span className="hash-text">{tx.hash}</span>
                                                <button className="copy-button" onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigator.clipboard.writeText(tx.hash);
                                                    alert('Hash copied to clipboard!');
                                                }}>
                                                    <div className="copy-icon"></div>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {tx.hash && (
                                    <div className="transaction-actions">
                                        <button
                                            className="tx-action-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(`https://explorer.solana.com/tx/${tx.hash}?cluster=devnet`, '_blank');
                                            }}
                                        >
                                            <div className="action-icon explorer"></div>
                                            <span>View on Explorer</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="wallet-transactions-section">
            <SectionTitle title="TRANSACTION HISTORY" />

            {/* Only show controls on desktop view */}
            {!isMobileView && (
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
            )}

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

                    {isMobileView ? (
                        // Mobile view (cards)
                        renderMobileTransactionCards()
                    ) : (
                        // Desktop view (table)
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
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="no-data">
                                            <div className="no-transactions-message">
                                                No transactions found matching your filters.
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="pagination-controls">
                            <button 
                                className="pagination-button"
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                            >
                                &laquo;
                            </button>
                            <button 
                                className="pagination-button"
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                &lt;
                            </button>
                            
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNum = index + 1;
                                // Only render some page buttons to avoid crowding
                                if (
                                    pageNum === 1 ||
                                    pageNum === totalPages ||
                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={index}
                                            className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
                                            onClick={() => handlePageChange(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (
                                    pageNum === currentPage - 2 ||
                                    pageNum === currentPage + 2
                                ) {
                                    return (
                                        <span key={index} className="pagination-ellipsis">
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}
                            
                            <button 
                                className="pagination-button"
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                &gt;
                            </button>
                            <button 
                                className="pagination-button"
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                &raquo;
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default WalletTransactions;