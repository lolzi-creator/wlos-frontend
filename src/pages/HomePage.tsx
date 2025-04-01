import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/Home/HeroSection';
import StatsSection from '../components/sections/Home/StatsSection';
import WlosTokenSection from '../components/sections/Home/WlosTokenSection';
import FeaturesSection from '../components/sections/Home/FeaturesSection';

const HomePage: React.FC = () => {
    return (
        <Layout>
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