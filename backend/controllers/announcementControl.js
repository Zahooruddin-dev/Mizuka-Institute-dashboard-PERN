const dbAnnounce = require('../db/queryAnnouncements');
const dbClass = require('../db/queryClasses');

async function postAnnouncement(req, res) {
  const { class_id, title, content } = req.body;
  const teacher_id = req.user.id;

  try {
    const targetClass = await dbClass.getClassByIdQuery(class_id);
    
    if (!targetClass) return res.status(404).json({ error: "Class not found" });
    
    if (targetClass.teacher_id !== teacher_id) {
      return res.status(403).json({ error: "You can only post to your own classes" });
    }
    const announcement = await dbAnnounce.createAnnouncementQuery(class_id, teacher_id, title, content);
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}