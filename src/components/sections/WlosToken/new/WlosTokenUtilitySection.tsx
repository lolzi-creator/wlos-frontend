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
            title: "In-Game Currency",
            description: "WLOS tokens are the primary currency in the Warlords ecosystem, used for purchasing items, heroes, and other in-game assets.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
                    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
                </svg>
            )
        },
        {
            title: "Staking Rewards",
            description: "Stake your WLOS tokens to earn passive income through staking rewards, with up to 25% APY depending on the staking pool and duration.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 22V15M5 15L2 18M5 15L8 18M19 22V15M19 15L16 18M19 15L22 18M19 9V2M19 2L16 5M19 2L22 5M5 9V2M5 2L2 5M5 2L8 5M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Governance Rights",
            description: "WLOS token holders can participate in governance decisions, voting on key ecosystem developments and future directions.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Exclusive Access",
            description: "Holding WLOS tokens grants access to exclusive content, special events, and limited-edition NFTs in the Warlords ecosystem.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8H15.01M7 16V11C7 7.68629 9.68629 5 13 5C16.3137 5 19 7.68629 19 11V16M3 16V11C3 5.47715 7.47715 1 13 1C18.5228 1 23 5.47715 23 11V16M3 16H7M3 16H1M7 16H19M19 16H23M23 16V22H1V16H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Battle Rewards",
            description: "Earn WLOS tokens by participating in battles, tournaments, and completing quests throughout the Warlords universe.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15H8M17 7L15 9M7 7L9 9M12 7V9M8 13H16C17.1046 13 18 12.1046 18 11V7C18 5.89543 17.1046 5 16 5H8C6.89543 5 6 5.89543 6 7V11C6 12.1046 6.89543 13 8 13ZM13.5 13V17C13.5 18.1046 12.6046 19 11.5 19H11C9.89543 19 9 18.1046 9 17V13H13.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Marketplace Transactions",
            description: "Use WLOS tokens to buy, sell, and trade items, heroes, and other assets on the Warlords marketplace with reduced transaction fees.",
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
                <h2 className="section-title">Token <span className="gradient-text">Utility</span></h2>
                <p className="section-description">
                    WLOS token is the foundation of the Warlords ecosystem, powering all in-game activities and providing 
                    real value to players through multiple utility functions.
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
                <a href="/docs/tokenomics" className="link-button">
                    <span>Read the full tokenomics</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.66667 11.3333L11.3333 4.66667M11.3333 4.66667H5.33333M11.3333 4.66667V10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default WlosTokenUtilitySection; 