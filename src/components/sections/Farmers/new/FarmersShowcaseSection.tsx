import React, { useState, useEffect, useRef } from 'react';
import { FARMERS } from '../../../../types/FarmerTypes';
import EnhancedEntityCard from '../../../common/EntityCard';
import '../../../../styles/modules/farmers/new/FarmersShowcaseSection.css';

export const FarmersShowcaseSection: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [filterRarity, setFilterRarity] = useState<string | null>(null);
    const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'yield' | 'rarity' | 'name'>('rarity');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const sectionRef = useRef<HTMLDivElement>(null);

    // Filter and sort farmers
    const filteredAndSortedFarmers = React.useMemo(() => {
        // First filter by rarity if needed
        let filtered = [...FARMERS];
        if (filterRarity) {
            filtered = filtered.filter(farmer => farmer.rarity === filterRarity);
        }
        
        // Then sort
        return filtered.sort((a, b) => {
            if (sortBy === 'yield') {
                return sortOrder === 'desc' ? b.baseYieldPerHour - a.baseYieldPerHour : a.baseYieldPerHour - b.baseYieldPerHour;
            } else if (sortBy === 'rarity') {
                // Sort by rarity level (legendary > epic > rare > common)
                const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
                const aValue = rarityOrder[a.rarity as keyof typeof rarityOrder] || 0;
                const bValue = rarityOrder[b.rarity as keyof typeof rarityOrder] || 0;
                return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
            } else {
                // Sort by name
                return sortOrder === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
            }
        });
    }, [filterRarity, sortBy, sortOrder]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 800); // Slightly delayed animation

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    const handleSelectFarmer = (id: string) => {
        setSelectedFarmer(selectedFarmer === id ? null : id);
    };

    // Helper function to format numbers
    const formatNumber = (num: number): string => {
        return num.toFixed(2);
    };

    // Return colors for different rarity levels
    const getRarityColor = (rarity: string): string => {
        switch (rarity) {
            case 'common': return '#b0b0b0';
            case 'rare': return '#5d8aff';
            case 'epic': return '#ad76ff';
            case 'legendary': return '#ffb84d';
            default: return 'white';
        }
    };
    
    // Toggle sort order
    const toggleSort = (newSortBy: 'yield' | 'rarity' | 'name') => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortOrder('desc'); // Default to descending when changing sort type
        }
    };

    return (
        <section className={`farmers-showcase-section ${visible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="section-header">
                <h2 className="section-title">Farmer Collection</h2>
                <p className="section-description">Browse through the complete farmer collection and unlock their unique abilities.</p>
            </div>

            <div className="info-banner">
                <div className="info-banner-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16V12" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8H12.01" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <p>Farmers can only be acquired through packs in the Pack Store. View our collection below!</p>
            </div>

            <div className="filter-sort-container">
                <div className="filter-group">
                    <label className="filter-label">FILTER BY RARITY:</label>
                    <div className="filter-buttons">
                        <button 
                            className={`filter-button ${filterRarity === null ? 'active' : ''}`}
                            onClick={() => setFilterRarity(null)}
                        >
                            All
                        </button>
                        <button 
                            className={`filter-button ${filterRarity === 'common' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('common')}
                            style={{ '--rarity-color': getRarityColor('common') } as React.CSSProperties}
                        >
                            Common
                        </button>
                        <button 
                            className={`filter-button ${filterRarity === 'rare' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('rare')}
                            style={{ '--rarity-color': getRarityColor('rare') } as React.CSSProperties}
                        >
                            Rare
                        </button>
                        <button 
                            className={`filter-button ${filterRarity === 'epic' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('epic')}
                            style={{ '--rarity-color': getRarityColor('epic') } as React.CSSProperties}
                        >
                            Epic
                        </button>
                        <button 
                            className={`filter-button ${filterRarity === 'legendary' ? 'active' : ''}`}
                            onClick={() => setFilterRarity('legendary')}
                            style={{ '--rarity-color': getRarityColor('legendary') } as React.CSSProperties}
                        >
                            Legendary
                        </button>
                    </div>
                </div>
                
                <div className="sort-group">
                    <label className="sort-label">SORT BY:</label>
                    <div className="sort-buttons">
                        <button 
                            className={`sort-button ${sortBy === 'rarity' ? 'active' : ''}`}
                            onClick={() => toggleSort('rarity')}
                        >
                            Rarity {sortBy === 'rarity' && (sortOrder === 'desc' ? '↓' : '↑')}
                        </button>
                        <button 
                            className={`sort-button ${sortBy === 'yield' ? 'active' : ''}`}
                            onClick={() => toggleSort('yield')}
                        >
                            Yield {sortBy === 'yield' && (sortOrder === 'desc' ? '↓' : '↑')}
                        </button>
                        <button 
                            className={`sort-button ${sortBy === 'name' ? 'active' : ''}`}
                            onClick={() => toggleSort('name')}
                        >
                            Name {sortBy === 'name' && (sortOrder === 'desc' ? '↓' : '↑')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="entity-grid">
                {filteredAndSortedFarmers.map(farmer => (
                    <EnhancedEntityCard
                        key={farmer.id}
                        entity={farmer}
                        owned={false}
                        showYield={true}
                        statusLabel="BASE YIELD"
                        statusValue={`${formatNumber(farmer.baseYieldPerHour)} / hour`}
                        selected={selectedFarmer === farmer.id}
                        infoMessage="AVAILABLE IN PACKS"
                        onSelect={() => handleSelectFarmer(farmer.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default FarmersShowcaseSection; 