import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios
			.get('http://localhost:3000/api/students')
			.then(
				(res) => console.log('Connection succeful students found', res.data),
				setStudents(res.data.students),
				setLoading(false),
			)
			.catch(
				(err) => console.error('Connection failed', err),
				setLoading(false),
			);
	}, []);
  if (loading) return <h1>Loading Students...</h1>;
	return (
		<div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
			<h1>Institutes Dashboard</h1>
			<p>check the console (F12) to see if backend worked or not </p>
			<li></li>
		</div>
	);
}

export default App;
