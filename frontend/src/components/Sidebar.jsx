import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  UserPlus, 
  User, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activePage, onPageChange, userName = 'Guest', userRole = 'User' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, isMobile]);

  const menuItems = [
    { id: 'students', label: 'Students', icon: Users },
    { id: 'classes', label: 'Classes', icon: BookOpen },
    { id: 'enroll', label: 'Enroll', icon: UserPlus },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (id) => {
    onPageChange(id);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMobile && (
        <button
          className="mobile-toggle"
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {isMobile && isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside 
        className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              <BookOpen size={28} />
            </div>
            <h1 className="logo-text">EduPortal</h1>
          </div>
        </div>

        <nav className="sidebar-nav" role="navigation">
          <ul className="nav-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              
              return (
                <li key={item.id} className="nav-item">
                  <button
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    onClick={() => handleMenuClick(item.id)}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="nav-icon" size={20} />
                    <span className="nav-label">{item.label}</span>
                    {isActive && <span className="active-indicator" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info" role="region" aria-label="User info">
            <div className="user-avatar" aria-hidden="true">
              <User size={20} />
            </div>
            <div className="user-details">
              <p className="user-name" title={userName || 'Guest'}>{userName || 'Guest'}</p>
              <p className="user-role" title={userRole || 'User'}>{userRole || 'User'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;