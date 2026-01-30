const db = require('../db/queryClasses');
const { getStudents } = require('../db/queryStudents');

async function getStudents(req, res) {
    const { id } = req.params;

  try {
    const classes = await db.getAllClasses();
    res.json(classes);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
getStudents
};
