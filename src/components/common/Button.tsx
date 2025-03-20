import React from 'react';

interface ButtonProps {
    text: string;
    color: 'purple' | 'green' | 'yellow';
    onClick: () => void;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, color, onClick, fullWidth = false }) => {
    let colorClasses = '';

    switch (color) {
        case 'purple':
            colorClasses = 'bg-purple-glow border-purple';
            break;
        case 'green':
            colorClasses = 'bg-green-glow border-green';
            break;
        case 'yellow':
            colorClasses = 'bg-yellow-glow border-yellow';
            break;
    }

    return (
        <button
            className={`futuristic-button ${colorClasses} ${fullWidth ? 'w-full' : ''}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;