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
	if (!id) {
		return res
			.status(400)
			.json({
				error:
					'Id required to be able to get specified student attending a class',
			});
	}
	try {
		const results = await db.searchStudentsQuery(id);
		res.json(results).status(200);
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

module.exports = {
	searchStudents,
	specificStudentAttending,
};
