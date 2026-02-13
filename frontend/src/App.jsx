import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';


function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/register' element={<Register/>}></Route>
			</Routes>
		</Router>
	);
}
export default App
