const db = require('../db/queryEnrollment');
const dbClass = require('../db/queryClasses');
const dbStudent = require('../db/queryStudents');
async function createEnrollment(req, res) {
	const { student_id, class_id } = req.body;
	if (!student_id || !class_id) {
		return res
			.status(400)
			.json({ error: 'student and class ID are required.' });
	}
	try {
		//1 Check existence of studentid and class id
		const student = await dbStudent.getStudentByIdQuery(student_id);
		const classObj = await dbClass.getClassById(class_id);
		if (!student) {
			return res
				.status(404)
				.json({ error: 'Student not found. Cannot enroll.' });
		}
		if (!classObj) {
			return res.status(404).json({ error: 'Class not found. Cannot enroll.' });
		}

		const enrollment = await db.enrollStudent(student_id, class_id);
		res.status(201).json({
			message: 'Enrollment successful',
			data: enrollment,
		});
	} catch (err) {
		// if student is already enrolled, the unique constraint should throw an error
		if (err.code === '23505') {
			//duplicate key in sql
			return res
				.status(400)
				.json({ message: 'Student is already in this class' });
		}
		res.status(500).json({ error: err.message });
	}
}
async function rooster(req, res) {
	try {
		const roster = await db.getClassRoster(req.params.id);
		res.json(roster);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
async function getStudentSchedule(req, res) {
	const { id } = req.params;
	if (!id) {
		return res
			.status(400)
			.json({ error: 'Id required to be able to get the student shedule' });
	}
	try {
		const schedule = await db.getStudentScheduleQuery(id);
		res.status(201).json(schedule);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
module.exports = { createEnrollment, rooster, getStudentSchedule };
