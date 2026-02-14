import { Navigate } from 'react-router-dom';
import { getUserFromToken } from './auth';

const ProtectedRoute = ({ children }) => {
	const user = getUserFromToken();

	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default ProtectedRoute;