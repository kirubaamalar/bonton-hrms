import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard/StatCard';
import {
  HiOutlineUsers,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineUserPlus,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { TbBeach } from 'react-icons/tb';
import './Dashboard.css';

const activityData = [
  { name: 'Arjun Sharma', desc: 'Applied for Casual Leave', status: 'pending', avatar: 'a1', initials: 'AS' },
  { name: 'Priya Nair', desc: 'Attendance marked — On Time', status: 'completed', avatar: 'a2', initials: 'PN' },
  { name: 'Ravi Kumar', desc: 'Payroll processed for March', status: 'completed', avatar: 'a3', initials: 'RK' },
  { name: 'Ananya Das', desc: 'Submitted Performance Review', status: 'in-progress', avatar: 'a4', initials: 'AD' },
  { name: 'Vikram Singh', desc: 'Updated Bank Details', status: 'completed', avatar: 'a5', initials: 'VS' },
];

const chartData = [
  { label: 'Mon', value: 85 },
  { label: 'Tue', value: 92 },
  { label: 'Wed', value: 78 },
  { label: 'Thu', value: 95 },
  { label: 'Fri', value: 88 },
  { label: 'Sat', value: 45 },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-greeting">
          Welcome back, {user?.username || 'User'}! 👋
        </h1>
        <p className="dashboard-subtitle">
          Here&apos;s what&apos;s happening with your HR operations today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="dashboard-stats">
        <StatCard
          title="Total Employees"
          value="156"
          icon={HiOutlineUsers}
          trend="12% from last month"
          trendDirection="up"
          color="green"
        />
        <StatCard
          title="Present Today"
          value="142"
          icon={HiOutlineClipboardDocumentCheck}
          trend="5% from yesterday"
          trendDirection="up"
          color="blue"
        />
        <StatCard
          title="On Leave"
          value="8"
          icon={TbBeach}
          trend="2 more than usual"
          trendDirection="down"
          color="orange"
        />
        <StatCard
          title="Pending Requests"
          value="14"
          icon={HiOutlineClock}
          trend="3 new today"
          trendDirection="up"
          color="purple"
        />
      </div>

      {/* Analytics + Reminders */}
      <div className="dashboard-grid">
        {/* Attendance Analytics */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-title">Attendance Overview</h3>
            <button className="dashboard-card-action">This Week</button>
          </div>
          <div className="analytics-chart">
            {chartData.map((bar) => (
              <div key={bar.label} className="analytics-bar-group">
                <div
                  className="analytics-bar"
                  style={{ height: `${bar.value}%` }}
                  title={`${bar.value}% attendance`}
                ></div>
                <span className="analytics-bar-label">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reminder */}
        <div className="reminder-card">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-title">Reminders</h3>
          </div>
          <div className="reminder-title">Team Standup Meeting</div>
          <div className="reminder-time">Today, 10:00 AM — 10:30 AM</div>
          <button className="reminder-btn">Join Meeting</button>
          <div style={{ marginTop: 24 }}>
            <div className="reminder-title" style={{ fontSize: '0.9rem' }}>Payroll Due</div>
            <div className="reminder-time">April 30, 2026</div>
          </div>
        </div>
      </div>

      {/* Activity + Quick Actions */}
      <div className="dashboard-grid">
        {/* Team Activity */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-title">Recent Activity</h3>
            <button className="dashboard-card-action">View All</button>
          </div>
          <div className="activity-list">
            {activityData.map((item, i) => (
              <div key={i} className="activity-item">
                <div className={`activity-avatar ${item.avatar}`}>
                  {item.initials}
                </div>
                <div className="activity-info">
                  <div className="activity-name">{item.name}</div>
                  <div className="activity-desc">{item.desc}</div>
                </div>
                <span className={`activity-status ${item.status}`}>
                  {item.status === 'in-progress' ? 'In Progress' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-title">Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <div className="quick-action-item">
              <div className="quick-action-icon green">
                <HiOutlineUserPlus />
              </div>
              <div>
                <div className="quick-action-text">Add Employee</div>
                <div className="quick-action-sub">Register a new team member</div>
              </div>
            </div>
            <div className="quick-action-item">
              <div className="quick-action-icon blue">
                <HiOutlineDocumentText />
              </div>
              <div>
                <div className="quick-action-text">Generate Report</div>
                <div className="quick-action-sub">Monthly HR analytics</div>
              </div>
            </div>
            <div className="quick-action-item">
              <div className="quick-action-icon orange">
                <HiOutlineBanknotes />
              </div>
              <div>
                <div className="quick-action-text">Process Payroll</div>
                <div className="quick-action-sub">Run salary calculations</div>
              </div>
            </div>
            <div className="quick-action-item">
              <div className="quick-action-icon purple">
                <HiOutlineCalendarDays />
              </div>
              <div>
                <div className="quick-action-text">Schedule Meeting</div>
                <div className="quick-action-sub">Set up a team meeting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
