import React, { useEffect, useState, useRef } from 'react';
import '../../../styles/modules/home/StatsSection.css';

export const StatsSection: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="stats-section" ref={sectionRef}>
            <div className="stats-bg">
                <div className="stats-bg-glow"></div>
            </div>
            
            <div className={`stats-banner ${visible ? 'visible' : ''}`}>
                <div className="stats-banner-inner">
                    <div className="stats-item">
                        <div className="stats-icon purple">
                            <div className="icon-pulse"></div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" style={{fill: "#9945FF"}}/>
                                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" style={{fill: "#9945FF"}}/>
                            </svg>
                        </div>
                        <div className="stats-content">
                            <div className="stats-value">3,724+</div>
                            <div className="stats-label">NEURAL WARLORDS</div>
                        </div>
                        <div className="stats-trend purple">
                            <span className="trend-icon">↑</span>
                            <span>+124</span>
                        </div>
                    </div>
                    
                    <div className="stats-divider"></div>
                    
                    <div className="stats-item">
                        <div className="stats-icon green">
                            <div className="icon-pulse"></div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" style={{fill: "#14F195"}}/>
                            </svg>
                        </div>
                        <div className="stats-content">
                            <div className="stats-value">1,873+</div>
                            <div className="stats-label">QUANTUM BATTLES</div>
                        </div>
                        <div className="stats-trend green">
                            <span className="trend-icon">↑</span>
                            <span>+47%</span>
                        </div>
                    </div>
                    
                    <div className="stats-divider"></div>
                    
                    <div className="stats-item">
                        <div className="stats-icon yellow">
                            <div className="icon-pulse"></div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3L4 9V21H20V9L12 3ZM18 19H6V10L12 5.5L18 10V19Z" style={{fill: "#FFB800"}}/>
                                <path d="M10 11H14V19H10V11Z" style={{fill: "#FFB800"}}/>
                            </svg>
                        </div>
                        <div className="stats-content">
                            <div className="stats-value">45K+</div>
                            <div className="stats-label">SOL MATRIX</div>
                        </div>
                        <div className="stats-trend yellow">
                            <span className="trend-icon">↑</span>
                            <span>+2.1K</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection; 