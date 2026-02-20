import { useState } from 'react';
import {
	Mail,
	Lock,
	KeyRound,
	AlertCircle,
	Loader,
	CheckCircle,
	ArrowLeft,
} from 'lucide-react';
import { requestReset, resetPassword } from '../../api/authApi';
import { Link, useNavigate } from 'react-router';
import '../../css/forgotPassword.css';

export default function ForgotPassword() {
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const clearError = () => {
		if (error) setError('');
	};

	const handleRequestCode = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			await requestReset({ email });
			setStep(2);
		} catch (err) {
			setError(err.response?.data?.message || 'Failed to send reset code.');
		} finally {
			setLoading(false);
		}
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();
		setError('');

		if (newPassword !== confirmPassword) {
			setError('Passwords do not match.');
			return;
		}
		if (newPassword.length < 6) {
			setError('Password must be at least 6 characters.');
			return;
		}

		setLoading(true);
		try {
			await resetPassword({ email, code, newPassword });
			navigate('/login');
		} catch (err) {
			setError(err.response?.data?.message || 'Invalid or expired code.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='auth-container'>
			<div className='auth-card'>
				<div className='auth-header'>
					<div className='auth-icon'>
						<KeyRound size={32} />
					</div>
					<h1>{step === 1 ? 'Forgot Password' : 'Reset Password'}</h1>
					<p>
						{step === 1
							? "Enter your email and we'll send you a reset code"
							: `Enter the code sent to ${email}`}
					</p>
				</div>

				{step === 1 ? (
					<form className='auth-form' onSubmit={handleRequestCode} noValidate>
						{error && (
							<div className='error-banner' role='alert' aria-live='polite'>
								<AlertCircle size={20} />
								<span>{error}</span>
							</div>
						)}

						<div className='input-group'>
							<label htmlFor='fp-email'>
								<Mail size={18} />
								<span>Email Address</span>
							</label>
							<input
								id='fp-email'
								type='email'
								placeholder='Enter your email'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									clearError();
								}}
								required
								autoComplete='email'
								aria-required='true'
								disabled={loading}
							/>
						</div>

						<button
							type='submit'
							className='submit-btn'
							disabled={loading}
							aria-busy={loading}
						>
							{loading ? (
								<>
									<Loader size={20} className='fp-spinner' />
									<span>Sending...</span>
								</>
							) : (
								<>
									<Mail size={20} />
									<span>Send Reset Code</span>
								</>
							)}
						</button>

						<div className='auth-footer'>
							<p>
								<Link to='/login' aria-label='Back to login'>
									<ArrowLeft
										size={14}
										style={{
											display: 'inline',
											verticalAlign: 'middle',
											marginRight: '4px',
										}}
									/>
									Back to Login
								</Link>
							</p>
						</div>
					</form>
				) : (
					<form className='auth-form' onSubmit={handleResetPassword} noValidate>
						{error && (
							<div className='error-banner' role='alert' aria-live='polite'>
								<AlertCircle size={20} />
								<span>{error}</span>
							</div>
						)}

						<div className='input-group'>
							<label htmlFor='fp-code'>
								<KeyRound size={18} />
								<span>Reset Code</span>
							</label>
							<input
								id='fp-code'
								type='text'
								placeholder='Enter the 6-digit code'
								value={code}
								onChange={(e) => {
									setCode(e.target.value);
									clearError();
								}}
								required
								autoComplete='one-time-code'
								aria-required='true'
								disabled={loading}
								maxLength={6}
								inputMode='numeric'
							/>
						</div>

						<div className='input-group'>
							<label htmlFor='fp-new-password'>
								<Lock size={18} />
								<span>New Password</span>
							</label>
							<div className='password-input-wrapper'>
								<input
									id='fp-new-password'
									type={showNew ? 'text' : 'password'}
									placeholder='Enter new password'
									value={newPassword}
									onChange={(e) => {
										setNewPassword(e.target.value);
										clearError();
									}}
									required
									autoComplete='new-password'
									aria-required='true'
									disabled={loading}
								/>
								<button
									type='button'
									className='password-toggle'
									onClick={() => setShowNew((v) => !v)}
									aria-label={showNew ? 'Hide password' : 'Show password'}
									disabled={loading}
								>
									{showNew ? '👁️' : '👁️‍🗨️'}
								</button>
							</div>
						</div>

						<div className='input-group'>
							<label htmlFor='fp-confirm-password'>
								<Lock size={18} />
								<span>Confirm Password</span>
							</label>
							<div className='password-input-wrapper'>
								<input
									id='fp-confirm-password'
									type={showConfirm ? 'text' : 'password'}
									placeholder='Confirm new password'
									value={confirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
										clearError();
									}}
									required
									autoComplete='new-password'
									aria-required='true'
									disabled={loading}
								/>
								<button
									type='button'
									className='password-toggle'
									onClick={() => setShowConfirm((v) => !v)}
									aria-label={showConfirm ? 'Hide password' : 'Show password'}
									disabled={loading}
								>
									{showConfirm ? '👁️' : '👁️‍🗨️'}
								</button>
							</div>
						</div>

						<button
							type='submit'
							className='submit-btn'
							disabled={loading}
							aria-busy={loading}
						>
							{loading ? (
								<>
									<Loader size={20} className='fp-spinner' />
									<span>Resetting...</span>
								</>
							) : (
								<>
									<CheckCircle size={20} />
									<span>Reset Password</span>
								</>
							)}
						</button>

						<div className='auth-footer'>
							<p>
								<button
									type='button'
									className='fp-back-link'
									onClick={() => {
										setStep(1);
										setError('');
										setCode('');
										setNewPassword('');
										setConfirmPassword('');
									}}
								>
									<ArrowLeft
										size={14}
										style={{
											display: 'inline',
											verticalAlign: 'middle',
											marginRight: '4px',
										}}
									/>
									Use a different email
								</button>
							</p>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
