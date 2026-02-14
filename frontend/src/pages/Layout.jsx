import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Classes from '../components/Classes';
import Enroll from '../components/Enroll';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import { jwtDecode } from 'jwt-decode';
import { getUserFromToken } from '../utils/auth';
import './Layout.css';

const Layout = () => {
	const [activePage, setActivePage] = useState('students');
	const [userRole, setUserRole] = useState('student');
	const [userName, setUserName] = useState('');
	const [user, setUser] = useState(null);
	const handlePageChange = (pageId) => {
		setActivePage(pageId);
	};
	useEffect(() => {
		const userData = getUserFromToken();
		if (userData) {
			setUser(userData);
		}
	}, []);

	const renderPage = () => {
		switch (activePage) {
			case 'students':
				return <Dashboard userRole={user?.role} />; //User here only has User ROLE
			case 'classes':
				return <Classes />;
			case 'enroll':
				return <Enroll />;
			case 'profile':
				return <Profile user={user}/>;
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
