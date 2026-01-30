const pool = require('./Pool');

async function getStudentsQuery(id) {
 const {rows} = 	await pool.query(`
		SELECT classes.class_name, students.student_name
		FROM classes
		LEFT JOIN students ON classes.id = students.class_id
		WHERE classes.id = $1
		`,[id])
		return rows
}

module.exports = {getStudentsQuery}