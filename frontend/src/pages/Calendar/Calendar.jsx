import { HiOutlineCalendarDays } from 'react-icons/hi2';
import '../Placeholder.css';

const Calendar = () => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-card">
        <div className="placeholder-icon">
          <HiOutlineCalendarDays />
        </div>
        <h1 className="placeholder-title">Calendar</h1>
        <p className="placeholder-desc">
          View company events, holidays, team schedules, and important dates at a glance.
        </p>
        <span className="placeholder-badge">Coming Soon</span>
      </div>
    </div>
  );
};

export default Calendar;
