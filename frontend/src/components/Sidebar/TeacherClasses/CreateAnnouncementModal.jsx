import React, { useState } from 'react';
import { X, Megaphone, Send, Clock } from 'lucide-react';
import { postAnnouncement } from '../../../api/api';
import '../../../css/Modal.css';

const CreateAnnouncementModal = ({ classItem, onClose, onSuccess }) => {
	const [formData, setFormData] = useState({
		title: '',
		content: '',
		expires_at: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const minDateTime = new Date(Date.now() + 60 * 60 * 1000)
		.toISOString()
		.slice(0, 16);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const payload = {
				title: formData.title,
				content: formData.content,
				expires_at: formData.expires_at || null,
			};
			await postAnnouncement(classItem.id, payload);
			onSuccess();
		} catch (err) {
			setError(err.response?.data?.error || 'Failed to post announcement');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='modal-overlay' role='dialog' aria-modal='true'>
			<div className='modal-content'>
				<div className='modal-header'>
					<div className='header-title'>
						<Megaphone size={20} className='text-indigo' />
						<h2>Post to {classItem.class_name}</h2>
					</div>
					<button onClick={onClose} className='close-btn' aria-label='Close'>
						<X size={20} />
					</button>
				</div>

				<form onSubmit={handleSubmit} className='modal-form'>
					{error && <p className='error-message'>{error}</p>}

					<div className='input-group'>
						<label htmlFor='ann-title'>Announcement Title</label>
						<input
							id='ann-title'
							type='text'
							placeholder='e.g. Midterm Schedule Update'
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							required
							disabled={loading}
						/>
					</div>

					<div className='input-group'>
						<label htmlFor='ann-content'>Message Content</label>
						<textarea
							id='ann-content'
							placeholder='Write your announcement here...'
							value={formData.content}
							onChange={(e) => setFormData({ ...formData, content: e.target.value })}
							required
							rows='5'
							disabled={loading}
						/>
					</div>

					<div className='input-group'>
						<label htmlFor='ann-expires' className='ann-expires-label'>
							<Clock size={15} />
							<span>Expiry Date & Time</span>
							<span className='ann-expires-optional'>optional</span>
						</label>
						<input
							id='ann-expires'
							type='datetime-local'
							value={formData.expires_at}
							onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
							min={minDateTime}
							disabled={loading}
						/>
						{formData.expires_at && (
							<p className='ann-expires-hint'>
								This announcement will stop showing after the selected date and time.
							</p>
						)}
					</div>

					<div className='modal-actions'>
						<button type='button' onClick={onClose} className='btn-secondary' disabled={loading}>
							Cancel
						</button>
						<button type='submit' disabled={loading} className='btn-primary'>
							<Send size={16} />
							{loading ? 'Posting...' : 'Post Announcement'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateAnnouncementModal;