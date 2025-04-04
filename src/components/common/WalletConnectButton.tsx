import React, { useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Button from './Button';

interface WalletConnectButtonProps {
    color?: 'purple' | 'green' | 'yellow' | 'blue' | 'cyan';
    fullWidth?: boolean;
    customStyle?: boolean; // Use this to toggle between custom UI and default UI
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
                                                                     color = 'purple',
                                                                     fullWidth = false,
                                                                     customStyle = true
                                                                 }) => {
    const { wallet, publicKey, disconnect, connected } = useWallet();

    // Handle disconnect
    const handleDisconnect = useCallback(async () => {
        if (disconnect) {
            await disconnect();
        }
    }, [disconnect]);

    // If not using custom style, return the default Solana wallet button
    if (!customStyle) {
        return <WalletMultiButton />;
    }

    // Custom UI that matches your design
    if (connected && publicKey) {
        return (
            <Button
                text={`${wallet?.adapter.name || 'WALLET'} • ${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`}
                color={color}
                onClick={handleDisconnect}
                fullWidth={fullWidth}
            />
        );
    }

    // Get color classes
    let colorClasses = '';
    switch (color) {
        case 'purple':
            colorClasses = 'bg-purple-glow border-purple hover:bg-purple-glow-intense';
            break;
        case 'green':
            colorClasses = 'bg-green-glow border-green hover:bg-green-glow-intense';
            break;
        case 'yellow':
            colorClasses = 'bg-yellow-glow border-yellow hover:bg-yellow-glow-intense';
            break;
        case 'blue':
            colorClasses = 'bg-blue-glow border-blue hover:bg-blue-glow-intense';
            break;
        case 'cyan':
            colorClasses = 'bg-cyan-glow border-cyan hover:bg-cyan-glow-intense';
            break;
        default:
            colorClasses = 'bg-purple-glow border-purple hover:bg-purple-glow-intense';
    }

    // For the disconnect state, we're going to use a single button that opens the wallet selection modal
    return (
        <>
            <WalletMultiButton className="wallet-adapter-button-trigger" />
            <button
                className={`futuristic-button ${colorClasses} ${fullWidth ? 'w-full' : ''}`}
                onClick={() => document.querySelector<HTMLElement>('.wallet-adapter-button-trigger')?.click()}
            >
                <span className="button-text-wrapper">CONNECT WALLET</span>
                <span className="button-highlight"></span>
            </button>
        </>
    );
};

export default WalletConnectButton;