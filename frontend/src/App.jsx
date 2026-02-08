import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import EditComponent from './components/Edit';
import PostingComponent from './components/Posting';
import MainComponent from './components/Main';
import Toast from './components/Toast';

function App() {
	const [students, setStudents] = useState([]);
	const [formData, setFormData] = useState({
		student_name: '',
		email: '',
	});
	const [isEditing, setIsEditing] = useState(false);
	const [currentStudent, setCurrentStudent] = useState(null);
	const [postMode, setPostMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [refresh, setRefresh] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');
	const [toastConfig, setToastConfig] = useState({
		show: false,
		message: '',
		type: 'success',
	});
	const triggerToast = (msg, type = 'success') => {
		setToastConfig({ show: true, message: msg, type: type });
	};
	const handleToastClose = () => {
		setToastConfig((prev) => ({ ...prev, show: false }));
	};
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
	const handleSubmit = () => {
		if (formData.student_name.length < 3) {
			alert('Name is too short');
			return Promise.reject('Name too short');
		}

		return axios
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
		axios
			.delete(`http://localhost:3000/api/students/${id}`)
			.then(
				() => setRefresh((prev) => prev + 1),
				triggerToast('Student deleted successfully!', 'success'),
			)
			.catch(() => triggerToast('Failed to delete student', 'error'));
	};
	const handleEdit = (student) => {
		setFormData({
			student_name: student.student_name,
			email: student.email,
		});
		setCurrentStudent(student);
		setIsEditing(true);
	};
	const handleUpdateSubmit = (e) => {
		if (e) e.preventDefault();
		if (!currentStudent || !currentStudent.id) {
			console.error('No student selected for editing');
			return;
		}
		axios
			.put(`http://localhost:3000/api/students/${currentStudent.id}`, formData)
			.then(() => {
				setIsEditing(false);
				setFormData({ student_name: '', email: '' });
				setRefresh((prev) => prev + 1);
				triggerToast('Student updated!', 'success');
			})
			.catch((err) => triggerToast('Update failed!', 'error'));
	};
	const onClose = () => {
		setPostMode(false);
	};
	if (error) {
		return <h1>Failed</h1>;
	}
	return (
		<div
			style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}
		>
			{toastConfig.show && (
				<Toast
					message={toastConfig.message}
					type={toastConfig.type}
					onToastClose={handleToastClose}
				/>
			)}
			{isEditing && (
				<EditComponent
					handleUpdateSubmit={handleUpdateSubmit}
					student_name={formData.student_name}
					email={formData.email}
					setIsEditing={setIsEditing}
					handleChange={handleChange}
					editing={() => setIsEditing(false)}
				/>
			)}
			{postMode && (
				<PostingComponent
					handleSubmit={handleSubmit}
					email={formData.email}
					student_name={formData.student_name}
					handleChange={handleChange}
					onClose={onClose}
				/>
			)}
			{!postMode && (
				<MainComponent
					handleEdit={handleEdit}
					searchTerm={searchTerm}
					students={students}
					setSearchTerm={setSearchTerm}
					handleDelete={handleDelete}
				/>
			)}
			<button
				style={{ padding: '20px', margin: '20px' }}
				onClick={() => setPostMode(!postMode)}
			>
				{postMode ? 'Cancel ' : 'POST A NEW STUDENT'}
			</button>
			{/* If array is empty, shows a message */}
			{students.length === 0 && <p>No students found.</p>}
		</div>
	);
}

export default App;
