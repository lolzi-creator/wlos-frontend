import React, { useState, useEffect, useRef } from 'react';
import Button from '../../common/Button';
import { useWalletConnection } from '../../../context/WalletConnectionProvider';
import WalletConnectButton from '../../common/WalletConnectButton';
import '../../../styles/modules/home/HeroSection.css';
import { useNavigate } from 'react-router-dom';

export const HeroSection: React.FC = () => {
    const { isConnected } = useWalletConnection();
    const navigate = useNavigate();
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, color: string, delay: number }>>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Set a future date 25 days from now for the countdown
    const targetDate = useRef(new Date(Date.now() + 25 * 24 * 60 * 60 * 1000));

    // Initialize countdown on component mount
    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate.current.getTime() - now.getTime();
            
            if (diff <= 0) {
                // Countdown is over
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            setCountdown({ days, hours, minutes, seconds });
        };
        
        // Initial update
        updateCountdown();
        
        // Update every second
        intervalRef.current = setInterval(updateCountdown, 1000);
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

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
                    
                    {/* Pre-game phase banner */}
                    <div className="phase-banner">
                        <span className="phase-label">PRE-GAME PHASE COMING SOON</span>
                        <button 
                            className="roadmap-link" 
                            onClick={() => navigate('/roadmap')}
                        >
                            VIEW ROADMAP
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    
                    {/* Countdown Timer */}
                    <div className="countdown-container">
                        <div className="countdown-title">PRE-GAME PHASE LAUNCHES IN</div>
                        <div className="countdown-grid">
                            <div className="countdown-segment">
                                <span className="countdown-value">{countdown.days.toString().padStart(2, '0')}</span>
                                <span className="countdown-label">Days</span>
                            </div>
                            <span className="countdown-separator">:</span>
                            <div className="countdown-segment">
                                <span className="countdown-value">{countdown.hours.toString().padStart(2, '0')}</span>
                                <span className="countdown-label">Hours</span>
                            </div>
                            <span className="countdown-separator">:</span>
                            <div className="countdown-segment">
                                <span className="countdown-value">{countdown.minutes.toString().padStart(2, '0')}</span>
                                <span className="countdown-label">Minutes</span>
                            </div>
                            <span className="countdown-separator">:</span>
                            <div className="countdown-segment">
                                <span className="countdown-value">{countdown.seconds.toString().padStart(2, '0')}</span>
                                <span className="countdown-label">Seconds</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="hero-buttons-container">
                        <Button
                            text="START STAKING"
                            color="green"
                            onClick={() => {
                                navigate('/stake');
                                // Increase delay to give the page more time to load
                                setTimeout(() => {
                                    const poolsSection = document.getElementById('staking-pools');
                                    if (poolsSection) {
                                        poolsSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }, 500);
                            }}
                        />
                        
                        <Button
                            text="EXPLORE MARKETPLACE"
                            color="blue"
                            onClick={() => navigate('/marketplace')}
                        />
                        
                        <Button
                            text="BUY FARMER PACKS"
                            color="green"
                            onClick={() => navigate('/farmers#packs')}
                        />
                        
                        <Button
                            text="LEARN ABOUT WLOS"
                            color="yellow"
                            onClick={() => navigate('/wlos-token')}
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