import React, { useState, useEffect, useRef } from 'react';
import '../../../../styles/modules/wlostoken/new/WlosTokenUtilitySection.css';

interface UtilityFeature {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const WlosTokenUtilitySection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const utilityFeatures: UtilityFeature[] = [
        {
            title: "Buy In-Game Items",
            description: "Use WLOS to purchase items, heroes, and other in-game assets.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
                    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
                </svg>
            )
        },
        {
            title: "Earn Rewards",
            description: "Stake your WLOS tokens to earn passive income through staking rewards.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 22V15M5 15L2 18M5 15L8 18M19 22V15M19 15L16 18M19 15L22 18M19 9V2M19 2L16 5M19 2L22 5M5 9V2M5 2L2 5M5 2L8 5M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Trade NFTs",
            description: "Buy and sell NFTs on the Warlords marketplace with reduced transaction fees.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        }
    ];

    return (
        <div className={`wlostoken-utility-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="section-header">
                <h2 className="section-title">What Can You <span className="gradient-text">Do With WLOS</span></h2>
                <p className="section-description">
                    WLOS token powers the Warlords ecosystem with multiple uses
                </p>
            </div>

            <div className="utility-grid">
                {utilityFeatures.map((feature, index) => (
                    <div 
                        className="utility-card" 
                        key={index}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="utility-icon">{feature.icon}</div>
                        <div className="utility-content">
                            <h3 className="utility-title">{feature.title}</h3>
                            <p className="utility-description">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="utility-cta">
                <a href="/staking" className="button primary-button">
                    <span>Stake WLOS</span>
                </a>
                <a href="/marketplace" className="button secondary-button">
                    <span>Buy WLOS</span>
                </a>
            </div>
        </div>
    );
};

export default WlosTokenUtilitySection; 