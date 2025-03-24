// src/components/common/InsufficientFundsPopup.tsx
import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useWalletConnection } from '../../context/WalletConnectionProvider';
import '../../styles/InsufficientFundsPopup.css';

interface InsufficientFundsPopupProps {
    itemName: string;
    requiredAmount: number;
    onClose: () => void;
}

const InsufficientFundsPopup: React.FC<InsufficientFundsPopupProps> = ({
                                                                           itemName,
                                                                           requiredAmount,
                                                                           onClose
                                                                       }) => {
    const navigate = useNavigate();
    const { balance } = useWalletConnection();
    const amountNeeded = requiredAmount - balance.wlos;

    const handleGetWLOS = () => {
        navigate('/wlos-token');
        onClose();
    };

    return (
        <div className="popup-overlay">
            <div className="insufficient-funds-popup">
                <div className="popup-header">
                    <div className="warning-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 8V12" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 16H12.01" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="popup-title">INSUFFICIENT WLOS BALANCE</div>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                <div className="popup-content">
                    <div className="item-info">
                        <span className="purchase-text">To purchase </span>
                        <span className="item-name">{itemName}</span>
                    </div>

                    <div className="balance-container">
                        <div className="balance-row">
                            <div className="balance-label">Required:</div>
                            <div className="balance-value required">{requiredAmount} WLOS</div>
                        </div>
                        <div className="balance-row">
                            <div className="balance-label">Your Balance:</div>
                            <div className="balance-value current">{balance.wlos.toFixed(2)} WLOS</div>
                        </div>
                        <div className="balance-row needed">
                            <div className="balance-label">Needed:</div>
                            <div className="balance-value needed">{amountNeeded.toFixed(2)} WLOS</div>
                        </div>
                    </div>

                    <div className="glowing-line"></div>

                    <div className="message-section">
                        <p>You need to acquire more WLOS tokens to complete this purchase.</p>
                    </div>
                </div>

                <div className="popup-actions">
                    <Button
                        text="CANCEL"
                        color="purple"
                        onClick={onClose}
                    />
                    <Button
                        text="GET WLOS"
                        color="purple"
                        onClick={handleGetWLOS}
                    />
                </div>
            </div>
        </div>
    );
};

export default InsufficientFundsPopup;