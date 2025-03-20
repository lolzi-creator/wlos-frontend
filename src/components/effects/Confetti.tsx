// src/components/effects/Confetti.tsx
import React, { useEffect, useState } from 'react';

interface ConfettiProps {
    active: boolean;
}

interface ConfettiParticle {
    id: number;
    x: number;
    y: number;
    color: string;
    shape: 'square' | 'circle' | 'triangle'; // Different shapes for visual variety
    size: number;
    rotation: number;
    speed: number;
    spin: number; // Rotation speed
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
    const [particles, setParticles] = useState<ConfettiParticle[]>([]);

    useEffect(() => {
        if (!active) {
            setParticles([]);
            return;
        }

        // Create confetti particles
        const colors = ['#FFD700', '#9945FF', '#14F195', '#FF4D4D', '#00C2FF', '#FFB800',
            '#FFFFFF', '#FFC0CB', '#39FF14'];
        const shapes = ['square', 'circle', 'triangle'];
        const newParticles: ConfettiParticle[] = [];

        for (let i = 0; i < 150; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100, // % of screen width
                y: Math.random() * -10 - 10, // Start above the screen with some randomness
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)] as 'square' | 'circle' | 'triangle',
                size: Math.random() * 10 + 5,
                rotation: Math.random() * 360,
                speed: Math.random() * 3 + 1,
                spin: (Math.random() - 0.5) * 10 // Random spin direction and speed
            });
        }

        setParticles(newParticles);

        // Clean up after animation duration
        const timeout = setTimeout(() => {
            setParticles([]);
        }, 7000);

        return () => clearTimeout(timeout);
    }, [active]);

    if (!active || particles.length === 0) return null;

    return (
        <div className="confetti-container fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {particles.map((particle) => {
                // Render different shapes based on the particle shape
                let particleStyle: React.CSSProperties = {
                    left: `${particle.x}vw`,
                    top: `${particle.y}vh`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    background: particle.color,
                    transform: `rotate(${particle.rotation}deg)`,
                    animation: `confetti-fall ${7 / particle.speed}s ease-out forwards`,
                    animationDelay: `${Math.random() * 3}s`,
                    opacity: Math.random() * 0.5 + 0.5,
                };

                // Style overrides for different shapes
                if (particle.shape === 'circle') {
                    particleStyle.borderRadius = '50%';
                } else if (particle.shape === 'triangle') {
                    // For triangles, we'll use a clip-path
                    particleStyle.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                }

                return (
                    <div
                        key={particle.id}
                        className="confetti absolute"
                        style={particleStyle}
                    />
                );
            })}
        </div>
    );
};

export default Confetti;