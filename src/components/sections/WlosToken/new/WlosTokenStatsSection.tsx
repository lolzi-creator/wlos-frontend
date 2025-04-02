import React, { useState, useEffect, useRef } from 'react';
import '../../../../styles/modules/wlostoken/new/WlosTokenStatsSection.css';

interface StatItem {
    title: string;
    value: string;
    icon: React.ReactNode;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    description?: string;
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
            title: "Price",
            value: "$1.52",
            trend: "up",
            change: "+8.4%",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 8.5C14.315 7.81501 13.1087 7.33855 12 7.30872M9 15C9.64448 15.8593 10.8428 16.3494 12 16.391M12 7.30872C10.6809 7.27322 9.5 7.86998 9.5 9.50001C9.5 12.5 15 11 15 14C15 15.711 13.5362 16.4462 12 16.391M12 7.30872V5.5M12 16.391V18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Market Cap",
            value: "$21.8M",
            trend: "up",
            change: "+5.2%",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 22H22M12 2V18M12 18L18 12M12 18L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Volume",
            value: "$1.34M",
            trend: "up",
            change: "+12.4%",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Total Supply",
            value: "1B WLOS",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 3H21M21 3V8M21 3L13 11M8 21H3M3 21V16M3 21L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Circulating",
            value: "320M",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22L15 2M17 8L22 13L17 18M7 6L2 13L7 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Holders",
            value: "12,487",
            trend: "up",
            change: "+28%",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3 16.8 16.63 16.5 16.06M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3 7.2 16.63 7.5 16.06M7.5 16.06C8.0359 15.3982 8.8554 15 9.8 15H14.2C15.1446 15 15.9641 15.3982 16.5 16.06M7.5 16.06C7.19 16.63 7 17.3 7 18M16.5 16.06C16.8 16.63 17 17.3 17 18M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        }
    ];
    
    return (
        <div className={`wlostoken-stats-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="section-header">
                <h2 className="section-title">Token <span className="gradient-text">Metrics</span></h2>
                <p className="section-description">
                    Key statistics and metrics for the WLOS token ecosystem
                </p>
            </div>
            
            <div className="stats-content">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div 
                            className="stat-card" 
                            key={index}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-info">
                                <div className="stat-title">{stat.title}</div>
                                <div className="stat-value">{stat.value}</div>
                                {stat.change && (
                                    <div className={`stat-change ${stat.trend}`}>
                                        {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : ''}
                                        {stat.change}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WlosTokenStatsSection; 