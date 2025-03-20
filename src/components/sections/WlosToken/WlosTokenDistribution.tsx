import React from 'react';
import SectionTitle from '../../common/SectionTitle';

const WlosTokenDistribution: React.FC = () => {
    // Token allocation data for the pie chart
    const tokenAllocation = [
        { category: 'Ecosystem Rewards', percentage: 40, color: '#9945FF' },
        { category: 'Reserve Treasury', percentage: 25, color: '#14F195' },
        { category: 'Team & Development', percentage: 15, color: '#FFB800' },
        { category: 'Marketing', percentage: 10, color: '#FF4D4D' },
        { category: 'Initial Liquidity', percentage: 5, color: '#00C2FF' },
        { category: 'Community Airdrops', percentage: 3, color: '#FF9900' },
        { category: 'Advisors', percentage: 2, color: '#8B5CF6' }
    ];

    // Vesting schedule data
    const vestingSchedule = [
        {
            category: 'Ecosystem Rewards',
            schedule: '10% at TGE, then 7.5% quarterly over 3 years',
            initialUnlock: '10%',
            cliff: 'None',
            duration: '3 years',
            color: '#9945FF'
        },
        {
            category: 'Reserve Treasury',
            schedule: 'Locked for 6 months, then 10% quarterly over 2.5 years',
            initialUnlock: '0%',
            cliff: '6 months',
            duration: '3 years',
            color: '#14F195'
        },
        {
            category: 'Team & Development',
            schedule: 'Locked for 12 months, then 25% quarterly over 1 year',
            initialUnlock: '0%',
            cliff: '12 months',
            duration: '2 years',
            color: '#FFB800'
        },
        {
            category: 'Marketing',
            schedule: '15% at TGE, then 10% monthly over 8.5 months',
            initialUnlock: '15%',
            cliff: 'None',
            duration: '9 months',
            color: '#FF4D4D'
        },
        {
            category: 'Initial Liquidity',
            schedule: '100% at TGE',
            initialUnlock: '100%',
            cliff: 'None',
            duration: 'Immediate',
            color: '#00C2FF'
        },
        {
            category: 'Community Airdrops',
            schedule: '50% at TGE, 50% over 6 months',
            initialUnlock: '50%',
            cliff: 'None',
            duration: '6 months',
            color: '#FF9900'
        },
        {
            category: 'Advisors',
            schedule: 'Locked for 3 months, then 25% quarterly over 9 months',
            initialUnlock: '0%',
            cliff: '3 months',
            duration: '1 year',
            color: '#8B5CF6'
        }
    ];

    return (
        <section className="token-distribution-section">
            <SectionTitle title="TOKENOMICS" />

            <div className="distribution-overview clip-card border-purple">
                <div className="accent-border top purple"></div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="distribution-title purple-text">TOKEN ALLOCATION</h3>
                        <p className="distribution-description">
                            WLOS has a fixed supply of 10,000,000 tokens with strategic allocation
                            to ensure long-term ecosystem growth and sustainability.
                        </p>

                        <div className="total-supply-info">
                            <div className="supply-metric">
                                <div className="metric-label">Total Supply</div>
                                <div className="metric-value">10,000,000 WLOS</div>
                            </div>
                            <div className="supply-metric">
                                <div className="metric-label">Circulating Supply</div>
                                <div className="metric-value">1,000,000 WLOS</div>
                            </div>
                            <div className="supply-metric">
                                <div className="metric-label">Initial Circulation</div>
                                <div className="metric-value">10% of Total Supply</div>
                            </div>
                        </div>

                        <div className="allocation-legend">
                            {tokenAllocation.map((item, index) => (
                                <div key={index} className="legend-item">
                                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                                    <div className="legend-label">{item.category}</div>
                                    <div className="legend-value">{item.percentage}%</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pie-chart-container">
                        <svg viewBox="0 0 400 400" className="token-pie-chart">
                            <defs>
                                {/* Add subtle gradient effect to slices */}
                                {tokenAllocation.map((item, index) => (
                                    <radialGradient key={`gradient-${index}`} id={`pieGradient${index}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                        <stop offset="0%" stopColor={item.color} stopOpacity="1" />
                                        <stop offset="100%" stopColor={item.color} stopOpacity="0.8" />
                                    </radialGradient>
                                ))}
                            </defs>

                            {/* Pie Chart slices - note: in an actual implementation, you would calculate these properly */}
                            <circle cx="200" cy="200" r="150" fill="rgba(0,0,0,0.2)" />

                            {/* Ecosystem Rewards Slice - 40% */}
                            <path d="M200,200 L350,200 A150,150 0 0,1 200,350 Z" fill="url(#pieGradient0)" />

                            {/* Reserve Treasury Slice - 25% */}
                            <path d="M200,200 L200,350 A150,150 0 0,1 50,200 Z" fill="url(#pieGradient1)" />

                            {/* Team & Development Slice - 15% */}
                            <path d="M200,200 L50,200 A150,150 0 0,1 129,77 Z" fill="url(#pieGradient2)" />

                            {/* Marketing Slice - 10% */}
                            <path d="M200,200 L129,77 A150,150 0 0,1 235,56 Z" fill="url(#pieGradient3)" />

                            {/* Initial Liquidity Slice - 5% */}
                            <path d="M200,200 L235,56 A150,150 0 0,1 290,83 Z" fill="url(#pieGradient4)" />

                            {/* Community Airdrops Slice - 3% */}
                            <path d="M200,200 L290,83 A150,150 0 0,1 320,113 Z" fill="url(#pieGradient5)" />

                            {/* Advisors Slice - 2% */}
                            <path d="M200,200 L320,113 A150,150 0 0,1 350,200 Z" fill="url(#pieGradient6)" />

                            {/* Center circle with token symbol */}
                            <circle cx="200" cy="200" r="50" fill="#08081E" stroke="#9945FF" strokeWidth="2" />
                            <text x="200" y="200" textAnchor="middle" dominantBaseline="middle" fill="#9945FF" fontSize="24" fontFamily="Orbitron">WLOS</text>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Vesting Schedule */}
            <div className="vesting-schedule clip-card border-purple">
                <div className="accent-border top purple"></div>

                <h3 className="vesting-title purple-text">TOKEN VESTING SCHEDULE</h3>
                <p className="vesting-description">
                    Strategic release schedule designed to maintain token price stability and ensure long-term project sustainability.
                </p>

                <div className="vesting-table-container">
                    <table className="vesting-table">
                        <thead>
                        <tr>
                            <th>Allocation</th>
                            <th>Schedule</th>
                            <th>Initial Unlock</th>
                            <th>Cliff</th>
                            <th>Duration</th>
                        </tr>
                        </thead>
                        <tbody>
                        {vestingSchedule.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="allocation-cell">
                                        <div className="allocation-color" style={{ backgroundColor: item.color }}></div>
                                        <span>{item.category}</span>
                                    </div>
                                </td>
                                <td>{item.schedule}</td>
                                <td>{item.initialUnlock}</td>
                                <td>{item.cliff}</td>
                                <td>{item.duration}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Token Emission Schedule */}
            <div className="emission-schedule clip-card border-purple">
                <div className="accent-border top purple"></div>

                <h3 className="emission-title purple-text">TOKEN EMISSION SCHEDULE</h3>
                <p className="emission-description">
                    Projected token circulation over time based on vesting schedules and ecosystem distribution.
                </p>

                <div className="emission-chart-container">
                    <div className="chart-labels">
                        <div className="chart-label">10M</div>
                        <div className="chart-label">7.5M</div>
                        <div className="chart-label">5M</div>
                        <div className="chart-label">2.5M</div>
                        <div className="chart-label">0</div>
                    </div>

                    <div className="chart-area">
                        <svg className="emission-chart" viewBox="0 0 800 300">
                            {/* Grid lines */}
                            <line x1="0" y1="0" x2="800" y2="0" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="75" x2="800" y2="75" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="150" x2="800" y2="150" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="225" x2="800" y2="225" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="300" x2="800" y2="300" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />

                            {/* Stacked area chart for cumulative token release */}
                            <defs>
                                <linearGradient id="ecosystemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#9945FF" stopOpacity="0.8"/>
                                    <stop offset="100%" stopColor="#9945FF" stopOpacity="0.5"/>
                                </linearGradient>
                                <linearGradient id="reserveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#14F195" stopOpacity="0.8"/>
                                    <stop offset="100%" stopColor="#14F195" stopOpacity="0.5"/>
                                </linearGradient>
                                <linearGradient id="teamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FFB800" stopOpacity="0.8"/>
                                    <stop offset="100%" stopColor="#FFB800" stopOpacity="0.5"/>
                                </linearGradient>
                                <linearGradient id="marketingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FF4D4D" stopOpacity="0.8"/>
                                    <stop offset="100%" stopColor="#FF4D4D" stopOpacity="0.5"/>
                                </linearGradient>
                                <linearGradient id="othersGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.8"/>
                                    <stop offset="100%" stopColor="#00C2FF" stopOpacity="0.5"/>
                                </linearGradient>
                            </defs>

                            {/* Initial Liquidity & Airdrops (immediately released) */}
                            <path d="M0,300 L0,270 L800,240 L800,300 Z" fill="url(#othersGradient)" />

                            {/* Marketing */}
                            <path d="M0,270 L0,240 L100,220 L200,210 L300,200 L800,200 L800,240 Z" fill="url(#marketingGradient)" />

                            {/* Team & Development */}
                            <path d="M0,240 L0,240 L300,240 L400,200 L500,160 L600,120 L800,120 L800,200 Z" fill="url(#teamGradient)" />

                            {/* Reserve Treasury */}
                            <path d="M0,240 L0,240 L200,240 L300,200 L400,160 L500,120 L600,80 L800,40 L800,120 Z" fill="url(#reserveGradient)" />

                            {/* Ecosystem Rewards */}
                            <path d="M0,240 L0,200 L100,180 L200,160 L300,140 L400,120 L500,80 L600,40 L800,0 L800,40 Z" fill="url(#ecosystemGradient)" />
                        </svg>
                    </div>

                    <div className="time-axis">
                        <div className="time-label">TGE</div>
                        <div className="time-label">Q1</div>
                        <div className="time-label">Q2</div>
                        <div className="time-label">Q3</div>
                        <div className="time-label">Q4</div>
                        <div className="time-label">Q5</div>
                        <div className="time-label">Q6</div>
                        <div className="time-label">Q7</div>
                        <div className="time-label">Q8</div>
                    </div>
                </div>

                <div className="emission-legend">
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#9945FF' }}></div>
                        <div className="legend-label">Ecosystem Rewards</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#14F195' }}></div>
                        <div className="legend-label">Reserve Treasury</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#FFB800' }}></div>
                        <div className="legend-label">Team & Development</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#FF4D4D' }}></div>
                        <div className="legend-label">Marketing</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#00C2FF' }}></div>
                        <div className="legend-label">Others (Liquidity, Airdrops, Advisors)</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WlosTokenDistribution;