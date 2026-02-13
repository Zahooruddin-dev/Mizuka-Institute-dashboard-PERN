import { Edit, Trash2, Eye } from 'lucide-react';
import './studenttable.css';
import { useEffect, useState } from 'react';

export default function StudentTable({
	students,
	handleDelete,
	handleEdit,
	handleViewDetails,
	page,
	limit,
	User,
}) {
	const priveledge = User.User	
	
	return (
		<div className='table-container'>
			<div className='table-wrapper'>
				<table
					className='student-table'
					role='table'
					aria-label='Students list'
				>
					<thead>
						<tr>
							<th scope='col'>
								<span className='th-content'>No</span>
							</th>
							<th scope='col'>
								<span className='th-content'>Student Name</span>
							</th>
							<th scope='col'>
								<span className='th-content'>Email Address</span>
							</th>
							<th scope='col'>
								<span className='th-content'>Actions</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{students.map((student, index) => {
							const tableId = (page - 1) * limit + index + 1;

							return (
								<tr key={student.id}>
									<td>
										<span className='row-number'>{tableId}</span>
									</td>
									<td>
										<div className='student-name-cell'>
											<div className='student-avatar'>
												{student.student_name.charAt(0).toUpperCase()}
											</div>
											<span className='student-name'>
												{student.student_name}
											</span>
										</div>
									</td>
									<td>
										<span className='student-email'>{student.email}</span>
									</td>
									<td>
										<div className='action-buttons'>
											<button
												className='action-button view-button'
												onClick={() => handleViewDetails(student)}
												aria-label={`View ${student.student_name} details`}
												type='button'
											>
												<Eye size={18} />
												<span className='button-text'>View</span>
											</button>
											{priveledge === 'teacher' && (
												<>
													<button
														className='action-button edit-button'
														onClick={() => handleEdit(student)}
														aria-label={`Edit ${student.student_name}`}
														type='button'
													>
														<Edit size={18} />
														<span className='button-text'>Edit</span>
													</button>
													<button
														className='action-button delete-button'
														onClick={() => handleDelete(student)}
														aria-label={`Delete ${student.student_name}`}
														type='button'
													>
														<Trash2 size={18} />
														<span className='button-text'>Delete</span>
													</button>
												</>
											)}
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
