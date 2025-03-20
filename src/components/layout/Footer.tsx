import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="status-bar">
            <div className="status-indicator">
                <div className="status-dot"></div>
                <span className="status-text">NETWORK ACTIVE | CONNECTION: 100%</span>
            </div>
            <div className="version-info">WLOS:2.0</div>
        </footer>
    );
};

export default Footer;