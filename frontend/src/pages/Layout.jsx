import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Classes from '../components/Sidebar/Classes/Classes';
import Announcements from '../components/Sidebar/Announcements/Announcements';
import Profile from '../components/Sidebar/Profile/Profile';
import TeacherClasses from '../components/Sidebar/TeacherClasses/TeacherClasses';
import { useAuth } from '../utils/AuthContext';
import '../css/Layout.css';
import Enrolled from '../components/Sidebar/Enrolled/Enrolled';

const Layout = () => {
	const [activePage, setActivePage] = useState(null);
	const { user, refreshUser } = useAuth();
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [imageTimestamp, setImageTimestamp] = useState(Date.now());
	const [visitedPages, setVisitedPages] = useState(new Set());

	const handlePageChange = (pageId) => {
		if (activePage !== pageId) {
			setActivePage(pageId);
			setVisitedPages((prev) => new Set(prev).add(pageId));
			if (pageId === 'profile') refreshUser();
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
		refreshUser();
	};

	useEffect(() => {
		if (user && isInitialLoad) {
			const startPage =
				user.role === 'teacher'
					? 'teacher-classes'
					: user.role === 'student'
						? 'enrolled-classes'
						: 'profile';
			setActivePage(startPage);
			setVisitedPages(new Set([startPage]));
			setIsInitialLoad(false);
		}
	}, [user, isInitialLoad]);

	const pages = [
		{ id: 'enrolled-classes', component: <Enrolled userId={user?.id} /> },
		{
			id: 'classes',
			component: <Classes currentUser={user?.role} currentUserId={user?.id} />,
		},
		{
			id: 'teacher-classes',
			component: <TeacherClasses currentUserId={user?.id} />,
		},
		{ id: 'announcements', component: <Announcements userRole={user?.role} /> },
		{
			id: 'profile',
			component: (
				<Profile
					user={user}
					profileImageUrl={getProfileImageUrl()}
					onProfileUpdate={handleProfileUpdate}
				/>
			),
		},
	];

	return (
		<div className='layout'>
			<Sidebar
				activePage={activePage}
				userName={user?.username}
				userRole={user?.role}
				userProfile={getProfileImageUrl()}
				onPageChange={handlePageChange}
			/>
			<main className='layout-main'>
				<div className='layout-content'>
					{pages.map(({ id, component }) => {
						if (!visitedPages.has(id)) return null;
						return (
							<div
								key={id}
								style={{ display: activePage === id ? 'block' : 'none' }}
							>
								{component}
							</div>
						);
					})}
				</div>
			</main>
		</div>
	);
};

export default Layout;
