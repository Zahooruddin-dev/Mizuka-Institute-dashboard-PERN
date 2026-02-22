import { createContext, useContext, useState, useEffect } from 'react';
import { getUserFromToken } from './auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => getUserFromToken());

	const refreshUser = () => {
		setUser(getUserFromToken());
	};

	useEffect(() => {
		const handleStorage = () => refreshUser();
		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, []);

	return (
		<AuthContext.Provider value={{ user, refreshUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);