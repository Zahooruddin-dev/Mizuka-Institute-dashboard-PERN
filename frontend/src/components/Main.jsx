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
}) {
	const hasNextPage = page * 10 < totalCount;
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<input
					type='text'
					placeholder='Search student by name'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
				/>
				<Search size={25} color='wheat' style={{ padding: '8px' }} />
				<button
					onClick={toggleSort}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						padding: '8px 12px',
					}}
				>
					Sort{' '}
					{sortOrder === 'ASC' ? (
						<ArrowUpAZ size={20} />
					) : (
						<ArrowDownZA size={20} />
					)}
				</button>
			</div>

			{students.length > 0 ? (
				<>
					<StudentTable
						handleEdit={handleEdit}
						students={students}
						handleDelete={handleDelete}
					/>
					<div
						style={{
							marginTop: '20px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '20px',
						}}
					>
						<button
							disabled={page === 1}
							onClick={() => setPage((prev) => prev - 1)}
							style={{
								padding: '8px 16px',
								cursor: page === 1 ? 'not-allowed' : 'pointer',
							}}
						>
							Previous
						</button>

						<span style={{ fontWeight: 'bold', color: 'wheat' }}>
							Page {page}
						</span>

						<button
							onClick={() => setPage((prev) => prev + 1)}
							// If you want to disable "Next" when no more data:
							disabled={!hasNextPage}
							style={{
								padding: '8px 16px',
								cursor: students.length < 10 ? 'not-allowed' : 'pointer',
							}}
						>
							Next
						</button>
					</div>
				</>
			) : (
				<div
					style={{
						marginTop: '50px',
						border: '2px dashed wheat',
						padding: '40px',
						borderRadius: '15px',
						opacity: 0.8,
					}}
				>
					{' '}
					<h3>No Students Found</h3>
					{searchTerm ? (
						<button
							onClick={() => setSearchTerm('')}
							style={{
								cursor: 'pointer',
								color: '#3b82f6',
								background: 'none',
								border: 'none',
								textDecoration: 'underline',
								fontSize: '1rem',
								fontWeight: '500',
								marginTop: '10px',
							}}
						>
							Clear Search
						</button>
					) : (
						<p>No students found in the database. </p>
					)}
				</div>
			)}
		</>
	);
}
