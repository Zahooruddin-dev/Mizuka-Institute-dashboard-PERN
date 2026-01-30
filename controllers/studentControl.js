const db = require('../db/queryClasses');

async function getStudents(req, res) {
	const { id } = req.params;
	try {
		const classes = await db.getStudents(id);
		res.json(classes);
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = {
	getStudents,
};
