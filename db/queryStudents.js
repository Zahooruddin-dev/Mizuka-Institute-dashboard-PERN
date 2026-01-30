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
async function createStudentQuery(name,email,id) {
	 const {rows} = await pool.query(`
		INSERT INTO students (student_name, email, class_id) VALUES ($1, $2, $3) RETURNING *
		`, [name,email,id])
		return rows[0]
}

module.exports = {getStudentsQuery,createStudentQuery}