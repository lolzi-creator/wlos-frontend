import React, { useRef, useEffect, useState } from 'react';
import '../../../../styles/modules/marketplace/new/MarketplaceStatsSection.css';

interface MarketplaceStatsProps {
  // Add any props if needed
}

const MarketplaceStatsSection: React.FC<MarketplaceStatsProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sample stats data with trends
  const stats = [
    {
      id: 1,
      label: 'Total Trades',
      value: '348,921',
      trend: 'up',
      percentage: '12.4%',
      icon: '🔄',
      color: 'purple'
    },
    {
      id: 2,
      label: '24h Volume',
      value: '623,450 WLO',
      trend: 'up',
      percentage: '8.7%',
      icon: '📊',
      color: 'green'
    },
    {
      id: 3,
      label: 'Unique Sellers',
      value: '14,732',
      trend: 'up',
      percentage: '5.2%',
      icon: '👥',
      color: 'yellow'
    }
  ];

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

  return (
    <div className={`stats-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="stats-bg">
        <div className="stats-bg-glow"></div>
      </div>
      
      <div className="stats-banner">
        {stats.map((stat, index) => (
          <React.Fragment key={stat.id}>
            <div className={`stats-item ${stat.color}`}>
              <div className={`stats-icon ${stat.color}`}>{stat.icon}</div>
              <div className="stats-content">
                <div className="stats-value">{stat.value}</div>
                <div className="stats-label">{stat.label}</div>
              </div>
              <div className={`stats-trend ${stat.trend}`}>
                <span className="trend-arrow">{stat.trend === 'up' ? '↑' : '↓'}</span>
                <span className="trend-percentage">{stat.percentage}</span>
              </div>
            </div>
            {index < stats.length - 1 && <div className="stats-divider"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceStatsSection; 