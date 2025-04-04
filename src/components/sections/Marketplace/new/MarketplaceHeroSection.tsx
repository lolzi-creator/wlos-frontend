import React, { useState, useEffect } from 'react';
import Button from '../../../common/Button';
import '../../../../styles/modules/marketplace/new/MarketplaceHeroSection.css';

interface MarketplaceHeroSectionProps {
  onViewAll?: () => void;
}

const MarketplaceHeroSection: React.FC<MarketplaceHeroSectionProps> = ({ onViewAll }) => {
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, color: string, delay: number }>>([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
    <section className="marketplace-hero-section">
      {/* Background Elements */}
      <div className="hero-bg">
        <div className="hero-grid"></div>
        <div className="hero-circuit"></div>
        <div className="hero-glow"></div>
        
        {/* Energy orbs */}
        <div className="energy-orb green-orb"></div>
        <div className="energy-orb purple-orb"></div>
        <div className="energy-orb yellow-orb"></div>
        
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
        <div className={`hero-text-container ${isLoaded ? 'loaded' : ''}`}>
          <div className="digital-code">SYSTEM::INITIALIZING...WARLORDS_MARKETPLACE_MATRIX_V2.4.7</div>
          
          <div className="accent-line top-left"></div>
          <div className="accent-line bottom-right"></div>
          
          <h2 className="hero-title">VIRTUAL MARKETPLACE</h2>
          <p className="hero-subtitle">TRADE | BUY | SELL RARE IN-GAME ASSETS</p>
          
          {/* Stats layout matching the screenshots */}
          <div className="marketplace-stats-container">
            <div className="hero-stat-card">
              <div className="hero-stat-icon">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <div className="icon-glow"></div>
              </div>
              <div className="hero-stat-info">
                <div className="hero-stat-value">8.7k</div>
                <div className="hero-stat-label">ITEMS LISTED</div>
              </div>
            </div>
            
            <div className="hero-stat-divider"></div>
            
            <div className="hero-stat-card">
              <div className="hero-stat-icon">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <div className="icon-glow"></div>
              </div>
              <div className="hero-stat-info">
                <div className="hero-stat-value">5.2M</div>
                <div className="hero-stat-label">TOTAL VOLUME</div>
              </div>
              <div className="hero-stat-unit">WLO</div>
            </div>
            
            <div className="hero-stat-divider"></div>
            
            <div className="hero-stat-card">
              <div className="hero-stat-icon">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <div className="icon-glow"></div>
              </div>
              <div className="hero-stat-info">
                <div className="hero-stat-value">16.4k</div>
                <div className="hero-stat-label">AVG PRICE</div>
              </div>
              <div className="hero-stat-unit">WLO</div>
            </div>
          </div>
          
          <div className="hero-buttons-container">
            <Button
              text="BROWSE MARKETPLACE"
              color="cyan"
              onClick={onViewAll || (() => {
                const itemsSection = document.getElementById('marketplace-items');
                if (itemsSection) {
                  itemsSection.scrollIntoView({ behavior: 'smooth' });
                }
              })}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceHeroSection; 