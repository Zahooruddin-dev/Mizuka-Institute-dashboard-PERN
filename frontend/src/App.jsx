import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
function App() {
	const [students, setStudents] = useState([]);
	const [formData, setFormData] = useState({
		student_name: '',
		email: '',
	});
	const [postMode, setPostMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [refresh, setRefresh] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');
	useEffect(() => {
		setLoading(true);
		setError(null); // Clear previous errors on new search
		axios
			.get(`http://localhost:3000/api/students?name=${searchTerm}`)
			.then((res) => {
				(setStudents(res.data.student), setLoading(false));
			})
			.catch((err) => {
				(console.error('Connection failed', err),
					setLoading(false),
					setError(true));
			});
	}, [searchTerm, refresh]);
	const handleChange = (e) => {
		setFormData({
			...formData, //Keeping existing fields
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (formData.student_name.length < 3) {
			return alert('Name is too short');
		}
		if (!formData.student_email.includes('@')) {
			return alert('Email Format Incorrect');
		}

		axios
			.post(`http://localhost:3000/api/students`, formData)
			.then((res) => {
				console.log('student Added', res.data);
				setFormData({ student_name: '', email: '' });
				setPostMode(false);
				setRefresh((prev) => prev + 1);
			})
			.catch((err) => {
				console.error('Failed to add the student');
			});
	};
	const handleDelete = (id) => {
		if (window.confirm('Are you sure?')) {
			axios
				.delete(`http://localhost:3000/api/students${id}`)
				.then(() => setRefresh((prev) => prev + 1));
		}
	};
	if (error) {
		return <h1>Failed</h1>;
	}
	return (
		<div
			style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}
		>
			{postMode && (
				<>
					<h3>Add New Student</h3>
					<input
						type='text'
						name='student_name'
						placeholder='Full Name'
						value={FormData.student_name}
						onChange={handleChange}
						style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
					/>
					<input
						type='email'
						name='email'
						placeholder='Email Address'
						value={FormData.email}
						onChange={handleChange}
						style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
					/>
					<button onClick={handleSubmit}>Save Student</button>
				</>
			)}
			{!postMode && (
				<>
					{' '}
					<input
						type='text'
						placeholder='Search student by name'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
					/>
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
									<td>
										<IconButton aria-label='Delete'>
											<DeleteIcon color='red' />
										</IconButton>
									</td>
								</tr>
							))}
						</tbody>
					</table>{' '}
				</>
			)}
			<button
				style={{ padding: '20px', margin: '20px' }}
				onClick={() => setPostMode(!postMode)}
			>
				{postMode ? 'Cancel ' : 'POST A NEW CLASS'}
			</button>
			{/* If array is empty, shows a message */}
			{students.length === 0 && <p>No students found.</p>}
		</div>
	);
}

export default App;
