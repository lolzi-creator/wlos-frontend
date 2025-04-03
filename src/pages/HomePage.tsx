import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/Home/HeroSection';
import WlosTokenSection from '../components/sections/Home/WlosTokenSection';
import FeaturesSection from '../components/sections/Home/FeaturesSection';

const HomePage: React.FC = () => {
    return (
        <Layout>
            <HeroSection />
            <WlosTokenSection />
            <FeaturesSection />
        </Layout>
    );
};

export default HomePage;