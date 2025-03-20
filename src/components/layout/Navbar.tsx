import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WalletConnectButton from '../common/WalletConnectButton';

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                    <nav className="nav-items">
                        <NavItem
                            label="BATTLE"
                            active={isActive('/battle')}
                            onClick={() => handleNavigation('/')}
                        />
                        <NavItem
                            label="STAKE"
                            active={isActive('/stake')}
                            onClick={() => handleNavigation('/stake')}
                        />
                        <NavItem
                            label="MARKETPLACE"
                            active={isActive('/marketplace')}
                            onClick={() => handleNavigation('/marketplace')}
                        />
                        <NavItem
                            label="WLOS TOKEN"
                            active={isActive('/wlos-token')}
                            onClick={() => handleNavigation('/wlos-token')}
                        />
                        <NavItem
                            label="ROADMAP"
                            active={isActive('/roadmap')}
                            onClick={() => handleNavigation('/roadmap')}
                        />
                        <NavItem
                            label="WALLET"
                            active={isActive('/wallet')}
                            onClick={() => handleNavigation('/wallet')}
                        />
                    </nav>
                </nav>

                {/* Wallet Button - Will show in mobile menu when expanded */}
                <div className="wallet-button-container">
                    <button
                        className="futuristic-button bg-purple-glow border-purple"
                        onClick={() => console.log('Connect wallet clicked')}
                    >
                        CONNECT WALLET
                    </button>
                </div>
            </div>
        </header>
    );
};

// NavItem Component
interface NavItemProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, active, onClick }) => {
    return (
        <div className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
            {label}
            {active && (
                <>
                    <div className="corner-accent top-right"></div>
                    <div className="corner-accent bottom-left"></div>
                </>
            )}
        </div>
    );
};

export default Navbar;