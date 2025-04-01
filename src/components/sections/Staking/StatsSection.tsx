import React from 'react';
import Card from '../../common/Card';

const StatsSection: React.FC = () => {
    return (
        <section className="stats-section mobile-friendly-section">
            <div className="stats-grid mobile-responsive-grid">
                <Card color="purple" className="mobile-friendly-card">
                    <h3 className="card-title purple-text">NEURAL WARLORDS</h3>
                    <div className="stat-value glow-text">3,724</div>
                    <div className="stat-trend green-text">+124 QUANTUM ENTITIES</div>
                </Card>

                <Card color="green" className="mobile-friendly-card">
                    <h3 className="card-title green-text">QUANTUM BATTLES</h3>
                    <div className="stat-value glow-text">1,873</div>
                    <div className="stat-trend green-text">+47% NEURAL ACTIVITY</div>
                </Card>

                <Card color="yellow" className="mobile-friendly-card">
                    <h3 className="card-title yellow-text">QUANTUM STAKING</h3>
                    <div className="stat-value glow-text">45,328.92</div>
                    <div className="stat-trend green-text">+2,145.32 SOL MATRIX</div>
                </Card>
            </div>
        </section>
    );
};

export default StatsSection;