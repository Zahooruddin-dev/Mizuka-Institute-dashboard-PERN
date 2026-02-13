import { useEffect, useState } from 'react';
import { X, User, Mail, Calendar, BookOpen } from 'lucide-react';
import { getStudentById, getStudentClasses } from '../api/api';

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
				const studentResponse = await getStudentById(studentId);
				setStudent(studentResponse.data);

				try {
					const classesResponse = await getStudentClasses(studentId);
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
				className='modal-overlay'
				onClick={handleOverlayClick}
				role='dialog'
				aria-modal='true'
				aria-labelledby='student-details-title'
			>
				<div className='modal-content'>
					<div className='modal-header'>
						<h2 id='student-details-title'>Student Details</h2>
						<button
							onClick={onClose}
							className='close-button'
							aria-label='Close student details'
							type='button'
						>
							<X size={24} />
						</button>
					</div>

					{loading && (
						<p className='loading-text'>Loading student details...</p>
					)}

					{error && <p className='error-text'>{error}</p>}

					{!loading && !error && student && (
						<div className='details-content'>
							<div className='detail-item'>
								<User size={20} className='detail-icon' />
								<div>
									<label>Name</label>
									<p>{student.student_name}</p>
								</div>
							</div>

							<div className='detail-item'>
								<Mail size={20} className='detail-icon' />
								<div>
									<label>Email</label>
									<p>{student.email}</p>
								</div>
							</div>

							{student.created_at && (
								<div className='detail-item'>
									<Calendar size={20} className='detail-icon' />
									<div>
										<label>Enrolled Since</label>
										<p>{new Date(student.created_at).toLocaleDateString()}</p>
									</div>
								</div>
							)}

							{classes.length > 0 && (
								<div className='classes-section'>
									<div className='classes-header'>
										<BookOpen size={20} />
										<h3>Enrolled Classes</h3>
									</div>
									<ul className='classes-list'>
										{classes.map((cls, index) => (
											<li key={index}>{cls.class_name || cls.name}</li>
										))}
									</ul>
								</div>
							)}
						</div>
					)}

					<div className='modal-footer'>
						<button
							onClick={onClose}
							className='btn btn-secondary'
							type='button'
						>
							Close
						</button>
					</div>
				</div>
			</div>

			<style>{`
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 2rem;
  }

  .modal-content {
    background: #ffffff;
    width: 100%;
    max-width: 640px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.15),
      0 8px 16px rgba(0, 0, 0, 0.1);
    animation: modalFade 0.25s ease-out;
  }

  @keyframes modalFade {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 600;
    color: #1f2937;
  }

  .close-button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    color: #374151;
  }

  .close-button:hover {
    background: #f3f4f6;
    transform: rotate(90deg);
  }

  .close-button:focus {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }

  .loading-text,
  .error-text {
    text-align: center;
    padding: 2rem;
    font-size: 1rem;
  }

  .error-text {
    color: #dc2626;
    font-weight: 500;
  }

  .details-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .detail-item {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
  }

  .detail-icon {
    color: #6366f1;
    flex-shrink: 0;
    margin-top: 0.3rem;
  }

  .detail-item label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 0.3rem;
    letter-spacing: 0.3px;
  }

  .detail-item p {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 500;
    color: #111827;
  }

  .classes-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .classes-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .classes-header h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1f2937;
  }

  .classes-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .classes-list li {
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    border-left: 4px solid #6366f1;
    font-weight: 500;
    transition: background 0.2s ease;
  }

  .classes-list li:hover {
    background: #f3f4f6;
  }

  .modal-footer {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    padding: 0.85rem 1.75rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
  }

  .btn-secondary {
    background: #4b5563;
    color: #ffffff;
  }

  .btn-secondary:hover {
    background: #374151;
    transform: translateY(-1px);
  }

  .btn:focus {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }

  /* Tablet */
  @media (max-width: 768px) {
    .modal-content {
      max-width: 90%;
      padding: 2rem;
    }
  }

  /* Mobile */
  @media (max-width: 480px) {
    .modal-overlay {
      padding: 1rem;
    }

    .modal-content {
      padding: 1.5rem;
      border-radius: 12px;
    }

    .modal-header h2 {
      font-size: 1.4rem;
    }

    .detail-item {
      gap: 0.75rem;
    }

    .btn {
      width: 100%;
      text-align: center;
    }

    .modal-footer {
      justify-content: stretch;
    }
  }
`}</style>
		</>
	);
}
