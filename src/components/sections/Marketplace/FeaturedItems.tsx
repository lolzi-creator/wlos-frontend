// src/components/sections/Marketplace/FeaturedItems.tsx
import React from 'react';
import SectionTitle from '../../common/SectionTitle';
import Button from '../../common/Button';
import EntityCard from '../../common/EntityCard';
import { MARKETPLACE_ITEMS, Item } from '../../../types/ItemTypes';
import { useMarketplace } from '../../../context/MarketplaceContext';

interface FeaturedItemsProps {
    onViewAll: () => void;
}

interface MarketListing {
    id: string;
    itemId: string;
    price: number;
    seller: string;
}

interface FormattedListing extends Item {
    listingId: string;
    price: number;
    seller?: string;
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({ onViewAll }) => {
    const { marketListings } = useMarketplace();

    // Format listings to work with EntityCard
    const formattedListings: FormattedListing[] = marketListings
        .map((listing: MarketListing) => {
            const baseItem = MARKETPLACE_ITEMS.find(item => item.id === listing.itemId);
            if (!baseItem) return null;

            // Return item formatted for EntityCard
            return {
                ...baseItem,
                listingId: listing.id,
                price: listing.price,
                seller: listing.seller
            };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

    // If there are not enough marketplace listings, add default items from catalog
    const getCatalogItems = (): FormattedListing[] => {
        return MARKETPLACE_ITEMS
            .filter(item => {
                // Filter to get one of each rarity, prioritizing weapons
                const isWeapon = item.type === 'weapon';
                return isWeapon;
            })
            .map(item => ({
                ...item,
                listingId: item.id,
                price: item.price
            }));
    };

    // Try to get one legendary, one epic, and one rare item
    let featuredItems: FormattedListing[] = [];

    // First check if we have marketplace listings to feature
    if (formattedListings.length > 0) {
        const legendary = formattedListings.find(item => item.rarity === 'legendary');
        const epic = formattedListings.find(item => item.rarity === 'epic' && item.listingId !== legendary?.listingId);
        const rare = formattedListings.find(item => item.rarity === 'rare' && item.listingId !== legendary?.listingId && item.listingId !== epic?.listingId);

        // Add any found items to featured
        if (legendary) featuredItems.push(legendary);
        if (epic) featuredItems.push(epic);
        if (rare) featuredItems.push(rare);

        // If we don't have 3 items yet, add random ones
        while (featuredItems.length < 3 && formattedListings.length > featuredItems.length) {
            const remainingItems = formattedListings.filter(item => !featuredItems.find(featured => featured.listingId === item.listingId));
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
            if (!featuredItems.find(item => item.listingId === catalogItems[i].listingId)) {
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
            <style>
                {`
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
                `}
            </style>

            <SectionTitle title="FEATURED ITEMS" />

            <div className="featured-items-grid">
                {featuredItems.map(item => (
                    <EntityCard
                        key={item.listingId}
                        entity={item}
                        showStats={true}
                        statusLabel="PRICE"
                        statusValue={`${item.price} WLOS`}
                        primaryAction={{
                            text: "BUY",
                            onClick: () => handleBuyItem(item.listingId)
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
        </section>
    );
};

export default FeaturedItems;