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
						<label htmlFor="student-name" className="visually-hidden">
							Student Name
						</label>
						<input
							id="student-name"
							name="student_name"
							type="text"
							value={student_name}
							onChange={handleChange}
							className="form-input"
							placeholder="Student Name"
							required
							aria-required="true"
							autoComplete="name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="student-email" className="visually-hidden">
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

			<style jsx>{`
				.visually-hidden {
					position: absolute;
					width: 1px;
					height: 1px;
					padding: 0;
					margin: -1px;
					overflow: hidden;
					clip: rect(0, 0, 0, 0);
					white-space: nowrap;
					border: 0;
				}

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
					background-color: rgba(17, 16, 16, 0.95);
					padding: 2rem;
					border-radius: 12px;
					color: white;
					width: 100%;
					max-width: 400px;
					box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
				}

				.edit-form {
					display: flex;
					flex-direction: column;
					gap: 1rem;
				}

				.edit-form h3 {
					margin: 0 0 1rem 0;
					font-size: 1.5rem;
					color: white;
				}

				.form-group {
					display: flex;
					flex-direction: column;
					gap: 0.25rem;
				}

				.form-input {
					width: 100%;
					padding: 0.75rem;
					font-size: 1rem;
					border: 1px solid #d1d5db;
					border-radius: 6px;
					background-color: #ffffff;
					color: #213547;
					transition: border-color 0.2s, box-shadow 0.2s;
				}

				.form-input:focus {
					outline: none;
					border-color: #646cff;
					box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
				}

				.form-input::placeholder {
					color: #9ca3af;
				}

				.form-actions {
					display: flex;
					gap: 0.75rem;
					margin-top: 0.5rem;
				}

				.btn {
					flex: 1;
					padding: 0.75rem 1.25rem;
					font-size: 1rem;
					font-weight: 500;
					border: none;
					border-radius: 6px;
					cursor: pointer;
					transition: background-color 0.2s, transform 0.1s;
				}

				.btn:focus-visible {
					outline: 2px solid white;
					outline-offset: 2px;
				}

				.btn:active {
					transform: scale(0.98);
				}

				.btn-primary {
					background-color: #646cff;
					color: white;
				}

				.btn-primary:hover {
					background-color: #535bf2;
				}

				.btn-secondary {
					background-color: #6b7280;
					color: white;
				}

				.btn-secondary:hover {
					background-color: #4b5563;
				}

				@media (max-width: 480px) {
					.modal-content {
						padding: 1.5rem;
					}

					.edit-form h3 {
						font-size: 1.25rem;
					}

					.form-input {
						padding: 0.625rem;
						font-size: 0.95rem;
					}

					.btn {
						padding: 0.625rem 1rem;
						font-size: 0.95rem;
					}
				}
			`}</style>
		</div>
	);
}