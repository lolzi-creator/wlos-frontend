import React, { useState, useEffect } from 'react';
import Button from '../../../common/Button';
import { useWalletConnection } from '../../../../context/WalletConnectionProvider';
import WalletConnectButton from '../../../common/WalletConnectButton';
import '../../../../styles/modules/staking/new/StakingHeroSection.css';

export const StakingHeroSection: React.FC = () => {
    const { isConnected } = useWalletConnection();
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, color: string, delay: number }>>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Generate particles on component mount
    useEffect(() => {
        const colors = ['#9945FF', '#14F195', '#FFB800'];
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: Math.random() * 5
        }));
        
        setParticles(newParticles);
        
        // Set loaded state after a short delay for animations
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 500);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="staking-hero-section">
            {/* Background Elements */}
            <div className="hero-bg">
                <div className="hero-grid"></div>
                <div className="hero-circuit"></div>
                <div className="hero-glow"></div>
                
                {/* Energy orbs */}
                <div className="energy-orb green-orb"></div>
                <div className="energy-orb purple-orb"></div>
                
                {/* Scanning effect */}
                <div className="scan-line"></div>
                
                {/* Animated particles */}
                <div className="particles-container">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="particle"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                backgroundColor: particle.color,
                                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                                animationDelay: `${particle.delay}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="hero-content">
                <div className={`hero-text-container ${isLoaded ? 'loaded' : ''}`}>
                    <div className="digital-code">SYSTEM::INITIALIZING...WARLORDS_STAKING_MATRIX_V1.8.3</div>
                    
                    <div className="accent-line top-left"></div>
                    <div className="accent-line bottom-right"></div>
                    
                    <h2 className="hero-title">QUANTUM STAKING PORTAL</h2>
                    <p className="hero-subtitle">STAKE | EARN | BOOST YOUR WARLORD POWERS</p>
                    
                    <div className="apy-indicator">
                        <div className="apy-value">UP TO 25.7% APY</div>
                        <div className="apy-progress">
                            <div className="progress-bar"></div>
                        </div>
                    </div>
                    
                    <div className="hero-buttons-container">
                        {isConnected ? (
                            <Button
                                text="STAKE NOW"
                                color="green"
                                onClick={() => console.log('Staking initialized')}
                            />
                        ) : (
                            <WalletConnectButton color="green" />
                        )}
                        
                        <Button
                            text="LEARN MORE"
                            color="transparent"
                            onClick={() => console.log('Learn more about staking')}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StakingHeroSection; 