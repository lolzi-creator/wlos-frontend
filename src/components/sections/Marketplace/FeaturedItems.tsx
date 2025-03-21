// src/components/sections/Marketplace/FeaturedItems.tsx
import React from 'react';
import SectionTitle from '../../common/SectionTitle';
import Button from '../../common/Button';
import ItemCard from './ItemCards';
import { MARKETPLACE_ITEMS } from '../../../types/ItemTypes';

interface FeaturedItemsProps {
    onViewAll: () => void;
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({ onViewAll }) => {
    // Select 3 featured items - one legendary, one epic, one rare
    const legendaryItem = MARKETPLACE_ITEMS.find(item => item.rarity === 'legendary');
    const epicItem = MARKETPLACE_ITEMS.find(item => item.rarity === 'epic');
    const rareItem = MARKETPLACE_ITEMS.find(item => item.rarity === 'rare');

    // Fallback items if we don't find the specific rarities
    const featuredItems = [
        legendaryItem || MARKETPLACE_ITEMS[0],
        epicItem || MARKETPLACE_ITEMS[1],
        rareItem || MARKETPLACE_ITEMS[2]
    ].slice(0, 3); // Ensure we only have 3 items

    return (
        <section className="featured-items-section">
            <SectionTitle title="FEATURED ITEMS" />

            <div className="featured-items-grid">
                {featuredItems.map(item => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        onBuy={() => console.log(`Buy ${item.id}`)}
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