// src/components/common/Button.tsx
interface ButtonProps {
    text: string;
    color: 'purple' | 'green' | 'yellow' | 'blue' | 'cyan' | 'transparent';
    onClick: () => void;
    fullWidth?: boolean;
    disabled?: boolean; // Add this line to support the disabled prop
    className?: string; // Add optional className prop
}

const Button: React.FC<ButtonProps> = ({ 
    text, 
    color, 
    onClick, 
    fullWidth = false, 
    disabled = false,
    className = '' // Default to empty string
}) => {
    let colorClasses = '';

    switch (color) {
        case 'purple':
            colorClasses = 'bg-purple-glow border-purple hover:bg-purple-glow-intense';
            break;
        case 'green':
            colorClasses = 'bg-green-glow border-green hover:bg-green-glow-intense';
            break;
        case 'yellow':
            colorClasses = 'bg-yellow-glow border-yellow hover:bg-yellow-glow-intense';
            break;
        case 'blue':
            colorClasses = 'bg-blue-glow border-blue hover:bg-blue-glow-intense';
            break;
        case 'cyan':
            colorClasses = 'bg-cyan-glow border-cyan hover:bg-cyan-glow-intense';
            break;
        case 'transparent':
            colorClasses = 'bg-transparent border-white hover:bg-white/10';
            break;
    }

    return (
        <button
            className={`futuristic-button ${colorClasses} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="button-text-wrapper">{text}</span>
            <span className="button-highlight"></span>
        </button>
    );
};

export default Button;