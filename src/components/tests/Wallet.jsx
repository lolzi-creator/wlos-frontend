import React from 'react';
import { useWalletConnection } from '../../context/WalletConnectionProvider';
import Button from '../common/Button';

const WalletTest = () => {
    const {
        isConnected,
        walletAddress,
        balance,
        assets,
        isLoading,
        error,
        refreshWallet
    } = useWalletConnection();

    return (
        <div className="wallet-test p-4 border border-purple-500 rounded-lg bg-dark-blue-light">
            <h3 className="text-xl text-purple-text mb-4">Wallet Connection Status</h3>

            {isLoading && <div className="mb-2 text-cyan-text">Loading...</div>}

            {error && (
                <div className="mb-2 p-2 bg-red-900/20 border border-red-500 rounded text-red-500">
                    Error: {error}
                </div>
            )}

            <div className="mb-4">
                <p><span className="text-gray-400">Connection:</span> {isConnected ? <span className="text-green-text">Connected</span> : <span className="text-red-500">Disconnected</span>}</p>
                {isConnected && (
                    <>
                        <p><span className="text-gray-400">Address:</span> {walletAddress.substring(0, 4)}...{walletAddress.substring(walletAddress.length - 4)}</p>
                        <p><span className="text-gray-400">Balance:</span> {balance.sol.toFixed(4)} SOL / {balance.wlos.toFixed(2)} WLOS (${balance.usd.toFixed(2)})</p>
                    </>
                )}
            </div>

            {isConnected && (
                <>
                    <div className="mb-4">
                        <h4 className="text-lg text-yellow-text mb-2">Your Assets</h4>
                        <p><span className="text-gray-400">Heroes:</span> {assets.heroes.length}</p>
                        <p><span className="text-gray-400">Farmers:</span> {assets.farmers.length}</p>
                        <p><span className="text-gray-400">Items:</span> {assets.items.length}</p>
                    </div>

                    <Button
                        text={isLoading ? "REFRESHING..." : "REFRESH DATA"}
                        color="cyan"
                        onClick={refreshWallet}
                        disabled={isLoading}
                    />
                </>
            )}
        </div>
    );
};

export default WalletTest;