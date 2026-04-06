import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import '../Placeholder.css';

const Attendance = () => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-card">
        <div className="placeholder-icon">
          <HiOutlineClipboardDocumentCheck />
        </div>
        <h1 className="placeholder-title">Attendance</h1>
        <p className="placeholder-desc">
          Track daily attendance, monitor check-in/check-out times, and generate attendance reports effortlessly.
        </p>
        <span className="placeholder-badge">Coming Soon</span>
      </div>
    </div>
  );
};

export default Attendance;
