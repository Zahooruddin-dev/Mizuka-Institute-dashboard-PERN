import React, { useState } from 'react';
import { Mail, Lock, LogIn, AlertCircle, Loader } from 'lucide-react';
import { loginUser } from '../api/authApi';
import { useAuth } from '../utils/AuthContext';
import { Link, useNavigate } from 'react-router';
import '../css/auth.css';

export default function Login() {
	const navigate = useNavigate();
	const { refreshUser } = useAuth();
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		if (error) setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			setError('Please fill in all fields.');
			return;
		}
		setError('');
		setLoading(true);
		try {
			const response = await loginUser(formData);
			localStorage.setItem('token', response.data.token);
			refreshUser();
			navigate('/');
		} catch (error) {
			setError(error.response?.data?.message || 'Login Failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='auth-container'>
			<div className='auth-card'>
				<div className='auth-header'>
					<div className='auth-icon'>
						<LogIn size={32} />
					</div>
					<h1>Welcome Back</h1>
					<p>Sign in to continue to your account</p>
				</div>

				<form className='auth-form' onSubmit={handleSubmit} noValidate>
					{error && (
						<div className='error-banner' role='alert'>
							<AlertCircle size={20} />
							<span>{error}</span>
						</div>
					)}

					<div className='input-group'>
						<label htmlFor='email'>
							<Mail size={18} />
							<span>Email Address</span>
						</label>
						<input
							id='email'
							type='email'
							name='email'
							placeholder='Enter your email'
							value={formData.email}
							onChange={handleChange}
							required
							autoComplete='email'
							disabled={loading}
						/>
					</div>

					<div className='input-group'>
						<label htmlFor='password'>
							<div className='password-label-row'>
								<span className='password-label-left'>
									<Lock size={18} />
									<span>Password</span>
								</span>
								<Link to='/forgot-password' className='forgot-link'>
									Forgot password?
								</Link>
							</div>
						</label>
						<div className='password-input-wrapper'>
							<input
								id='password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								placeholder='Enter your password'
								value={formData.password}
								onChange={handleChange}
								required
								autoComplete='current-password'
								disabled={loading}
							/>
							<button
								type='button'
								className='password-toggle'
								onClick={() => setShowPassword(!showPassword)}
								aria-label={showPassword ? 'Hide password' : 'Show password'}
								disabled={loading}
							>
								{showPassword ? '👁️' : '👁️‍🗨️'}
							</button>
						</div>
					</div>

					<button type='submit' className='submit-btn' disabled={loading}>
						{loading ? (
							<>
								<Loader size={20} className='spinner' />
								<span>Signing in...</span>
							</>
						) : (
							<>
								<LogIn size={20} />
								<span>Sign In</span>
							</>
						)}
					</button>

					<div className='auth-footer'>
						<p>
							Don't have an account? <Link to='/register'>Create Account</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
