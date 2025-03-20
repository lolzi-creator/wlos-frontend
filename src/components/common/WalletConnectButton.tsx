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

    // For the disconnect state, we're going to use a single button that opens the wallet selection modal
    return (
        <>
            <WalletMultiButton className="wallet-adapter-button-trigger" />
            <Button
                text="CONNECT WALLET"
                color={color}
                onClick={() => document.querySelector<HTMLElement>('.wallet-adapter-button-trigger')?.click()}
                fullWidth={fullWidth}
            />
        </>
    );
};

export default WalletConnectButton;