const db = require('../db/queryStudents');
async function getAllStudentsPagination(req, res) {
	const { limit = 10, page = 1, name = '' } = req.query;
	const searchTerm = `%${name}%`;
	const offset = Number(page - 1) * Number(limit);
	try {
		const students = await db.getAllStudentsPaginationQuery(
			limit,
			offset,
			searchTerm,
		);
		res.status(200).json(students);
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
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
async function addStudent(req, res) {
	const { student_name, email } = req.body;
	if (!email.includes('@')) {
		return res.status(400).json({ error: 'Invalid email format' });
	}
	if (!student_name || !email) {
		return res.status(400).json({ error: 'Name and email are required' });
	}
	try {
		const student = await db.createStudentQuery(student_name, email);
		res.status(201).json(student);
	} catch {
		res
			.status(500)
			.json({ message: 'Database error. Could not save the student' });
	}
}
async function updateStudent(req, res) {
	const { id } = req.params;
	const { student_name, email } = req.body;
	if (!student_name || !email) {
		return res.status(400).json({ error: 'Name and email are required' });
	}
	try {
		const updatedStudent = await db.updateStudentQuery(student_name, email, id);
		res.status(201).json(updatedStudent);
	} catch {
		res
			.status(500)
			.json({ message: 'Database error. Could not save the student' });
	}
}
async function deleteStudent(req, res) {
	const { id } = req.params;
	try {
		const deleted = await db.deleteStudentQuery(id);
		if (!deleted) return res.status(404).json({ error: 'Student not found' });
		res.json({
			message: 'Student deleted successfully',
			deleteStudent: deleted,
		});
	} catch {
		res
			.status(500)
			.json({ message: 'Database error. Could not save the student' });
	}
}
module.exports = {
	searchStudents,
	specificStudentAttending,
	addStudent,
	getStudents,
	updateStudent,
	deleteStudent,
	getAllStudentsPagination,
};
