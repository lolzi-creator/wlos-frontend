import React from 'react';
import Button from '../common/Button';

const HeroSection: React.FC = () => {
    return (
        <section className="hero-section">
            <div className="accent-line top-left"></div>
            <div className="accent-line bottom-right"></div>

            <div className="hero-content">
                <div>
                    <h2 className="hero-title glow-text">BUILD YOUR WARLORD EMPIRE</h2>
                    <p className="hero-subtitle">BATTLE | STAKE | EARN BLOCKCHAIN REWARDS</p>

                    <Button
                        text="START BATTLE"
                        color="purple"
                        onClick={() => console.log('Battle initialized')}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;