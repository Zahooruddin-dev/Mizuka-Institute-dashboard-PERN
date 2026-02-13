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
		<>
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
			</div>

			<style>{`
				@keyframes slideIn {
					from {
						transform: translateX(120%);
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
						transform: translateX(120%);
						opacity: 0;
					}
				}

				.toast {
					position: fixed;
					bottom: 24px;
					right: 24px;
					color: #ffffff;
					padding: 1rem 1.25rem;
					border-radius: 16px;
					display: flex;
					align-items: center;
					gap: 0.875rem;
					box-shadow: 
						0 20px 25px -5px rgba(0, 0, 0, 0.1),
						0 8px 10px -6px rgba(0, 0, 0, 0.1),
						0 0 0 1px rgba(0, 0, 0, 0.05);
					z-index: 2000;
					animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
					min-width: 280px;
					max-width: 420px;
					backdrop-filter: blur(8px);
				}

				.toast-success {
					background: linear-gradient(135deg, #10b981 0%, #059669 100%);
				}

				.toast-error {
					background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
				}

				.toast-icon {
					display: flex;
					align-items: center;
					flex-shrink: 0;
					filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
				}

				.toast-message {
					flex: 1;
					font-size: 0.9375rem;
					line-height: 1.5;
					font-weight: 500;
					letter-spacing: 0.01em;
				}

				.toast-close {
					background: rgba(255, 255, 255, 0.15);
					border: none;
					color: #ffffff;
					cursor: pointer;
					padding: 0.375rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 8px;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					flex-shrink: 0;
				}

				.toast-close:hover {
					background: rgba(255, 255, 255, 0.25);
					transform: scale(1.05);
				}

				.toast-close:active {
					transform: scale(0.95);
				}

				.toast-close:focus {
					outline: 2px solid rgba(255, 255, 255, 0.5);
					outline-offset: 2px;
				}

				@media (max-width: 640px) {
					.toast {
						bottom: 16px;
						right: 16px;
						left: 16px;
						max-width: none;
						min-width: auto;
					}

					.toast-message {
						font-size: 0.875rem;
					}
				}

				@media (prefers-reduced-motion: reduce) {
					.toast {
						animation: none;
					}
				}
			`}</style>
		</>
	);
}