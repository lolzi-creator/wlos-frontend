import React from 'react';
import Layout from '../../components/layout/Layout';
import '../../styles/modules/wlostoken/new/WlosTokenPage.css';

const WlosTokenPage: React.FC = () => {
  return (
    <Layout>
      <div className="token-landing">
        {/* Hero Section */}
        <section className="token-section hero">
          <h1 className="token-title">WLOS Token</h1>
          <p className="token-subtitle">The backbone of the War Legends ecosystem, powering next-generation gaming experiences</p>
          
          <div className="token-stats">
            <div className="token-stat">
              <div className="stat-value">$0.873</div>
              <div className="stat-label">Current Price</div>
            </div>
            <div className="token-stat">
              <div className="stat-value">$86.2M</div>
              <div className="stat-label">Market Cap</div>
            </div>
            <div className="token-stat">
              <div className="stat-value">100M</div>
              <div className="stat-label">Total Supply</div>
            </div>
          </div>
          
          <div className="token-buttons">
            <a href="#" className="token-button primary">Buy WLOS</a>
            <a href="#" className="token-button secondary">View on Explorer</a>
          </div>
        </section>
        
        {/* About Section */}
        <section className="token-section about">
          <div className="token-info">
            <h2 className="section-title">What is WLOS?</h2>
            <p className="token-description">
              WLOS is the native utility token of the War Legends ecosystem. It powers all in-game transactions, 
              governance decisions, staking rewards, and NFT marketplace operations.
            </p>
            <p className="token-description">
              With a fixed supply of 100 million tokens, WLOS is designed to be deflationary, ensuring 
              long-term value for holders while fueling the growth of our gaming ecosystem.
            </p>
          </div>
          <div className="token-visual">
            <table>
              <tbody>
                <tr>
                  <th>Token Standard</th>
                  <td>ERC-20</td>
                </tr>
                <tr>
                  <th>Total Supply</th>
                  <td>100,000,000 WLOS</td>
                </tr>
                <tr>
                  <th>Circulating Supply</th>
                  <td>64,500,000 WLOS</td>
                </tr>
                <tr>
                  <th>Token Distribution</th>
                  <td>
                    35% Gameplay Rewards<br />
                    20% Staking & Liquidity<br />
                    15% Team & Advisors<br />
                    10% Strategic Reserve<br />
                    10% Marketing<br />
                    10% Community
                  </td>
                </tr>
                <tr>
                  <th>Initial Launch</th>
                  <td>May 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="token-section features">
          <h2 className="section-title" style={{ textAlign: 'center' }}>WLOS Token Utility</h2>
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 30px' }}>
            WLOS powers the entire War Legends ecosystem with multiple use cases
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3 className="feature-title">Gameplay Access</h3>
              <p>Access premium gaming content, participate in special events, and unlock exclusive game modes with WLOS tokens.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3 className="feature-title">Governance Rights</h3>
              <p>Vote on key ecosystem decisions, game updates, and protocol changes based on your token holdings.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Staking Rewards</h3>
              <p>Stake your WLOS tokens to earn passive rewards with APY up to 24% based on lock-up period.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🖼️</div>
              <h3 className="feature-title">NFT Marketplace</h3>
              <p>Buy, sell, and trade in-game assets as NFTs with reduced fees when using WLOS tokens.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-title">Play-to-Earn</h3>
              <p>Earn WLOS tokens through gameplay achievements, tournament victories, and community contributions.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💱</div>
              <h3 className="feature-title">Liquidity Provision</h3>
              <p>Provide liquidity to WLOS trading pairs and earn a share of trading fees plus additional incentives.</p>
            </div>
          </div>
        </section>
        
        {/* Exchanges Section */}
        <section className="token-section exchanges">
          <h2 className="section-title">Available On</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 30px' }}>
            WLOS is currently listed on several major cryptocurrency exchanges
          </p>
          
          <div className="exchange-list">
            <div className="exchange-item">
              <img src="/images/exchanges/binance.png" alt="Binance" className="exchange-logo" />
            </div>
            <div className="exchange-item">
              <img src="/images/exchanges/kucoin.png" alt="KuCoin" className="exchange-logo" />
            </div>
            <div className="exchange-item">
              <img src="/images/exchanges/gate.png" alt="Gate.io" className="exchange-logo" />
            </div>
            <div className="exchange-item">
              <img src="/images/exchanges/uniswap.png" alt="Uniswap" className="exchange-logo" />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="token-section cta">
          <h2 className="cta-title">Ready to Join the War Legends Ecosystem?</h2>
          <p className="cta-text">
            Get started with WLOS tokens today and become part of our thriving gaming community.
          </p>
          
          <div className="token-buttons">
            <a href="#" className="token-button white">Buy WLOS Now</a>
            <a href="#" className="token-button outline-white">Learn More</a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default WlosTokenPage; 