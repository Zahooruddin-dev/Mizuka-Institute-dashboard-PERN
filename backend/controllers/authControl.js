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

		const actualMatch = await bcrypt.compare(password, user.password_hash);
		console.log('Password match:', actualMatch);

		if (!actualMatch) {
			return res.status(401).json({ message: 'Invalid Email or Password' });
		}

		const token = jwt.sign(
			{
				id: user.id,
				role: user.role,
				username: user.username,
				email: user.email,
				profile: user.profile_pic,
				createdAt: user.created_at,
			},
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
				email: user.email,
				profile: user.profile_pic,
				createdAt: user.created_at,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

async function register(req, res) {
	const { username, email, password, role } = req.body;
	try {
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
			return res.status(400).json({ message: 'Email Already exists' });
		}
		res.status(400).json({ message: error.message });
	}
}

async function changeUsername(req, res) {
	const { id, newUsername } = req.body;
	const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

	if (!newUsername) {
		return res.status(400).json({ message: 'Username cannot be empty' });
	}

	try {
		const updatedUser = await db.updateUsername(id, newUsername, imagePath);

		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		const token = jwt.sign(
			{
				id: updatedUser.id,
				role: updatedUser.role,
				username: updatedUser.username,
				email: updatedUser.email,
				createdAt: updatedUser.created_at,
				profile: updatedUser.profile_pic,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1d' },
		);

		res.json({
			message: 'Profile updated!',
			token,
			user: {
				id: updatedUser.id,
				username: updatedUser.username,
				email: updatedUser.email,
				role: updatedUser.role,
				createdAt: updatedUser.created_at,
				profile: updatedUser.profile_pic,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
async function deleteUser(req, res) {
	const { email, password } = req.body;
	try {
		const user = await db.loginQuery(email);
		console.log('User found in DB:', user);

		if (!user) {
			return res.status(401).json({ message: 'Invalid Email or Password' });
		}

		const actualMatch = await bcrypt.compare(password, user.password_hash);
		console.log('Password match:', actualMatch);

		if (!actualMatch) {
			return res.status(401).json({ message: 'Invalid Email or Password' });
		}
		const deleteUser = await db.deleteUserQuery(email);
		res.status(200).json({ message: 'User Deleted', deleteUser });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

module.exports = { login, register, changeUsername ,deleteUser};
