import { Edit, Trash2 } from 'lucide-react';

export default function StudentTable({
	students,
	handleDelete,
	handleEdit,
	page,
	limit
}) {
	const handleDeleteClick = (student) => {
		if (handleDelete) {
			handleDelete(student);
		}
	};

	const handleEditClick = (student) => {
		if (handleEdit) {
			handleEdit(student);
		}
	};

	const handleKeyDown = (e, callback, student) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			callback(student);
		}
	};

	return (
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
										onClick={() => handleDeleteClick(student)}
										onKeyDown={(e) => handleKeyDown(e, handleDeleteClick, student)}
										aria-label={`Delete ${student.student_name}`}
										type="button"
									>
										<Trash2
											color="red"
											size={24}
											strokeWidth={2}
											aria-hidden="true"
										/>
									</button>
								</td>
								<td>
									<button
										className="action-button edit-button"
										onClick={() => handleEditClick(student)}
										onKeyDown={(e) => handleKeyDown(e, handleEditClick, student)}
										aria-label={`Edit ${student.student_name}`}
										type="button"
									>
										<Edit
											color="green"
											size={24}
											strokeWidth={2}
											aria-hidden="true"
										/>
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<style jsx>{`
				.table-container {
					width: 100%;
					overflow-x: auto;
				}

				.student-table {
					width: 100%;
					border-collapse: collapse;
					text-align: left;
					border: 1px solid #ccc;
				}

				.student-table th,
				.student-table td {
					padding: 0.625rem;
					border: 1px solid #ccc;
				}

				.student-table th {
					background-color: #f5f5f5;
					font-weight: bold;
				}

				.student-table tbody tr:nth-child(even) {
					background-color: #fafafa;
				}

				.student-table tbody tr:hover {
					background-color: #f0f0f0;
				}

				.action-button {
					background: none;
					border: none;
					cursor: pointer;
					padding: 0.25rem;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					border-radius: 4px;
					transition: background-color 0.2s;
				}

				.action-button:hover {
					background-color: rgba(0, 0, 0, 0.05);
				}

				.action-button:focus {
					outline: 2px solid #3b82f6;
					outline-offset: 2px;
				}

				.delete-button:focus {
					outline-color: red;
				}

				.edit-button:focus {
					outline-color: green;
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
		</div>
	);
}