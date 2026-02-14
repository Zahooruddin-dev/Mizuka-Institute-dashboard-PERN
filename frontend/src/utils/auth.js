import { jwtDecode } from 'jwt-decode';

export const getUserFromToken = () => {
	const token = localStorage.getItem('token');
	if (!token || token === 'null' || token === 'undefined') {
		return null;
	}
	try {
		const decoded = jwtDecode(token);
		if (decoded.exp * 1000 < Date.now()) {
			localStorage.removeItem('token');
			return null;
		}
		return {
			id: decoded.id,
			role: decoded.role || 'student',
			username: decoded.username || 'Guest',
			email: decoded.email || '',
		};
	} catch (error) {
		console.error('Invalid token format');
		return null;
	}
};
