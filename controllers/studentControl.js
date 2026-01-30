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

module.exports = {
	getStudents,
};
