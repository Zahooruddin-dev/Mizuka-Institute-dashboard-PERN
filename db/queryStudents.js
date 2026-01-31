const pool = require('./Pool');

async function searchStudentsQuery(name) {
  const searchTerm = `%${name}%`
	const { rows } = await pool.query(
		`
    SELECT * from students WHERE student_name ILIKE $1
    `,
		[searchTerm],
	);
	return rows;
}

module.exports = { searchStudentsQuery };
