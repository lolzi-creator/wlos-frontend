/*
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Button from './Button';

interface WalletConnectButtonProps {
    color?: 'purple' | 'green' | 'yellow' | 'blue' | 'cyan';
    fullWidth?: boolean;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
                                                                     color = 'purple',
                                                                     fullWidth = false
                                                                 }) => {
    const { wallet, connected } = useWallet();

    // If using the default UI
    if (process.env.REACT_APP_USE_DEFAULT_WALLET_UI === 'true') {
        return <WalletMultiButton />;
    }

    // Custom UI that matches your design
    return (
        <div className="custom-wallet-button">
            {connected ? (
                <Button
                    text={`${wallet?.adapter.name.toUpperCase()} • ${wallet?.adapter.publicKey?.toString().slice(0, 4)}...${wallet?.adapter.publicKey?.toString().slice(-4)}`}
                    color={color}
                    onClick={() => {}}
                    fullWidth={fullWidth}
                />
            ) : (
                <Button
                    text="CONNECT WALLET"
                    color={color}
                    onClick={() => (document.querySelector('.wallet-adapter-modal-trigger') as HTMLElement)?.click()}
                    fullWidth={fullWidth}
                />
            )}
        </div>
    );
};

export default WalletConnectButton;

*/
