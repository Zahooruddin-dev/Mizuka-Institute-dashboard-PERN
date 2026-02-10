const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/queryAuth');

async function login(req, res) {
	const { email, password } = req.body;
	try {
		const userResult = await db.loginQuery(email);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
