const db = require('../db/queryClasses');

async function getClasses(req, res) {
	try {
		const classes = await db.getAllClassesQuery();
		res.json(classes);
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function createClasses(req, res) {
	try {
		const data = req.body;
		await db.CreateNewClassQuery(data);
		res.status(201).json({ message: 'Created succesfully a new class' });
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function deleteClass(req, res) {
	const { id } = req.params;
	if (!id) {
		return res
			.status(400)
			.json({ error: 'Id required to be able to delete class' });
	}
	try {
		await db.deleteClassByIdQuery(id);
		res.status(204).json({ message: 'Class deleted' });
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function getSpecificClass(req, res) {
	const { id } = req.params;
	if (!id) {
		return res
			.status(400)
			.json({ error: 'Id required to be able to get specific class' });
	}
	try {
		const subjectClass = await db.getClassByIdQuery(id);
		res.status(201).json(subjectClass);
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function editSpecificClass(req, res) {
	const { id } = req.params;
	if (!id) {
		return res
			.status(400)
			.json({ error: 'Id required to be able to edit specific class' });
	}
	try {
		const data = req.body;
		const subjectClass = await db.queryEditClassQuery(id, data);
		res.status(201).json(subjectClass);
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function getTeacherClasses(req, res) {
  const { id } = req.params; 
  try {
    const classes = await dbClass.getClassesByTeacherIdQuery(id);
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
	getClasses,
	createClasses,
	deleteClass,
	getSpecificClass,
	editSpecificClass,
	getTeacherClasses
};
