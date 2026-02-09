import React from 'react';

export default function DeleteModal({studentToDelete,setStudentToDelete,confirmDelete}) {
	return (
		<div
			className='modal-overlay'
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0,0,0,0.8)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 1000,
			}}
		>
			<div
				style={{
					backgroundColor: '#1e1e1e',
					padding: '30px',
					borderRadius: '12px',
					border: '1px solid #ff4d4d',
					textAlign: 'center',
				}}
			>
				<h2 style={{ color: 'white' }}>Confirm Deletion</h2>
				<p style={{ color: '#aaa' }}>
					Are you sure you want to delete{' '}
					<strong>{studentToDelete.student_name}</strong>?
				</p>
				<div
					style={{
						marginTop: '20px',
						display: 'flex',
						gap: '10px',
						justifyContent: 'center',
					}}
				>
					<button
						onClick={() => setStudentToDelete(null)}
						style={{
							padding: '10px 20px',
							cursor: 'pointer',
							borderRadius: '5px',
						}}
					>
						Cancel
					</button>
					<button
						onClick={confirmDelete}
						style={{
							padding: '10px 20px',
							backgroundColor: '#ff4d4d',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
						}}
					>
						Yes, Delete
					</button>
				</div>
			</div>
		</div>
	);
}
