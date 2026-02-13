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
	limit,
	handleViewDetails
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
						<Search size={20} className="search-icon" aria-hidden="true" />
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
							handleViewDetails={handleViewDetails}
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
					margin-bottom: 1.5rem;
					flex-wrap: wrap;
				}

				.search-wrapper {
					display: flex;
					align-items: center;
					position: relative;
					background: #ffffff;
					border-radius: 12px;
					border: 1px solid rgba(0, 0, 0, 0.08);
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
				}

				.search-wrapper:focus-within {
					border-color: #6366f1;
					box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
				}

				.search-input {
					padding: 0.75rem 1rem;
					padding-right: 3rem;
					width: 320px;
					font-size: 0.9375rem;
					border: none;
					border-radius: 12px;
					outline: none;
					background: transparent;
					color: #1e293b;
					font-weight: 500;
				}

				.search-input::placeholder {
					color: #94a3b8;
				}

				.search-icon {
					position: absolute;
					right: 0.875rem;
					color: #6366f1;
					pointer-events: none;
				}

				.sort-button {
					display: flex;
					align-items: center;
					gap: 0.625rem;
					padding: 0.75rem 1.25rem;
					font-size: 0.9375rem;
					font-weight: 600;
					background: #ffffff;
					border: 1px solid rgba(0, 0, 0, 0.08);
					border-radius: 12px;
					cursor: pointer;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					color: #334155;
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
				}

				.sort-button:hover {
					background: #f8fafc;
					border-color: #6366f1;
					transform: translateY(-1px);
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
				}

				.sort-button:active {
					transform: translateY(0);
				}

				.sort-button:focus {
					outline: 2px solid #6366f1;
					outline-offset: 2px;
				}

				.sort-button svg {
					color: #6366f1;
				}

				.pagination {
					margin-top: 1.5rem;
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 1rem;
				}

				.pagination-button {
					padding: 0.75rem 1.5rem;
					font-size: 0.9375rem;
					font-weight: 600;
					background: #ffffff;
					border: 1px solid rgba(0, 0, 0, 0.08);
					border-radius: 12px;
					cursor: pointer;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					color: #334155;
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
				}

				.pagination-button:hover:not(:disabled) {
					background: #f8fafc;
					border-color: #6366f1;
					transform: translateY(-1px);
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
				}

				.pagination-button:active:not(:disabled) {
					transform: translateY(0);
				}

				.pagination-button:focus {
					outline: 2px solid #6366f1;
					outline-offset: 2px;
				}

				.pagination-button:disabled {
					cursor: not-allowed;
					opacity: 0.4;
					background: #f8fafc;
					color: #94a3b8;
				}

				.page-indicator {
					font-weight: 600;
					color: #1e293b;
					font-size: 0.9375rem;
					padding: 0 0.5rem;
					letter-spacing: 0.01em;
				}

				.no-results {
					margin-top: 3rem;
					border: 2px dashed rgba(0, 0, 0, 0.1);
					padding: 3rem 2.5rem;
					border-radius: 16px;
					background: #fafafa;
					text-align: center;
				}

				.no-results h3 {
					margin-top: 0;
					margin-bottom: 1rem;
					color: #1e293b;
					font-size: 1.5rem;
					font-weight: 600;
					letter-spacing: -0.025em;
				}

				.no-results p {
					margin: 0;
					color: #64748b;
					font-size: 0.9375rem;
				}

				.clear-search-button {
					cursor: pointer;
					color: #6366f1;
					background: rgba(99, 102, 241, 0.08);
					border: 1px solid rgba(99, 102, 241, 0.2);
					border-radius: 10px;
					font-size: 0.9375rem;
					font-weight: 600;
					margin-top: 1rem;
					padding: 0.75rem 1.5rem;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
				}

				.clear-search-button:hover {
					background: rgba(99, 102, 241, 0.12);
					border-color: #6366f1;
					transform: translateY(-1px);
				}

				.clear-search-button:active {
					transform: translateY(0);
				}

				.clear-search-button:focus {
					outline: 2px solid #6366f1;
					outline-offset: 2px;
				}

				@media (max-width: 640px) {
					.search-input {
						width: 100%;
						max-width: 300px;
					}

					.search-controls {
						flex-direction: column;
						gap: 0.75rem;
					}

					.pagination {
						gap: 0.75rem;
					}

					.pagination-button {
						padding: 0.625rem 1.25rem;
						font-size: 0.875rem;
					}
				}
			`}</style>
		</>
	);
}