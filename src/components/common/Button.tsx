// src/components/common/Button.tsx
interface ButtonProps {
    text: string;
    color: 'purple' | 'green' | 'yellow' | 'blue' | 'cyan' | 'transparent';
    onClick: () => void;
    fullWidth?: boolean;
    disabled?: boolean; // Add this line to support the disabled prop
}

const Button: React.FC<ButtonProps> = ({ text, color, onClick, fullWidth = false, disabled = false }) => {
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
        case 'blue':
            colorClasses = 'bg-blue-glow border-blue';
            break;
        case 'cyan':
            colorClasses = 'bg-cyan-glow border-cyan';
            break;
        case 'transparent':
            colorClasses = 'bg-transparent border-white hover:bg-white/10';
            break;
    }

    return (
        <button
            className={`futuristic-button ${colorClasses} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;