import { Edit, Search, Trash2, ArrowUpAZ, ArrowDownZA } from 'lucide-react';
import StudentTable from './StudentTable';

export default function MainComponent({
	handleEdit,
	handleDelete,
	searchTerm,
	students,
	setSearchTerm,
	toggleSort,
	sortOrder,
	page,
	setPage,
	totalCount,
	limit
}) {
	const hasNextPage = page * limit < totalCount;
	const hasPrevPage = page > 1;

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
	};

	const handlePrevPage = () => {
		if (hasPrevPage) {
			setPage((prev) => Math.max(1, prev - 1));
		}
	};

	const handleNextPage = () => {
		if (hasNextPage) {
			setPage((prev) => prev + 1);
		}
	};

	const handleClearSearch = () => {
		setSearchTerm('');
	};

	return (
		<>
			<div className="main-component">
				<div className="search-controls">
					<div className="search-wrapper">
						<label htmlFor="student-search" className="visually-hidden">
							Search students by name
						</label>
						<input
							id="student-search"
							type="text"
							placeholder="Search student by name"
							value={searchTerm}
							onChange={handleSearchChange}
							className="search-input"
							aria-label="Search students by name"
						/>
						<Search size={25} className="search-icon" aria-hidden="true" />
					</div>
					<button
						onClick={toggleSort}
						className="sort-button"
						aria-label={`Sort ${sortOrder === 'ASC' ? 'descending' : 'ascending'}`}
					>
						<span>Sort</span>
						{sortOrder === 'ASC' ? (
							<ArrowUpAZ size={20} aria-hidden="true" />
						) : (
							<ArrowDownZA size={20} aria-hidden="true" />
						)}
					</button>
				</div>

				{students.length > 0 ? (
					<>
						<StudentTable
							handleEdit={handleEdit}
							students={students}
							handleDelete={handleDelete}
							page={page}
							limit={limit}
						/>
						<nav className="pagination" aria-label="Pagination navigation">
							<button
								disabled={!hasPrevPage}
								onClick={handlePrevPage}
								className="pagination-button"
								aria-label="Previous page"
								aria-disabled={!hasPrevPage}
							>
								Previous
							</button>

							<span className="page-indicator" aria-current="page" aria-live="polite">
								Page {page}
							</span>

							<button
								onClick={handleNextPage}
								disabled={!hasNextPage}
								className="pagination-button"
								aria-label="Next page"
								aria-disabled={!hasNextPage}
							>
								Next
							</button>
						</nav>
					</>
				) : (
					<div className="no-results" role="status" aria-live="polite">
						<h3>No Students Found</h3>
						{searchTerm ? (
							<button
								onClick={handleClearSearch}
								className="clear-search-button"
								aria-label="Clear search and show all students"
							>
								Clear Search
							</button>
						) : (
							<p>No students found in the database.</p>
						)}
					</div>
				)}
			</div>

			<style>{`
				.main-component {
					max-width: 100%;
					margin: 0 auto;
				}

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

				.search-controls {
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 1rem;
					margin-bottom: 1.25rem;
					flex-wrap: wrap;
				}

				.search-wrapper {
					display: flex;
					align-items: center;
					position: relative;
				}

				.search-input {
					padding: 0.5rem;
					width: 300px;
					font-size: 1rem;
					border: 1px solid #ccc;
					border-radius: 4px;
					outline: none;
					transition: border-color 0.2s;
				}

				.search-input:focus {
					border-color: wheat;
					box-shadow: 0 0 0 2px rgba(245, 222, 179, 0.2);
				}

				.search-icon {
					color: wheat;
					padding: 0.5rem;
					pointer-events: none;
				}

				.sort-button {
					display: flex;
					align-items: center;
					gap: 0.5rem;
					padding: 0.5rem 0.75rem;
					font-size: 1rem;
					background-color: #f0f0f0;
					border: 1px solid #ccc;
					border-radius: 4px;
					cursor: pointer;
					transition: background-color 0.2s, border-color 0.2s;
				}

				.sort-button:hover {
					background-color: #e0e0e0;
				}

				.sort-button:focus {
					outline: 2px solid wheat;
					outline-offset: 2px;
				}

				.pagination {
					margin-top: 1.25rem;
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 1.25rem;
				}

				.pagination-button {
					padding: 0.5rem 1rem;
					font-size: 1rem;
					background-color: #f0f0f0;
					border: 1px solid #ccc;
					border-radius: 4px;
					cursor: pointer;
					transition: background-color 0.2s, opacity 0.2s;
				}

				.pagination-button:hover:not(:disabled) {
					background-color: #e0e0e0;
				}

				.pagination-button:focus {
					outline: 2px solid wheat;
					outline-offset: 2px;
				}

				.pagination-button:disabled {
					cursor: not-allowed;
					opacity: 0.5;
				}

				.page-indicator {
					font-weight: bold;
					color: wheat;
					font-size: 1rem;
				}

				.no-results {
					margin-top: 3rem;
					border: 2px dashed wheat;
					padding: 2.5rem;
					border-radius: 15px;
					opacity: 0.8;
					text-align: center;
				}

				.no-results h3 {
					margin-top: 0;
					margin-bottom: 1rem;
				}

				.no-results p {
					margin: 0;
				}

				.clear-search-button {
					cursor: pointer;
					color: #3b82f6;
					background: none;
					border: none;
					text-decoration: underline;
					font-size: 1rem;
					font-weight: 500;
					margin-top: 0.625rem;
					padding: 0.5rem;
				}

				.clear-search-button:hover {
					color: #2563eb;
				}

				.clear-search-button:focus {
					outline: 2px solid #3b82f6;
					outline-offset: 2px;
					border-radius: 2px;
				}

				@media (max-width: 640px) {
					.search-input {
						width: 100%;
						max-width: 300px;
					}

					.search-controls {
						flex-direction: column;
					}
				}
			`}</style>
		</>
	);
}