import React from 'react';

interface NavItemProps {
    label: string;
    active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, active }) => {
    return (
        <div className={`nav-item ${active ? 'active' : ''}`}>
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

export default NavItem;