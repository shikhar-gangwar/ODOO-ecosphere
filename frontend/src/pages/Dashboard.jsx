import React from 'react';
import {
  TrendingUp, TrendingDown, Minus, Activity, Users,
  Leaf, Shield, Download, Plus, FileText, Target,
  CheckCircle2
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import './Dashboard.css';

// --- MOCK DATA ---
const emissionData = [
  { month: 'Jan', scope1: 4000, scope2: 2400 },
  { month: 'Feb', scope1: 3000, scope2: 1398 },
  { month: 'Mar', scope1: 2000, scope2: 9800 },
  { month: 'Apr', scope1: 2780, scope2: 3908 },
  { month: 'May', scope1: 1890, scope2: 4800 },
  { month: 'Jun', scope1: 2390, scope2: 3800 },
  { month: 'Jul', scope1: 3490, scope2: 4300 },
];

const esgScoresData = [
  { name: 'Environment', score: 85 },
  { name: 'Social', score: 92 },
  { name: 'Governance', score: 78 },
];

const departmentRanks = [
  { id: 1, name: 'Manufacturing', score: 92, trend: 'up', status: 'On Track' },
  { id: 2, name: 'Logistics', score: 85, trend: 'up', status: 'On Track' },
  { id: 3, name: 'Operations', score: 78, trend: 'down', status: 'At Risk' },
  { id: 4, name: 'Human Resources', score: 74, trend: 'up', status: 'Improving' },
  { id: 5, name: 'Sales & Marketing', score: 65, trend: 'down', status: 'Action Needed' },
];

const timelineEvents = [
  { id: 1, title: 'Q2 ESG Report Published', time: '2 hours ago', icon: <FileText size={16} />, active: true },
  { id: 2, title: 'Energy target reached', time: '1 day ago', icon: <Target size={16} />, active: false },
  { id: 3, title: 'New compliance policy active', time: '3 days ago', icon: <Shield size={16} />, active: false },
  { id: 4, title: 'Supplier audit completed', time: '1 week ago', icon: <CheckCircle2 size={16} />, active: false },
];

// --- REUSABLE COMPONENTS ---

const MetricCard = ({ title, value, change, trend, icon }) => {
  const isUp = trend === 'up';
  const isDown = trend === 'down';

  return (
    <div className="dash-card metric-card">
      <div className="metric-header">
        <span className="metric-label">{title}</span>
        <div className="metric-icon">{icon}</div>
      </div>
      <div className="metric-value">{value}</div>
      <div className={`metric-trend ${isUp ? 'trend-up' : isDown ? 'trend-down' : 'trend-neutral'}`}>
        {isUp && <TrendingUp size={16} />}
        {isDown && <TrendingDown size={16} />}
        {!isUp && !isDown && <Minus size={16} />}
        <span>{change} vs last month</span>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD MODULE ---

const DashboardHome = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Overview</h1>
          <p>Here's what's happening with your ESG metrics today.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={16} /> Export Report
          </button>
          <button className="btn-primary">
            <Plus size={16} /> New Initiative
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard
          title="Overall ESG Score"
          value="A-"
          change="+2.4%"
          trend="up"
          icon={<Activity size={20} />}
        />
        <MetricCard
          title="Total Carbon (tCO2e)"
          value="12,450"
          change="-5.2%"
          trend="up"
          icon={<Leaf size={20} />}
        />
        <MetricCard
          title="CSR Participation"
          value="64%"
          change="+12.0%"
          trend="up"
          icon={<Users size={20} />}
        />
        <MetricCard
          title="Compliance Issues"
          value="3"
          change="+1"
          trend="down"
          icon={<Shield size={20} />}
        />
      </div>

      <div className="charts-grid">
        <div className="dash-card">
          <div className="card-header">
            <h3 className="card-title">Carbon Emissions (Scope 1 & 2)</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emissionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScope1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--text-disabled)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-disabled)" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }} />
                <Area type="monotone" dataKey="scope1" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorScope1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card">
          <div className="card-header">
            <h3 className="card-title">Pillar Performance</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={esgScoresData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="var(--text-main)" fontSize={12} />
                <Tooltip cursor={{ fill: 'var(--bg-hover)' }} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                  {esgScoresData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="var(--primary)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="dash-card">
          <div className="card-header">
            <h3 className="card-title">Department ESG Rankings</h3>
            <button className="btn-secondary" style={{ padding: '4px 8px', fontSize: 'var(--text-xs)' }}>View All</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Department</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {departmentRanks.map((dept, index) => (
                  <tr key={dept.id}>
                    <td>
                      <span className={`rank-badge ${index < 3 ? 'top-3' : ''}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td style={{ fontWeight: 500 }}>{dept.name}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {dept.score}
                        {dept.trend === 'up' ? <TrendingUp size={14} className="trend-up" /> : <TrendingDown size={14} className="trend-down" />}
                      </div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: 'var(--text-xs)',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        backgroundColor: dept.status === 'On Track' ? 'var(--primary-subtle)' : dept.status === 'At Risk' ? '#fee2e2' : 'var(--bg-hover)',
                        color: dept.status === 'On Track' ? 'var(--primary)' : dept.status === 'At Risk' ? '#dc2626' : 'var(--text-muted)'
                      }}>
                        {dept.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="dash-card" style={{ padding: '16px 20px' }}>
            <h3 className="card-title">Quick Actions</h3>
            <div className="action-list">
              <a href="#log-emission" className="action-item">
                <Leaf size={18} />
                <span>Log Scope 3 Emissions</span>
              </a>
              <a href="#audit" className="action-item">
                <Shield size={18} />
                <span>Start Internal Audit</span>
              </a>
              <a href="#survey" className="action-item">
                <Users size={18} />
                <span>Distribute Employee Survey</span>
              </a>
            </div>
          </div>

          <div className="dash-card">
            <h3 className="card-title">Recent Activity</h3>
            <div className="timeline">
              {timelineEvents.map((event) => (
                <div key={event.id} className={`timeline-item ${event.active ? 'active' : ''}`}>
                  <div className="timeline-icon">
                    {event.icon}
                  </div>
                  <div className="timeline-content">
                    <h4>{event.title}</h4>
                    <p>{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
