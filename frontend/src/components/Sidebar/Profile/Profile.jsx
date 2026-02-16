import { useState, useEffect } from 'react';
import '../../../css/Profile.css';
import { updateUsername } from '../../../api/authApi';

const Icon = ({ type, size = 24 }) => {
	const icons = {
		user: '👤',
		mail: '✉️',
		shield: '🛡️',
		calendar: '📅',
		edit: '✏️',
		camera: '📷',
	};

	return (
		<span
			style={{
				fontSize: `${size}px`,
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				lineHeight: 1,
			}}
		>
			{icons[type] || '•'}
		</span>
	);
};

const Profile = ({ user, profileImageUrl, onProfileUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newName, setNewName] = useState(user?.username || '');
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [currentUser, setCurrentUser] = useState(user);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		setCurrentUser(user);
		setNewName(user?.username || '');
	}, [user]);

	const formatDate = (dateString) => {
		if (!dateString) return 'N/A';
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file);
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		}
	};

	const handleSave = async () => {
		setLoading(true);
		setError('');

		try {
			const formData = new FormData();
			formData.append('id', currentUser.id);
			formData.append('newUsername', newName);
			
			if (selectedFile) {
				formData.append('image', selectedFile);
			}

			const response = await updateUsername(formData);
			
			if (response.data.token) {
				localStorage.setItem('token', response.data.token);
			}

			if (response.data.user) {
				setCurrentUser(response.data.user);
			}

			setIsEditing(false);
			setSelectedFile(null);
			
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
				setPreviewUrl(null);
			}

			if (onProfileUpdate) {
				onProfileUpdate();
			}

			window.location.reload();
		} catch (err) {
			console.error('Update failed:', err);
			setError(err.response?.data?.message || 'Failed to update profile');
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setNewName(currentUser?.username || '');
		setSelectedFile(null);
		
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
		
		setIsEditing(false);
		setError('');
	};

	const getRoleBadgeColor = (role) => {
		switch (role?.toLowerCase()) {
			case 'admin':
				return 'role-admin';
			case 'teacher':
				return 'role-teacher';
			case 'student':
				return 'role-student';
			default:
				return 'role-default';
		}
	};

	const getCurrentDisplayImage = () => {
		if (previewUrl) {
			return previewUrl;
		}
		return profileImageUrl;
	};

	return (
		<div className='page-container'>
			<div className='page-header'>
				<div className='page-icon'>
					<Icon type='user' size={32} />
				</div>
				<div className='header-content'>
					<h1 className='page-heading'>Profile</h1>
					<p className='page-description'>
						View and manage your profile information
					</p>
				</div>
			</div>

			<div className='profile-content'>
				<div className='profile-card'>
					{error && (
						<div style={{
							padding: '12px',
							marginBottom: '16px',
							background: '#fee',
							color: '#c00',
							borderRadius: '8px',
							fontSize: '14px'
						}}>
							{error}
						</div>
					)}

					<div className='profile-header-section'>
						<div className='avatar-section'>
							<div className='avatar-large'>
								{getCurrentDisplayImage() ? (
									<img 
										src={getCurrentDisplayImage()} 
										alt='Profile' 
										className='avatar-img'
										onError={(e) => {
											e.target.style.display = 'none';
											e.target.parentElement.textContent = currentUser?.username?.charAt(0).toUpperCase();
										}}
									/>
								) : (
									currentUser?.username?.charAt(0).toUpperCase()
								)}
							</div>

							{isEditing && (
								<>
									<label htmlFor='file-upload' className='avatar-edit-button'>
										<Icon type='camera' size={16} />
									</label>
									<input
										id='file-upload'
										type='file'
										accept='image/*'
										style={{ display: 'none' }}
										onChange={handleFileChange}
									/>
								</>
							)}
						</div>
						<div className='profile-header-info'>
							<h2 className='profile-name'>{currentUser?.username || 'User'}</h2>
							<span className={`role-badge ${getRoleBadgeColor(currentUser?.role)}`}>
								<Icon type='shield' size={14} />
								{currentUser?.role || 'User'}
							</span>
						</div>
					</div>

					<div className='profile-details'>
						<div className='detail-section'>
							<h3 className='section-title'>Personal Information</h3>
							<div className='detail-grid'>
								<div className='detail-item'>
									<div className='detail-icon'>
										<Icon type='user' size={18} />
									</div>
									<div className='detail-content'>
										<p className='detail-label'>Username</p>
										{isEditing ? (
											<input
												className='edit-input'
												value={newName}
												onChange={(e) => setNewName(e.target.value)}
											/>
										) : (
											<p className='detail-value'>
												{currentUser?.username || 'Not set'}
											</p>
										)}
									</div>
								</div>

								<div className='detail-item'>
									<div className='detail-icon'>
										<Icon type='mail' size={18} />
									</div>
									<div className='detail-content'>
										<p className='detail-label'>Email Address</p>
										<p className='detail-value'>{currentUser?.email || 'Not set'}</p>
									</div>
								</div>

								<div className='detail-item'>
									<div className='detail-icon'>
										<Icon type='shield' size={18} />
									</div>
									<div className='detail-content'>
										<p className='detail-label'>Role</p>
										<p className='detail-value'>
											{currentUser?.role || 'Not assigned'}
										</p>
									</div>
								</div>

								<div className='detail-item'>
									<div className='detail-icon'>
										<Icon type='calendar' size={18} />
									</div>
									<div className='detail-content'>
										<p className='detail-label'>Member Since</p>
										<p className='detail-value'>
											{formatDate(currentUser?.createdAt) || 'N/A'}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className='detail-section'>
							<h3 className='section-title'>Account Status</h3>
							<div className='status-grid'>
								<div className='status-card'>
									<div className='status-indicator active'></div>
									<div>
										<p className='status-label'>Account Status</p>
										<p className='status-value'>Active</p>
									</div>
								</div>
								<div className='status-card'>
									<div className='status-indicator verified'></div>
									<div>
										<p className='status-label'>Email Verified</p>
										<p className='status-value'>Verified</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='profile-actions'>
						{isEditing ? (
							<>
								<button 
									className='action-btn primary' 
									onClick={handleSave}
									disabled={loading}
								>
									<Icon type='edit' size={18} />
									{loading ? 'Saving...' : 'Save Changes'}
								</button>
								<button 
									className='action-btn secondary' 
									onClick={handleCancel}
									disabled={loading}
								>
									Cancel
								</button>
							</>
						) : (
							<>
								<button
									className='action-btn primary'
									onClick={() => setIsEditing(true)}
								>
									<Icon type='edit' size={18} />
									Edit Profile
								</button>
								<button className='action-btn secondary'>
									Change Password
								</button>
							</>
						)}
					</div>
				</div>

				<div className='activity-card'>
					<h3 className='activity-title'>Recent Activity</h3>
					<div className='activity-list'>
						<div className='activity-item'>
							<div className='activity-dot'></div>
							<div className='activity-content'>
								<p className='activity-text'>Profile viewed</p>
								<p className='activity-time'>Just now</p>
							</div>
						</div>
						<div className='activity-item'>
							<div className='activity-dot'></div>
							<div className='activity-content'>
								<p className='activity-text'>Logged in successfully</p>
								<p className='activity-time'>2 hours ago</p>
							</div>
						</div>
						<div className='activity-item'>
							<div className='activity-dot'></div>
							<div className='activity-content'>
								<p className='activity-text'>Password changed</p>
								<p className='activity-time'>3 days ago</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;