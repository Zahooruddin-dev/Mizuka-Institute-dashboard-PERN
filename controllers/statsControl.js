const db = require('../db/queryStudents');

async function getAllClassesStats(req, res) {
  try {
    const classes = await db.getAllClassesStats();
    res.json(classes);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {getAllClassesStats
};
