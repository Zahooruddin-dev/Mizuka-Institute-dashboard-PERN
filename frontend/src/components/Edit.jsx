import React from 'react';
export default function EditComponent(handleUpdateSubmit,student_name,email,editing,handleChange) {
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
					}}
				>
					<form
						onSubmit={handleUpdateSubmit}
						style={{
							backgroundColor: 'rgba(17, 16, 16, 0.81)',
							padding: '20px',
							borderRadius: '20px',
						}}
					>
						<h3>Edit Student Details</h3>
						<input
							name='student_name'
							value={student_name}
							onChange={handleChange}
							style={{ width: '90%', marginBottom: '10px', padding: '8px' }}
							placeholder='Your Name'
							required
						/>
						<input
							name='email'
							value={email}
							onChange={handleChange}
							style={{ width: '90%', marginBottom: '10px', padding: '8px' }}
							placeholder='example@school.edu'
							required
						/>
						<button type='submit'>Update</button>
						<button onClick={editing}>Cancel</button>
					</form>
				</div>
			</div>
		</>
	);
}
