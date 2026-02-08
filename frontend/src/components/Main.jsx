import { Edit, Search, Trash2 } from 'lucide-react';
import StudentTable from './StudentTable';

export default function MainComponent({
	handleEdit,
	handleDelete,
	searchTerm,
	students,
	setSearchTerm,
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
			{students.length > 0 ? (
				<StudentTable
					handleEdit={handleEdit}
					students={students}
					handleDelete={handleDelete}
				/>
			) : (
				<div style={{ padding: '20px', textAlign: 'center', color: 'grey' }}>
					{searchTerm ? (
						<p>
							No students match the name "<strong>{searchTerm}</strong>
						</p>
					) : (
						<p>No students found in the database. </p>
					)}
				</div>
			)}
		</>
	);
}
