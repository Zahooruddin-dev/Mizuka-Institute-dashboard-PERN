const db = require('../db/queryReset');
const dbAuth = require('../db/queryAuth');
const bcrypt = require('bcrypt');
async function resetPassword(req, res) {
	const { email, code, newPassword } = req.body;
	try {
		const resetEntry = await db.verifyResetCode(email, code);

		if (!resetEntry) {
			return res.status(400).json({ message: 'Invalid or expired code.' });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		await db.updateUserPassword(email, hashedPassword);
		await db.deleteResetCode(email);
		return res.status(200).json({ message: 'reset password done' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
async function requestPasswordReset(req, res) {
	const { email } = req.body;
	try {
		const user = await dbAuth.getUserByEmail(email);
		if (!user) {
			return res
				.status(200)
				.json({ message: 'If an account exists, a code was send' });
		} // we send 200 even if the user doesn't exist to stopp hackers from guessing the emails
		const code = Math.floor(100000 + Math.random() * 900000).toString();
		const expires = new Date(Date.now() + 15 * 60000);
		await db.saveResetCode(email, code, expires);
		console.log(`--- EMAIL SENT TO ${email} ---`);
		console.log(`Your Reset Code is: ${code}`);
		console.log(`------------------------------`);
		return res.status(200).json({ message: 'reset code sent' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
module.exports = { resetPassword, requestPasswordReset };
