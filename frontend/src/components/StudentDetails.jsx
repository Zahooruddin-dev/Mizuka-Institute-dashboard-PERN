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
						<div className='skeleton-container'>
							<div className='skeleton-item'>
								<div className='skeleton-icon'></div>
								<div className='skeleton-text-group'>
									<div className='skeleton-label'></div>
									<div className='skeleton-text'></div>
								</div>
							</div>
							<div className='skeleton-item'>
								<div className='skeleton-icon'></div>
								<div className='skeleton-text-group'>
									<div className='skeleton-label'></div>
									<div className='skeleton-text'></div>
								</div>
							</div>
							<div className='skeleton-item'>
								<div className='skeleton-icon'></div>
								<div className='skeleton-text-group'>
									<div className='skeleton-label'></div>
									<div className='skeleton-text'></div>
								</div>
							</div>
						</div>
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
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 2rem;
  }

  .modal-content {
    background: #fafafa;
    width: 100%;
    max-width: 640px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(0, 0, 0, 0.05);
    animation: modalFade 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes modalFade {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.96);
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
    padding-bottom: 1.25rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.875rem;
    font-weight: 600;
    color: #1e293b;
    letter-spacing: -0.025em;
  }

  .close-button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 10px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-button:hover {
    background: rgba(0, 0, 0, 0.04);
    color: #334155;
    transform: scale(1.05);
  }

  .close-button:active {
    transform: scale(0.95);
  }

  .close-button:focus {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }

  .error-text {
    text-align: center;
    padding: 2rem;
    font-size: 1rem;
    color: #dc2626;
    font-weight: 500;
    background: rgba(220, 38, 38, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(220, 38, 38, 0.1);
  }

  .skeleton-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .skeleton-item {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
  }

  .skeleton-icon {
    width: 20px;
    height: 20px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.04) 25%,
      rgba(0, 0, 0, 0.06) 50%,
      rgba(0, 0, 0, 0.04) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 6px;
    flex-shrink: 0;
    margin-top: 0.3rem;
  }

  .skeleton-text-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .skeleton-label {
    width: 60px;
    height: 14px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.04) 25%,
      rgba(0, 0, 0, 0.06) 50%,
      rgba(0, 0, 0, 0.04) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 6px;
  }

  .skeleton-text {
    width: 85%;
    height: 18px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.04) 25%,
      rgba(0, 0, 0, 0.06) 50%,
      rgba(0, 0, 0, 0.04) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 6px;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
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
    font-size: 0.8125rem;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 0.4rem;
    letter-spacing: 0.025em;
    text-transform: uppercase;
  }

  .detail-item p {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 500;
    color: #1e293b;
    line-height: 1.5;
  }

  .classes-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  .classes-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    color: #6366f1;
  }

  .classes-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    letter-spacing: -0.025em;
  }

  .classes-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .classes-list li {
    padding: 1rem 1.25rem;
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    font-weight: 500;
    color: #334155;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  }

  .classes-list li:hover {
    background: #ffffff;
    border-color: #6366f1;
    transform: translateX(4px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
  }

  .modal-footer {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    padding: 0.875rem 2rem;
    font-size: 0.9375rem;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    border: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 0.01em;
  }

  .btn-secondary {
    background: #334155;
    color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .btn-secondary:hover {
    background: #1e293b;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15);
  }

  .btn-secondary:active {
    transform: translateY(0);
  }

  .btn:focus {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    .modal-content {
      max-width: 90%;
      padding: 2rem;
    }
  }

  @media (max-width: 480px) {
    .modal-overlay {
      padding: 1rem;
    }

    .modal-content {
      padding: 1.5rem;
      border-radius: 16px;
    }

    .modal-header h2 {
      font-size: 1.5rem;
    }

    .detail-item {
      gap: 1rem;
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