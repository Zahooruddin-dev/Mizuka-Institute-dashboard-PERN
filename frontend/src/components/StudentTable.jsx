import { Edit, Trash2, Eye } from 'lucide-react';

export default function StudentTable({
	students,
	handleDelete,
	handleEdit,
	handleViewDetails,
	page,
	limit,
}) {
	return (
		<>
			<div className='table-container'>
				<table
					className='student-table'
					role='table'
					aria-label='Students list'
				>
					<thead>
						<tr>
							<th scope='col'>No</th>
							<th scope='col'>Name</th>
							<th scope='col'>Email</th>
							<th scope='col'>View</th>
							<th scope='col'>Edit</th>
							<th scope='col'>Delete</th>
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
											className='action-button view-button'
											onClick={() => handleViewDetails(student)}
											aria-label={`View ${student.student_name} details`}
											type='button'
										>
											<Eye size={20} />
										</button>
									</td>
									<td>
										<button
											className='action-button edit-button'
											onClick={() => handleEdit(student)}
											aria-label={`Edit ${student.student_name}`}
											type='button'
										>
											<Edit size={20} />
										</button>
									</td>
									<td>
										<button
											className='action-button delete-button'
											onClick={() => handleDelete(student)}
											aria-label={`Delete ${student.student_name}`}
											type='button'
										>
											<Trash2 size={20} />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<style>{`
				.table-container {
					width: 100%;
					overflow-x: auto;
					background: #fafafa;
					border-radius: 16px;
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
					border: 1px solid rgba(0, 0, 0, 0.06);
				}

				.student-table {
					width: 100%;
					border-collapse: separate;
					border-spacing: 0;
					text-align: left;
					position: relative;
					z-index: 1;
				}

				.student-table th,
				.student-table td {
					padding: 1rem 1.25rem;
					border-bottom: 1px solid rgba(0, 0, 0, 0.06);
					position: relative;
				}

				.student-table th {
					background: #ffffff;
					font-weight: 600;
					color: #1e293b;
					font-size: 0.8125rem;
					text-transform: uppercase;
					letter-spacing: 0.05em;
					border-bottom: 2px solid rgba(0, 0, 0, 0.08);
				}

				.student-table thead tr th:first-child {
					border-top-left-radius: 16px;
				}

				.student-table thead tr th:last-child {
					border-top-right-radius: 16px;
				}

				.student-table td {
					color: #334155;
					font-size: 0.9375rem;
					font-weight: 500;
					background: #fafafa;
				}

				.student-table tbody tr {
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
				}

				.student-table tbody tr:hover {
					background: #ffffff;
					box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
				}

				.student-table tbody tr:last-child td {
					border-bottom: none;
				}

				.student-table tbody tr:last-child td:first-child {
					border-bottom-left-radius: 16px;
				}

				.student-table tbody tr:last-child td:last-child {
					border-bottom-right-radius: 16px;
				}

				.action-button {
					background: transparent;
					border: 1px solid rgba(0, 0, 0, 0.08);
					cursor: pointer;
					padding: 0.5rem;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					border-radius: 10px;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					position: relative;
					z-index: 10;
				}

				.action-button svg {
					display: block;
					width: 20px;
					height: 20px;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
				}

				.view-button {
					color: #6366f1;
				}

				.view-button:hover {
					background: rgba(99, 102, 241, 0.08);
					border-color: #6366f1;
					transform: scale(1.05);
				}

				.view-button svg {
					color: #6366f1;
				}

				.edit-button {
					color: #10b981;
				}

				.edit-button:hover {
					background: rgba(16, 185, 129, 0.08);
					border-color: #10b981;
					transform: scale(1.05);
				}

				.edit-button svg {
					color: #10b981;
				}

				.delete-button {
					color: #ef4444;
				}

				.delete-button:hover {
					background: rgba(239, 68, 68, 0.08);
					border-color: #ef4444;
					transform: scale(1.05);
				}

				.delete-button svg {
					color: #ef4444;
				}

				.action-button:active {
					transform: scale(0.95);
				}

				.action-button:focus {
					outline: 2px solid #6366f1;
					outline-offset: 2px;
				}

				@media (max-width: 640px) {
					.student-table {
						font-size: 0.875rem;
					}

					.student-table th,
					.student-table td {
						padding: 0.75rem 0.875rem;
					}

					.action-button {
						padding: 0.4rem;
					}

					.action-button svg {
						width: 18px;
						height: 18px;
					}
				}
			`}</style>
		</>
	);
}