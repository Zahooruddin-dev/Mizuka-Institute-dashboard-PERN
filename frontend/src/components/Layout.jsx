import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Classes from './Classes';
import Enroll from './Enroll';
import Profile from './Profile';
import Settings from './Settings';
import './Layout.css';

const Layout = () => {
  const [activePage, setActivePage] = useState('students');

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'students':
        return <Dashboard />;
      case 'classes':
        return <Classes />;
      case 'enroll':
        return <Enroll />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="layout">
      <Sidebar activePage={activePage} onPageChange={handlePageChange} />
      <div className="layout-main">
        <Navbar currentPage={activePage} />
        <main className="layout-content" role="main">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Layout;