import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import '../Placeholder.css';

const Settings = () => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-card">
        <div className="placeholder-icon">
          <HiOutlineCog6Tooth />
        </div>
        <h1 className="placeholder-title">Settings</h1>
        <p className="placeholder-desc">
          Configure your account preferences, manage notifications, update your profile, and customize the platform.
        </p>
        <span className="placeholder-badge">Coming Soon</span>
      </div>
    </div>
  );
};

export default Settings;
