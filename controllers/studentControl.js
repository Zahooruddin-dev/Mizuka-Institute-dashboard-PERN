const db = require('../db/queryStudents');

async function searchStudents(req, res) {
	const { name } = req.query;
	if (!name) {
		return res
			.status(400)
			.json({ error: 'Name required to be able to search a student' });
	}
	try {
		const results = await db.searchStudentsQuery(name);
		res.status(200).json(results);
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
}
async function specificStudentAttending(req, res) {
	const { id } = req.params;

	try {
		const student = await db.getStudentByIdQuery(id);
		if (!student) {
			return res.status(404).json({ error: 'Student not found' });
		}
		res.json(student).status(200);
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function getStudents(req, res) {
	const { id } = req.params;
	if (!id) {
		return res
			.status(400)
			.json({ error: 'Id required to be able to get the specific student' });
	}
	try {
		const classes = await db.getStudentsQuery(id);
		res.status(201).json(classes);
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
async function updateStudent(req, res) {
	const { id } = req.params;
	const { name, email } = req.body;
	if (!email.includes('@')) {
		return res.status(400).json({ error: 'Invalid email format' });
	}
	if (!name || !email) {
		return res.status(400).json({ error: 'Name and email are required' });
	}
	try {
		const student = await db.updateStudentQuery(name, email, id);
		res.status(201).json(student);
	} catch {
		res
			.status(500)
			.json({ message: 'Database error. Could not save the student' });
	}
}
async function deleteStudent(req, res) {
	const { id } = req.params;
	const { name, email } = req.body;
	if (!email.includes('@')) {
		return res.status(400).json({ error: 'Invalid email format' });
	}
	if (!name || !email) {
		return res.status(400).json({ error: 'Name and email are required' });
	}
	try {
		const student = await db.deleteStudentQuery(name, email, id);
		res.status(201).json(student);
	} catch {
		res
			.status(500)
			.json({ message: 'Database error. Could not save the student' });
	}
}
module.exports = {
	searchStudents,
	specificStudentAttending,
	createStudent,
	getStudents,
	updateStudent,
	deleteStudent
};
