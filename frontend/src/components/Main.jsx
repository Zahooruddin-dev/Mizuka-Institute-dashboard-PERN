import { Edit, Trash2 } from 'lucide-react';

export default function MainComponent({handleEdit, searchTerm, students}) {
	return (
		<>
			<input
				type='text'
				placeholder='Search student by name'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
			/>
			<table
				border='1'
				cellPadding='10'
				style={{ width: '100%', textAlign: 'left' }}
			>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Delete</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student) => (
						<tr key={student.id}>
							<td>{student.student_name}</td>
							<td>{student.email}</td>
							<td>
								<Trash2
									color='red'
									size={24}
									strokeWidth={2}
									onClick={() => handleDelete(student.id)}
									style={{ cursor: 'pointer' }}
								/>
							</td>
							<td>
								<Edit
									color='green'
									size={24}
									strokeWidth={2}
									onClick={() => handleEdit(student)}
									style={{ cursor: 'pointer' }}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>{' '}
		</>
	);
}
