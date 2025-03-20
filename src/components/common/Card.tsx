import React, { ReactNode } from 'react';

// src/components/common/Card.tsx
interface CardProps {
    children: ReactNode;
    color: 'purple' | 'green' | 'yellow' | 'blue' | 'cyan';
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