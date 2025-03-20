import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import RoadmapHero from '../components/sections/RoadMap/RoadmapHero';
import RoadmapTimeline from '../components/sections/RoadMap/RoadmapTimeline';
import RoadmapFeatures from '../components/sections/RoadMap/RoadmapFeatures';
import RoadmapMilestones from '../components/sections/RoadMap/RoadmapMilestones';

const RoadmapPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'timeline' | 'features' | 'milestones'>('timeline');
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
                    background: "linear-gradient(90deg, rgba(88, 101, 242, 0) 0%, rgba(88, 101, 242, 0.5) 50%, rgba(88, 101, 242, 0) 100%)",
                    opacity: 0.3,
                    zIndex: 5,
                    pointerEvents: "none"
                }}
            />

            {/* Background effects */}
            <div className="background-effects">
                <div className="bg-grid"></div>
                <div className="energy-orb blue-orb" style={{ left: '30%', top: '20%' }}></div>
                <div className="energy-orb purple-orb" style={{ right: '10%', top: '40%', opacity: '0.1' }}></div>
            </div>

            <main className="main-content">
                <RoadmapHero />

                <div className="page-tabs">
                    <button
                        className={`tab-button ${activeTab === 'timeline' ? 'active' : ''}`}
                        onClick={() => setActiveTab('timeline')}
                    >
                        DEVELOPMENT TIMELINE
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
                        onClick={() => setActiveTab('features')}
                    >
                        UPCOMING FEATURES
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'milestones' ? 'active' : ''}`}
                        onClick={() => setActiveTab('milestones')}
                    >
                        MILESTONES
                    </button>
                    <div className="tab-line"></div>
                </div>

                {activeTab === 'timeline' && <RoadmapTimeline />}
                {activeTab === 'features' && <RoadmapFeatures />}
                {activeTab === 'milestones' && <RoadmapMilestones />}
            </main>
        </Layout>
    );
};

export default RoadmapPage;