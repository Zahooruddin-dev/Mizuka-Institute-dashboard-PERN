const db = require('../db/queryClassStats');

async function getAllClassesStats(req, res) {
	try {
		const classes = await db.getAllClassesStatsQuery();
		res.status(200).json(classes);
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function getPopularityStats(req, res) {
	try {
		const stats = await db.getClassPopularityQuery();
		res.status(200).json(stats);
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function getAllStudentsStats(req, res) {
	try {
		const student = await db.getAllStudentsStatsQuery();
		res.status(200).json(student);
	} catch {
		res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = {
	getAllClassesStats,
	getPopularityStats,
	getAllStudentsStats,
};
