const pool = require('./Pool');

async function loginQuery(email) {
	const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
		email,
	]);
	return rows[0] || null;
}

module.exports = {
	loginQuery
};
