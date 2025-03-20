import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    color: 'purple' | 'green' | 'yellow';
}

const Card: React.FC<CardProps> = ({ children, color }) => {
    return (
        <div className={`futuristic-card border-${color}`}>
            <div className={`accent-border top ${color}`}></div>
            {children}
        </div>
    );
};

export default Card;