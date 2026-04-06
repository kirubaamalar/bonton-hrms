import { HiOutlineBanknotes } from 'react-icons/hi2';
import '../Placeholder.css';

const Payroll = () => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-card">
        <div className="placeholder-icon">
          <HiOutlineBanknotes />
        </div>
        <h1 className="placeholder-title">Payroll</h1>
        <p className="placeholder-desc">
          Process salaries, manage deductions, generate payslips, and maintain compliant payroll records.
        </p>
        <span className="placeholder-badge">Coming Soon</span>
      </div>
    </div>
  );
};

export default Payroll;
