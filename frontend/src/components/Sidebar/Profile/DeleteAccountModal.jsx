import { useState } from 'react';
import { Trash2, AlertTriangle, Loader2, X } from 'lucide-react';
import { deleteUser } from '../../../api/authApi';
import { logout } from '../../../utils/auth';
import '../../../css/DeleteAccountModal.css';

const DeleteAccountModal = ({ username, onClose }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [deleting, setDeleting] = useState(false);

	const handleDelete = async () => {
		if (!email || !password) {
			setError('Please enter your email and password to confirm.');
			return;
		}
		setDeleting(true);
		setError('');
		try {
			await deleteUser({ email, password });
			logout();
		} catch (err) {
			setError(
				err.response?.data?.message ||
					'Failed to delete account. Check your credentials.',
			);
			setDeleting(false);
		}
	};

	return (
		<div
			className='dam-overlay'
			role='dialog'
			aria-modal='true'
			aria-labelledby='dam-title'
		>
			<div className='dam-modal'>
				<button
					className='dam-close'
					onClick={onClose}
					disabled={deleting}
					aria-label='Close'
				>
					<X size={18} />
				</button>

				<div className='dam-icon'>
					<AlertTriangle size={26} />
				</div>

				<h2 id='dam-title' className='dam-title'>
					Delete Account
				</h2>

				<p className='dam-lead'>
					You're about to permanently delete <strong>{username}</strong>'s
					account.
				</p>

				<ul className='dam-warning-list'>
					<li>All your enrolled classes will be removed</li>
					<li>Your profile and personal data will be erased</li>
					<li>Any classes you teach will be deleted</li>
					<li>
						This action is <strong>irreversible</strong>
					</li>
				</ul>

				<p className='dam-confirm-label'>Enter your credentials to confirm</p>

				<div className='dam-fields'>
					<div className='dam-field'>
						<label htmlFor='dam-email'>Email</label>
						<input
							id='dam-email'
							type='email'
							placeholder='your@email.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={deleting}
							autoComplete='email'
						/>
					</div>
					<div className='dam-field'>
						<label htmlFor='dam-password'>Password</label>
						<input
							id='dam-password'
							type='password'
							placeholder='••••••••'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={deleting}
							autoComplete='current-password'
						/>
					</div>
				</div>

				{error && (
					<div className='dam-error'>
						<AlertTriangle size={13} />
						<span>{error}</span>
					</div>
				)}

				<div className='dam-actions'>
					<button className='dam-cancel' onClick={onClose} disabled={deleting}>
						Cancel
					</button>
					<button
						className='dam-confirm'
						onClick={handleDelete}
						disabled={deleting}
					>
						{deleting ? (
							<>
								<Loader2 size={15} className='dam-spinner' /> Deleting…
							</>
						) : (
							<>
								<Trash2 size={15} /> Delete My Account
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteAccountModal;
