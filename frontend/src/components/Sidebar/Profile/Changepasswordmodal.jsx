import { useState } from 'react';
import {
	X,
	Lock,
	KeyRound,
	Loader,
	CheckCircle,
	AlertCircle,
} from 'lucide-react';
import { changePassword } from '../../../api/authApi';
import '../../../css/ChangePasswordModal.css';

const ChangePasswordModal = ({ onClose }) => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showCurrent, setShowCurrent] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const clearError = () => {
		if (error) setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (newPassword !== confirmPassword) {
			setError('New passwords do not match.');
			return;
		}
		if (newPassword.length < 6) {
			setError('New password must be at least 6 characters.');
			return;
		}
		if (currentPassword === newPassword) {
			setError('New password must be different from current password.');
			return;
		}

		setLoading(true);
		try {
			await changePassword({ currentPassword, newPassword });
			setSuccess(true);
		} catch (err) {
			setError(err.response?.data?.message || 'Failed to change password.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className='cp-overlay'
			role='dialog'
			aria-modal='true'
			aria-label='Change password'
		>
			<div className='cp-modal'>
				<div className='cp-header'>
					<div className='cp-header-left'>
						<div className='cp-icon'>
							<KeyRound size={20} />
						</div>
						<h3>Change Password</h3>
					</div>
					<button className='cp-close' onClick={onClose} aria-label='Close'>
						<X size={18} />
					</button>
				</div>

				{success ? (
					<div className='cp-success'>
						<CheckCircle size={40} />
						<p>Password changed successfully!</p>
						<button className='cp-done-btn' onClick={onClose}>
							Done
						</button>
					</div>
				) : (
					<form className='cp-form' onSubmit={handleSubmit} noValidate>
						{error && (
							<div className='cp-error' role='alert'>
								<AlertCircle size={16} />
								<span>{error}</span>
							</div>
						)}

						<div className='cp-field'>
							<label htmlFor='cp-current'>
								<Lock size={14} />
								Current Password
							</label>
							<div className='cp-input-wrap'>
								<input
									id='cp-current'
									type={showCurrent ? 'text' : 'password'}
									placeholder='Enter current password'
									value={currentPassword}
									onChange={(e) => {
										setCurrentPassword(e.target.value);
										clearError();
									}}
									required
									disabled={loading}
									autoComplete='current-password'
								/>
								<button
									type='button'
									className='cp-eye'
									onClick={() => setShowCurrent((v) => !v)}
									aria-label={showCurrent ? 'Hide' : 'Show'}
									disabled={loading}
								>
									{showCurrent ? '👁️' : '👁️‍🗨️'}
								</button>
							</div>
						</div>

						<div className='cp-field'>
							<label htmlFor='cp-new'>
								<Lock size={14} />
								New Password
							</label>
							<div className='cp-input-wrap'>
								<input
									id='cp-new'
									type={showNew ? 'text' : 'password'}
									placeholder='Enter new password'
									value={newPassword}
									onChange={(e) => {
										setNewPassword(e.target.value);
										clearError();
									}}
									required
									disabled={loading}
									autoComplete='new-password'
								/>
								<button
									type='button'
									className='cp-eye'
									onClick={() => setShowNew((v) => !v)}
									aria-label={showNew ? 'Hide' : 'Show'}
									disabled={loading}
								>
									{showNew ? '👁️' : '👁️‍🗨️'}
								</button>
							</div>
						</div>

						<div className='cp-field'>
							<label htmlFor='cp-confirm'>
								<Lock size={14} />
								Confirm New Password
							</label>
							<div className='cp-input-wrap'>
								<input
									id='cp-confirm'
									type={showConfirm ? 'text' : 'password'}
									placeholder='Confirm new password'
									value={confirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
										clearError();
									}}
									required
									disabled={loading}
									autoComplete='new-password'
								/>
								<button
									type='button'
									className='cp-eye'
									onClick={() => setShowConfirm((v) => !v)}
									aria-label={showConfirm ? 'Hide' : 'Show'}
									disabled={loading}
								>
									{showConfirm ? '👁️' : '👁️‍🗨️'}
								</button>
							</div>
						</div>

						<div className='cp-actions'>
							<button
								type='button'
								className='cp-cancel'
								onClick={onClose}
								disabled={loading}
							>
								Cancel
							</button>
							<button type='submit' className='cp-submit' disabled={loading}>
								{loading ? (
									<Loader size={16} className='cp-spinner' />
								) : (
									<KeyRound size={16} />
								)}
								{loading ? 'Saving…' : 'Change Password'}
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default ChangePasswordModal;
