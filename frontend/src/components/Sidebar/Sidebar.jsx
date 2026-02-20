import { useState, useEffect } from 'react';
import {
	Users,
	BookOpen,
	User,
	Settings,
	Menu,
	X,
	LogOut,
	Megaphone,
	ChevronLeft,
	ChevronRight,
	DoorOpen,
	PanelLeftClose,
	PanelLeftOpen,
} from 'lucide-react';
import '../../css/Sidebar.css';
import { logout } from '../../utils/auth';

const ROLE_META = {
	student: {
		label: 'Student',
		color: '#0ea5e9',
		bg: 'rgba(14,165,233,0.1)',
		border: 'rgba(14,165,233,0.25)',
	},
	teacher: {
		label: 'Teacher',
		color: '#8b5cf6',
		bg: 'rgba(139,92,246,0.1)',
		border: 'rgba(139,92,246,0.25)',
	},
	admin: {
		label: 'Admin',
		color: '#f59e0b',
		bg: 'rgba(245,158,11,0.1)',
		border: 'rgba(245,158,11,0.25)',
	},
};

const getRoleMeta = (role) =>
	ROLE_META[role?.toLowerCase()] ?? {
		label: role ?? 'User',
		color: '#64748b',
		bg: 'rgba(100,116,139,0.1)',
		border: 'rgba(100,116,139,0.2)',
	};

const Sidebar = ({
	activePage,
	onPageChange,
	userName = 'Guest',
	userRole = 'User',
	userProfile = null,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const isTeacher = userRole === 'teacher';
	const roleMeta = getRoleMeta(userRole);

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
		document.body.style.overflow = isOpen && isMobile ? 'hidden' : 'unset';
	}, [isOpen, isMobile]);

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--sidebar-width',
			isMobile ? '280px' : collapsed ? '72px' : '280px',
		);
	}, [collapsed, isMobile]);

	const menuItems = [
		...(isTeacher
			? [{ id: 'teacher-classes', label: 'Your Classes', icon: BookOpen }]
			: [
					{ id: 'enrolled-classes', label: 'Enrolled Classes', icon: DoorOpen },
				]),
		{ id: 'classes', label: 'Class Directory', icon: BookOpen },
		{ id: 'announcements', label: 'Announcements', icon: Megaphone },
		{ id: 'profile', label: 'Profile', icon: User },
		{ id: 'settings', label: 'Settings', icon: Settings },
	];

	const handleMenuClick = (id) => {
		onPageChange(id);
		if (isMobile) setIsOpen(false);
	};

	return (
		<>
			{isMobile && (
				<button
					className='mobile-toggle'
					onClick={() => setIsOpen((v) => !v)}
					aria-label={isOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={isOpen}
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			)}

			{isMobile && isOpen && (
				<div
					className='sidebar-overlay'
					onClick={() => setIsOpen(false)}
					aria-hidden='true'
				/>
			)}

			<aside
				className={[
					'sidebar',
					isOpen ? 'sidebar-open' : '',
					collapsed ? 'sidebar-collapsed' : '',
				]
					.join(' ')
					.trim()}
				aria-label='Main navigation'
			>
				<div className='sidebar-header'>
					<div className='logo-container'>
						<div className='logo-icon'>
							<BookOpen size={28} />
						</div>
						<h1 className='logo-text'>EduPortal</h1>
					</div>

					{!isMobile && (
						<button
							className='collapse-btn'
							onClick={() => setCollapsed((v) => !v)}
							aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
							title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
						>
							{collapsed ? (
								<PanelLeftOpen size={16} />
							) : (
								<PanelLeftClose size={16} />
							)}
							{!collapsed && (
								<span className='collapse-btn-label'>Collapse</span>
							)}
						</button>
					)}
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
										title={collapsed ? item.label : undefined}
									>
										<Icon className='nav-icon' size={20} />
										{!collapsed && (
											<span className='nav-label'>{item.label}</span>
										)}
										{isActive && !collapsed && (
											<span className='active-indicator' aria-hidden='true' />
										)}
									</button>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className='sidebar-footer'>
					{!collapsed && (
						<button
							className='user-info'
							onClick={() => handleMenuClick('profile')}
							aria-label='Go to profile'
						>
							<div className='user-avatar' aria-hidden='true'>
								{userProfile ? (
									<img
										src={userProfile}
										alt={`${userName}'s avatar`}
										className='sidebar-avatar-img'
										onError={(e) => {
											e.target.style.display = 'none';
											const fb = document.createElement('span');
											fb.className = 'avatar-fallback';
											fb.textContent = userName.charAt(0).toUpperCase();
											e.target.parentElement.appendChild(fb);
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
								<span
									className='role-badge'
									style={{
										color: roleMeta.color,
										background: roleMeta.bg,
										borderColor: roleMeta.border,
									}}
								>
									{roleMeta.label}
								</span>
							</div>
						</button>
					)}

					{collapsed && (
						<button
							className='user-avatar-mini'
							onClick={() => handleMenuClick('profile')}
							title={`${userName} — view profile`}
							aria-label='Go to profile'
						>
							{userProfile ? (
								<img
									src={userProfile}
									alt={`${userName}'s avatar`}
									className='sidebar-avatar-img'
								/>
							) : (
								<span className='avatar-fallback'>
									{userName.charAt(0).toUpperCase()}
								</span>
							)}
						</button>
					)}

					<button
						className='logout-btn'
						onClick={logout}
						title={collapsed ? 'Logout' : undefined}
						aria-label='Logout'
					>
						<LogOut size={18} />
						{!collapsed && <span>Logout</span>}
					</button>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
