import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Classes from '../components/Classes';
import Enroll from '../components/Enroll';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import { jwtDecode } from 'jwt-decode';

import './Layout.css';

const Layout = () => {
  const [activePage, setActivePage] = useState('students');
  const [userRole, setUserRole] = useState('student');
  const [userName, setUserName] = useState('');
	const handlePageChange = (pageId) => {
		setActivePage(pageId);
	};
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token && token !== 'undefined' && token !== 'null') {
			try {
        const decoded = jwtDecode(token);				
        const role = decoded.role || 'student';
        const name = decoded.username || 'Guest';
        setUserRole(role);
        setUserName(name);
      }catch (err) {
				console.error('Token is malformed:', err);
				localStorage.removeItem('token');
			}
		} else {
			setUserRole('student');
		}
	}, []);
	

	const renderPage = () => {
		switch (activePage) {
			case 'students':
				return <Dashboard User={userRole}   />;//User here only has User ROLE
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
		<div className='layout'>
			<Sidebar activePage={activePage} onPageChange={handlePageChange} userName={userName} userRole={userRole} />
			<div className='layout-main'>
				<main className='layout-content' role='main'>
					{renderPage()}
				</main>
			</div>
		</div>
	);
};

export default Layout;
