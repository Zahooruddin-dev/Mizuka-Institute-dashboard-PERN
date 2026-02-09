import { Edit, Search, Trash2 } from 'lucide-react';
import StudentTable from './StudentTable';

export default function MainComponent({
	handleEdit,
	handleDelete,
	searchTerm,
	students,
	setSearchTerm,
	toggleSort,
	sortOrder
}) {
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
			</div>
			<button onClick={toggleSort}>
				Sort: {sortOrder === 'ASC' ? 'A-Z' :'Z-A'}
			</button>
			{students.length > 0 ? (
				<StudentTable
					handleEdit={handleEdit}
					students={students}
					handleDelete={handleDelete}
				/>
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
								color: '#a3adbd',
								background: 'none',
								border: 'none',
								textDecoration: 'underline',
								fontSize: '2rem',
								fontWeight: 'bold',
							}}
						>
							Clear Search For {searchTerm}
						</button>
					) : (
						<p>No students found in the database. </p>
					)}
				</div>
			)}
		</>
	);
}
