const db = require('../db/queryReset');
const dbAuht = require('../db/queryAuth');
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
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
async function requestPasswordReset(req, res) {
	const { email } = req.body;
	try {
    const user = await db.
		console.log(`--- EMAIL SENT TO ${email} ---`);
		console.log(`Your Reset Code is: ${code}`);
		console.log(`------------------------------`);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
module.exports = { resetPassword, requestPasswordReset };
