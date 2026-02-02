const db = require('../db/queryClassStudents');

async function getStudents(req, res) {
	const { id } = req.params;
	try {
		const classes = await db.getStudentsQuery(id);
		res.json(classes);
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function createStudent(req, res) {
	const { id } = req.params;
	const { name, email } = req.body;
	if (!email.includes('@')) {
		return res.status(400).json({ error: 'Invalid email format' });
	}
	if (!name || !email) {
		return res.status(400).json({ error: 'Name and email are required' });
	}
	try {
		const student = await db.createStudentQuery(name, email, id);
		res.status(201).json(student);
	} catch {
		res
			.status(500)
			.json({ message: 'Database error. Could not save the student' });
	}
}

module.exports = {
	getStudents,
	createStudent,
};
