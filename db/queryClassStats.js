const pool = require('./Pool');

async function getAllClassesStatsQuery(id) {
	const { rows } = await pool.query(
		`
    SELECT classes.class_name,COUNT(student.id) AS student_count
    FROM classes
    LEFT JOIN students ON classes.id = students.class_id
    WHERE classes.id = $1
    `,
		[id],
	);
	return rows;
}

module.exports = { getAllClassesStatsQuery };
