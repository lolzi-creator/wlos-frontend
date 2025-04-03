import React from 'react';
import Button from '../common/Button';
import { useWalletConnection } from '../../context/WalletConnectionProvider';
import WalletConnectButton from '../common/WalletConnectButton';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
    const { isConnected } = useWalletConnection();
    const navigate = useNavigate();

    const handleStakingClick = () => {
        navigate('/staking');
    };

    return (
        <section className="hero-section">
            <div className="accent-line top-left"></div>
            <div className="accent-line bottom-right"></div>

            <div className="hero-content">
                <div>
                    <h2 className="hero-title glow-text">BUILD YOUR WARLORD EMPIRE</h2>
                    <p className="hero-subtitle">BATTLE | STAKE | EARN BLOCKCHAIN REWARDS</p>

                    <div className="flex gap-4">
                        <Button
                            text="START STAKING"
                            color="purple"
                            onClick={handleStakingClick}
                        />

                        {!isConnected && (
                            <WalletConnectButton color="purple" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;