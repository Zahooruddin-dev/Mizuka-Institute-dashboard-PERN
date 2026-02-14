import React from 'react';
import { useState } from 'react';
import { registerUser } from '../api/authApi';
import { Link,useNavigate } from 'react-router';
import '../css/auth.css';
export default function Login() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		role: 'student',
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
			const response = await registerUser(formData);
			const token = response.data.token;
			localStorage.setItem('token', token);
			navigate('/');
		} catch (error) {
			setError(error.response?.data?.message || 'Login Failed');
		}
	};
	return (
		<div className='auth-container'>
			<form className='auth-form' onSubmit={handleSubmit}>
				<h2>Register</h2>
				{error && <p className='error'>{error}</p>}
				<input
					name='username'
					type='username'
					placeholder='Username'
					value={formData.username}
					onChange={handleChange}
					required
				/>
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
				<select name='role' value={formData.role} onChange={handleChange}>
					<option value='student'>Student</option>
					<option value='teacher'>Teacher</option>
					<option value='admin'>Admin</option>
				</select>
				<button type='submit'>Register</button>
				<p>
					Don't have an account? <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
}
