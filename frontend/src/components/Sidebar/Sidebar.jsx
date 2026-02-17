import { useState, useEffect } from 'react';
import {
	Users,
	BookOpen,
	User,
	Settings,
	Menu,
	X,
	LogOut,
	Megaphone
} from 'lucide-react';
import '../../css/Sidebar.css';
import { logout } from '../../utils/auth';

const Sidebar = ({
	activePage,
	onPageChange,
	userName = 'Guest',
	userRole = 'User',
	userProfile = null,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const isStudent = userRole === 'student';

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
		...(isStudent ? [{ id: 'announcements', label: 'Announcements', icon: Megaphone }] : []),
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
					className='mobile-toggle'
					onClick={toggleSidebar}
					aria-label={isOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={isOpen}
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			)}

			{isMobile && isOpen && (
				<div
					className='sidebar-overlay'
					onClick={toggleSidebar}
					aria-hidden='true'
				/>
			)}

			<aside
				className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}
				aria-label='Main navigation'
			>
				<div className='sidebar-header'>
					<div className='logo-container'>
						<div className='logo-icon'>
							<BookOpen size={28} />
						</div>
						<h1 className='logo-text'>EduPortal</h1>
					</div>
				</div>

				<nav className='sidebar-nav' role='navigation'>
					<ul className='nav-list'>
						{menuItems.map((item) => {
							const Icon = item.icon;
							const isActive = activePage === item.id;

							return (
								<li key={item.id} className='nav-item'>
									<button
										className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
										onClick={() => handleMenuClick(item.id)}
										aria-label={item.label}
										aria-current={isActive ? 'page' : undefined}
									>
										<Icon className='nav-icon' size={20} />
										<span className='nav-label'>{item.label}</span>
										{isActive && (
											<span className='active-indicator' aria-hidden='true' />
										)}
									</button>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className='sidebar-footer'>
					<div className='user-info'>
						<div className='user-avatar' aria-hidden='true'>
							{userProfile ? (
								<img
									src={userProfile}
									alt={`${userName}'s avatar`}
									className='sidebar-avatar-img'
									onError={(e) => {
										e.target.style.display = 'none';
										const fallback = document.createElement('span');
										fallback.className = 'avatar-fallback';
										fallback.textContent = userName.charAt(0).toUpperCase();
										e.target.parentElement.appendChild(fallback);
									}}
								/>
							) : (
								<span className='avatar-fallback'>
									{userName.charAt(0).toUpperCase()}
								</span>
							)}
						</div>
						<div className='user-details'>
							<p className='user-name'>{userName || 'Guest'}</p>
							<p className='user-role'>{(userRole || 'User').toUpperCase()}</p>
						</div>
					</div>
					<button className='logout-btn' onClick={logout}>
						<LogOut size={18} />
						<span>Logout</span>
					</button>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;