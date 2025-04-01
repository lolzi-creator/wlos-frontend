import React, { ReactNode } from 'react';

// src/components/common/Card.tsx
interface CardProps {
    children: ReactNode;
    color: 'purple' | 'green' | 'yellow' | 'blue' | 'cyan';
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, color, className = '' }) => {
    return (
        <div className={`futuristic-card border-${color} ${className}`}>
            <div className={`accent-border top ${color}`}></div>
            {children}
        </div>
    );
};

export default Card;