import React, { useState, useEffect, useRef } from 'react';
import '../../../../styles/modules/wlostoken/new/WlosTokenAcquisitionSection.css';

interface AcquisitionMethod {
    title: string;
    description: string;
    action: string;
    icon: React.ReactNode;
    link: string;
}

const WlosTokenAcquisitionSection: React.FC = () => {
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

    const acquisitionMethods: AcquisitionMethod[] = [
        {
            title: "Buy on Exchange",
            description: "Purchase WLOS tokens directly on supported exchanges like Binance, KuCoin, or Gate.io.",
            action: "Visit Exchange",
            link: "/exchanges",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H21M3 12H21M3 18H21M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Swap Tokens",
            description: "Swap other cryptocurrencies for WLOS tokens using our integrated DEX functionality.",
            action: "Swap Now",
            link: "/swap",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 16L3 12M3 12L7 8M3 12L21 12M17 8L21 12M21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Earn in Game",
            description: "Earn WLOS tokens through gameplay, battles, tournaments, and completing quests.",
            action: "Play Now",
            link: "/play",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.9998 15L12.9998 20L8.99976 9L19.9998 13L14.9998 15ZM14.9998 15L19.9998 20M7.99976 4L3.99976 8L4.99976 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Stake & Earn",
            description: "Stake your WLOS tokens in staking pools to earn passive rewards and additional tokens.",
            action: "Stake WLOS",
            link: "/staking",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        }
    ];

    return (
        <div className={`wlostoken-acquisition-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="section-header">
                <h2 className="section-title">Get <span className="gradient-text">WLOS</span> Tokens</h2>
                <p className="section-description">
                    There are multiple ways to acquire WLOS tokens in the Warlords ecosystem.
                </p>
            </div>
            
            <div className="acquisition-grid">
                {acquisitionMethods.map((method, index) => (
                    <div 
                        className="acquisition-card" 
                        key={index}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="acquisition-icon">{method.icon}</div>
                        <div className="acquisition-content">
                            <h3 className="acquisition-title">{method.title}</h3>
                            <p className="acquisition-description">{method.description}</p>
                        </div>
                        <a href={method.link} className="action-button">
                            <span>{method.action}</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1.33334L14.6667 8.00001L8 14.6667M1.33334 8.00001H14.6667H1.33334Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
            
            <div className="resources-container">
                <div className="resources-card">
                    <h3 className="resources-title">Resources</h3>
                    <div className="resources-links">
                        <a href="/docs/tokenomics" className="resource-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 12H16M8 8H16M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Tokenomics</span>
                        </a>
                        <a href="/docs/staking-guide" className="resource-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9V15M15 12H9M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Staking Guide</span>
                        </a>
                        <a href="/docs/token-utility" className="resource-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9M9 21C9 17.5 15 17 15 13C15 11 13.5 9 9 9M9 21V9M9 9V3M15 3H9M15 3C18.5 3 21 5.1 21 8.5C21 11.5 19 14 16.5 14M16.5 14C18 14 19 14.5 19 16C19 18 16 18 15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Token Utility</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WlosTokenAcquisitionSection; 