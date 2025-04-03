import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';
import WalletConnectButton from '../../common/WalletConnectButton';
import '../../../styles/modules/home/HeroSection.css';

export const HeroSection: React.FC = () => {
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
        <section className="hero-section">
            {/* Background Elements */}
            <div className="hero-bg">
                <div className="hero-grid"></div>
                <div className="hero-circuit"></div>
                <div className="hero-glow"></div>
                
                {/* Energy orbs */}
                <div className="energy-orb purple-orb"></div>
                <div className="energy-orb green-orb"></div>
                
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
                <div className={`hero-text-container fullscreen ${isLoaded ? 'loaded' : ''}`}>
                    <div className="digital-code">SYSTEM::INITIALIZING...WARLORDS_NEURAL_MATRIX_V2.5.7</div>
                    
                    <h2 className="hero-title">BUILD YOUR WARLORD EMPIRE</h2>
                    <p className="hero-subtitle">BATTLE | STAKE | EARN BLOCKCHAIN REWARDS</p>
                    
                    <div className="hero-buttons-container">
                        <Button
                            text="START BATTLE"
                            color="purple"
                            onClick={() => console.log('Battle initialized')}
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