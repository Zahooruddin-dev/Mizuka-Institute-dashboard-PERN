import React from 'react';
import { useState } from 'react';
import { loginUser } from '../api/authApi';
import { useNavigate } from 'react-router';

export default function Login() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		password: '',
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
      const response = await loginUser(formData)
      const token = response.data.token
      localStorage.setItem('token',token)
      navigate('/')
		} catch (error) {
			setError(error.response?.data?.message || 'Login Failed');
		}
	};
	return (
		<div className='auth-container'>
			<form className='auth-form'></form>
		</div>
	);
}
