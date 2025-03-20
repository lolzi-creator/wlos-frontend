import React from 'react';
import Button from '../../common/Button.tsx';
import SectionTitle from '../../common/SectionTitle.tsx';

const mockRewardsData = [
  {
    pool: 'Warrior Pool',
    stakedAmount: '500 WLOS',
    startDate: '2025-02-15',
    endDate: '2025-02-22',
    availableRewards: '5.32 WLOS',
    status: 'Active',
    timeRemaining: '3 days'
  },
  {
    pool: 'Knight Pool',
    stakedAmount: '1,000 WLOS',
    startDate: '2025-01-20',
    endDate: '2025-02-19',
    availableRewards: '42.68 WLOS',
    status: 'Completed',
    timeRemaining: '0 days'
  },
  {
    pool: 'Warlord Pool',
    stakedAmount: '2,500 WLOS',
    startDate: '2025-01-01',
    endDate: '2025-04-01',
    availableRewards: '128.45 WLOS',
    status: 'Active',
    timeRemaining: '41 days'
  }
];

const StakingRewards: React.FC = () => {
  return (
    <section className="staking-rewards-section">
      <SectionTitle title="YOUR STAKING REWARDS" />

      <div className="rewards-summary clip-card border-green">
        <div className="accent-border top green"></div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rewards-stats">
            <h3 className="rewards-title">REWARDS SUMMARY</h3>

            <div className="rewards-grid">
              <div className="reward-stat-box">
                <div className="stat-label">Total Staked</div>
                <div className="stat-value">4,000 WLOS</div>
              </div>

              <div className="reward-stat-box">
                <div className="stat-label">Active Pools</div>
                <div className="stat-value">2</div>
              </div>

              <div className="reward-stat-box">
                <div className="stat-label">Available Rewards</div>
                <div className="stat-value text-green-text">176.45 WLOS</div>
              </div>

              <div className="reward-stat-box">
                <div className="stat-label">Claimed Rewards</div>
                <div className="stat-value">68.92 WLOS</div>
              </div>
            </div>

            <div className="rewards-actions">
              <Button
                text="CLAIM ALL REWARDS"
                color="green"
                onClick={() => console.log('Claim all rewards clicked')}
                fullWidth={true}
              />
            </div>
          </div>

          <div className="rewards-chart">
            <h3 className="chart-title">REWARDS GROWTH</h3>

            <div className="growth-chart">
              <svg className="growth-svg" viewBox="0 0 300 200">
                {/* Chart Grid Lines */}
                <line x1="0" y1="50" x2="300" y2="50" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="100" x2="300" y2="100" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="150" x2="300" y2="150" stroke="#333366" strokeWidth="1" strokeDasharray="5,5" />

                {/* Rewards Growth Curve */}
                <path
                  d="M0,180 C25,170 50,150 75,120 C100,90 125,70 150,50 C175,30 200,25 225,20 C250,15 275,10 300,5"
                  fill="none"
                  stroke="#14F195"
                  strokeWidth="2"
                />

                {/* Area Under Curve */}
                <path
                  d="M0,180 C25,170 50,150 75,120 C100,90 125,70 150,50 C175,30 200,25 225,20 C250,15 275,10 300,5 L300,200 L0,200 Z"
                  fill="url(#rewardsGradient)"
                  opacity="0.2"
                />

                <defs>
                  <linearGradient id="rewardsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#14F195" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#14F195" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="time-axis">
              <div className="time-label">Week 1</div>
              <div className="time-label">Week 4</div>
              <div className="time-label">Week 8</div>
              <div className="time-label">Week 12</div>
            </div>
          </div>
        </div>
      </div>

      <div className="active-stakes-section">
        <h3 className="stakes-title">ACTIVE STAKES & REWARDS</h3>

        <div className="stakes-table-container">
          <table className="stakes-table">
            <thead>
              <tr>
                <th>Pool</th>
                <th>Amount Staked</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Available Rewards</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockRewardsData.map((stake, index) => (
                <tr key={index} className={stake.status === 'Completed' ? 'completed' : ''}>
                  <td>{stake.pool}</td>
                  <td>{stake.stakedAmount}</td>
                  <td>{stake.startDate}</td>
                  <td>{stake.endDate}</td>
                  <td className="rewards-cell">{stake.availableRewards}</td>
                  <td>
                    <span className={`status-badge ${stake.status.toLowerCase()}`}>
                      {stake.status}
                      {stake.status === 'Active' && ` (${stake.timeRemaining})`}
                    </span>
                  </td>
                  <td>
                    <div className="stake-actions">
                      <button className="action-button claim">CLAIM</button>
                      {stake.status === 'Active' && (
                        <button className="action-button unstake">UNSTAKE</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="stakes-note">
          <div className="note-dot"></div>
          <p className="note-text">Early unstaking incurs a 5% fee. Completed stakes can be unstaked with no fee.</p>
        </div>
      </div>
    </section>
  );
};

export default StakingRewards;