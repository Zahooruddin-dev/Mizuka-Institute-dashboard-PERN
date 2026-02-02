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

module.exports = {
	searchStudents,
	specificStudentAttending,
};
