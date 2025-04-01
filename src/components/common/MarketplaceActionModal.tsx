import React, { useState, useEffect } from 'react';
import Button from './Button';
import '../../styles/components/MarketplaceActionModal.css';
import { Rarity } from '../../types/ItemTypes';

// Define the different action types we can perform
export type MarketplaceActionType = 
    'list' |       // List an item on the marketplace
    'cancel' |     // Cancel a listing
    'changePrice' | // Change the price of a listing
    'buy' |        // Buy an item
    'sellNow';     // Instant sell an item (for less money)

interface MarketplaceActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    actionType: MarketplaceActionType;
    assetName: string;
    assetType: 'item' | 'hero' | 'farmer';
    assetRarity: Rarity;
    assetImage?: string;
    currentPrice?: number;
    estimatedValue?: number;
    onConfirm: (price?: number, instantSell?: boolean) => void;
    isProcessing: boolean;
}

const MarketplaceActionModal: React.FC<MarketplaceActionModalProps> = ({
    isOpen,
    onClose,
    actionType,
    assetName,
    assetType,
    assetRarity,
    assetImage,
    currentPrice,
    estimatedValue,
    onConfirm,
    isProcessing
}) => {
    const [price, setPrice] = useState<number | undefined>(
        actionType === 'changePrice' ? currentPrice : estimatedValue
    );
    const [instantSell, setInstantSell] = useState<boolean>(false);
    const [inputError, setInputError] = useState<string | null>(null);
    
    // Calculate fees and total amounts
    const marketplaceFee = price ? Math.round(price * 0.05) : 0; // 5% marketplace fee
    const instantSellPrice = estimatedValue ? Math.round(estimatedValue * 0.8) : 0; // 20% discount for instant sell
    
    // Reset price when modal opens or action changes
    useEffect(() => {
        if (actionType === 'changePrice') {
            setPrice(currentPrice);
        } else if (actionType === 'list') {
            setPrice(estimatedValue);
        } else if (actionType === 'sellNow') {
            setPrice(instantSellPrice);
        }
        setInputError(null);
        setInstantSell(false);
    }, [isOpen, actionType, currentPrice, estimatedValue, instantSellPrice]);
    
    if (!isOpen) return null;
    
    const handleSubmit = () => {
        // For sellNow, don't need to validate price as it's fixed
        if (actionType === 'sellNow') {
            onConfirm(instantSellPrice, true);
            return;
        }
        
        // For other actions that need price validation
        if ((actionType === 'list' || actionType === 'changePrice') && (!price || price <= 0)) {
            setInputError('Please enter a valid price greater than 0');
            return;
        }
        
        if (actionType === 'cancel') {
            onConfirm();
        } else if (actionType === 'buy') {
            onConfirm(currentPrice);
        } else {
            onConfirm(price, instantSell);
        }
    };
    
    // Generate title based on action type
    const getModalTitle = () => {
        switch (actionType) {
            case 'list': return `LIST ${assetName}`;
            case 'changePrice': return `UPDATE PRICE`;
            case 'cancel': return `CANCEL LISTING`;
            case 'buy': return `PURCHASE ${assetName}`;
            case 'sellNow': return `INSTANT SELL`;
            default: return 'MARKETPLACE ACTION';
        }
    };
    
    // Generate confirmation button text based on action type
    const getConfirmButtonText = () => {
        switch (actionType) {
            case 'list': return 'LIST FOR SALE';
            case 'changePrice': return 'UPDATE PRICE';
            case 'cancel': return 'CANCEL LISTING';
            case 'buy': return 'CONFIRM PURCHASE';
            case 'sellNow': return 'SELL NOW';
            default: return 'CONFIRM';
        }
    };
    
    // Generate color for rarity
    const getRarityColor = (rarity: Rarity) => {
        switch (rarity) {
            case 'common': return 'rgba(178, 190, 197, 0.7)';
            case 'uncommon': return 'rgba(0, 230, 118, 0.7)';
            case 'rare': return 'rgba(0, 163, 255, 0.7)';
            case 'epic': return 'rgba(176, 38, 255, 0.7)';
            case 'legendary': return 'rgba(255, 184, 0, 0.7)';
            default: return 'rgba(178, 190, 197, 0.7)';
        }
    };
    
    // Get type icon based on asset type
    const getTypeIcon = () => {
        switch (assetType) {
            case 'hero': return '⚔️';
            case 'farmer': return '🌾';
            case 'item': return '🔮';
            default: return '📦';
        }
    };
    
    return (
        <div className="marketplace-action-modal-overlay">
            <div className="marketplace-action-modal">
                <button className="modal-close-btn" onClick={onClose}>×</button>
                
                <h2 className="modal-title">{getModalTitle()}</h2>
                
                <div className="modal-content">
                    <div className="asset-preview">
                        <div className="asset-image-container" style={{ borderColor: getRarityColor(assetRarity) }}>
                            <img 
                                src={assetImage || `/images/placeholder-${assetType}.png`} 
                                alt={assetName} 
                                className="asset-image" 
                            />
                        </div>
                        <div className="asset-details">
                            <h3 className="asset-name">{assetName}</h3>
                            <p className="asset-type">{assetType.toUpperCase()} {getTypeIcon()}</p>
                            <p className="asset-rarity" style={{ color: getRarityColor(assetRarity) }}>
                                {assetRarity.toUpperCase()}
                            </p>
                        </div>
                    </div>
                    
                    {(actionType === 'list') && (
                        <>
                            <div className="price-input-container">
                                <label htmlFor="price-input">SET YOUR PRICE:</label>
                                <div className="price-input-wrapper">
                                    <input
                                        id="price-input"
                                        type="number"
                                        value={price || ''}
                                        onChange={(e) => {
                                            const newPrice = e.target.value === '' ? undefined : Number(e.target.value);
                                            setPrice(newPrice);
                                            setInputError(null);
                                        }}
                                        placeholder="Enter price"
                                        disabled={isProcessing}
                                    />
                                    <span className="currency-label">WLO</span>
                                </div>
                                {inputError && <p className="error-message">{inputError}</p>}
                            </div>
                            
                            {estimatedValue && (
                                <div className="price-comparison">
                                    <div className="estimate-info">
                                        <span>ESTIMATED VALUE:</span>
                                        <span className="estimate-value">{estimatedValue.toLocaleString()} WLO</span>
                                    </div>
                                </div>
                            )}
                            
                            <div className="fee-info">
                                <div className="fee-row">
                                    <span>MARKETPLACE FEE (5%):</span>
                                    <span>-{marketplaceFee.toLocaleString()} WLO</span>
                                </div>
                                <div className="fee-row total">
                                    <span>YOU'LL RECEIVE:</span>
                                    <span>{price ? (price - marketplaceFee).toLocaleString() : 0} WLO</span>
                                </div>
                            </div>
                        </>
                    )}
                    
                    {actionType === 'sellNow' && (
                        <>
                            <div className="instant-sell-info">
                                <p className="instant-sell-description">
                                    Sell your asset instantly at 80% of market value.
                                    No waiting for buyers, immediate payment!
                                </p>
                                
                                <div className="price-comparison">
                                    <div className="estimate-info">
                                        <span>ESTIMATED VALUE:</span>
                                        <span className="estimate-value">{estimatedValue?.toLocaleString()} WLO</span>
                                    </div>
                                </div>
                                
                                <div className="fee-info">
                                    <div className="fee-row">
                                        <span>INSTANT SELL DISCOUNT (20%):</span>
                                        <span>-{estimatedValue ? Math.round(estimatedValue * 0.2).toLocaleString() : 0} WLO</span>
                                    </div>
                                    <div className="fee-row total">
                                        <span>YOU'LL RECEIVE:</span>
                                        <span className="instant-sell-price">{instantSellPrice.toLocaleString()} WLO</span>
                                    </div>
                                </div>
                                
                                <div className="instant-sell-note">
                                    <strong>Note:</strong> This action is irreversible. The item will be permanently removed from your inventory.
                                    The server will verify that you own this item before completing the transaction.
                                    <br/><br/>
                                    <strong>About WLO Credits:</strong> Credits may not appear immediately in your wallet. 
                                    If you don't see your balance update right away, please wait a few moments and refresh the page.
                                </div>
                            </div>
                        </>
                    )}
                    
                    {actionType === 'changePrice' && (
                        <>
                            <div className="current-price-info">
                                <span>CURRENT PRICE:</span>
                                <span className="current-price-value">{currentPrice?.toLocaleString()} WLO</span>
                            </div>
                            
                            <div className="price-input-container">
                                <label htmlFor="price-input">NEW PRICE:</label>
                                <div className="price-input-wrapper">
                                    <input
                                        id="price-input"
                                        type="number"
                                        value={price || ''}
                                        onChange={(e) => {
                                            const newPrice = e.target.value === '' ? undefined : Number(e.target.value);
                                            setPrice(newPrice);
                                            setInputError(null);
                                        }}
                                        placeholder="Enter new price"
                                        disabled={isProcessing}
                                    />
                                    <span className="currency-label">WLO</span>
                                </div>
                                {inputError && <p className="error-message">{inputError}</p>}
                            </div>
                            
                            <div className="fee-info">
                                <div className="fee-row">
                                    <span>MARKETPLACE FEE (5%):</span>
                                    <span>-{marketplaceFee.toLocaleString()} WLO</span>
                                </div>
                                <div className="fee-row total">
                                    <span>YOU'LL RECEIVE:</span>
                                    <span>{price ? (price - marketplaceFee).toLocaleString() : 0} WLO</span>
                                </div>
                            </div>
                        </>
                    )}
                    
                    {actionType === 'cancel' && (
                        <div className="cancel-listing-info">
                            <p>Are you sure you want to cancel this listing? Your item will be returned to your inventory.</p>
                            
                            {currentPrice && (
                                <div className="current-price-info">
                                    <span>CURRENT LISTING PRICE:</span>
                                    <span className="current-price-value">{currentPrice.toLocaleString()} WLO</span>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {actionType === 'buy' && (
                        <div className="buy-info">
                            <div className="price-info">
                                <span>PRICE:</span>
                                <span className="price-value">{currentPrice?.toLocaleString()} WLO</span>
                            </div>
                            
                            <p className="buy-confirmation">
                                Do you want to buy this {assetType} for {currentPrice?.toLocaleString()} WLO?
                                The item will be added to your inventory immediately after purchase.
                            </p>
                        </div>
                    )}
                    
                    <div className="modal-actions">
                        <Button 
                            text="CANCEL" 
                            color="transparent"
                            onClick={onClose}
                            disabled={isProcessing}
                        />
                        <Button 
                            text={isProcessing ? "PROCESSING..." : getConfirmButtonText()} 
                            color="cyan"
                            onClick={handleSubmit}
                            disabled={isProcessing}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketplaceActionModal; 