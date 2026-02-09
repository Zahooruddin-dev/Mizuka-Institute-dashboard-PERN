import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import EditComponent from './components/Edit';
import PostingComponent from './components/Posting';
import MainComponent from './components/Main';
import Toast from './components/Toast';
import DeleteModal from './modals/DeleteModal';

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
	const [sortOrder, setSortOrder] = useState('ASC'); // Default A-Z
	const [studentToDelete, setStudentToDelete] = useState(null);
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
			.get(
				`http://localhost:3000/api/students?name=${searchTerm}&sort=${sortOrder}`,
			)
			.then((res) => {
				(setStudents(res.data.student), setLoading(false));
			})
			.catch((err) => {
				(console.error('Connection failed', err),
					setLoading(false),
					setError(true));
			});
	}, [searchTerm, refresh, sortOrder]);
	const handleChange = (e) => {
		setFormData({
			...formData, //Keeping existing fields
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = () => {
		if (formData.student_name.length < 3) {
			return triggerToast('Name is too short', 'error');
		}

		return axios
			.post(`http://localhost:3000/api/students`, formData)
			.then((res) => {
				console.log('student Added', res.data);
				setFormData({ student_name: '', email: '' });
				setPostMode(false);
				(setRefresh((prev) => prev + 1),
					triggerToast('Student Added successfully!', 'success'));
			})
			.catch(() => triggerToast('Failed to add student', 'error'));
	};
	const confirmDelete = () => {
		if (!studentToDelete) return;
		axios
			.delete(`http://localhost:3000/api/students/${studentToDelete.id}`)
			.then(
				() => setRefresh((prev) => prev + 1),
				triggerToast(`${studentToDelete.student_name} Deleted`, 'success'),
				setStudentToDelete(null),
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
				triggerToast('Student updated successfully!', 'success');
			})
			.catch(() => triggerToast('Failed to update student', 'error'));
	};
	const onClose = () => {
		setPostMode(false);
	};
	const toggleSort = () => {
		setSortOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
	};
	const openDeleteModal = (student) => {
		setStudentToDelete(student);
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
					handleDelete={confirmDelete}
					toggleSort={toggleSort}
					sortOrder={sortOrder}
				/>
			)}
			<button
				style={{ padding: '20px', margin: '20px' }}
				onClick={() => setPostMode(!postMode)}
			>
				{postMode ? 'Cancel ' : 'POST A NEW STUDENT'}
			</button>
			{/* If array is empty, shows a message */}
			{studentToDelete && (
				<DeleteModal
					studentToDelete={studentToDelete}
					setStudentToDelete={setStudentToDelete}
					confirmDelete={confirmDelete}
				/>
			)}
			{students.length === 0 && <p>No students found.</p>}
		</div>
	);
}

export default App;
