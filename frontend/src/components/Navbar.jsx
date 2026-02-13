import { Bell, Search, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ currentPage }) => {
  const pageNames = {
    students: 'Students',
    classes: 'Classes',
    enroll: 'Enrollment',
    profile: 'Profile',
    settings: 'Settings',
  };

  return (
    <header className="navbar" role="banner">
      <div className="navbar-content">
        <div className="navbar-left">
          <h2 className="page-title">{pageNames[currentPage] || 'Dashboard'}</h2>
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#home">Home</a>
              </li>
              <li className="breadcrumb-separator" aria-hidden="true">/</li>
              <li className="breadcrumb-item breadcrumb-current" aria-current="page">
                {pageNames[currentPage] || 'Dashboard'}
              </li>
            </ol>
          </nav>
        </div>

        <div className="navbar-right">
          <div className="search-container">
            <Search className="search-icon" size={18} aria-hidden="true" />
            <input
              type="search"
              className="search-input"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>

          <button 
            className="notification-btn" 
            aria-label="Notifications"
            aria-haspopup="true"
          >
            <Bell size={20} />
            <span className="notification-badge" aria-label="3 unread notifications">
              3
            </span>
          </button>

          <div className="user-menu">
            <button 
              className="user-menu-btn"
              aria-label="User menu"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="user-menu-avatar">
                <span>AU</span>
              </div>
              <span className="user-menu-name">Admin</span>
              <ChevronDown size={16} className="user-menu-icon" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;