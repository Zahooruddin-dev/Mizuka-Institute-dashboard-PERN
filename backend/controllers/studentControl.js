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

async function getTotalStudentsCount(req, res) {
	try {
		const count = await db.getTotalStudentsCountQuery();
		res.status(200).json({ count });
	} catch (err) {
		console.error('Error getting count:', err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function getRecentStudents(req, res) {
	const { limit = 5 } = req.query;

	try {
		const students = await db.getRecentStudentsQuery(limit);
		res.status(200).json(students);
	} catch (err) {
		console.error('Error fetching recent students:', err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function getStudentGrades(req, res) {
	const { id } = req.params;

	try {
		const grades = await db.getStudentGradesQuery(id);
		res.status(200).json(grades);
	} catch (err) {
		console.error('Error fetching grades:', err);
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

	if (!email.includes('@')) {
		return res.status(400).json({ error: 'Invalid email format' });
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

	if (!email.includes('@')) {
		return res.status(400).json({ error: 'Invalid email format' });
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

async function updateStudentEmail(req, res) {
	const { id } = req.params;
	const { email } = req.body;

	if (!email || !email.includes('@')) {
		return res.status(400).json({ error: 'Valid email is required' });
	}

	try {
		const updatedStudent = await db.updateStudentEmailQuery(email, id);
		if (!updatedStudent) {
			return res.status(404).json({ error: 'Student not found' });
		}
		res.status(200).json(updatedStudent);
	} catch (err) {
		console.error('Error updating email:', err);
		res.status(500).json({ message: 'Database error. Could not update email' });
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

async function bulkDeleteStudents(req, res) {
	const { ids } = req.body;

	if (!ids || !Array.isArray(ids) || ids.length === 0) {
		return res.status(400).json({ error: 'Array of student IDs is required' });
	}

	try {
		const deleted = await db.bulkDeleteStudentsQuery(ids);
		res.status(200).json({
			message: `${deleted.length} students deleted successfully`,
			deletedStudents: deleted,
		});
	} catch (err) {
		console.error('Error bulk deleting students:', err);
		res.status(500).json({ message: 'Database error. Could not delete students' });
	}
}

module.exports = {
	getAllStudentsPagination,
	searchStudents,
	getStudentById,
	getTotalStudentsCount,
	getRecentStudents,
	getStudentGrades,
	addStudent,
	updateStudent,
	updateStudentEmail,
	deleteStudent,
	bulkDeleteStudents,
};