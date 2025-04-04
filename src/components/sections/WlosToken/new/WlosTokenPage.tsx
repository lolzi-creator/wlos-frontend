import React, { useState } from 'react';
import Layout from '../../../layout/Layout';
import WalletConnectButton from '../../../../components/common/WalletConnectButton';
import { useWalletConnection } from '../../../../context/WalletConnectionProvider';
import '../../../../styles/modules/wlostoken/new/WlosTokenPage.css';

const WlosTokenPage: React.FC = () => {
  const { isConnected } = useWalletConnection();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Layout>
      <div className="wlos-token-page">
        {/* Background effects */}
        <div className="background-effects">
          <div className="bg-grid"></div>
          <div className="purple-orb"></div>
          <div className="blue-orb"></div>
          <div className="bg-particles"></div>
        </div>
        
        <div className="main-content">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">WLOS TOKEN</h1>
              <p className="hero-subtitle">
                The native utility token of War Legends ecosystem, powered by Solana
              </p>
              
              <div className="token-stats">
                <div className="token-stat-card">
                  <div className="stat-value">$0.15</div>
                  <div className="stat-label">Current Price</div>
                </div>
                <div className="token-stat-card">
                  <div className="stat-value">10B</div>
                  <div className="stat-label">Max Supply</div>
                </div>
                <div className="token-stat-card">
                  <div className="stat-value">$15M</div>
                  <div className="stat-label">Market Cap</div>
                </div>
              </div>
              
              <div className="hero-actions">
                <a href="#buy" className="button primary">Buy WLOS</a>
                <div className="button secondary">
                  <WalletConnectButton color="purple" />
                </div>
              </div>
            </div>
          </section>

          {/* Tabs Section */}
          <div className="page-tabs-container">
            <div className="page-tabs">
              <button 
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span className="tab-text">Overview</span>
                {activeTab === 'overview' && <div className="tab-indicator"></div>}
              </button>
              <button 
                className={`tab-button ${activeTab === 'utility' ? 'active' : ''}`}
                onClick={() => setActiveTab('utility')}
              >
                <span className="tab-text">Utility</span>
                {activeTab === 'utility' && <div className="tab-indicator"></div>}
              </button>
              <button 
                className={`tab-button ${activeTab === 'buy' ? 'active' : ''}`}
                onClick={() => setActiveTab('buy')}
              >
                <span className="tab-text">How to Buy</span>
                {activeTab === 'buy' && <div className="tab-indicator"></div>}
              </button>
              <button 
                className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                <span className="tab-text">FAQ</span>
                {activeTab === 'faq' && <div className="tab-indicator"></div>}
              </button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-content">
                <div className="content-section">
                  <div className="section-grid">
                    <div className="content-column">
                      <h2 className="section-title">What is WLOS?</h2>
                      <div className="accent-bar"></div>
                      <p className="section-text">
                        WLOS is the official currency of the War Legends universe. Built on Solana's lightning-fast blockchain, 
                        WLOS enables instant transactions with minimal fees.
                      </p>
                      <p className="section-text">
                        Whether you're purchasing in-game items, trading with other players, or staking for rewards, 
                        WLOS makes it simple - even if you're new to crypto.
                      </p>
                    </div>
                    <div className="token-details-card">
                      <div className="token-logo">
                        <img src="images/icons/wlos-token.png" alt="WLOS Token" width={120} height={120} />
                      </div>
                      <div className="token-specs">
                        <div className="spec-row">
                          <span className="spec-label">Network</span>
                          <span className="spec-value">Solana (SOL)</span>
                        </div>
                        <div className="spec-row">
                          <span className="spec-label">Token Type</span>
                          <span className="spec-value">SPL (Solana Program Library)</span>
                        </div>
                        <div className="spec-row">
                          <span className="spec-label">Transaction Speed</span>
                          <span className="spec-value">3,000+ TPS</span>
                        </div>
                        <div className="spec-row">
                          <span className="spec-label">Transaction Fee</span>
                          <span className="spec-value">~$0.00025 per tx</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Utility Tab */}
            {activeTab === 'utility' && (
              <div className="tab-content">
                <div className="content-section">
                  <h2 className="section-title">What Can I Do With WLOS?</h2>
                  <div className="accent-bar"></div>
                  
                  <div className="features-grid">
                    <div className="feature-card">
                      <div className="feature-icon">🎮</div>
                      <h3 className="feature-title">Play Games</h3>
                      <p className="feature-text">Access premium War Legends gameplay features and earn rewards through play.</p>
                    </div>
                    
                    <div className="feature-card">
                      <div className="feature-icon">🛒</div>
                      <h3 className="feature-title">Buy NFTs</h3>
                      <p className="feature-text">Purchase exclusive in-game items, characters, and land in our marketplace.</p>
                    </div>
                    
                    <div className="feature-card">
                      <div className="feature-icon">💰</div>
                      <h3 className="feature-title">Earn Rewards</h3>
                      <p className="feature-text">Stake your WLOS tokens to earn passive income while supporting the ecosystem.</p>
                    </div>
                    
                    <div className="feature-card">
                      <div className="feature-icon">🗳️</div>
                      <h3 className="feature-title">Vote</h3>
                      <p className="feature-text">Participate in governance decisions that shape the future of War Legends.</p>
                    </div>
                    
                    <div className="feature-card">
                      <div className="feature-icon">💱</div>
                      <h3 className="feature-title">Trade</h3>
                      <p className="feature-text">Exchange WLOS with other cryptocurrencies on major exchanges.</p>
                    </div>
                    
                    <div className="feature-card">
                      <div className="feature-icon">🔄</div>
                      <h3 className="feature-title">Liquid Staking</h3>
                      <p className="feature-text">Provide liquidity to earn additional yield while holding your tokens.</p>
                    </div>
                  </div>

                  <div className="content-section mt-5">
                    <h2 className="section-title">Available On</h2>
                    <div className="accent-bar"></div>
                    
                    <div className="exchange-list">
                      <a href="https://raydium.io/swap" target="_blank" rel="noopener noreferrer" className="exchange-item">
                        <img src="/images/exchanges/raydium.png" alt="Raydium" className="exchange-logo" />
                      </a>
                      <a href="https://jup.ag" target="_blank" rel="noopener noreferrer" className="exchange-item">
                        <img src="/images/exchanges/jupiter.png" alt="Jupiter" className="exchange-logo" />
                      </a>
                      <a href="https://www.orca.so" target="_blank" rel="noopener noreferrer" className="exchange-item">
                        <img src="/images/exchanges/orca.png" alt="Orca" className="exchange-logo" />
                      </a>
                      <a href="https://www.gate.io" target="_blank" rel="noopener noreferrer" className="exchange-item">
                        <img src="/images/exchanges/gate.png" alt="Gate.io" className="exchange-logo" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Buy Tab */}
            {activeTab === 'buy' && (
              <div className="tab-content" id="buy">
                <div className="content-section">
                  <h2 className="section-title">How to Buy WLOS</h2>
                  <div className="accent-bar"></div>
                  
                  {!isConnected ? (
                    <div className="buy-options">
                      <div className="option-card">
                        <h3 className="option-title">Option 1: Buy with Credit Card</h3>
                        <p className="option-description">
                          The easiest way to get WLOS tokens if you're new to cryptocurrency.
                        </p>
                        <a href="https://docs.warlegends.com/guides/buy-wlos-with-credit-card" className="button primary full-width">
                          Buy with Credit Card
                        </a>
                      </div>
                      
                      <div className="option-card">
                        <h3 className="option-title">Option 2: Connect Wallet</h3>
                        <p className="option-description">
                          Connect your Solana wallet to buy WLOS with SOL or other tokens.
                        </p>
                        <div className="wallet-button-container">
                          <WalletConnectButton color="blue" />
                        </div>
                      </div>
                      
                      <div className="option-card">
                        <h3 className="option-title">Need Help?</h3>
                        <p className="option-description">
                          Check out our detailed guides on how to buy WLOS tokens.
                        </p>
                        <a href="https://docs.warlegends.com/guides/buy-wlos-guide" className="button outline full-width">
                          Step-by-Step Guide
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="wallet-connected-view">
                      <div className="welcome-message">
                        <div className="success-icon">✓</div>
                        <h3>Wallet Connected!</h3>
                        <p>You can now buy WLOS tokens or stake your existing tokens.</p>
                      </div>
                      
                      <div className="action-buttons">
                        <a href="/marketplace/wlos" className="button primary">
                          Buy WLOS with SOL
                        </a>
                        <a href="/staking/wlos" className="button secondary">
                          Stake WLOS
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="tab-content">
                <div className="content-section">
                  <h2 className="section-title">Frequently Asked Questions</h2>
                  <div className="accent-bar"></div>
                  
                  <div className="faq-list">
                    <div className="faq-item">
                      <h3 className="faq-question">What is Solana?</h3>
                      <p className="faq-answer">
                        Solana is a fast, secure, and censorship-resistant blockchain that provides the open infrastructure required for global adoption. 
                        WLOS is built on Solana, benefiting from its speed and low fees.
                      </p>
                    </div>
                    
                    <div className="faq-item">
                      <h3 className="faq-question">How do I store WLOS?</h3>
                      <p className="faq-answer">
                        WLOS can be stored in any Solana-compatible wallet like Phantom, Solflare, or Backpack. 
                        Simply connect your wallet to our website to view and manage your WLOS tokens.
                      </p>
                    </div>
                    
                    <div className="faq-item">
                      <h3 className="faq-question">Is WLOS secure?</h3>
                      <p className="faq-answer">
                        Yes! WLOS is built on Solana's secure blockchain. Our token contract has been audited by leading security firms, 
                        and we implement industry best practices to ensure the safety of your assets.
                      </p>
                    </div>
                    
                    <div className="faq-item">
                      <h3 className="faq-question">How can I earn WLOS?</h3>
                      <p className="faq-answer">
                        You can earn WLOS by playing War Legends games, staking your existing tokens, 
                        providing liquidity on DEXs, or participating in special events and tournaments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WlosTokenPage; 