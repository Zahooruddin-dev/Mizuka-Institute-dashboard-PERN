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
		<div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
			<table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        
        </tbody>
      </table>
      {/* If array is empty, shows a message */}
      {students.length === 0 && <p>No students found.</p>}
		</div>
	);
}

export default App;
