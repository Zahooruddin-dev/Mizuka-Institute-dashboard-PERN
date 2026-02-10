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
				params: { name: searchTerm, sort: 'ASC' },
			});
			setResults(response.data);
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
				className="modal-overlay"
				onClick={handleOverlayClick}
				role="dialog"
				aria-modal="true"
				aria-labelledby="search-dialog-title"
			>
				<div className="modal-content">
					<div className="modal-header">
						<h2 id="search-dialog-title">Search Students</h2>
						<button
							onClick={onClose}
							className="close-button"
							aria-label="Close search"
							type="button"
						>
							<X size={24} />
						</button>
					</div>

					<div className="search-section">
						<div className="search-input-wrapper">
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Search by name..."
								className="search-input"
								autoFocus
							/>
							<button onClick={handleSearch} className="search-button" type="button">
								<Search size={20} />
								Search
							</button>
						</div>
					</div>

					<div className="results-section">
						{loading && <p className="status-text">Searching...</p>}

						{!loading && searched && results.length === 0 && (
							<p className="status-text">No students found</p>
						)}

						{!loading && results.length > 0 && (
							<div className="results-list">
								{results.map((student) => (
									<div
										key={student.id}
										className="result-item"
										onClick={() => onSelectStudent(student)}
										role="button"
										tabIndex={0}
										onKeyPress={(e) => {
											if (e.key === 'Enter') onSelectStudent(student);
										}}
									>
										<div className="result-info">
											<p className="result-name">{student.student_name}</p>
											<p className="result-email">{student.email}</p>
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
					background-color: white;
					padding: 2rem;
					border-radius: 12px;
					width: 100%;
					max-width: 600px;
					max-height: 80vh;
					overflow-y: auto;
					box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
				}

				.modal-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 1.5rem;
				}

				.modal-header h2 {
					margin: 0;
					color: #213547;
					font-size: 1.5rem;
				}

				.close-button {
					background: none;
					border: none;
					cursor: pointer;
					padding: 0.5rem;
					border-radius: 4px;
					color: #213547;
					transition: background-color 0.2s;
				}

				.close-button:hover {
					background-color: #f0f0f0;
				}

				.close-button:focus {
					outline: 2px solid #646cff;
					outline-offset: 2px;
				}

				.search-section {
					margin-bottom: 1.5rem;
				}

				.search-input-wrapper {
					display: flex;
					gap: 0.75rem;
				}

				.search-input {
					flex: 1;
					padding: 0.75rem;
					font-size: 1rem;
					border: 1px solid #d1d5db;
					border-radius: 6px;
					color: #213547;
				}

				.search-input:focus {
					outline: none;
					border-color: #646cff;
					box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
				}

				.search-button {
					padding: 0.75rem 1.5rem;
					background-color: #646cff;
					color: white;
					border: none;
					border-radius: 6px;
					cursor: pointer;
					display: flex;
					align-items: center;
					gap: 0.5rem;
					font-weight: 500;
					transition: background-color 0.2s;
				}

				.search-button:hover {
					background-color: #535bf2;
				}

				.search-button:focus {
					outline: 2px solid #646cff;
					outline-offset: 2px;
				}

				.results-section {
					min-height: 200px;
				}

				.status-text {
					text-align: center;
					padding: 2rem;
					color: #6b7280;
				}

				.results-list {
					display: flex;
					flex-direction: column;
					gap: 0.75rem;
				}

				.result-item {
					padding: 1rem;
					background-color: #f9f9f9;
					border-radius: 8px;
					cursor: pointer;
					transition: background-color 0.2s, transform 0.1s;
					border: 2px solid transparent;
				}

				.result-item:hover {
					background-color: #e9e9e9;
					border-color: #646cff;
				}

				.result-item:focus {
					outline: 2px solid #646cff;
					outline-offset: 2px;
				}

				.result-item:active {
					transform: scale(0.98);
				}

				.result-info {
					display: flex;
					flex-direction: column;
					gap: 0.25rem;
				}

				.result-name {
					margin: 0;
					font-weight: 600;
					color: #213547;
					font-size: 1rem;
				}

				.result-email {
					margin: 0;
					color: #6b7280;
					font-size: 0.875rem;
				}

				@media (max-width: 480px) {
					.modal-content {
						padding: 1.5rem;
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