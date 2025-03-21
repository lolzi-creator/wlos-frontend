// src/components/sections/Marketplace/SellItemPopup.tsx
import React, { useState } from 'react';
import { Item } from '../../../types/ItemTypes';
import Button from '../../common/Button';
import InventoryItemCard from './InventoryItemCard';

interface SellItemPopupProps {
    item: Item;
    onClose: () => void;
    onInstantSell: () => void;
    onListForSale: (price: number) => void;
}

const SellItemPopup: React.FC<SellItemPopupProps> = ({
                                                         item,
                                                         onClose,
                                                         onInstantSell,
                                                         onListForSale
                                                     }) => {
    const [listingPrice, setListingPrice] = useState<number>(Math.round(item.price * 1.2)); // 20% markup by default
    const instantSellPrice = Math.round(item.price * 0.7); // 30% less for instant sell

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setListingPrice(value);
        }
    };

    const handleListForSale = () => {
        onListForSale(listingPrice);
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
                        <InventoryItemCard
                            item={item}
                            selected={false}
                        />
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
                                onClick={onInstantSell}
                                fullWidth={true}
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellItemPopup;