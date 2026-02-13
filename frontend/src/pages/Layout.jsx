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
		if (token) {
			try {
				const decoded = jwtDecode('token');
				setUserRole(decoded.role || 'student');
				setUserRole(decoded.username || 'User');
			} catch (error) {
				console.error('Invalid Token');
				setUserRole('student');
			}
		}
	}, []);

	const renderPage = () => {
		switch (activePage) {
			case 'students':
				return <Dashboard userRole={userRole} userName={userName} />;
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
			<Sidebar activePage={activePage} onPageChange={handlePageChange} />
			<div className='layout-main'>
				<main className='layout-content' role='main'>
					{renderPage()}
				</main>
			</div>
		</div>
	);
};

export default Layout;
