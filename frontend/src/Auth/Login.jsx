import React from 'react';
import { useState } from 'react';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<div style={{ backgroundColor: 'grey', padding: '50px' }}>
				<input type='email' />
				<input type='password' />
			</div>
		</>
	);
}
