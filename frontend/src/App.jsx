import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './Auth/Login';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Dashboard />}></Route>
				<Route path='/login' element={<Login />}></Route>
			</Routes>
		</Router>
	);
}
export default App
