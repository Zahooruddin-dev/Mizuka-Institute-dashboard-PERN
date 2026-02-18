const dbAnnounce = require('../db/queryAnnouncements');
const dbClass = require('../db/queryClasses');

async function postAnnouncement(req, res) {
	const { classId } = req.params;
	const { title, content } = req.body;
	const teacherId = req.user.id;

	try {
		const targetClass = await dbClass.getClassByIdQuery(classId);

		if (!targetClass) {
			return res.status(404).json({ error: 'Class not found' });
		}

		if (targetClass.teacher_id !== teacherId) {
			return res
				.status(403)
				.json({ error: "Unauthorized: You don't teach this class" });
		}

		const announcement = await dbAnnounce.createAnnouncementQuery(
			classId,
			teacherId,
			title,
			content,
		);
		res.status(201).json(announcement);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

async function getClassAnnouncements(req, res) {
	const { classId } = req.params;
	try {
		const list = await dbAnnounce.getAnnouncementsByClassQuery(classId);
		res.status(200).json(list);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

module.exports = { postAnnouncement, getClassAnnouncements };
