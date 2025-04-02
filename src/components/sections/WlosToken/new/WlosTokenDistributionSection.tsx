import React, { useState, useEffect, useRef } from 'react';
import '../../../../styles/modules/wlostoken/new/WlosTokenDistributionSection.css';

interface AllocationCategory {
    name: string;
    percentage: number;
    color: string;
    description: string;
}

const WlosTokenDistributionSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    
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

    const tokenAllocations: AllocationCategory[] = [
        {
            name: "Ecosystem Fund",
            percentage: 30,
            color: "#9945FF",
            description: "Allocated for ecosystem development, grants, and partnerships to expand the Warlords universe."
        },
        {
            name: "Staking Rewards",
            percentage: 25,
            color: "#B365FF",
            description: "Dedicated to rewarding token holders who stake their WLOS, providing incentives for long-term holding."
        },
        {
            name: "Play-to-Earn",
            percentage: 20,
            color: "#C98FFF",
            description: "Rewards distributed to players through gameplay, battles, quests, and tournaments."
        },
        {
            name: "Team & Advisors",
            percentage: 15,
            color: "#E0BFFF",
            description: "Allocated to the team and advisors with appropriate vesting schedules to ensure long-term alignment."
        },
        {
            name: "Community Treasury",
            percentage: 10,
            color: "#F2E4FF",
            description: "Reserved for community initiatives, governance proposals, and future development needs."
        }
    ];

    const handleCategoryClick = (index: number) => {
        setSelectedCategory(index);
    };

    const renderDistributionChart = () => {
        let startPercentage = 0;
        
        return tokenAllocations.map((allocation, index) => {
            const slice = (
                <div 
                    key={index}
                    className={`chart-slice ${selectedCategory === index ? 'selected' : ''}`}
                    style={{
                        backgroundColor: allocation.color,
                        clipPath: `conic-gradient(from ${startPercentage}deg, ${allocation.color} 0deg, ${allocation.color} ${allocation.percentage * 3.6}deg, transparent ${allocation.percentage * 3.6}deg)`,
                    }}
                    onClick={() => handleCategoryClick(index)}
                />
            );
            
            startPercentage += allocation.percentage * 3.6;
            return slice;
        });
    };

    return (
        <div className={`wlostoken-distribution-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="section-header">
                <h2 className="section-title">Token <span className="gradient-text">Distribution</span></h2>
                <p className="section-description">
                    The WLOS token has a maximum supply of 1 billion tokens distributed across various categories 
                    to ensure sustainable ecosystem growth and alignment of incentives.
                </p>
            </div>
            
            <div className="distribution-container">
                <div className="chart-container">
                    <div className="distribution-chart" ref={chartRef}>
                        {renderDistributionChart()}
                        <div className="chart-inner">
                            <div className="chart-value">
                                <span className="percentage">{tokenAllocations[selectedCategory].percentage}%</span>
                                <span className="allocation-name">{tokenAllocations[selectedCategory].name}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="allocations-container">
                    <div className="allocations-list">
                        {tokenAllocations.map((allocation, index) => (
                            <div 
                                className={`allocation-item ${selectedCategory === index ? 'selected' : ''}`}
                                key={index}
                                onClick={() => handleCategoryClick(index)}
                            >
                                <div className="allocation-header">
                                    <div className="color-indicator" style={{ backgroundColor: allocation.color }}></div>
                                    <div className="allocation-name">{allocation.name}</div>
                                    <div className="allocation-percentage">{allocation.percentage}%</div>
                                </div>
                                {selectedCategory === index && (
                                    <div className="allocation-description">
                                        {allocation.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="distribution-details">
                <div className="details-card">
                    <div className="detail-item">
                        <div className="detail-label">Total Supply</div>
                        <div className="detail-value">1,000,000,000 WLOS</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-label">Initial Circulating Supply</div>
                        <div className="detail-value">320,000,000 WLOS</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-label">Vesting Schedule</div>
                        <div className="detail-value">4 years with quarterly unlocks</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WlosTokenDistributionSection; 