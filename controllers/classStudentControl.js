const db = require('../db/queryStudents');

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
	try {
		const student = await db.createStudentQuery(name, email, id);
		res.json(student);
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = {
	getStudents,
	createStudent,
};
