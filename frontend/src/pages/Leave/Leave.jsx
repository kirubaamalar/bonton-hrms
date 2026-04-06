import { TbBeach } from 'react-icons/tb';
import '../Placeholder.css';

const Leave = () => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-card">
        <div className="placeholder-icon">
          <TbBeach />
        </div>
        <h1 className="placeholder-title">Leave Management</h1>
        <p className="placeholder-desc">
          Apply for leaves, review requests, manage leave balances, and keep your team calendar organized.
        </p>
        <span className="placeholder-badge">Coming Soon</span>
      </div>
    </div>
  );
};

export default Leave;
