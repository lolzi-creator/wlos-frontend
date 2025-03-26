import React, { useState, useEffect } from 'react';
import SectionTitle from '../../common/SectionTitle';
import EntityCard from '../../common/EntityCard';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';
import { FARMERS } from '../../../types/FarmerTypes';
import { HEROES } from '../../../types/HeroTypes';
import { MARKETPLACE_ITEMS } from '../../../types/ItemTypes';

const WalletAssets: React.FC = () => {
    const { isConnected, assets, isLoading } = useWalletConnection();
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'farmers' | 'heroes' | 'items'>('all');
    const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
    const [farmersWithDetails, setFarmersWithDetails] = useState<any[]>([]);
    const [heroesWithDetails, setHeroesWithDetails] = useState<any[]>([]);
    const [itemsWithDetails, setItemsWithDetails] = useState<any[]>([]);

    // Process assets when they change
    useEffect(() => {
        if (assets) {
            processAssets();
        }
    }, [assets]);

    // Process assets to add frontend details
    const processAssets = () => {
        // Process farmers
        const processedFarmers = assets.farmers.map(farmer => {
            // Get additional details from frontend types
            const farmerInfo = FARMERS.find(f => f.id === farmer.farmer_id);
            if (!farmerInfo) return null;

            // Calculate current yield based on level
            const baseYield = farmer.base_yield_per_hour || farmerInfo.baseYieldPerHour;
            const currentYield = baseYield * (1 + ((farmer.level - 1) * 0.1));

            return {
                id: farmer.id,
                details: {
                    ...farmerInfo,
                    name: farmer.name || farmerInfo.name,
                    imageSrc: farmer.image_src || farmerInfo.imageSrc,
                    rarity: farmer.rarity || farmerInfo.rarity,
                    description: farmer.description || farmerInfo.description
                },
                type: 'farmer',
                level: farmer.level,
                statusValue: `${currentYield.toFixed(1)}/hr`,
                statusLabel: 'YIELD',
                lastHarvested: farmer.last_harvested
            };
        }).filter(Boolean);

        setFarmersWithDetails(processedFarmers);

        // Process heroes
        const processedHeroes = assets.heroes.map(hero => {
            // Get additional details from frontend types
            const heroInfo = HEROES.find(h => h.id === hero.hero_id);
            if (!heroInfo) return null;

            // Calculate power based on level
            const basePower = hero.power || heroInfo.power;
            const heroPower = basePower * (1 + ((hero.level - 1) * 0.1));

            return {
                id: hero.id,
                details: {
                    ...heroInfo,
                    name: hero.name || heroInfo.name,
                    imageSrc: hero.image_src || heroInfo.imageSrc,
                    rarity: hero.rarity || heroInfo.rarity,
                    description: hero.description || heroInfo.description
                },
                type: 'hero',
                level: hero.level,
                statusValue: Math.round(heroPower),
                statusLabel: 'POWER',
                equipped: hero.equipped_items || []
            };
        }).filter(Boolean);

        setHeroesWithDetails(processedHeroes);

        // Process items
        const processedItems = assets.items.map(item => {
            // Get additional details from frontend types
            const itemDetails = MARKETPLACE_ITEMS.find(i => i.id === item.item_id);
            if (!itemDetails) return null;

            return {
                id: item.id,
                details: {
                    ...itemDetails,
                    name: item.name || itemDetails.name,
                    imageSrc: item.image_src || itemDetails.imageSrc,
                    rarity: item.rarity || itemDetails.rarity,
                    description: item.description || itemDetails.description
                },
                type: 'item',
                equipped: item.equipped,
                durability: item.durability,
                charges: item.charges
            };
        }).filter(Boolean);

        setItemsWithDetails(processedItems);
    };

    // If not connected, don't render anything - the connection UI is handled in the parent component
    if (!isConnected) {
        return null;
    }

    // Filter assets based on selected category
    let displayedAssets = [];
    switch(selectedCategory) {
        case 'farmers':
            displayedAssets = farmersWithDetails;
            break;
        case 'heroes':
            displayedAssets = heroesWithDetails;
            break;
        case 'items':
            displayedAssets = itemsWithDetails;
            break;
        default: // 'all'
            displayedAssets = [...farmersWithDetails, ...heroesWithDetails, ...itemsWithDetails];
    }

    const handleSelect = (id: string) => {
        setSelectedAsset(selectedAsset === id ? null : id);
    };

    // Asset counts for statistics
    const assetCounts = {
        farmers: farmersWithDetails.length,
        heroes: heroesWithDetails.length,
        items: itemsWithDetails.length,
        total: farmersWithDetails.length + heroesWithDetails.length + itemsWithDetails.length
    };

    return (
        <section className="wallet-assets-section">
            <SectionTitle title="YOUR ASSETS" />

            <div className="asset-overview clip-card border-cyan">
                <div className="accent-border top cyan"></div>

                <div className="assets-stats">
                    <div className="asset-stat-box">
                        <div className="stat-icon farmers"></div>
                        <div className="stat-info">
                            <div className="stat-value">{assetCounts.farmers}</div>
                            <div className="stat-label">Farmers</div>
                        </div>
                    </div>

                    <div className="asset-stat-box">
                        <div className="stat-icon heroes"></div>
                        <div className="stat-info">
                            <div className="stat-value">{assetCounts.heroes}</div>
                            <div className="stat-label">Heroes</div>
                        </div>
                    </div>

                    <div className="asset-stat-box">
                        <div className="stat-icon items"></div>
                        <div className="stat-info">
                            <div className="stat-value">{assetCounts.items}</div>
                            <div className="stat-label">Items</div>
                        </div>
                    </div>

                    <div className="asset-stat-box">
                        <div className="stat-icon total"></div>
                        <div className="stat-info">
                            <div className="stat-value">{assetCounts.total}</div>
                            <div className="stat-label">Total Assets</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="asset-filters">
                <div className="filter-buttons">
                    <button
                        className={`filter-button ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All Assets
                    </button>
                    <button
                        className={`filter-button ${selectedCategory === 'farmers' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('farmers')}
                    >
                        Farmers
                    </button>
                    <button
                        className={`filter-button ${selectedCategory === 'heroes' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('heroes')}
                    >
                        Heroes
                    </button>
                    <button
                        className={`filter-button ${selectedCategory === 'items' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('items')}
                    >
                        Items
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading your assets...</p>
                </div>
            ) : displayedAssets.length > 0 ? (
                <div className="entity-grid">
                    {displayedAssets.map(asset => {
                        if (asset.type === 'farmer') {
                            return (
                                <EntityCard
                                    key={asset.id}
                                    entity={asset.details}
                                    owned={true}
                                    level={asset.level}
                                    showYield={true}
                                    selected={selectedAsset === asset.id}
                                    statusLabel={asset.statusLabel}
                                    statusValue={asset.statusValue}
                                    onSelect={() => handleSelect(asset.id)}
                                    primaryAction={{
                                        text: "VIEW DETAILS",
                                        onClick: () => window.location.href = '/farmers'
                                    }}
                                />
                            );
                        } else if (asset.type === 'hero') {
                            return (
                                <EntityCard
                                    key={asset.id}
                                    entity={asset.details}
                                    owned={true}
                                    level={asset.level}
                                    showPower={true}
                                    equipment={asset.equipped}
                                    selected={selectedAsset === asset.id}
                                    statusLabel={asset.statusLabel}
                                    statusValue={asset.statusValue}
                                    onSelect={() => handleSelect(asset.id)}
                                    primaryAction={{
                                        text: "VIEW DETAILS",
                                        onClick: () => window.location.href = '/heroes'
                                    }}
                                />
                            );
                        } else { // item
                            return (
                                <EntityCard
                                    key={asset.id}
                                    entity={asset.details}
                                    owned={true}
                                    equipped={Boolean(asset.equipped)}
                                    selected={selectedAsset === asset.id}
                                    onSelect={() => handleSelect(asset.id)}
                                    showStats={true}
                                    primaryAction={{
                                        text: "VIEW DETAILS",
                                        onClick: () => window.location.href = '/marketplace'
                                    }}
                                />
                            );
                        }
                    })}
                </div>
            ) : (
                <div className="no-assets-message">
                    <p>No assets found in this category. Visit the marketplace to acquire some!</p>
                </div>
            )}

            <style>{`
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 48px 0;
                    background-color: rgba(8, 8, 30, 0.7);
                    border-radius: 8px;
                    border: 1px solid rgba(0, 194, 255, 0.3);
                }

                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(0, 194, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: #00C2FF;
                    animation: spin 1s infinite linear;
                    margin-bottom: 16px;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default WalletAssets;