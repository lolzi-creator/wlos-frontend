// src/components/sections/Marketplace/SellItemPopup.tsx
import React, { useState } from 'react';
import { Item } from '../../../types/ItemTypes';
import Button from '../../common/Button';
import { useMarketplace } from '../../../context/MarketplaceContext';

interface SellItemPopupProps {
    item: Item;
    ownedItemId: string;
    onClose: () => void;
}

const SellItemPopup: React.FC<SellItemPopupProps> = ({ item, ownedItemId, onClose }) => {
    const { sellItem, isLoading } = useMarketplace();
    const [listingPrice, setListingPrice] = useState<number>(Math.round(item.price * 1.2)); // 20% markup by default
    const instantSellPrice = Math.round(item.price * 0.7); // 30% less for instant sell

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setListingPrice(value);
        }
    };

    const handleInstantSell = async () => {
        try {
            // For instant sell, we use a low price and list immediately
            const success = await sellItem(ownedItemId, instantSellPrice);
            if (success) {
                onClose();
            }
        } catch (error) {
            console.error('Error during instant sell:', error);
        }
    };

    const handleListForSale = async () => {
        try {
            const success = await sellItem(ownedItemId, listingPrice);
            if (success) {
                onClose();
            }
        } catch (error) {
            console.error('Error during listing:', error);
        }
    };

    return (
        <div className="sell-popup-overlay">
            <div className="sell-popup-container">
                <div className="sell-popup-header">
                    <h2 className="sell-popup-title">SELL ITEM</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                <div className="sell-popup-content">
                    <div className="sell-popup-item">
                        <div className="item-card">
                            <div className={`rarity-banner ${item.rarity}`}>
                                <span className="rarity-text">{item.rarity}</span>
                                <span className="type-text">{item.type}</span>
                            </div>

                            <div className="item-image-container">
                                <div className="item-image">
                                    <span className="item-letter">{item.name.charAt(0)}</span>
                                </div>
                            </div>

                            <div className="item-name-container">
                                <h3 className="item-name">{item.name}</h3>
                            </div>

                            <div className="item-details">
                                <p className="item-description">{item.description}</p>

                                <div className="item-stats">
                                    {Object.entries(item.stats).map(([statName, value]) => (
                                        <div key={statName} className="stat-row">
                                            <span className="stat-name">{statName.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            <span className={`stat-value ${Number(value) > 0 ? 'positive' : 'negative'}`}>
                                                {Number(value) > 0 ? '+' : ''}{value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sell-popup-options">
                        <div className="sell-option instant-sell">
                            <h3 className="option-title">INSTANT SELL</h3>
                            <p className="option-description">
                                Sell immediately at a reduced price. Transaction completes instantly.
                            </p>
                            <div className="price-display">
                                <span className="price-value">{instantSellPrice}</span>
                                <span className="price-currency">WLOS</span>
                            </div>
                            <div className="discount-notice">
                                (30% below market value)
                            </div>
                            <Button
                                text="SELL NOW"
                                color="yellow"
                                onClick={handleInstantSell}
                                fullWidth={true}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="sell-option marketplace-listing">
                            <h3 className="option-title">LIST ON MARKETPLACE</h3>
                            <p className="option-description">
                                Set your own price and wait for a buyer. 5% listing fee applies.
                            </p>
                            <div className="listing-price-container">
                                <label className="price-label">Your Price</label>
                                <div className="price-input-container">
                                    <input
                                        type="number"
                                        className="price-input"
                                        value={listingPrice}
                                        onChange={handlePriceChange}
                                        min="1"
                                    />
                                    <span className="price-currency">WLOS</span>
                                </div>
                            </div>
                            <div className="fee-display">
                                <span className="fee-label">Listing Fee:</span>
                                <span className="fee-value">{Math.round(listingPrice * 0.05)} WLOS</span>
                            </div>
                            <div className="net-proceeds">
                                <span className="proceeds-label">Net Proceeds:</span>
                                <span className="proceeds-value">{Math.round(listingPrice * 0.95)} WLOS</span>
                            </div>
                            <Button
                                text="LIST FOR SALE"
                                color="yellow"
                                onClick={handleListForSale}
                                fullWidth={true}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>

                {isLoading && (
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                        <p>Processing transaction...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellItemPopup;