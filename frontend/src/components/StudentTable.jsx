import { Edit, Trash2 } from 'lucide-react';
export default function StudentTable({
	students,
	handleDelete,
	handleEdit,
	page,
	limit
}) {
	
	return (
		<>
			<div className="table-container">
				<table className="student-table" role="table" aria-label="Students list">
					<thead>
						<tr>
							<th scope="col">No</th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Delete</th>
							<th scope="col">Edit</th>
						</tr>
					</thead>
					<tbody>
						{students.map((student, index) => {
							const tableId = (page - 1) * limit + index + 1;

							return (
								<tr key={student.id}>
									<td>{tableId}</td>
									<td>{student.student_name}</td>
									<td>{student.email}</td>
									<td>
										<button
											className="action-button delete-button"
											onClick={() => {
												console.log('DELETE CLICKED', student);
												handleDelete(student);
											}}
											aria-label={`Delete ${student.student_name}`}
											type="button"
										>
											<Trash2 size={24} color="red" />
										</button>
									</td>
									<td>
										<button
											className="action-button edit-button"
											onClick={() => {
												console.log('EDIT CLICKED', student);
												handleEdit(student);
											}}
											aria-label={`Edit ${student.student_name}`}
											type="button"
										>
											<Edit size={24} color="green" />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div><style>{`
	.table-container {
		width: 100%;
		overflow-x: auto;
	}

	.student-table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
		border: 1px solid #ccc;
		position: relative;
		z-index: 1;
	}

	.student-table th,
	.student-table td {
		padding: 0.625rem;
		border: 1px solid #ccc;
		position: relative;
	}

	.student-table th {
		background-color: #f5f5f5;
		font-weight: bold;
		color: #213547;
	}

	.student-table td {
		color: #213547;
	}

	.student-table tbody tr:nth-child(even) {
		background-color: #fafafa;
	}

	.student-table tbody tr:hover {
		background-color: #f0f0f0;
	}

	.action-button {
		background: #f0f0f0;
		border: 1px solid #ccc;
		cursor: pointer;
		padding: 0.5rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: background-color 0.2s;
		position: relative;
		z-index: 10;
	}

	.action-button:hover {
		background-color: #e0e0e0;
	}

	.action-button:focus {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	@media (max-width: 640px) {
		.student-table {
			font-size: 0.875rem;
		}

		.student-table th,
		.student-table td {
			padding: 0.5rem;
		}
	}
`}</style>
		</>
	);
}