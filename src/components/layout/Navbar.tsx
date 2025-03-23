import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WalletConnectButton from '../common/WalletConnectButton';
import { useWalletConnection } from '../../context/WalletConnectionProvider';

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isConnected } = useWalletConnection();

    // Determine active page
    const isActive = (path: string) => {
        if (path === '/' || path === '/battle') {
            return location.pathname === '/' || location.pathname === '/battle';
        }
        return location.pathname === path;
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    return (
        <header className="navbar">
            {/* Logo */}
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <span className="logo-text">WARLORDS</span>
                <span className="logo-highlight"> OF SOLANA</span>
                <div className="logo-dot"></div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {/* Navigation Items - Desktop & Mobile */}
            <div className={`nav-container ${mobileMenuOpen ? 'open' : ''}`}>
                <nav className="nav-items">
                    <div
                        className={`nav-item ${isActive('/battle') ? 'active' : ''}`}
                        onClick={() => handleNavigation('/')}
                    >
                        BATTLE
                        {isActive('/battle') && (
                            <>
                                <div className="corner-accent top-right"></div>
                                <div className="corner-accent bottom-left"></div>
                            </>
                        )}
                    </div>
                    <div
                        className={`nav-item ${isActive('/stake') ? 'active' : ''}`}
                        onClick={() => handleNavigation('/stake')}
                    >
                        STAKE
                        {isActive('/stake') && (
                            <>
                                <div className="corner-accent top-right"></div>
                                <div className="corner-accent bottom-left"></div>
                            </>
                        )}
                    </div>
                    <div
                        className={`nav-item ${isActive('/marketplace') ? 'active' : ''}`}
                        onClick={() => handleNavigation('/marketplace')}
                    >
                        MARKETPLACE
                        {isActive('/marketplace') && (
                            <>
                                <div className="corner-accent top-right"></div>
                                <div className="corner-accent bottom-left"></div>
                            </>
                        )}
                    </div>
                    <div
                        className={`nav-item ${isActive('/wlos-token') ? 'active' : ''}`}
                        onClick={() => handleNavigation('/wlos-token')}
                    >
                        WLOS TOKEN
                        {isActive('/wlos-token') && (
                            <>
                                <div className="corner-accent top-right"></div>
                                <div className="corner-accent bottom-left"></div>
                            </>
                        )}
                    </div>
                    <div
                        className={`nav-item ${isActive('/farmers') ? 'active' : ''}`}
                        onClick={() => handleNavigation('/farmers')}
                    >
                        FARMERS
                        {isActive('/farmers') && (
                            <>
                                <div className="corner-accent top-right"></div>
                                <div className="corner-accent bottom-left"></div>
                            </>
                        )}
                    </div>
                    <div
                        className={`nav-item ${isActive('/heroes') ? 'active' : ''}`}
                        onClick={() => handleNavigation('/heroes')}
                    >
                        HEROES
                        {isActive('/heroes') && (
                            <>
                                <div className="corner-accent top-right"></div>
                                <div className="corner-accent bottom-left"></div>
                            </>
                        )}
                    </div>
                    <div
                        className={`nav-item ${isActive('/roadmap') ? 'active' : ''}`}
                        onClick={() => handleNavigation('/roadmap')}
                    >
                        ROADMAP
                        {isActive('/roadmap') && (
                            <>
                                <div className="corner-accent top-right"></div>
                                <div className="corner-accent bottom-left"></div>
                            </>
                        )}
                    </div>
                    <div
                        className={`nav-item ${isActive('/wallet') ? 'active' : ''}`}
                        onClick={() => handleNavigation('/wallet')}
                    >
                        WALLET
                        {isActive('/wallet') && (
                            <>
                                <div className="corner-accent top-right"></div>
                                <div className="corner-accent bottom-left"></div>
                            </>
                        )}
                    </div>
                </nav>

                {/* Wallet Button */}
                <div className="wallet-button-container">
                    <WalletConnectButton color="purple" />
                    {isConnected && <span className="connected-indicator">•</span>}
                </div>
            </div>
        </header>
    );
};

export default Navbar;