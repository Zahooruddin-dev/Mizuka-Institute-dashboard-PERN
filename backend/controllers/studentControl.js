const db = require('../db/queryStudents');

async function getAllStudentsPagination(req, res) {
	const { limit = 10, page = 1, name = '', sort = 'ASC' } = req.query;
	const searchTerm = `%${name}%`;
	const offset = Number(page - 1) * Number(limit);
	const order = sort === 'DESC' ? 'DESC' : 'ASC';

	try {
		const students = await db.getAllStudentsPaginationQuery(
			limit,
			offset,
			searchTerm,
			order,
		);
		res.status(200).json(students);
	} catch (err) {
		console.error('Error fetching students:', err);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function searchStudents(req, res) {
	const { name, sort = 'ASC' } = req.query;
	const searchTerm = name || '';
	const order = sort === 'DESC' ? 'DESC' : 'ASC';

	try {
		const results = await db.searchStudentsQuery(searchTerm, order);
		res.status(200).json(results);
	} catch (err) {
		console.error('Error searching students:', err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function getStudentById(req, res) {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({ error: 'Student ID is required' });
	}

	try {
		const student = await db.getStudentByIdQuery(id);
		if (!student) {
			return res.status(404).json({ error: 'Student not found' });
		}
		res.status(200).json(student);
	} catch (err) {
		console.error('Error fetching student:', err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function addStudent(req, res) {
	const { student_name, email } = req.body;

	if (!student_name || !email) {
		return res.status(400).json({ error: 'Name and email are required' });
	}

	if (student_name.length < 3) {
		return res.status(400).json({ error: 'Name must be at least 3 characters' });
	}

	try {
		const student = await db.createStudentQuery(student_name, email);
		res.status(201).json(student);
	} catch (err) {
		console.error('Error creating student:', err);
		res.status(500).json({ message: 'Database error. Could not save the student' });
	}
}

async function updateStudent(req, res) {
	const { id } = req.params;
	const { student_name, email } = req.body;

	if (!student_name || !email) {
		return res.status(400).json({ error: 'Name and email are required' });
	}

	if (student_name.length < 3) {
		return res.status(400).json({ error: 'Name must be at least 3 characters' });
	}

	try {
		const updatedStudent = await db.updateStudentQuery(student_name, email, id);
		if (!updatedStudent) {
			return res.status(404).json({ error: 'Student not found' });
		}
		res.status(200).json(updatedStudent);
	} catch (err) {
		console.error('Error updating student:', err);
		res.status(500).json({ message: 'Database error. Could not update the student' });
	}
}

async function deleteStudent(req, res) {
	const { id } = req.params;

	try {
		const deleted = await db.deleteStudentQuery(id);
		if (!deleted) {
			return res.status(404).json({ error: 'Student not found' });
		}
		res.status(200).json({
			message: 'Student deleted successfully',
			deletedStudent: deleted,
		});
	} catch (err) {
		console.error('Error deleting student:', err);
		res.status(500).json({ message: 'Database error. Could not delete the student' });
	}
}

module.exports = {
	getAllStudentsPagination,
	searchStudents,
	getStudentById,
	addStudent,
	updateStudent,
	deleteStudent,
};