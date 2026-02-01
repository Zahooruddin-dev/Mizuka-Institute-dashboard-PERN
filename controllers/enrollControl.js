const db = require('../db/queryEnrollment');

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
  try {
    const schedule = await db.getStudentScheduleQuery(id);
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = { createEnrollment, rooster,getStudentSchedule };
