import { Edit, Trash2 } from 'lucide-react';
import StudentTable from './StudentTable';
export default function MainComponent({
	handleEdit,
	handleDelete,
	searchTerm,
	students,
  setSearchTerm
}) {
	return (
		<>
			<input
				type='text'
				placeholder='Search student by name'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
			/>
			<StudentTable
				handleEdit={handleEdit}
				students={students}
				handleDelete={handleDelete}
			/>
		</>
	);
}
