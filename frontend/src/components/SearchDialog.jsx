import { useState } from 'react';
import axios from 'axios';
import { X, Search } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000/api/students';

export default function SearchDialog({ onClose, onSelectStudent }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searched, setSearched] = useState(false);

	const handleSearch = async () => {
		if (!searchTerm.trim()) return;

		setLoading(true);
		setSearched(true);

		try {
			const response = await axios.get(`${API_BASE_URL}/search`, {
				params: { email: searchTerm, sort: 'ASC' },
			});

			setResults(response.data ? [response.data] : []);
		} catch (err) {
			console.error('Search failed:', err);
			setResults([]);
		} finally {
			setLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<>
			<div
				className='modal-overlay'
				onClick={handleOverlayClick}
				role='dialog'
				aria-modal='true'
				aria-labelledby='search-dialog-title'
			>
				<div className='modal-content'>
					<div className='modal-header'>
						<h2 id='search-dialog-title'>Search Students</h2>
						<button
							onClick={onClose}
							className='close-button'
							aria-label='Close search'
							type='button'
						>
							<X size={24} />
						</button>
					</div>

					<div className='search-section'>
						<div className='search-input-wrapper'>
							<input
								type='text'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder='Search by email...'
								className='search-input'
								autoFocus
							/>
							<button
								onClick={handleSearch}
								className='search-button'
								type='button'
							>
								<Search size={20} />
								Search
							</button>
						</div>
					</div>

					<div className='results-section'>
						{loading && (
							<div className='skeleton-results'>
								<div className='skeleton-item'>
									<div className='skeleton-line skeleton-name'></div>
									<div className='skeleton-line skeleton-email'></div>
								</div>
								<div className='skeleton-item'>
									<div className='skeleton-line skeleton-name'></div>
									<div className='skeleton-line skeleton-email'></div>
								</div>
								<div className='skeleton-item'>
									<div className='skeleton-line skeleton-name'></div>
									<div className='skeleton-line skeleton-email'></div>
								</div>
							</div>
						)}

						{!loading && searched && results.length === 0 && (
							<p className='status-text'>No students found</p>
						)}

						{!loading && results.length > 0 && (
							<div className='results-list'>
								{results.map((student) => (
									<div
										key={student.id}
										className='result-item'
										onClick={() => onSelectStudent(student)}
										role='button'
										tabIndex={0}
										onKeyPress={(e) => {
											if (e.key === 'Enter') onSelectStudent(student);
										}}
									>
										<div className='result-info'>
											<p className='result-name'>{student.student_name}</p>
											<p className='result-email'>{student.email}</p>
										</div>
									</div>
								))}
							</div>
						)}
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
					background: #fafafa;
					padding: 2.5rem;
					border-radius: 20px;
					width: 100%;
					max-width: 640px;
					max-height: 85vh;
					overflow-y: auto;
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
					color: #1e293b;
					font-size: 1.875rem;
					font-weight: 600;
					letter-spacing: -0.025em;
				}

				.close-button {
					background: transparent;
					border: none;
					cursor: pointer;
					padding: 0.5rem;
					border-radius: 10px;
					color: #64748b;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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

				.search-section {
					margin-bottom: 2rem;
				}

				.search-input-wrapper {
					display: flex;
					gap: 0.75rem;
				}

				.search-input {
					flex: 1;
					padding: 0.875rem 1rem;
					font-size: 0.9375rem;
					font-weight: 500;
					border: 1px solid rgba(0, 0, 0, 0.08);
					border-radius: 12px;
					background: #ffffff;
					color: #1e293b;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
				}

				.search-input:hover {
					border-color: rgba(0, 0, 0, 0.12);
				}

				.search-input:focus {
					outline: none;
					border-color: #6366f1;
					box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
				}

				.search-input::placeholder {
					color: #94a3b8;
				}

				.search-button {
					padding: 0.875rem 1.5rem;
					background: #6366f1;
					color: #ffffff;
					border: none;
					border-radius: 12px;
					cursor: pointer;
					display: flex;
					align-items: center;
					gap: 0.5rem;
					font-weight: 600;
					font-size: 0.9375rem;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
					letter-spacing: 0.01em;
				}

				.search-button:hover {
					background: #4f46e5;
					transform: translateY(-1px);
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15);
				}

				.search-button:active {
					transform: translateY(0);
				}

				.search-button:focus {
					outline: 2px solid #6366f1;
					outline-offset: 2px;
				}

				.results-section {
					min-height: 240px;
				}

				.status-text {
					text-align: center;
					padding: 3rem 2rem;
					color: #64748b;
					font-size: 0.9375rem;
					font-weight: 500;
				}

				.skeleton-results {
					display: flex;
					flex-direction: column;
					gap: 0.75rem;
				}

				.skeleton-item {
					padding: 1rem 1.25rem;
					background: #ffffff;
					border-radius: 12px;
					border: 1px solid rgba(0, 0, 0, 0.06);
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}

				.skeleton-line {
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

				.skeleton-name {
					width: 60%;
					height: 18px;
				}

				.skeleton-email {
					width: 80%;
					height: 14px;
				}

				@keyframes shimmer {
					0% {
						background-position: 200% 0;
					}
					100% {
						background-position: -200% 0;
					}
				}

				.results-list {
					display: flex;
					flex-direction: column;
					gap: 0.75rem;
				}

				.result-item {
					padding: 1rem 1.25rem;
					background: #ffffff;
					border-radius: 12px;
					cursor: pointer;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					border: 1px solid rgba(0, 0, 0, 0.06);
					box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
				}

				.result-item:hover {
					background: #ffffff;
					border-color: #6366f1;
					transform: translateX(4px);
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
				}

				.result-item:focus {
					outline: 2px solid #6366f1;
					outline-offset: 2px;
				}

				.result-item:active {
					transform: scale(0.98);
				}

				.result-info {
					display: flex;
					flex-direction: column;
					gap: 0.375rem;
				}

				.result-name {
					margin: 0;
					font-weight: 600;
					color: #1e293b;
					font-size: 1rem;
					letter-spacing: -0.01em;
				}

				.result-email {
					margin: 0;
					color: #64748b;
					font-size: 0.875rem;
					font-weight: 500;
				}

				@media (max-width: 480px) {
					.modal-overlay {
						padding: 1rem;
					}

					.modal-content {
						padding: 2rem 1.5rem;
						border-radius: 16px;
					}

					.modal-header h2 {
						font-size: 1.5rem;
					}

					.search-input-wrapper {
						flex-direction: column;
					}

					.search-button {
						width: 100%;
						justify-content: center;
					}
				}
			`}</style>
		</>
	);
}