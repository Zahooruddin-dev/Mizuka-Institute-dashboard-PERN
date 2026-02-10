import { CheckCircle, X, XCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onToastClose }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onToastClose();
		}, 3000);
		return () => {
			clearTimeout(timer);
		};
	}, [onToastClose]);

	const isSuccess = type === 'success';

	const handleCloseClick = () => {
		onToastClose();
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			onToastClose();
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div
			className={`toast toast-${type}`}
			role="alert"
			aria-live="polite"
			aria-atomic="true"
		>
			<div className="toast-icon" aria-hidden="true">
				{isSuccess ? <CheckCircle size={20} /> : <XCircle size={20} />}
			</div>
			<span className="toast-message">{message}</span>
			<button
				onClick={handleCloseClick}
				className="toast-close"
				aria-label="Close notification"
				type="button"
			>
				<X size={18} aria-hidden="true" />
			</button>

			<style jsx>{`
				@keyframes slideIn {
					from {
						transform: translateX(100%);
						opacity: 0;
					}
					to {
						transform: translateX(0);
						opacity: 1;
					}
				}

				@keyframes slideOut {
					from {
						transform: translateX(0);
						opacity: 1;
					}
					to {
						transform: translateX(100%);
						opacity: 0;
					}
				}

				.toast {
					position: fixed;
					bottom: 20px;
					right: 20px;
					color: white;
					padding: 12px 20px;
					border-radius: 8px;
					display: flex;
					align-items: center;
					gap: 12px;
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
					z-index: 2000;
					animation: slideIn 0.3s ease-out;
					min-width: 250px;
					max-width: 400px;
				}

				.toast-success {
					background-color: #2ecc71;
				}

				.toast-error {
					background-color: #e74c3c;
				}

				.toast-icon {
					display: flex;
					align-items: center;
					flex-shrink: 0;
				}

				.toast-message {
					flex: 1;
					font-size: 0.95rem;
					line-height: 1.4;
				}

				.toast-close {
					background: none;
					border: none;
					color: white;
					cursor: pointer;
					padding: 4px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 4px;
					transition: background-color 0.2s;
					flex-shrink: 0;
				}

				.toast-close:hover {
					background-color: rgba(255, 255, 255, 0.2);
				}

				.toast-close:focus-visible {
					outline: 2px solid white;
					outline-offset: 2px;
				}

				@media (max-width: 640px) {
					.toast {
						bottom: 10px;
						right: 10px;
						left: 10px;
						max-width: none;
						min-width: auto;
					}

					.toast-message {
						font-size: 0.9rem;
					}
				}

				@media (prefers-reduced-motion: reduce) {
					.toast {
						animation: none;
					}
				}
			`}</style>
		</div>
	);
}