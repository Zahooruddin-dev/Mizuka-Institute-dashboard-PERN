import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import EditComponent from './components/Edit';
import PostingComponent from './components/Posting';
import MainComponent from './components/Main';
import Toast from './components/Toast';
import DeleteModal from './modals/DeleteModal';
import StudentDetails from './components/StudentDetails';
import SearchDialog from './components/SearchDialog';

const API_BASE_URL = 'http://localhost:3000/api/students';

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
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState('ASC');
	const [page, setPage] = useState(1);
	const [limit] = useState(10);
	const [totalCount, setTotalCount] = useState(0);
	const [studentToDelete, setStudentToDelete] = useState(null);
	const [viewingStudent, setViewingStudent] = useState(null);
	const [showSearchDialog, setShowSearchDialog] = useState(false);
	const [toastConfig, setToastConfig] = useState({
		show: false,
		message: '',
		type: 'success',
	});

	const triggerToast = useCallback((msg, type = 'success') => {
		setToastConfig({ show: true, message: msg, type });
	}, []);

	const handleToastClose = useCallback(() => {
		setToastConfig((prev) => ({ ...prev, show: false }));
	}, []);

	useEffect(() => {
		setPage(1);
	}, [searchTerm]);

	const fetchStudents = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get(API_BASE_URL, {
				params: {
					name: searchTerm,
					sort: sortOrder,
					page,
					limit,
				},
			});
			setStudents(response.data.student);
			setTotalCount(response.data.totalCount);
		} catch (err) {
			console.error('Connection failed', err);
			setError(true);
			triggerToast('Failed to load students', 'error');
		} finally {
			setLoading(false);
		}
	}, [searchTerm, sortOrder, page, limit, triggerToast]);

	useEffect(() => {
		fetchStudents();
	}, [fetchStudents]);

	const handleChange = useCallback((e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}, []);

	const handleSubmit = async () => {
		if (!formData.student_name || formData.student_name.length < 3) {
			return triggerToast('Name must be at least 3 characters', 'error');
		}

		if (!formData.email || !formData.email.includes('@')) {
			return triggerToast('Valid email is required', 'error');
		}

		try {
			await axios.post(API_BASE_URL, formData);
			setFormData({ student_name: '', email: '' });
			setPostMode(false);
			fetchStudents();
			triggerToast('Student added successfully!', 'success');
		} catch (err) {
			triggerToast('Failed to add student', 'error');
		}
	};

	const confirmDelete = async () => {
		if (!studentToDelete) return;

		try {
			await axios.delete(`${API_BASE_URL}/${studentToDelete.id}`);
			fetchStudents();
			triggerToast(`${studentToDelete.student_name} deleted`, 'success');
			setStudentToDelete(null);
		} catch (err) {
			triggerToast('Failed to delete student', 'error');
		}
	};

	const handleEdit = useCallback((student) => {
		setFormData({
			student_name: student.student_name,
			email: student.email,
		});
		setCurrentStudent(student);
		setIsEditing(true);
	}, []);

	const handleViewDetails = useCallback((student) => {
		setViewingStudent(student.id);
	}, []);

	const handleUpdateSubmit = async (e) => {
		if (e) e.preventDefault();

		if (!currentStudent?.id) {
			console.error('No student selected for editing');
			return;
		}

		if (!formData.student_name || formData.student_name.length < 3) {
			return triggerToast('Name must be at least 3 characters', 'error');
		}

		if (!formData.email || !formData.email.includes('@')) {
			return triggerToast('Valid email is required', 'error');
		}

		try {
			await axios.put(`${API_BASE_URL}/${currentStudent.id}`, formData);
			setIsEditing(false);
			setFormData({ student_name: '', email: '' });
			setCurrentStudent(null);
			fetchStudents();
			triggerToast('Student updated successfully!', 'success');
		} catch (err) {
			triggerToast('Failed to update student', 'error');
		}
	};

	const onClose = useCallback(() => {
		setPostMode(false);
		setFormData({ student_name: '', email: '' });
	}, []);

	const toggleSort = useCallback(() => {
		setSortOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
	}, []);

	const openDeleteModal = useCallback((student) => {
		setStudentToDelete(student);
	}, []);

	const handleSelectFromSearch = useCallback((student) => {
		setShowSearchDialog(false);
		setViewingStudent(student.id);
	}, []);

	if (error) {
		return (
			<div style={{ padding: '20px', textAlign: 'center' }}>
				<h1>Failed to load students</h1>
				<button onClick={fetchStudents}>Retry</button>
			</div>
		);
	}

	return (
		<div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
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
					handleChange={handleChange}
					editing={() => {
						setIsEditing(false);
						setFormData({ student_name: '', email: '' });
						setCurrentStudent(null);
					}}
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

			{viewingStudent && (
				<StudentDetails
					studentId={viewingStudent}
					onClose={() => setViewingStudent(null)}
				/>
			)}

			{showSearchDialog && (
				<SearchDialog
					onClose={() => setShowSearchDialog(false)}
					onSelectStudent={handleSelectFromSearch}
				/>
			)}

			{!postMode && !loading && (
				<MainComponent
					limit={limit}
					handleEdit={handleEdit}
					searchTerm={searchTerm}
					students={students}
					setSearchTerm={setSearchTerm}
					handleDelete={openDeleteModal}
					
					handleViewDetails={handleViewDetails}
					toggleSort={toggleSort}
					sortOrder={sortOrder}
					page={page}
					setPage={setPage}
					totalCount={totalCount}
				/>
			)}

			{loading && <p>Loading students...</p>}

			<div style={{ display: 'flex', gap: '10px', margin: '20px' }}>
				<button
					style={{ padding: '20px', flex: 1 }}
					onClick={() => setPostMode(!postMode)}
				>
					{postMode ? 'Cancel' : 'Add New Student'}
				</button>
				<button
					style={{ padding: '20px', flex: 1 }}
					onClick={() => setShowSearchDialog(true)}
				>
					Advanced Search
				</button>
			</div>

			{studentToDelete && (
				<DeleteModal
					student={studentToDelete}
					onConfirm={confirmDelete}
					onCancel={() => setStudentToDelete(null)}
				/>
			)}
		</div>
	);
}

export default App;