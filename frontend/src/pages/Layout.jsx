import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Dashboard from './Dashboard';
import Classes from '../components/Sidebar/Classes/Classes';
import Enroll from '../components/Sidebar/Enroll/Enroll';
import Profile from '../components/Sidebar/Profile/Profile';
import Settings from '../components/Sidebar/Settings/Settings';
import { getUserFromToken } from '../utils/auth';
import '../css/Layout.css';

const Layout = () => {
	const [activePage, setActivePage] = useState('students');
	const [user, setUser] = useState(null);

	const loadUserData = () => {
		const userData = getUserFromToken();
		if (userData) {
			setUser(userData);
		}
	};

	const handlePageChange = (pageId) => {
		setActivePage(pageId);
		if (pageId === 'profile') {
			loadUserData();
		}
	};

	useEffect(() => {
		loadUserData();
	}, []);

	useEffect(() => {
		const handleStorageChange = () => {
			loadUserData();
		};

		window.addEventListener('storage', handleStorageChange);
		
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	const renderPage = () => {
		switch (activePage) {
			case 'students':
				return <Dashboard userRole={user?.role} />;
			case 'classes':
				return <Classes />;
			case 'enroll':
				return <Enroll />;
			case 'profile':
				return <Profile user={user} key={user?.profile} />;
			case 'settings':
				return <Settings />;
			default:
				return <Dashboard userRole={user?.role} />;
		}
	};

	return (
		<div className='layout'>
			<Sidebar
				userName={user?.username}
				userRole={user?.role}
				onPageChange={handlePageChange}
			/>
			<div className='layout-main'>{renderPage()}</div>
		</div>
	);
};

export default Layout;