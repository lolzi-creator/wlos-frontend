// src/components/sections/Farmers/PackOpeningAnimation.tsx
import React, { useState } from 'react';
import { Farmer } from '../../../types/FarmerTypes';

interface PackOpeningAnimationProps {
    isOpen: boolean;
    onClose: () => void;
    revealedFarmer?: Farmer | null;
}

const PackOpeningAnimation: React.FC<PackOpeningAnimationProps> = ({
                                                                       isOpen,
                                                                       onClose,
                                                                       revealedFarmer
                                                                   }) => {
    // Simple animation state
    const [stage, setStage] = useState('initial');

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <div style={{
                width: '300px',
                height: '400px',
                backgroundColor: '#14F195',
                border: '3px solid white',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '20px'
            }}>
                {revealedFarmer ? (
                    <div>
                        <div>You got:</div>
                        <div style={{fontSize: '32px', marginTop: '20px'}}>{revealedFarmer.name}</div>
                        <div style={{marginTop: '10px'}}>{revealedFarmer.rarity.toUpperCase()}</div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>

            <button
                style={{
                    padding: '10px 30px',
                    backgroundColor: '#14F195',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '18px',
                    cursor: 'pointer'
                }}
                onClick={onClose}
            >
                CLOSE
            </button>
        </div>
    );
};

export default PackOpeningAnimation;