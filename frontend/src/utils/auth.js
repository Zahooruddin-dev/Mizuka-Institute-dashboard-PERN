import { jwtDecode } from 'jwt-decode';

export const getUserFromToken = () => {
	const token = localStorage.getItem('token');
	if (!token || token === 'null' || token === 'undefined') return null;
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
			profile: decoded.profile || null,
			createdAt: decoded.createdAt || null,
		};
	} catch {
		return null;
	}
};

export const logout = () => {
	localStorage.removeItem('token');
	window.location.href = '/login';
};

export const isAuthenticated = () => getUserFromToken() !== null;
