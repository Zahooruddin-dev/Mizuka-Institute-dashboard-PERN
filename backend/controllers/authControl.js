const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/queryAuth');

async function login(req, res) {
	const { email, password } = req.body;
	try {
		const user = await db.loginQuery(email);
		console.log('User found in DB:', user);
		if (!user) {
			return res.status(401).json({ message: 'Invalid Email or Password' });
		}
		const testMatch = await bcrypt.compare('password123', user.password_hash);
		console.log('Hardcoded test match:', testMatch);

		const actualMatch = await bcrypt.compare(password, user.password_hash);
		console.log('Request password match:', actualMatch);
		const token = jwt.sign(
			{ id: user.id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '1d' },
		);
		res.json({
			message: 'Login Successful',
			token,
			user: {
				id: user.id,
				username: user.username,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
async function register(req, res) {
	const { username, email, password, role } = req.body;
	try {
		//HASH PASSWORD BEFORE SAVING
		const saltRounds = 10;
		const password_hash = await bcrypt.hash(password, saltRounds);
		const newUser = await db.registerQuery(
			username,
			email,
			password_hash,
			role,
		);
		res.status(201).json({
			message: 'User Registered Successfully',
			user: newUser,
		});
	} catch (error) {
		if (error.code === '23505') {
			res.status(400).json({ message: 'Email Already exists' });
		}
		res.status(400).json({ message: error.message });
	}
}
module.exports = { login, register };
