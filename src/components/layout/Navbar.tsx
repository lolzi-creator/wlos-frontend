import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Determine active page
    const isActive = (path: string) => {
        if (path === '/' || path === '/battle') {
            return location.pathname === '/' || location.pathname === '/battle';
        }
        return location.pathname === path;
    };

    return (
        <header className="navbar">
            {/* Logo */}
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <span className="logo-text">WARLORDS</span>
                <span className="logo-highlight"> OF SOLANA</span>
                <div className="logo-dot"></div>
            </div>

            {/* Navigation Items */}
            <nav className="nav-items">
                <NavItem
                    label="BATTLE"
                    active={isActive('/battle')}
                    onClick={() => navigate('/')}
                />
                <NavItem
                    label="STAKE"
                    active={isActive('/stake')}
                    onClick={() => navigate('/stake')}
                />
                <NavItem
                    label="MARKETPLACE"
                    active={isActive('/marketplace')}
                    onClick={() => navigate('/marketplace')}
                />
                <NavItem
                    label="WLOS TOKEN"
                    active={isActive('/wlos-token')}
                    onClick={() => navigate('/wlos-token')}
                />
            </nav>

            {/* Wallet Button */}
            <button
                className="futuristic-button bg-purple-glow border-purple"
                onClick={() => console.log('Connect wallet clicked')}
            >
                CONNECT WALLET
            </button>
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