import { useAuth } from '../../context/AuthContext';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineBell,
  HiOutlineEnvelope,
  HiOutlineBars3,
} from 'react-icons/hi2';
import './Topbar.css';

const Topbar = ({ toggleSidebar }) => {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="topbar">
      <div className="flex items-center gap-md">
        {/* Hamburger */}
        <button
          className="topbar-hamburger"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          id="topbar-hamburger-btn"
        >
          <HiOutlineBars3 />
        </button>

        {/* Search */}
        <div className="topbar-search">
          <HiOutlineMagnifyingGlass className="topbar-search-icon" />
          <input type="text" placeholder="Search..." id="topbar-search-input" />
          <span className="topbar-search-shortcut">⌘ F</span>
        </div>
      </div>

      {/* Right side */}
      <div className="topbar-right">
        <button className="topbar-icon-btn" aria-label="Messages" id="topbar-messages-btn">
          <HiOutlineEnvelope />
        </button>
        <button className="topbar-icon-btn" aria-label="Notifications" id="topbar-notifications-btn">
          <HiOutlineBell />
          <span className="notification-dot"></span>
        </button>

        {/* User */}
        <div className="topbar-user" id="topbar-user-profile">
          <div className="topbar-avatar">
            {getInitials(user?.username)}
          </div>
          <div className="topbar-user-info">
            <span className="topbar-user-name">{user?.username || 'User'}</span>
            <span className="topbar-user-role">{user?.role || 'Employee'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
