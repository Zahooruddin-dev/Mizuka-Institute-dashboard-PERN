const db = require('../db/query');

async function getClasses(req, res) {
	try {
		const classes = await db.getAllClasses();
		res.json(classes);
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function createClasses(req, res) {
	try {
		const data = req.body;
		await db.CreateNewClass(data);
		res.status(201).json({ message: 'Created succesfully a new class' });
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function deleteClass(req, res) {
	const { id } = req.params;
	try {
		await db.deleteClassById(id);
		res.status(204).send();
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function getSpecificClass(req, res) {
	const { id } = req.params;
	try {
		await db.getClassById(id);
		res.status(204).send();
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = {
	getClasses,
	createClasses,
	deleteClass,
	getSpecificClass
};
