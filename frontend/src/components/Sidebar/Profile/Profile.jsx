import { useState, useEffect } from 'react';
import {
	User,
	Mail,
	Shield,
	Calendar,
	Edit,
	Camera,
	Key,
	Activity,
	IdCard,
	Trash2,
} from 'lucide-react';
import '../../../css/Profile.css';
import { updateUsername } from '../../../api/authApi';
import DeleteAccountModal from './DeleteAccountModal';

const Profile = ({ user, profileImageUrl, onProfileUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newName, setNewName] = useState(user?.username || '');
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [currentUser, setCurrentUser] = useState(user);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);

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
		if (previewUrl) return previewUrl;
		return profileImageUrl;
	};

	return (
		<div className='page-container'>
			<div className='page-header'>
				<div className='page-icon'>
					<User size={32} />
				</div>
				<div className='header-content'>
					<h1 className='page-heading'>Profile</h1>
					<p className='page-description'>
						Account overview and personal information
					</p>
				</div>
			</div>

			<div className='profile-content'>
				<div className='profile-card'>
					{error && <div className='error-message'>{error}</div>}

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
											e.target.parentElement.textContent = currentUser?.username
												?.charAt(0)
												.toUpperCase();
										}}
									/>
								) : (
									currentUser?.username?.charAt(0).toUpperCase()
								)}
							</div>

							{isEditing && (
								<>
									<label htmlFor='file-upload' className='avatar-edit-button'>
										<Camera size={16} />
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
							<h2 className='profile-name'>
								{currentUser?.username || 'User'}
							</h2>
							<span
								className={`role-badge ${getRoleBadgeColor(currentUser?.role)}`}
							>
								<Shield size={14} />
								{currentUser?.role || 'User'}
							</span>
							<div className='profile-meta'>
								<span>
									<IdCard size={14} />
									ID: {currentUser?.id}
								</span>
								<span>
									<Calendar size={14} />
									Joined {formatDate(currentUser?.createdAt)}
								</span>
							</div>
						</div>
					</div>

					<div className='profile-details'>
						<div className='detail-section'>
							<h3 className='section-title'>Personal Information</h3>
							<div className='detail-grid'>
								<div className='detail-item'>
									<div className='detail-icon'>
										<User size={18} />
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
											<p className='detail-value'>{currentUser?.username}</p>
										)}
									</div>
								</div>

								<div className='detail-item'>
									<div className='detail-icon'>
										<Mail size={18} />
									</div>
									<div className='detail-content'>
										<p className='detail-label'>Email</p>
										<p className='detail-value'>{currentUser?.email}</p>
									</div>
								</div>

								<div className='detail-item'>
									<div className='detail-icon'>
										<Shield size={18} />
									</div>
									<div className='detail-content'>
										<p className='detail-label'>Role</p>
										<p className='detail-value'>{currentUser?.role}</p>
									</div>
								</div>

								<div className='detail-item'>
									<div className='detail-icon'>
										<Activity size={18} />
									</div>
									<div className='detail-content'>
										<p className='detail-label'>Account ID</p>
										<p className='detail-value'>{currentUser?.id}</p>
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
										<Edit size={18} />
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
										<Edit size={18} />
										Edit Profile
									</button>
									<button className='action-btn secondary'>
										<Key size={18} />
										Change Password
									</button>
								</>
							)}
						</div>

						<div className='danger-zone'>
							<h3 className='danger-zone-title'>Danger Zone</h3>
							<div className='danger-zone-body'>
								<div className='danger-zone-info'>
									<p className='danger-zone-label'>Delete Account</p>
									<p className='danger-zone-desc'>
										Permanently delete your account and all associated data.
										This cannot be undone.
									</p>
								</div>
								<button
									className='delete-account-btn'
									onClick={() => setShowDeleteModal(true)}
								>
									<Trash2 size={16} />
									Delete Account
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className='activity-card'>
					<h3 className='activity-title'>Account Activity</h3>
					<div className='activity-list'>
						<div className='activity-item'>
							<div className='activity-dot'></div>
							<div className='activity-content'>
								<p className='activity-text'>Account created</p>
								<p className='activity-time'>
									{formatDate(currentUser?.createdAt)}
								</p>
							</div>
						</div>
						<div className='activity-item'>
							<div className='activity-dot'></div>
							<div className='activity-content'>
								<p className='activity-text'>Profile last updated</p>
								<p className='activity-time'>Recently</p>
							</div>
						</div>
						<div className='activity-item'>
							<div className='activity-dot'></div>
							<div className='activity-content'>
								<p className='activity-text'>
									Role assigned: {currentUser?.role}
								</p>
								<p className='activity-time'>
									{formatDate(currentUser?.createdAt)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{showDeleteModal && (
				<DeleteAccountModal
					username={currentUser?.username}
					onClose={() => setShowDeleteModal(false)}
				/>
			)}
		</div>
	);
};

export default Profile;
