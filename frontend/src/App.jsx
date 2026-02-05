import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	useEffect(() => {
    setLoading(true)
		axios
			.get(`http://localhost:3000/api/students?name=${searchTerm}`)
			.then((res) => {
				(setStudents(res.data.student), setLoading(false));
			})
			.catch((err) => {
				(console.error('Connection failed', err), setLoading(false));
			});
	}, []);
	if (loading) return <h1>Loading Students...</h1>;
	return (
		<div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
			<input
				type='text'
				placeholder='Search student by name'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
			></input>
			<table
				border='1'
				cellPadding='10'
				style={{ width: '100%', textAlign: 'left' }}
			>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student) => (
						<tr key={student.id}>
							<td>{student.student_name}</td>
							<td>{student.email}</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* If array is empty, shows a message */}
			{students.length === 0 && <p>No students found.</p>}
		</div>
	);
}

export default App;
