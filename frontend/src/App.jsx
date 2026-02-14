import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './pages/Layout';
import ProtectedRoute from './utils/ProtectedRoute';
import { getUserFromToken } from './utils/auth';

const AuthRedirect = ({ children }) => {
	const user = getUserFromToken();
	if (user) {
		return <Navigate to='/' replace />;
	}
	return children;
};
function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/login'
					element={
						<AuthRedirect>
							<Login />
						</AuthRedirect>
					}
				/>
				<Route
					path='/register'
					element={
						<AuthRedirect>
							<Register />
						</AuthRedirect>
					}
				/>
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</Router>
	);
}

export default App;
