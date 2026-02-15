const pool = require('./Pool');

async function loginQuery(email) {
	const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
		email,
	]);
	return rows[0] || null;
}
async function registerQuery(username, email, password_hash, role = 'student') {
	const { rows } = await pool.query(
		`
		INSERT INTO users (username,email,password_hash,role) VALUES ($1,$2,$3,$4) RETURNING id, username, email, role`,
		[username, email, password_hash, role],
	);
	return rows[0];
}
async function updateUsername(id, username, profilePic) {
	const query = profilePic
		? `UPDATE users SET username = $1 ,profile_pic = $2 WHERE id = $3 RETURNING * `
		: `UPDATE users SET username = $1 WHERE id =$2 RETURNING *`;
	const params = profilePic ? [username, profilePic, id] : [username, id];
	const { rows } = await pool.query(query, params);
	return rows[0];
}
module.exports = {
	loginQuery,
	registerQuery,
	updateUsername,
};
