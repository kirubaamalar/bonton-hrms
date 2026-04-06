import { HiOutlineUsers } from 'react-icons/hi2';
import '../Placeholder.css';

const Employees = () => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-card">
        <div className="placeholder-icon">
          <HiOutlineUsers />
        </div>
        <h1 className="placeholder-title">Employees</h1>
        <p className="placeholder-desc">
          Manage your workforce, view profiles, update records, and track employee performance — all from one place.
        </p>
        <span className="placeholder-badge">Coming Soon</span>
      </div>
    </div>
  );
};

export default Employees;
