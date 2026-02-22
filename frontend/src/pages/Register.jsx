import React, { useState } from 'react';
import { User, Mail, Lock, UserPlus, AlertCircle, Loader, Shield } from 'lucide-react';
import { registerUser } from '../api/authApi';
import { useAuth } from '../utils/AuthContext';
import { Link, useNavigate } from 'react-router';
import '../css/auth.css';

export default function Register() {
	const navigate = useNavigate();
	const { refreshUser } = useAuth();
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		role: 'student',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		if (error) setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.username || !formData.email || !formData.password) {
			setError('Please fill in all fields.');
			return;
		}
		setError('');
		setLoading(true);
		try {
			const response = await registerUser(formData);
			localStorage.setItem('token', response.data.token);
			refreshUser();
			navigate('/');
		} catch (error) {
			setError(error.response?.data?.message || 'Registration Failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='auth-container'>
			<div className='auth-card'>
				<div className='auth-header'>
					<div className='auth-icon'>
						<UserPlus size={32} />
					</div>
					<h1>Create Account</h1>
					<p>Join us and start your learning journey</p>
				</div>

				<form className='auth-form' onSubmit={handleSubmit} noValidate>
					{error && (
						<div className='error-banner' role='alert' aria-live='polite'>
							<AlertCircle size={20} />
							<span>{error}</span>
						</div>
					)}

					<div className='input-group'>
						<label htmlFor='username'>
							<User size={18} />
							<span>Username</span>
						</label>
						<input
							id='username'
							type='text'
							name='username'
							placeholder='Choose a username'
							value={formData.username}
							onChange={handleChange}
							required
							autoComplete='username'
							disabled={loading}
						/>
					</div>

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
							<Lock size={18} />
							<span>Password</span>
						</label>
						<div className='password-input-wrapper'>
							<input
								id='password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								placeholder='Create a strong password'
								value={formData.password}
								onChange={handleChange}
								required
								autoComplete='new-password'
								disabled={loading}
								minLength={6}
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

					<div className='input-group'>
						<label htmlFor='role'>
							<Shield size={18} />
							<span>Account Type</span>
						</label>
						<select
							id='role'
							name='role'
							value={formData.role}
							onChange={handleChange}
							required
							disabled={loading}
						>
							<option value='student'>Student</option>
							<option value='teacher'>Teacher</option>
						</select>
					</div>

					<button type='submit' className='submit-btn' disabled={loading}>
						{loading ? (
							<><Loader size={20} className='spinner' /><span>Creating Account...</span></>
						) : (
							<><UserPlus size={20} /><span>Create Account</span></>
						)}
					</button>

					<div className='auth-footer'>
						<p>
							Already have an account?{' '}
							<Link to='/login'>Sign In</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}