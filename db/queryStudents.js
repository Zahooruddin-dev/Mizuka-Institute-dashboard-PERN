const pool = require('./Pool');
async function getAllStudentsPaginationQuery(limit, offset, searchTerm) {
	const data = await pool.query(
		`SELECT * FROM students WHERE student_name ILIKE $3 ORDER BY id LIMIT $1 OFFSET $2`,
		[limit, offset, searchTerm],
	);
	return rows;
}
async function getStudentByIdQuery(id) {
	const { rows } = await pool.query(`SELECT * FROM students WHERE id = $1`, [
		id,
	]);
	return rows[0];
}
async function searchStudentsQuery(name) {
	const { rows } = await pool.query(
		`SELECT * FROM students WHERE student_name ILIKE $1`,
		[name],
	);
	return rows[0];
}
async function specificStudentAttendingQuery(id) {
	const { rows } = await pool.query(
		`SELECT classes.class_name, enrollments.enrollment_date
		 FROM students
		 JOIN enrollments ON students.id = enrollments.student_id
		 JOIN classes ON enrollments.class_id = classes.id
		 WHERE students.id = $1;
    `,
		[id],
	);
	return rows;
}
async function createStudentQuery(name, email, id) {
	const { rows } = await pool.query(
		`
		INSERT INTO students (student_name, email, class_id) VALUES ($1, $2, $3) RETURNING *
		`,
		[name, email, id],
	);
	return rows[0];
}
async function updateStudentQuery(name, email, id) {
	const { rows } = await pool.query(
		`
		UPDATE students
		SET student_name = $1, email = $2
		WHERE id = $3
		RETURNING *
		`,
		[name, email, id],
	);
	return rows[0];
}
async function deleteStudentQuery(id) {
	const { rows } = await pool.query(
		`DELETE FROM students WHERE id = $1 RETURNING *`,
		[id],
	);
	return rows[0];
}
module.exports = {
	getStudentByIdQuery,
	specificStudentAttendingQuery,
	createStudentQuery,
	updateStudentQuery,
	deleteStudentQuery,
	searchStudentsQuery,
	getAllStudentsPaginationQuery,
};
