import { useState } from 'react';
import {
	Mail,
	Lock,
	KeyRound,
	AlertCircle,
	Loader,
	CheckCircle,
	ArrowLeft,
	Eye,
	EyeOff,
} from 'lucide-react';
import { requestReset, resetPassword } from '../../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/auth.css';

export default function ForgotPassword() {
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [fieldErrors, setFieldErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [success, setSuccess] = useState(false);

	const clearError = (field) => {
		if (error) setError('');
		if (field && fieldErrors[field])
			setFieldErrors((prev) => ({ ...prev, [field]: '' }));
	};

	const handleRequestCode = async (e) => {
		e.preventDefault();
		setError('');
		if (!email) {
			setFieldErrors({ email: 'Email is required.' });
			return;
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			setFieldErrors({ email: 'Enter a valid email address.' });
			return;
		}

		setLoading(true);
		try {
			await requestReset({ email });
			setStep(2);
		} catch (err) {
			setError(
				err.response?.data?.message || 'Failed to send reset code. Try again.',
			);
		} finally {
			setLoading(false);
		}
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();
		setError('');
		const errs = {};
		if (!code || code.length !== 6) errs.code = 'Enter the 6-digit code.';
		if (!newPassword || newPassword.length < 6)
			errs.newPassword = 'Password must be at least 6 characters.';
		if (newPassword !== confirmPassword)
			errs.confirmPassword = 'Passwords do not match.';
		if (Object.keys(errs).length) {
			setFieldErrors(errs);
			return;
		}

		setLoading(true);
		try {
			await resetPassword({ email, code, newPassword });
			setSuccess(true);
			setTimeout(() => navigate('/login'), 2000);
		} catch (err) {
			setError(err.response?.data?.message || 'Invalid or expired code.');
		} finally {
			setLoading(false);
		}
	};

	const goBack = () => {
		setStep(1);
		setError('');
		setFieldErrors({});
		setCode('');
		setNewPassword('');
		setConfirmPassword('');
	};

	if (success) {
		return (
			<div className='auth-container'>
				<main
					className='auth-card auth-card--success'
					aria-labelledby='auth-heading'
				>
					<div className='auth-success-icon' aria-hidden='true'>
						<CheckCircle size={40} />
					</div>
					<h1 id='auth-heading'>Password Reset!</h1>
					<p>Your password has been updated. Redirecting you to login…</p>
				</main>
			</div>
		);
	}

	return (
		<div className='auth-container'>
			<a href='#fp-form' className='skip-link'>
				Skip to form
			</a>
			<main className='auth-card' aria-labelledby='auth-heading'>
				<div className='auth-header'>
					<div className='auth-icon' aria-hidden='true'>
						<KeyRound size={28} />
					</div>
					<h1 id='auth-heading'>
						{step === 1 ? 'Forgot Password' : 'Reset Password'}
					</h1>
					<p>
						{step === 1
							? "Enter your email and we'll send you a reset code"
							: `Enter the code sent to ${email}`}
					</p>
				</div>

				{step === 1 ? (
					<form
						id='fp-form'
						className='auth-form'
						onSubmit={handleRequestCode}
						noValidate
						aria-label='Request password reset'
					>
						{error && (
							<div className='error-banner' role='alert' aria-live='assertive'>
								<AlertCircle size={18} aria-hidden='true' />
								<span>{error}</span>
							</div>
						)}

						<div className='input-group'>
							<label htmlFor='fp-email'>
								<Mail size={16} aria-hidden='true' />
								<span>Email Address</span>
							</label>
							<input
								id='fp-email'
								type='email'
								placeholder='Enter your email'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									clearError('email');
								}}
								required
								autoComplete='email'
								aria-required='true'
								aria-invalid={!!fieldErrors.email}
								aria-describedby={
									fieldErrors.email ? 'fp-email-error' : undefined
								}
								disabled={loading}
							/>
							{fieldErrors.email && (
								<span id='fp-email-error' className='field-error' role='alert'>
									<AlertCircle size={13} aria-hidden='true' />
									{fieldErrors.email}
								</span>
							)}
						</div>

						<button
							type='submit'
							className='submit-btn'
							disabled={loading}
							aria-busy={loading}
						>
							{loading ? (
								<>
									<Loader size={18} className='spinner' aria-hidden='true' />
									<span>Sending…</span>
								</>
							) : (
								<>
									<Mail size={18} aria-hidden='true' />
									<span>Send Reset Code</span>
								</>
							)}
						</button>

						<div className='auth-footer'>
							<p>
								<Link to='/login' className='back-link'>
									<ArrowLeft size={14} aria-hidden='true' />
									Back to Login
								</Link>
							</p>
						</div>
					</form>
				) : (
					<form
						id='fp-form'
						className='auth-form'
						onSubmit={handleResetPassword}
						noValidate
						aria-label='Reset password'
					>
						{error && (
							<div className='error-banner' role='alert' aria-live='assertive'>
								<AlertCircle size={18} aria-hidden='true' />
								<span>{error}</span>
							</div>
						)}

						<div className='input-group'>
							<label htmlFor='fp-code'>
								<KeyRound size={16} aria-hidden='true' />
								<span>Reset Code</span>
							</label>
							<input
								id='fp-code'
								type='text'
								placeholder='Enter the 6-digit code'
								value={code}
								onChange={(e) => {
									setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
									clearError('code');
								}}
								required
								autoComplete='one-time-code'
								aria-required='true'
								aria-invalid={!!fieldErrors.code}
								aria-describedby={
									fieldErrors.code ? 'fp-code-error' : 'fp-code-hint'
								}
								disabled={loading}
								maxLength={6}
								inputMode='numeric'
							/>
							{fieldErrors.code ? (
								<span id='fp-code-error' className='field-error' role='alert'>
									<AlertCircle size={13} aria-hidden='true' />
									{fieldErrors.code}
								</span>
							) : (
								<span id='fp-code-hint' className='field-hint'>
									Check your email for the 6-digit code
								</span>
							)}
						</div>

						<div className='input-group'>
							<label htmlFor='fp-new-password'>
								<Lock size={16} aria-hidden='true' />
								<span>New Password</span>
							</label>
							<div className='password-input-wrapper'>
								<input
									id='fp-new-password'
									type={showNew ? 'text' : 'password'}
									placeholder='At least 6 characters'
									value={newPassword}
									onChange={(e) => {
										setNewPassword(e.target.value);
										clearError('newPassword');
									}}
									required
									autoComplete='new-password'
									aria-required='true'
									aria-invalid={!!fieldErrors.newPassword}
									aria-describedby={
										fieldErrors.newPassword ? 'fp-new-pw-error' : undefined
									}
									disabled={loading}
								/>
								<button
									type='button'
									className='password-toggle'
									onClick={() => setShowNew((v) => !v)}
									aria-label={showNew ? 'Hide password' : 'Show password'}
									aria-pressed={showNew}
									disabled={loading}
								>
									{showNew ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
							{fieldErrors.newPassword && (
								<span id='fp-new-pw-error' className='field-error' role='alert'>
									<AlertCircle size={13} aria-hidden='true' />
									{fieldErrors.newPassword}
								</span>
							)}
						</div>

						<div className='input-group'>
							<label htmlFor='fp-confirm-password'>
								<Lock size={16} aria-hidden='true' />
								<span>Confirm Password</span>
							</label>
							<div className='password-input-wrapper'>
								<input
									id='fp-confirm-password'
									type={showConfirm ? 'text' : 'password'}
									placeholder='Repeat new password'
									value={confirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
										clearError('confirmPassword');
									}}
									required
									autoComplete='new-password'
									aria-required='true'
									aria-invalid={!!fieldErrors.confirmPassword}
									aria-describedby={
										fieldErrors.confirmPassword ? 'fp-confirm-error' : undefined
									}
									disabled={loading}
								/>
								<button
									type='button'
									className='password-toggle'
									onClick={() => setShowConfirm((v) => !v)}
									aria-label={showConfirm ? 'Hide password' : 'Show password'}
									aria-pressed={showConfirm}
									disabled={loading}
								>
									{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
							{fieldErrors.confirmPassword && (
								<span
									id='fp-confirm-error'
									className='field-error'
									role='alert'
								>
									<AlertCircle size={13} aria-hidden='true' />
									{fieldErrors.confirmPassword}
								</span>
							)}
						</div>

						<button
							type='submit'
							className='submit-btn'
							disabled={loading}
							aria-busy={loading}
						>
							{loading ? (
								<>
									<Loader size={18} className='spinner' aria-hidden='true' />
									<span>Resetting…</span>
								</>
							) : (
								<>
									<CheckCircle size={18} aria-hidden='true' />
									<span>Reset Password</span>
								</>
							)}
						</button>

						<div className='auth-footer'>
							<p>
								<button type='button' className='back-link' onClick={goBack}>
									<ArrowLeft size={14} aria-hidden='true' />
									Use a different email
								</button>
							</p>
						</div>
					</form>
				)}
			</main>
		</div>
	);
}
