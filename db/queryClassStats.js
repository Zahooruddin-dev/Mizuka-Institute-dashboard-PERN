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
async function getClassPopularityQuery() {
	const { rows } = await pool.query(
		`
    SELECT 
          classes.class_name,
          COUNT(enrollments.student_id)
           AS student_count
    FROM classes
    LEFT JOIN enrollments ON classes.id = enrollments.class_id
    GROUP BY classes.id , classes.class_name
    ORDER BY student_count DESC
    `,
	);
	return rows;
}

module.exports = { getAllClassesStatsQuery, getClassPopularityQuery };
