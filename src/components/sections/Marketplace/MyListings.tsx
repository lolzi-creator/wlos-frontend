// src/components/sections/Marketplace/MyListings.tsx
import React, { useState, ChangeEvent } from 'react';
import SectionTitle from '../../common/SectionTitle';
import { MARKETPLACE_ITEMS, Item } from '../../../types/ItemTypes';
import { useMarketplace } from '../../../context/MarketplaceContext';
import '../../../styles/listings.css';

interface PriceChangeModalProps {
    listingId: string;
    currentPrice: number;
    onClose: () => void;
    onUpdatePrice: (listingId: string, newPrice: number) => Promise<void>;
}

interface Listing {
    id: string;
    itemId: string;
    price: number;
    listedAt: number;
    details?: Item;
}

// Price Change Modal Component
const PriceChangeModal: React.FC<PriceChangeModalProps> = ({
    listingId,
    currentPrice,
    onClose,
    onUpdatePrice
}) => {
    const [newPrice, setNewPrice] = useState<number>(currentPrice);

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setNewPrice(value);
        }
    };

    const handleSubmit = async () => {
        await onUpdatePrice(listingId, newPrice);
        onClose();
    };

    return (
        <div className="price-change-modal" onClick={onClose}>
            <div className="price-change-content" onClick={e => e.stopPropagation()}>
                <div className="price-change-header">
                    <div className="price-change-title">Update Listing Price</div>
                    <button className="price-change-close" onClick={onClose}>×</button>
                </div>

                <div className="price-input-group">
                    <label className="price-input-label">New Price (WLOS)</label>
                    <input
                        type="number"
                        className="price-input-field"
                        value={newPrice}
                        onChange={handlePriceChange}
                        min="1"
                    />
                </div>

                <div className="price-actions">
                    <button className="price-cancel-button" onClick={onClose}>
                        CANCEL
                    </button>
                    <button className="price-update-button" onClick={handleSubmit}>
                        UPDATE PRICE
                    </button>
                </div>
            </div>
        </div>
    );
};

const MyListings: React.FC = () => {
    const { myListings, cancelListing, updateListingPrice, isLoading, error } = useMarketplace();
    const [selectedListing, setSelectedListing] = useState<string | null>(null);
    const [priceChangeModal, setPriceChangeModal] = useState({
        isOpen: false,
        listingId: '',
        currentPrice: 0
    });

    // Get full item details for each listing
    const listingsWithDetails = myListings.map((listing: Listing) => {
        const itemDetails = MARKETPLACE_ITEMS.find(item => item.id === listing.itemId);
        if (!itemDetails) return null;

        return {
            ...listing,
            details: itemDetails
        };
    }).filter((listing): listing is NonNullable<typeof listing> => listing !== null);

    const handleCancelListing = async (listingId: string) => {
        try {
            const success = await cancelListing(listingId);
            if (success) {
                setSelectedListing(null);
            }
        } catch (error) {
            console.error('Error canceling listing:', error);
        }
    };

    const openPriceChangeModal = (listingId: string, currentPrice: number) => {
        setPriceChangeModal({
            isOpen: true,
            listingId,
            currentPrice
        });
    };

    const closePriceChangeModal = () => {
        setPriceChangeModal({
            isOpen: false,
            listingId: '',
            currentPrice: 0
        });
    };

    // Handle price update
    const handleUpdatePrice = async (listingId: string, newPrice: number) => {
        try {
            const success = await updateListingPrice(listingId, newPrice);
            if (success) {
                console.log(`Successfully updated price to ${newPrice} WLOS`);
            }
        } catch (error) {
            console.error('Error updating price:', error);
        }
    };

    // Format date from timestamp
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        // Format as DD.MM.YYYY HH:MM:SS
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    };

    // Get rarity color and letter
    const getRarityInfo = (rarity: string) => {
        switch(rarity) {
            case 'common':
                return { color: '#14F195', letter: 'C' };
            case 'uncommon':
                return { color: '#49E9FF', letter: 'U' };
            case 'rare':
                return { color: '#00C2FF', letter: 'R' };
            case 'epic':
                return { color: '#9945FF', letter: 'E' };
            case 'legendary':
                return { color: '#FFB800', letter: 'L' };
            default:
                return { color: '#14F195', letter: 'C' };
        }
    };

    return (
        <section className="my-listings-section">
            <SectionTitle title="MY MARKETPLACE LISTINGS" />

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {listingsWithDetails.length > 0 ? (
                <div className="futuristic-listings-container">
                    {/* Grid background pattern */}
                    <div className="listings-grid-pattern"></div>

                    {/* Header row */}
                    <div className="listings-header">
                        <div>Item</div>
                        <div>Type</div>
                        <div>Rarity</div>
                        <div>Listed Price</div>
                        <div>List Date</div>
                        <div>Actions</div>
                    </div>

                    {/* Listing rows */}
                    <div className="listings-body">
                        {listingsWithDetails.map(listing => {
                            if (!listing) return null;
                            const { details } = listing;
                            const { color, letter } = getRarityInfo(details.rarity);

                            return (
                                <div
                                    key={listing.id}
                                    className={`listing-row ${selectedListing === listing.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedListing(selectedListing === listing.id ? null : listing.id)}
                                >
                                    {/* Item cell */}
                                    <div className="item-cell">
                                        <div className="item-icon" style={{ backgroundColor: color }}>
                                            {letter}
                                        </div>
                                        <div className="item-name" style={{ color }}>
                                            {details.name}
                                        </div>
                                    </div>

                                    {/* Type cell */}
                                    <div className="type-cell">
                                        {details.type}
                                    </div>

                                    {/* Rarity cell */}
                                    <div>
                                        <span className="rarity-badge" style={{
                                            color,
                                            backgroundColor: `${color}20`
                                        }}>
                                            {details.rarity}
                                        </span>
                                    </div>

                                    {/* Price cell */}
                                    <div className="price-cell">
                                        {listing.price} WLOS
                                    </div>

                                    {/* Date cell */}
                                    <div className="date-cell">
                                        {formatDate(listing.listedAt)}
                                    </div>

                                    {/* Actions cell */}
                                    <div className="action-buttons-container">
                                        <button
                                            className="cancel-button"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent row selection
                                                handleCancelListing(listing.id);
                                            }}
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            className="change-price-button"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent row selection
                                                openPriceChangeModal(listing.id, listing.price);
                                            }}
                                        >
                                            CHANGE PRICE
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="no-listings-message">
                    <div className="listings-grid-pattern"></div>
                    <p>You don't have any active marketplace listings. Go to your inventory to list items for sale.</p>
                </div>
            )}

            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Processing...</p>
                </div>
            )}

            {priceChangeModal.isOpen && (
                <PriceChangeModal
                    listingId={priceChangeModal.listingId}
                    currentPrice={priceChangeModal.currentPrice}
                    onClose={closePriceChangeModal}
                    onUpdatePrice={handleUpdatePrice}
                />
            )}
        </section>
    );
};

export default MyListings;