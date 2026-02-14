import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Dashboard from '../components/Dashboard';
import Classes from '../components/Sidebar/Classes/Classes';
import Enroll from '../components/Sidebar/Enroll/Enroll';
import Profile from '../components/Sidebar/Profile/Profile';
import Settings from '../components/Sidebar/Settings/Settings';
import { getUserFromToken } from '../utils/auth';
import './Layout.css';

const Layout = () => {
	const [activePage, setActivePage] = useState('students');
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
