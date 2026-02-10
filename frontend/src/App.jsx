import { useEffect, useState } from 'react';
import axios from 'axios';
import { X, User, Mail, Calendar, BookOpen } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000/api/students';

export default function StudentDetails({ studentId, onClose }) {
	const [student, setStudent] = useState(null);
	const [classes, setClasses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStudentData = async () => {
			setLoading(true);
			setError(null);

			try {
				const studentResponse = await axios.get(`${API_BASE_URL}/${studentId}`);
				setStudent(studentResponse.data);

				try {
					const classesResponse = await axios.get(`${API_BASE_URL}/${studentId}/classes`);
					setClasses(classesResponse.data);
				} catch (err) {
					console.log('No classes data available');
					setClasses([]);
				}
			} catch (err) {
				setError('Failed to load student details');
			} finally {
				setLoading(false);
			}
		};

		if (studentId) {
			fetchStudentData();
		}
	}, [studentId]);

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<>
			<div
				className="modal-overlay"
				onClick={handleOverlayClick}
				role="dialog"
				aria-modal="true"
				aria-labelledby="student-details-title"
			>
				<div className="modal-content">
					<div className="modal-header">
						<h2 id="student-details-title">Student Details</h2>
						<button
							onClick={onClose}
							className="close-button"
							aria-label="Close student details"
							type="button"
						>
							<X size={24} />
						</button>
					</div>

					{loading && <p className="loading-text">Loading student details...</p>}

					{error && <p className="error-text">{error}</p>}

					{!loading && !error && student && (
						<div className="details-content">
							<div className="detail-item">
								<User size={20} className="detail-icon" />
								<div>
									<label>Name</label>
									<p>{student.student_name}</p>
								</div>
							</div>

							<div className="detail-item">
								<Mail size={20} className="detail-icon" />
								<div>
									<label>Email</label>
									<p>{student.email}</p>
								</div>
							</div>

							{student.created_at && (
								<div className="detail-item">
									<Calendar size={20} className="detail-icon" />
									<div>
										<label>Enrolled Since</label>
										<p>{new Date(student.created_at).toLocaleDateString()}</p>
									</div>
								</div>
							)}

							{classes.length > 0 && (
								<div className="classes-section">
									<div className="classes-header">
										<BookOpen size={20} />
										<h3>Enrolled Classes</h3>
									</div>
									<ul className="classes-list">
										{classes.map((cls, index) => (
											<li key={index}>{cls.class_name || cls.name}</li>
										))}
									</ul>
								</div>
							)}
						</div>
					)}

					<div className="modal-footer">
						<button onClick={onClose} className="btn btn-secondary" type="button">
							Close
						</button>
					</div>
				</div>
			</div>

			<style>{`
				.modal-overlay {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.7);
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 1000;
					padding: 1rem;
				}

				.modal-content {
					background-color: white;
					padding: 2rem;
					border-radius: 12px;
					width: 100%;
					max-width: 500px;
					max-height: 80vh;
					overflow-y: auto;
					box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
				}

				.modal-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 1.5rem;
					padding-bottom: 1rem;
					border-bottom: 2px solid #f0f0f0;
				}

				.modal-header h2 {
					margin: 0;
					color: #213547;
					font-size: 1.5rem;
				}

				.close-button {
					background: none;
					border: none;
					cursor: pointer;
					padding: 0.5rem;
					border-radius: 4px;
					color: #213547;
					transition: background-color 0.2s;
				}

				.close-button:hover {
					background-color: #f0f0f0;
				}

				.close-button:focus {
					outline: 2px solid #646cff;
					outline-offset: 2px;
				}

				.loading-text,
				.error-text {
					text-align: center;
					padding: 2rem;
					color: #213547;
				}

				.error-text {
					color: #e74c3c;
				}

				.details-content {
					display: flex;
					flex-direction: column;
					gap: 1.5rem;
				}

				.detail-item {
					display: flex;
					gap: 1rem;
					align-items: flex-start;
				}

				.detail-icon {
					color: #646cff;
					flex-shrink: 0;
					margin-top: 0.25rem;
				}

				.detail-item label {
					display: block;
					font-size: 0.875rem;
					color: #6b7280;
					margin-bottom: 0.25rem;
					font-weight: 500;
				}

				.detail-item p {
					margin: 0;
					color: #213547;
					font-size: 1rem;
					font-weight: 500;
				}

				.classes-section {
					margin-top: 1rem;
					padding-top: 1rem;
					border-top: 2px solid #f0f0f0;
				}

				.classes-header {
					display: flex;
					align-items: center;
					gap: 0.5rem;
					margin-bottom: 1rem;
					color: #646cff;
				}

				.classes-header h3 {
					margin: 0;
					font-size: 1.125rem;
					color: #213547;
				}

				.classes-list {
					list-style: none;
					padding: 0;
					margin: 0;
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}

				.classes-list li {
					padding: 0.75rem;
					background-color: #f9f9f9;
					border-radius: 6px;
					color: #213547;
					border-left: 3px solid #646cff;
				}

				.modal-footer {
					margin-top: 2rem;
					padding-top: 1rem;
					border-top: 2px solid #f0f0f0;
					display: flex;
					justify-content: flex-end;
				}

				.btn {
					padding: 0.75rem 1.5rem;
					font-size: 1rem;
					font-weight: 500;
					border-radius: 6px;
					cursor: pointer;
					transition: background-color 0.2s;
					border: none;
				}

				.btn-secondary {
					background-color: #6b7280;
					color: white;
				}

				.btn-secondary:hover {
					background-color: #4b5563;
				}

				.btn:focus {
					outline: 2px solid #646cff;
					outline-offset: 2px;
				}

				@media (max-width: 480px) {
					.modal-content {
						padding: 1.5rem;
					}

					.modal-header h2 {
						font-size: 1.25rem;
					}
				}
			`}</style>
		</>
	);
}