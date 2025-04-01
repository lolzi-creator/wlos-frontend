import React, { useState, useEffect } from 'react';
import Button from '../../../common/Button';
import '../../../../styles/modules/marketplace/new/MarketplaceHeroSection.css';

interface MarketplaceHeroSectionProps {
  onViewAll?: () => void;
}

const MarketplaceHeroSection: React.FC<MarketplaceHeroSectionProps> = ({ onViewAll }) => {
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, color: string, delay: number }>>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Market statistics - updated to match mockup
  const marketStats = {
    itemsListed: 8723,
    totalVolume: 5245890,
    averagePrice: 16420,
  };

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
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <img src="/images/icons/items-icon.svg" alt="Items" className="stat-icon-img" />
              </div>
              <div className="stat-content">
                <div className="stat-value">8.7k</div>
                <div className="stat-label">ITEMS<br />LISTED</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <img src="/images/icons/volume-icon.svg" alt="Volume" className="stat-icon-img" />
              </div>
              <div className="stat-content">
                <div className="stat-value">5.2M</div>
                <div className="stat-label">TOTAL<br />VOLUME</div>
              </div>
              <div className="stat-unit">WLO</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <img src="/images/icons/price-icon.svg" alt="Price" className="stat-icon-img" />
              </div>
              <div className="stat-content">
                <div className="stat-value">16.4k</div>
                <div className="stat-label">AVG<br />PRICE</div>
              </div>
              <div className="stat-unit">WLO</div>
            </div>
          </div>
          
          <div className="hero-buttons-container">
            <Button
              text="BROWSE MARKETPLACE"
              color="cyan"
              onClick={onViewAll || (() => console.log('Browse marketplace'))}
            />
            
            <Button
              text="LEARN MORE"
              color="transparent"
              onClick={() => console.log('Learn more about marketplace')}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceHeroSection; 