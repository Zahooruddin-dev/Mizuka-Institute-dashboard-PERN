import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function PostingComponent({
	student_name,
	email,
	handleChange,
	handleSubmit,
}) {
	const [isSaving, setIsSaving] = useState(false);
	const handleLocalSubmit = async (e) => {
		e.preventDefault();
		setIsSaving(true);
		try {
			await handleSubmit(e);
		} catch (err) {
			console.error('Failed to save', err);
		} finally {
			setIsSaving(false);
		}
	};
	return (
		<>
			<div
				className='modal-overlay'
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0,0,0,0.7)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					zIndex: 1000,
				}}
			>
				<form onSubmit={handleLocalSubmit} style={modalStyles}>
					<div
						style={{
							backgroundColor: 'rgba(17, 16, 16, 0.81)',
							padding: '20px',
							borderRadius: '20px',
							color: 'white',
							width: '300px',
							fontSize: '1rem',
						}}
					>
						<h3>Add New Student</h3>
						<input
							type='text'
							name='student_name'
							placeholder='Full Name'
							value={student_name}
							onChange={handleChange}
							style={{
								marginBottom: '12px',
								padding: '12px',
								borderColor: 'grey',
								borderRadius: '8px',
								width: '75%',
							}}
						/>
						<input
							type='email'
							name='email'
							placeholder='Email Address'
							value={email}
							onChange={handleChange}
							style={{
								marginBottom: '12px',
								padding: '12px',
								borderColor: 'grey',
								borderRadius: '8px',
								width: '75%',
							}}
						/>
						<button
							type='submit'
							disabled={isSaving}
							onClick={handleLocalSubmit}
						>
							{isSaving ? <Loader2 className='animate-spin' /> : 'Save Student'}
						</button>
						<button
							type='button'
							onClick={onClose}
							style={{ marginLeft: '10px' }}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
