import React from 'react';
import { useState } from 'react';
import { registerUser } from '../api/authApi';
import { useNavigate } from 'react-router';

export default function Login() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		role: 'user',
	});
	const [error, setError] = useState('');
	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			const response = await loginUser(formData);
			const token = response.data.token;
			localStorage.setItem('token', token);
			navigate('/');
		} catch (error) {
			setError(error.response?.data?.message || 'Login Failed');
		}
	};
	return (
		<div className='auth-container'>
			<form className='auth-form'>
				<h2>Login</h2>
				{error && <p className='error'>{error}</p>}
				<input
					type='email'
					name='email'
					placeholder='Email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button type='submit'>Login</button>
				<p>
					Don't have an account? <Link to='/register'>Register</Link>
				</p>
			</form>
		</div>
	);
}
