import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineCog6Tooth,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';
import { RiLeafLine } from 'react-icons/ri';
import { TbBeach } from 'react-icons/tb';
import './Sidebar.css';

const menuItems = [
  {
    section: 'MENU',
    items: [
      { name: 'Dashboard', icon: HiOutlineSquares2X2, path: '/dashboard' },
      { name: 'Employees', icon: HiOutlineUsers, path: '/employees' },
      { name: 'Attendance', icon: HiOutlineClipboardDocumentCheck, path: '/attendance' },
      { name: 'Leave', icon: TbBeach, path: '/leave' },
      { name: 'Payroll', icon: HiOutlineBanknotes, path: '/payroll' },
      { name: 'Calendar', icon: HiOutlineCalendarDays, path: '/calendar' },
    ],
  },
  {
    section: 'GENERAL',
    items: [
      { name: 'Settings', icon: HiOutlineCog6Tooth, path: '/settings' },
      { name: 'Help', icon: HiOutlineQuestionMarkCircle, path: '#' },
    ],
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <RiLeafLine />
          </div>
          <div className="sidebar-logo-text">
            Bonton <span>HRMS</span>
          </div>
        </div>

        {/* Menu */}
        <nav className="sidebar-menu">
          {menuItems.map((section) => (
            <div key={section.section}>
              <div className="sidebar-section">
                <div className="sidebar-section-label">{section.section}</div>
              </div>

              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? 'active' : ''}`
                  }
                  onClick={() => {
                    if (window.innerWidth <= 768) toggleSidebar();
                  }}
                >
                  <span className="sidebar-item-icon">
                    <item.icon />
                  </span>
                  <span className="sidebar-item-text">{item.name}</span>
                </NavLink>
              ))}
            </div>
          ))}

          {/* Logout */}
          <div className="sidebar-section">
            <div className="sidebar-section-label" style={{ marginTop: 8 }}></div>
          </div>
          <button
            className="sidebar-item sidebar-logout"
            onClick={handleLogout}
            id="sidebar-logout-btn"
          >
            <span className="sidebar-item-icon">
              <HiOutlineArrowRightOnRectangle />
            </span>
            <span className="sidebar-item-text">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
