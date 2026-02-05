import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	useEffect(() => {
		axios
			.get('http://localhost:3000/api/students')
			.then((res) =>
				console.log('Connection succeful students found', res.data),
			)
			.catch((err) => console.error('Connection failed', err));
	}, []);
	return (
		<div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
			<h1>Institutes Dashboard</h1>
			<p>check the console (F12) to see if backend worked or not </p>
		</div>
	);
}

export default App;
