import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function PostingComponent({
	student_name,
	email,
	handleChange,
	handleSubmit,
}) {
	const [isSaving, SetIsSaving] = useState(false);
	const handleLocalSubmit = async (e) => {
		e.preventDefault(true);
		SetIsSaving(true);
		try {
			await onsubmit(e);
		} finally {
			SetIsSaving(false);
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
					<button type='submit' disabled={isSaving}>
						{isSaving ? <Loader2 className='animate-spin' /> : 'Save Student'}
					</button>
				</div>
			</div>
		</>
	);
}
