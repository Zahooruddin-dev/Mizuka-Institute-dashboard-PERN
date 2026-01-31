const db = require('../db/queryClassStats');

async function getAllClassesStats(req, res) {
  try {
    const classes = await db.getAllClassesStatsQuery();
    res.json(classes);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {getAllClassesStats
};
