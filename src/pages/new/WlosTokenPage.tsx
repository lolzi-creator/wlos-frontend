import React from 'react';
import Layout from '../../components/layout/Layout';
import WlosTokenHeroSection from '../../components/sections/WlosToken/new/WlosTokenHeroSection';
import WlosTokenStatsSection from '../../components/sections/WlosToken/new/WlosTokenStatsSection';
import WlosTokenUtilitySection from '../../components/sections/WlosToken/new/WlosTokenUtilitySection';
import WlosTokenAcquisitionSection from '../../components/sections/WlosToken/new/WlosTokenAcquisitionSection';
import '../../styles/modules/wlostoken/WlosTokenPage.css';

const WlosTokenPage: React.FC = () => {
    return (
        <Layout>
            <div className="wlostoken-page">
                <WlosTokenHeroSection />
                <WlosTokenStatsSection />
                <WlosTokenUtilitySection />
                <WlosTokenAcquisitionSection />
            </div>
        </Layout>
    );
};

export default WlosTokenPage; 