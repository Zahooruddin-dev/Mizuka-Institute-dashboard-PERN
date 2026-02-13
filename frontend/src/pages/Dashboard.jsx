import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../App.css';
import EditComponent from '../components/Edit';
import PostingComponent from '../components/Posting';
import MainComponent from '../components/Main';
import Toast from '../components/Toast';
import DeleteModal from '../modals/DeleteModal';
import StudentDetails from '../components/StudentDetails';
import SearchDialog from '../components/SearchDialog';

import {
	getStudents,
	createStudent,
	updateStudent,
	deleteStudent,
} from '../api/api';

function Dashboard() {
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
			const response = await getStudents({
				name: searchTerm,
				sort: sortOrder,
				page,
				limit,
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
			await createStudent(formData);
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
			await deleteStudent(studentToDelete.id);

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
			await updateStudent(currentStudent.id, formData);

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
			<>
				<div className='error-container'>
					<div className='error-content'>
						<h1>Failed to Load Students</h1>
						<p>Unable to connect to the server. Please try again.</p>
						<button onClick={fetchStudents} className='retry-button'>
							Retry
						</button>
					</div>
				</div>

				<style>{`
					.error-container {
						min-height: 100vh;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 2rem;
						background: #fafafa;
					}

					.error-content {
						text-align: center;
						max-width: 480px;
						padding: 3rem 2rem;
						background: #ffffff;
						border-radius: 20px;
						box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
						border: 1px solid rgba(0, 0, 0, 0.06);
					}

					.error-content h1 {
						margin: 0 0 1rem 0;
						color: #1e293b;
						font-size: 1.875rem;
						font-weight: 600;
						letter-spacing: -0.025em;
					}

					.error-content p {
						margin: 0 0 2rem 0;
						color: #64748b;
						font-size: 0.9375rem;
						line-height: 1.6;
					}

					.retry-button {
						padding: 0.875rem 2rem;
						font-size: 0.9375rem;
						font-weight: 600;
						background: #6366f1;
						color: #ffffff;
						border: none;
						border-radius: 12px;
						cursor: pointer;
						transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
						box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
						letter-spacing: 0.01em;
					}

					.retry-button:hover {
						background: #4f46e5;
						transform: translateY(-1px);
						box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15);
					}

					.retry-button:active {
						transform: translateY(0);
					}

					.retry-button:focus {
						outline: 2px solid #6366f1;
						outline-offset: 2px;
					}
				`}</style>
			</>
		);
	}

	return (
		<>
			<div className='dashboard-container'>
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

				{loading && (
					<div className='loading-container'>
						<div className='loading-spinner'></div>
						<p className='loading-text'>Loading students...</p>
					</div>
				)}

				<div className='action-buttons'>
					<button
						className='action-btn primary-btn'
						onClick={() => setPostMode(!postMode)}
					>
						{postMode ? 'Cancel' : 'Add New Student'}
					</button>
					<button
						className='action-btn secondary-btn'
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

			<style>{`
				.dashboard-container {
					padding: 2rem;
					max-width: 1400px;
					margin: 0 auto;
					background: #fafafa;
					min-height: 100vh;
					    border-radius: 20px;
				}

				.loading-container {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 4rem 2rem;
					gap: 1.5rem;
				}

				.loading-spinner {
					width: 48px;
					height: 48px;
					border: 4px solid rgba(99, 102, 241, 0.1);
					border-top-color: #6366f1;
					border-radius: 50%;
					animation: spin 0.8s linear infinite;
				}

				@keyframes spin {
					to {
						transform: rotate(360deg);
					}
				}

				.loading-text {
					margin: 0;
					color: #64748b;
					font-size: 0.9375rem;
					font-weight: 500;
				}

				.action-buttons {
					display: flex;
					gap: 1rem;
					margin-top: 2rem;
				}

				.action-btn {
					flex: 1;
					padding: 1rem 1.5rem;
					font-size: 0.9375rem;
					font-weight: 600;
					border: none;
					border-radius: 12px;
					cursor: pointer;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					letter-spacing: 0.01em;
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
				}

				.primary-btn {
					background: #6366f1;
					color: #ffffff;
				}

				.primary-btn:hover {
					background: #4f46e5;
					transform: translateY(-2px);
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15);
				}

				.secondary-btn {
					background: #ffffff;
					color: #334155;
					border: 1px solid rgba(0, 0, 0, 0.08);
				}

				.secondary-btn:hover {
					background: #f8fafc;
					border-color: #6366f1;
					transform: translateY(-2px);
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
				}

				.action-btn:active {
					transform: translateY(0);
				}

				.action-btn:focus {
					outline: 2px solid #6366f1;
					outline-offset: 2px;
				}

				@media (max-width: 640px) {
					.dashboard-container {
						padding: 1rem;
					}

					.action-buttons {
						flex-direction: column;
						gap: 0.75rem;
					}

					.action-btn {
						padding: 0.875rem 1.25rem;
					}
				}
			`}</style>
		</>
	);
}

export default Dashboard;
