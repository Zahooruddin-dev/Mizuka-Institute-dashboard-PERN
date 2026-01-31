const pool = require('./Pool');

async function getAllClassesStatsQuery() {
	const { rows } = await pool.query(
		`
    SELECT classes.class_name,COUNT(students.id) AS student_count
    FROM classes
    LEFT JOIN students ON classes.id = students.class_id
    GROUP BY classes.id
    `,
	);
	return rows;
}

module.exports = { getAllClassesStatsQuery };
