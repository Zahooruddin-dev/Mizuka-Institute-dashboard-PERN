const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/queryAuth');

async function login(req, res) {
	const { email, password } = req.body;
	try {
		const user = await db.loginQuery(email);
		if (!user) {
			return res.status(401).json({ message: 'Invalid Email or Password' });
		}
		const isMatch = await bcrypt.compare(password, user.password_hash);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid Email or Password' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
