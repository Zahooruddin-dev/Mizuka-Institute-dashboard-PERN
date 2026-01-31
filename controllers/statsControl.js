const db = require('../db/queryStudents');

async function getAllClassesStats(req, res) {
  const { id } = req.params;
  try {
    const classes = await db.getAllClassesStats(id);
    res.json(classes);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {getAllClassesStats
};
