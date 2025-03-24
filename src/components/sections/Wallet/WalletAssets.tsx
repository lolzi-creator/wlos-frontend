import React, { useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import EntityCard from '../../common/EntityCard';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';
import { useFarmer } from '../../../context/FarmerContext';
import { useHero } from '../../../context/HeroContext';
import { useMarketplace } from '../../../context/MarketplaceContext';
import { FARMERS } from '../../../types/FarmerTypes';
import { HEROES } from '../../../types/HeroTypes';
import { MARKETPLACE_ITEMS } from '../../../types/ItemTypes';

const WalletAssets: React.FC = () => {
    const { isConnected } = useWalletConnection();
    const { ownedFarmers } = useFarmer();
    const { ownedHeroes } = useHero();
    const { ownedItems } = useMarketplace();

    const [selectedCategory, setSelectedCategory] = useState<'all' | 'farmers' | 'heroes' | 'items'>('all');
    const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

    // If not connected, don't render anything - the connection UI is handled in the parent component
    if (!isConnected) {
        return null;
    }

    // Get full details for owned farmers
    const farmersWithDetails = ownedFarmers.map(ownedFarmer => {
        const farmerInfo = FARMERS.find(f => f.id === ownedFarmer.farmerId);
        if (!farmerInfo) return null;

        // Calculate current yield based on level
        const currentYield = farmerInfo.baseYieldPerHour * (1 + (ownedFarmer.level * 0.1));

        return {
            id: ownedFarmer.id,
            details: farmerInfo,
            type: 'farmer',
            level: ownedFarmer.level,
            statusValue: `${currentYield.toFixed(1)}/hr`,
            statusLabel: 'YIELD'
        };
    }).filter(Boolean);

    // Get full details for owned heroes
    const heroesWithDetails = ownedHeroes.map(ownedHero => {
        const heroInfo = HEROES.find(h => h.id === ownedHero.heroId);
        if (!heroInfo) return null;

        // Calculate power based on level
        const heroPower = heroInfo.power * (1 + (ownedHero.level * 0.1));

        return {
            id: ownedHero.id,
            details: heroInfo,
            type: 'hero',
            level: ownedHero.level,
            statusValue: Math.round(heroPower),
            statusLabel: 'POWER',
            equipped: ownedHero.equippedItems || []
        };
    }).filter(Boolean);

    // Get full details for owned items
    const itemsWithDetails = ownedItems.map(ownedItem => {
        const itemDetails = MARKETPLACE_ITEMS.find(item => item.id === ownedItem.itemId);
        if (!itemDetails) return null;

        return {
            id: ownedItem.id,
            details: itemDetails,
            type: 'item',
            equipped: ownedItem.equipped,
            durability: ownedItem.durability,
            charges: ownedItem.charges
        };
    }).filter(Boolean);

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

            {displayedAssets.length > 0 ? (
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
                            const isConsumable = asset.details.type === 'consumable';
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

            <style jsx>{`
                .asset-overview {
                    background-color: rgba(8, 8, 30, 0.7);
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 24px;
                }
                
                .assets-stats {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                }
                
                .asset-stat-box {
                    display: flex;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.3);
                    border-radius: 6px;
                    padding: 16px;
                }
                
                .stat-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 12px;
                    background-color: #00C2FF;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .stat-info {
                    display: flex;
                    flex-direction: column;
                }
                
                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: white;
                }
                
                .stat-label {
                    font-size: 0.875rem;
                    color: #8B8DA0;
                }
                
                .asset-filters {
                    margin-bottom: 24px;
                }
                
                .filter-buttons {
                    display: flex;
                    gap: 12px;
                }
                
                .filter-button {
                    background-color: rgba(0, 0, 0, 0.3);
                    border: 1px solid #00C2FF;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .filter-button.active {
                    background-color: rgba(0, 194, 255, 0.2);
                    box-shadow: 0 0 10px rgba(0, 194, 255, 0.5);
                }
                
                .filter-button:hover {
                    background-color: rgba(0, 194, 255, 0.1);
                }
                
                .no-assets-message {
                    background-color: rgba(8, 8, 30, 0.7);
                    border-radius: 8px;
                    border: 1px solid rgba(0, 194, 255, 0.3);
                    padding: 40px 20px;
                    text-align: center;
                    color: #ccc;
                    margin-top: 20px;
                }
            `}</style>
        </section>
    );
};

export default WalletAssets;