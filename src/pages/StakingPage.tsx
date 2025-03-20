import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import StakingHero from '../components/sections/Staking/StakingHero.tsx';
import StakingPools from '../components/sections/Staking/StakingPools.tsx';
import StakingStats from '../components/sections/Staking/StakingStats.tsx';
import StakingRewards from '../components/sections/Staking/StakingRewards.tsx';

const StakingPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'staking' | 'rewards'>('staking');
    const [activeLine, setActiveLine] = useState(0);

    // Animation for scanning effect
    React.useEffect(() => {
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
                    background: "linear-gradient(90deg, rgba(20, 241, 149, 0) 0%, rgba(20, 241, 149, 0.5) 50%, rgba(20, 241, 149, 0) 100%)",
                    opacity: 0.3,
                    zIndex: 5,
                    pointerEvents: "none"
                }}
            />

            {/* Background effects */}
            <div className="background-effects">
                <div className="bg-grid"></div>
                <div className="energy-orb green-orb" style={{ left: '30%', top: '20%' }}></div>
                <div className="energy-orb purple-orb" style={{ right: '10%', top: '40%', opacity: '0.1' }}></div>
            </div>

            <main className="main-content">
                <div className="page-tabs">
                    <button
                        className={`tab-button ${activeTab === 'staking' ? 'active' : ''}`}
                        onClick={() => setActiveTab('staking')}
                    >
                        STAKING VAULT
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'rewards' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rewards')}
                    >
                        REWARDS DASHBOARD
                    </button>
                    <div className="tab-line"></div>
                </div>

                {activeTab === 'staking' ? (
                    <>
                        <StakingHero />
                        <StakingStats />
                        <StakingPools />
                    </>
                ) : (
                    <StakingRewards />
                )}
            </main>
        </Layout>
    );
};

export default StakingPage;