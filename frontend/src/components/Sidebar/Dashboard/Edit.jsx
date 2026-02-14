import React from 'react';

export default function EditComponent({
	handleUpdateSubmit,
	student_name,
	email,
	editing,
	handleChange
}) {
	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			editing();
		}
	};

	const handleCancelClick = (e) => {
		e.preventDefault();
		editing();
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		handleUpdateSubmit(e);
	};

	return (
		<>
			<div
				className="modal-overlay"
				onClick={handleOverlayClick}
				role="dialog"
				aria-modal="true"
				aria-labelledby="edit-student-title"
			>
				<div className="modal-content">
					<form onSubmit={handleFormSubmit} className="edit-form">
						<h3 id="edit-student-title">Edit Student Details</h3>
						<div className="form-group">
							<label htmlFor="student-name" className="form-label">
								Student Name
							</label>
							<input
								id="student-name"
								name="student_name"
								type="text"
								value={student_name}
								onChange={handleChange}
								className="form-input"
								placeholder="Enter student name"
								required
								aria-required="true"
								autoComplete="name"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="student-email" className="form-label">
								Email Address
							</label>
							<input
								id="student-email"
								name="email"
								type="email"
								value={email}
								onChange={handleChange}
								className="form-input"
								placeholder="example@school.edu"
								required
								aria-required="true"
								autoComplete="email"
							/>
						</div>
						<div className="form-actions">
							<button type="submit" className="btn btn-primary">
								Update
							</button>
							<button
								type="button"
								onClick={handleCancelClick}
								className="btn btn-secondary"
								aria-label="Cancel editing"
							>
								Cancel
							</button>
						</div>
					</form>
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
					padding: 1.5rem;
					animation: fadeIn 0.2s ease-out;
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				.modal-content {
					background: var(--surface);
					padding: 2.5rem;
					border-radius: 20px;
					width: 100%;
					max-width: 480px;
					box-shadow: 
						0 25px 50px -12px rgba(0, 0, 0, 0.15),
						0 0 0 1px rgba(0, 0, 0, 0.05);
					animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
				}

				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(20px) scale(0.96);
					}
					to {
						opacity: 1;
						transform: translateY(0) scale(1);
					}
				}

				.edit-form {
					display: flex;
					flex-direction: column;
					gap: 1.5rem;
				}

				.edit-form h3 {
					margin: 0;
					font-size: 1.875rem;
					font-weight: 600;
					color: #1e293b;
					letter-spacing: -0.025em;
				}

				.form-group {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}

				.form-label {
					font-size: 0.8125rem;
					font-weight: 600;
					color: #64748b;
					letter-spacing: 0.025em;
					text-transform: uppercase;
				}

				.form-input {
					width: 100%;
					padding: 0.875rem 1rem;
					font-size: 0.9375rem;
					font-weight: 500;
					border: 1px solid rgba(0, 0, 0, 0.08);
					border-radius: 12px;
					background: var(--surface);
					color: var(--text);
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
				}

				.form-input:hover {
					border-color: rgba(0, 0, 0, 0.12);
				}

				.form-input:focus {
					outline: none;
					border-color: var(--primary-500);
					box-shadow: 0 0 0 3px rgba(6,182,212,0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
				}

				.form-input::placeholder {
					color: #94a3b8;
				}

				.form-actions {
					display: flex;
					gap: 0.75rem;
					margin-top: 0.5rem;
				}

				.btn {
					flex: 1;
					padding: 0.875rem 1.5rem;
					font-size: 0.9375rem;
					font-weight: 600;
					border: none;
					border-radius: 12px;
					cursor: pointer;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					letter-spacing: 0.01em;
				}

				.btn:focus {
					outline: 2px solid var(--primary-500);
					outline-offset: 2px;
				}

				.btn:active {
					transform: scale(0.98);
				}

				.btn-primary {
					background: var(--primary-500);
					color: var(--surface);
					box-shadow: 0 6px 16px rgba(6,182,212,0.12);
				}

				.btn-primary:hover {
					background: var(--primary-600);
					transform: translateY(-1px);
					box-shadow: 0 8px 18px rgba(6,182,212,0.12);
				}

				.btn-secondary {
					background: #334155;
					color: #ffffff;
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
				}

				.btn-secondary:hover {
					background: #1e293b;
					transform: translateY(-1px);
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15);
				}

				@media (max-width: 480px) {
					.modal-overlay {
						padding: 1rem;
					}

					.modal-content {
						padding: 2rem 1.5rem;
						border-radius: 16px;
					}

					.edit-form h3 {
						font-size: 1.5rem;
					}

					.form-input {
						padding: 0.75rem 0.875rem;
						font-size: 0.9375rem;
					}

					.btn {
						padding: 0.75rem 1.25rem;
						font-size: 0.9375rem;
					}

					.form-actions {
						flex-direction: column;
					}
				}
			`}</style>
		</>
	);
}