import { Search, ArrowUpAZ, ArrowDownZA } from 'lucide-react';
import StudentTable from './StudentTable';
import '../../../css/main.css';

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
	handleViewDetails,
User
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
		<div className='main-component'>
			<div className='content-header'>
				<div className='stats-row'>
					<div className='stat-card'>
						<div className='stat-icon'>
							<Search size={20} />
						</div>
						
						<div className='stat-info'>
							<p className='stat-label'>Total Students</p>
							<p className='stat-value'>{totalCount}</p>
						</div>
					</div>
					<div className='stat-card'>
						<div className='stat-icon secondary'>
							<ArrowUpAZ size={20} />
						</div>
						<div className='stat-info'>
							<p className='stat-label'>Showing</p>
							<p className='stat-value'>{students.length}</p>
						</div>
					</div>
				</div>
			</div>

			<div className='search-controls'>
				<div className='search-wrapper'>
					<label htmlFor='student-search' className='visually-hidden'>
						Search students by name
					</label>
					<input
						id='student-search'
						type='text'
						placeholder='Search students by name...'
						value={searchTerm}
						onChange={handleSearchChange}
						className='search-input'
						aria-label='Search students by name'
					/>
					<Search size={20} className='search-icon' aria-hidden='true' />
				</div>
				<button
					onClick={toggleSort}
					className='sort-button'
					aria-label={`Sort ${sortOrder === 'ASC' ? 'descending' : 'ascending'}`}
				>
					<span>Sort by Name</span>
					{sortOrder === 'ASC' ? (
						<ArrowUpAZ size={20} aria-hidden='true' />
					) : (
						<ArrowDownZA size={20} aria-hidden='true' />
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
						User={User}
					/>
					<nav className='pagination' aria-label='Pagination navigation'>
						<button
							disabled={!hasPrevPage}
							onClick={handlePrevPage}
							className='pagination-button'
							aria-label='Previous page'
							aria-disabled={!hasPrevPage}
						>
							← Previous
						</button>

						<span
							className='page-indicator'
							aria-current='page'
							aria-live='polite'
						>
							Page {page} of {Math.ceil(totalCount / limit)}
						</span>

						<button
							onClick={handleNextPage}
							disabled={!hasNextPage}
							className='pagination-button'
							aria-label='Next page'
							aria-disabled={!hasNextPage}
						>
							Next →
						</button>
					</nav>
				</>
			) : (
				<div className='no-results' role='status' aria-live='polite'>
					<div className='no-results-icon'>
						<Search size={48} />
					</div>
					<h3>No Students Found</h3>
					{searchTerm ? (
						<>
							<p>No results for "{searchTerm}"</p>
							<button
								onClick={handleClearSearch}
								className='clear-search-button'
								aria-label='Clear search and show all students'
							>
								Clear Search
							</button>
						</>
					) : (
						<p>No students found in the database.</p>
					)}
				</div>
			)}
		</div>
	);
}
