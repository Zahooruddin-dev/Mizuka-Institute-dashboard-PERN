import React from 'react';

export default function DeleteModal({ student, onConfirm, onCancel }) {
	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onCancel();
		}
	};

	const handleConfirmClick = () => {
		onConfirm();
	};

	const handleCancelClick = () => {
		onCancel();
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			onCancel();
		}
	};

	React.useEffect(() => {
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
				aria-labelledby="delete-modal-title"
				aria-describedby="delete-modal-description"
			>
				<div className="modal-content">
					<div className="warning-icon">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="12" y1="8" x2="12" y2="12"></line>
							<line x1="12" y1="16" x2="12.01" y2="16"></line>
						</svg>
					</div>
					<h2 id="delete-modal-title">Confirm Deletion</h2>
					<p id="delete-modal-description">
						Are you sure you want to delete{' '}
						<strong>{student.student_name}</strong>? This action cannot be undone.
					</p>
					<div className="modal-actions">
						<button
							onClick={handleCancelClick}
							className="btn btn-cancel"
							type="button"
							aria-label="Cancel deletion"
						>
							Cancel
						</button>
						<button
							onClick={handleConfirmClick}
							className="btn btn-delete"
							type="button"
							aria-label={`Confirm deletion of ${student.student_name}`}
						>
							Yes, Delete
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
					text-align: center;
					max-width: 480px;
					width: 100%;
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

				.warning-icon {
					width: 64px;
					height: 64px;
					margin: 0 auto 1.5rem;
					background: rgba(239, 68, 68, 0.08);
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #ef4444;
				}

				.modal-content h2 {
					color: #1e293b;
					margin: 0 0 1rem 0;
					font-size: 1.875rem;
					font-weight: 600;
					letter-spacing: -0.025em;
				}

				.modal-content p {
					color: var(--muted);
					margin: 0 0 2rem 0;
					font-size: 0.9375rem;
					line-height: 1.6;
					font-weight: 500;
				}

				.modal-content strong {
					color: #1e293b;
					font-weight: 600;
				}

				.modal-actions {
					display: flex;
					gap: 0.75rem;
					justify-content: center;
				}

				.btn {
					flex: 1;
					padding: 0.875rem 1.5rem;
					font-size: 0.9375rem;
					font-weight: 600;
					border-radius: 12px;
					cursor: pointer;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					border: none;
					letter-spacing: 0.01em;
				}

				.btn:focus {
					outline: 2px solid var(--primary-500);
					outline-offset: 2px;
				}

				.btn:active {
					transform: scale(0.98);
				}

				.btn-cancel {
					background: #ffffff;
					color: #334155;
					border: 1px solid rgba(0, 0, 0, 0.08);
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
				}

				.btn-cancel:hover {
					background: #f8fafc;
					border-color: var(--primary-500);
					transform: translateY(-1px);
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
				}

				.btn-delete {
					background: #ef4444;
					color: #ffffff;
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
				}

				.btn-delete:hover {
					background: #dc2626;
					transform: translateY(-1px);
					box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3);
				}

				@media (max-width: 480px) {
					.modal-overlay {
						padding: 1rem;
					}

					.modal-content {
						padding: 2rem 1.5rem;
						border-radius: 16px;
					}

					.warning-icon {
						width: 56px;
						height: 56px;
						margin-bottom: 1.25rem;
					}

					.warning-icon svg {
						width: 40px;
						height: 40px;
					}

					.modal-content h2 {
						font-size: 1.5rem;
					}

					.modal-content p {
						font-size: 0.875rem;
					}

					.btn {
						padding: 0.75rem 1.25rem;
					}

					.modal-actions {
						flex-direction: column-reverse;
					}
				}
			`}</style>
		</>
	);
}