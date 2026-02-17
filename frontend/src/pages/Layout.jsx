import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Dashboard from './Dashboard';
import Classes from '../components/Sidebar/Classes/Classes';
import Announcements from '../components/Sidebar/Announcements/Announcements';
import Profile from '../components/Sidebar/Profile/Profile';
import Settings from '../components/Sidebar/Settings/Settings';
import { getUserFromToken } from '../utils/auth';
import '../css/Layout.css';

const Layout = () => {
	const [activePage, setActivePage] = useState('students');
	const [user, setUser] = useState(null);
	const [imageTimestamp, setImageTimestamp] = useState(Date.now());

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

	const getProfileImageUrl = () => {
		if (user?.profile) {
			return `http://localhost:3000${user.profile}?t=${imageTimestamp}`;
		}
		return null;
	};

	const handleProfileUpdate = () => {
		setImageTimestamp(Date.now());
		loadUserData();
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
				return <Classes currentUser={user?.role} currentUserId = {user?.id}/>;
				case 'teacher-classes':
  return <TeacherClasses currentUserId={user?.id} />;
			case 'enroll':
				return <Announcements userRole={user?.role}/>;
			case 'profile':
				return (
					<Profile 
						user={user} 
						profileImageUrl={getProfileImageUrl()}
						onProfileUpdate={handleProfileUpdate}
					/>
				);
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
				userProfile={getProfileImageUrl()}
			/>
			<div className='layout-main'>{renderPage()}</div>
		</div>
	);
};

export default Layout;