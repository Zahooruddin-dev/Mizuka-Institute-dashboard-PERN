const db = require('../db/queryStudents');

async function searchStudents(req, res) {
	const { name } = req.query;
	try {
		const results = await db.searchStudentsQuery(name);
		res.json(results).status(200);
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
}
async function specificStudentAttending(req, res) {
	const { id } = req.params;
	try {
		const results = await db.searchStudentsQuery(id);
		res.json(results).status(200);
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
}
async function createEnrollment(req, res) {
	const { student_id, class_id } = req.body;

	try {
		const enrollment = await db.enrollStudent(student_id, class_id);
		res.status(201).json({
			message: 'Enrollment successful',
			data: enrollment,
		});
	} catch (err) {
		// If the student is already enrolled, the UNIQUE constraint should throw an error
		if (err.code === '23505') {
			return res
				.status(400)
				.json({ message: 'Student is already in this class' });
		}
		res.status(500).json({ error: err.message });
	}
}

module.exports = {
	searchStudents,
	specificStudentAttending,
	createEnrollment,
};
