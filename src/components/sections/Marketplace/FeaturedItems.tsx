// src/components/sections/Marketplace/FeaturedItems.tsx
import React from 'react';
import SectionTitle from '../../common/SectionTitle';
import Button from '../../common/Button';
import EntityCard from '../../common/EntityCard';
import { MARKETPLACE_ITEMS } from '../../../types/ItemTypes';
import { useMarketplace } from '../../../context/MarketplaceContext';

interface FeaturedItemsProps {
    onViewAll: () => void;
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({ onViewAll }) => {
    const { marketListings } = useMarketplace();

    // Format listings to work with EntityCard
    const formattedListings = marketListings.map(listing => {
        const baseItem = MARKETPLACE_ITEMS.find(item => item.id === listing.itemId);
        if (!baseItem) return null;

        // Return item formatted for EntityCard
        return {
            id: listing.id,
            name: baseItem.name,
            rarity: baseItem.rarity,
            type: baseItem.type,
            description: baseItem.description,
            imageSrc: baseItem.imageSrc,
            stats: baseItem.stats,
            price: listing.price,
            effect: baseItem.effect,
            duration: baseItem.duration,
            seller: listing.seller
        };
    }).filter(item => item !== null);

    // If there are not enough marketplace listings, add default items from catalog
    const getCatalogItems = () => {
        return MARKETPLACE_ITEMS
            .filter(item => {
                // Filter to get one of each rarity, prioritizing weapons
                const isWeapon = item.type === 'weapon';
                return isWeapon;
            })
            .map(item => ({
                id: item.id,
                name: item.name,
                rarity: item.rarity,
                type: item.type,
                description: item.description,
                imageSrc: item.imageSrc,
                stats: item.stats,
                price: item.price,
                effect: item.effect,
                duration: item.duration
            }));
    };

    // Try to get one legendary, one epic, and one rare item
    let featuredItems = [];

    // First check if we have marketplace listings to feature
    if (formattedListings.length > 0) {
        const legendary = formattedListings.find(item => item.rarity === 'legendary');
        const epic = formattedListings.find(item => item.rarity === 'epic' && item.id !== legendary?.id);
        const rare = formattedListings.find(item => item.rarity === 'rare' && item.id !== legendary?.id && item.id !== epic?.id);

        // Add any found items to featured
        if (legendary) featuredItems.push(legendary);
        if (epic) featuredItems.push(epic);
        if (rare) featuredItems.push(rare);

        // If we don't have 3 items yet, add random ones
        while (featuredItems.length < 3 && formattedListings.length > featuredItems.length) {
            const remainingItems = formattedListings.filter(item => !featuredItems.find(featured => featured.id === item.id));
            if (remainingItems.length === 0) break;
            featuredItems.push(remainingItems[0]);
        }
    }

    // If we still need more items, add from catalog
    if (featuredItems.length < 3) {
        const catalogItems = getCatalogItems();
        const neededItems = 3 - featuredItems.length;

        for (let i = 0; i < neededItems && i < catalogItems.length; i++) {
            // Ensure we're not duplicating items
            if (!featuredItems.find(item => item.id === catalogItems[i].id)) {
                featuredItems.push(catalogItems[i]);
            }
        }
    }

    // Limit to 3 items
    featuredItems = featuredItems.slice(0, 3);

    const handleBuyItem = (id: string) => {
        console.log(`Buy item ${id}`);
        // This would call the buyItem function from context in a real implementation
    };

    return (
        <section className="featured-items-section">
            <SectionTitle title="FEATURED ITEMS" />

            <div className="featured-items-grid">
                {featuredItems.map(item => (
                    <EntityCard
                        key={item.id}
                        entity={item}
                        showStats={true}
                        statusLabel="PRICE"
                        statusValue={`${item.price} WLOS`}
                        primaryAction={{
                            text: "BUY",
                            onClick: () => handleBuyItem(item.id)
                        }}
                    />
                ))}
            </div>

            <div className="view-all-container">
                <Button
                    text="VIEW ALL ITEMS"
                    color="yellow"
                    onClick={onViewAll}
                    fullWidth={false}
                />
            </div>

            <style jsx>{`
                .featured-items-grid {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin: 24px 0;
                }
                
                .view-all-container {
                    display: flex;
                    justify-content: center;
                    margin: 24px 0;
                }
            `}</style>
        </section>
    );
};

export default FeaturedItems;