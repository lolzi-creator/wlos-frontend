import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/Staking/StatsSection.tsx';
import WlosTokenSection from '../components/sections/WlosTokenSection';
import FeaturesSection from '../components/sections/FeaturesSection';


const HomePage: React.FC = () => {
    const [activeLine, setActiveLine] = useState(0);

    // Animation for scanning effect
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLine(prev => (prev + 1) % 100);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <Layout>
            {/* Scanning line effect */}
            <div
                style={{
                    position: "absolute",
                    top: `${activeLine}%`,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(90deg, rgba(153, 69, 255, 0) 0%, rgba(153, 69, 255, 0.5) 50%, rgba(153, 69, 255, 0) 100%)",
                    opacity: 0.3,
                    zIndex: 5,
                    pointerEvents: "none"
                }}
            />

            {/* Background effects */}
            <div className="background-effects">
                <div className="bg-grid"></div>
                <div className="energy-orb purple-orb"></div>
                <div className="energy-orb green-orb"></div>
            </div>

            <main className="main-content">
                <HeroSection />
                <StatsSection />
                <WlosTokenSection />
                <FeaturesSection />
            </main>
        </Layout>
    );
};

export default HomePage;