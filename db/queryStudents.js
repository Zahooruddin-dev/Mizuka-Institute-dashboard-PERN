const pool = require('./Pool');

async function searchStudentsQuery(name) {
	const searchTerm = `%${name}%`;
	const { rows } = await pool.query(
		`
    SELECT * from students WHERE student_name ILIKE $1
    `,
		[searchTerm],
	);
	return rows;
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

module.exports = { searchStudentsQuery,specificStudentAttendingQuery };
