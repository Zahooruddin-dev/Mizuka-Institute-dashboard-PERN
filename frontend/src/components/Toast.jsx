import { CheckCircle, X, XCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onToastClose }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onToastClose();
		}, 3000);
		return () => {
			clearTimeout(timer);
		};
	}, [onToastClose]);
	const bgColor = type === 'success' ? '#2ecc71' : '#e74c3c';
	return (
		<div
			style={{
				position: 'fixed',
				bottom: '20px',
				right: '20px',
				backgroundColor: bgColor,
				color: 'white',
				padding: '12px 20px',
				borderRadius: '8px',
				display: 'flex',
				alignItems: 'center',
				gap: '12px',
				boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
				zIndex: 2000,
				animation: 'slideIn 0.3s ease-out',
			}}
		>
			{type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
			<span>{message}</span>
			<button
				onClick={onToastClose}
				style={{
					background: 'none',
					border: 'none',
					color: 'white',
					cursor: 'pointer',
				}}
			>
				<X size={18} />
			</button>
		</div>
	);
}
