const pool = require('./Pool');

async function searchStudentsQuery(name, email, id) {
	const { rows } = await pool.query(
		`
    INSERT INTO students (student_name, email, class_id) VALUES ($1, $2, $3) RETURNING *
    `,
		[name, email, id],
	);
	return rows[0];
}

module.exports = { searchStudentsQuery };
