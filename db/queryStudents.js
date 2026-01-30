const pool = require('./Pool');

async function getStudentsQuery(id) {
	await pool.query(`
		SELECT classes.class_name, student.student_name
		FROM classes
		JOIN students ON classes.id = student.class_id
		WHERE classes.id = $1
		`)
}

module.exports = {getStudentsQuery}