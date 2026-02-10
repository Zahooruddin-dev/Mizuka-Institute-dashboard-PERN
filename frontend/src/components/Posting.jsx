import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function PostingComponent({
	student_name,
	email,
	handleChange,
	handleSubmit,
	onClose
}) {
	const [isSaving, setIsSaving] = useState(false);

	const handleLocalSubmit = async (e) => {
		e.preventDefault();
		setIsSaving(true);
		try {
			await handleSubmit(e);
		} catch (err) {
			console.error('Failed to save', err);
		} finally {
			setIsSaving(false);
		}
	};

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget && !isSaving) {
			onClose();
		}
	};

	const handleCancelClick = () => {
		if (!isSaving) {
			onClose();
		}
	};

	return (
		<>
			<div
				className="modal-overlay"
				onClick={handleOverlayClick}
				role="dialog"
				aria-modal="true"
				aria-labelledby="add-student-title"
			>
				<div className="modal-content">
					<form onSubmit={handleLocalSubmit} className="add-form">
						<h3 id="add-student-title">Add New Student</h3>
						<div className="form-group">
							<label htmlFor="new-student-name" className="visually-hidden">
								Full Name
							</label>
							<input
								id="new-student-name"
								type="text"
								name="student_name"
								placeholder="Full Name"
								value={student_name}
								onChange={handleChange}
								className="form-input"
								required
								aria-required="true"
								autoComplete="name"
								disabled={isSaving}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="new-student-email" className="visually-hidden">
								Email Address
							</label>
							<input
								id="new-student-email"
								type="email"
								name="email"
								placeholder="Email Address"
								value={email}
								onChange={handleChange}
								className="form-input"
								required
								aria-required="true"
								autoComplete="email"
								disabled={isSaving}
							/>
						</div>
						<div className="form-actions">
							<button
								type="submit"
								disabled={isSaving}
								className="btn btn-primary"
								aria-busy={isSaving}
							>
								{isSaving ? (
									<span className="loading-content">
										<Loader2 className="spinner" size={16} aria-hidden="true" />
										<span>Saving...</span>
									</span>
								) : (
									'Save Student'
								)}
							</button>
							<button
								type="button"
								onClick={handleCancelClick}
								className="btn btn-secondary"
								disabled={isSaving}
								aria-label="Cancel adding student"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>

			<style>{`
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

				.add-form {
					display: flex;
					flex-direction: column;
					gap: 1rem;
				}

				.add-form h3 {
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
					transition: border-color 0.2s, box-shadow 0.2s, opacity 0.2s;
				}

				.form-input:focus {
					outline: none;
					border-color: #646cff;
					box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
				}

				.form-input:disabled {
					opacity: 0.6;
					cursor: not-allowed;
					background-color: #f3f4f6;
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
					transition: background-color 0.2s, transform 0.1s, opacity 0.2s;
				}

				.btn:focus-visible {
					outline: 2px solid white;
					outline-offset: 2px;
				}

				.btn:active:not(:disabled) {
					transform: scale(0.98);
				}

				.btn:disabled {
					opacity: 0.6;
					cursor: not-allowed;
				}

				.btn-primary {
					background-color: #646cff;
					color: white;
				}

				.btn-primary:hover:not(:disabled) {
					background-color: #535bf2;
				}

				.btn-secondary {
					background-color: #6b7280;
					color: white;
				}

				.btn-secondary:hover:not(:disabled) {
					background-color: #4b5563;
				}

				.loading-content {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 0.5rem;
				}

				.spinner {
					animation: spin 1s linear infinite;
				}

				@keyframes spin {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				@media (max-width: 480px) {
					.modal-content {
						padding: 1.5rem;
					}

					.add-form h3 {
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
		</>
	);
}