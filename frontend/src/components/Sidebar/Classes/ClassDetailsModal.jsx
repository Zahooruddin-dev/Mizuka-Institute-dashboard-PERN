import React, { useState, useEffect } from 'react';
import { X, BookOpen, Clock, Calendar, User, Shield } from 'lucide-react';
import '../../../css/Modal.css';
import { getClassById } from '../../../api/api';

const ClassDetailsModal = ({ classId, onClose }) => {
	const [classData, setClassData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				setLoading(true);
				const response = await getClassById(classId);
				setClassData(response.data);
			} catch (err) {
				console.error('Error fetching class details:', err);
			} finally {
				setLoading(false);
			}
		};

		if (classId) fetchDetails();
	}, [classId]);

	if (loading)
		return (
			<div className='modal-overlay'>
				<div className='modal-content loading'>Loading Details...</div>
			</div>
		);

	return (
		<div className='modal-overlay'>
			<div className='modal-content details-modal'>
				<div className='modal-header'>
					<div className='header-title'>
						<BookOpen size={24} className='text-blue' />
						<h2>Class Details</h2>
					</div>
					<button onClick={onClose} className='close-btn'>
						<X size={20} />
					</button>
				</div>

				{classData ? (
					<div className='details-body'>
						<div className='detail-item'>
							<label>Course Name</label>
							<p className='detail-value'>{classData.class_name}</p>
						</div>

						<div className='detail-grid'>
							<div className='detail-item'>
								<label>
									<Clock size={16} /> Schedule
								</label>
								<p>{classData.time_in_pakistan}</p>
							</div>
							<div className='detail-item'>
								<label>
									<Shield size={16} /> Class ID
								</label>
								<p>#{classData.id}</p>
							</div>
						</div>

						<div className='detail-item mt-4'>
							<label>
								<Calendar size={16} /> Created On
							</label>
							<p>{new Date(classData.created_at).toLocaleDateString()}</p>
						</div>
						<div className='detail-item mt-4'>
							<label>
								<User size={16} /> Instructor
							</label>
							<p className='detail-value text-indigo-600 font-medium'>
								{classData.teacher_name || 'Staff Instructor'}
							</p>
						</div>
					</div>
				) : (
					<p>No details found for this class.</p>
				)}

				<div className='modal-footer'>
					<button onClick={onClose} className='btn-secondary full-width'>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default ClassDetailsModal;
