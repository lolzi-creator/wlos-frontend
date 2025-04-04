import React, { useState, useEffect, useRef } from 'react';
import '../../../../styles/modules/wlostoken/new/WlosTokenStatsSection.css';

interface StatItem {
    title: string;
    value: string;
    icon: React.ReactNode;
    description: string;
}

const WlosTokenStatsSection: React.FC = () => {
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
    
    const stats: StatItem[] = [
        {
            title: "Current Price",
            value: "$0.0547",
            description: "Market price of WLOS today",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 8.5C14.315 7.81501 13.1087 7.33855 12 7.30872M9 15C9.64448 15.8593 10.8428 16.3494 12 16.391M12 7.30872C10.6809 7.27322 9.5 7.86998 9.5 9.50001C9.5 12.5 15 11 15 14C15 15.711 13.5362 16.4462 12 16.391M12 7.30872V5.5M12 16.391V18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Market Cap",
            value: "$54.7M",
            description: "Total market value of WLOS tokens",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 22H22M12 2V18M12 18L18 12M12 18L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Staking APY",
            value: "Up to 25%",
            description: "Annual rewards for staking",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Total Supply",
            value: "1 Billion",
            description: "Maximum supply of WLOS tokens",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 3H21M21 3V8M21 3L13 11M8 21H3M3 21V16M3 21L11 13M19 9V2M5 9V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        }
    ];
    
    return (
        <div className={`wlostoken-stats-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="section-header">
                <h2 className="section-title">WLOS <span className="gradient-text">Stats</span></h2>
                <p className="section-description">
                    Key information about the WLOS token
                </p>
            </div>
            
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div 
                        className="stat-card" 
                        key={index}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="stat-header">
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-title">{stat.title}</div>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-description">{stat.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WlosTokenStatsSection; 