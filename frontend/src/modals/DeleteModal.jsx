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
		<div
			className="modal-overlay"
			onClick={handleOverlayClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="delete-modal-title"
			aria-describedby="delete-modal-description"
		>
			<div className="modal-content">
				<h2 id="delete-modal-title">Confirm Deletion</h2>
				<p id="delete-modal-description">
					Are you sure you want to delete{' '}
					<strong>{student.student_name}</strong>?
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

			<style jsx>{`
				.modal-overlay {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.8);
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 1000;
					padding: 1rem;
				}

				.modal-content {
					background-color: #1e1e1e;
					padding: 2rem;
					border-radius: 12px;
					border: 2px solid #ff4d4d;
					text-align: center;
					max-width: 450px;
					width: 100%;
					box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
				}

				.modal-content h2 {
					color: white;
					margin: 0 0 1rem 0;
					font-size: 1.5rem;
				}

				.modal-content p {
					color: #aaa;
					margin: 0 0 1.5rem 0;
					font-size: 1rem;
					line-height: 1.5;
				}

				.modal-content strong {
					color: #ff4d4d;
					font-weight: 600;
				}

				.modal-actions {
					margin-top: 1.5rem;
					display: flex;
					gap: 0.75rem;
					justify-content: center;
				}

				.btn {
					padding: 0.75rem 1.5rem;
					font-size: 1rem;
					font-weight: 500;
					border-radius: 6px;
					cursor: pointer;
					transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
					border: none;
				}

				.btn:focus-visible {
					outline: 2px solid white;
					outline-offset: 2px;
				}

				.btn:active {
					transform: scale(0.98);
				}

				.btn-cancel {
					background-color: #4b5563;
					color: white;
					border: 1px solid #6b7280;
				}

				.btn-cancel:hover {
					background-color: #374151;
				}

				.btn-delete {
					background-color: #ff4d4d;
					color: white;
				}

				.btn-delete:hover {
					background-color: #e63946;
					box-shadow: 0 2px 8px rgba(255, 77, 77, 0.3);
				}

				@media (max-width: 480px) {
					.modal-content {
						padding: 1.5rem;
					}

					.modal-content h2 {
						font-size: 1.25rem;
					}

					.modal-content p {
						font-size: 0.95rem;
					}

					.btn {
						padding: 0.625rem 1.25rem;
						font-size: 0.95rem;
					}

					.modal-actions {
						flex-direction: column;
					}

					.btn {
						width: 100%;
					}
				}
			`}</style>
		</div>
	);
}