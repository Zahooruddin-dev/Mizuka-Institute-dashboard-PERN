const pool = require('./Pool');

async function createAnnouncementQuery(classId, teacherId, title, content) {
  const { rows } = await pool.query(
    `INSERT INTO announcements (class_id, teacher_id, title, content)
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [classId, teacherId, title, content]
  );
  return rows[0];
}

async function getAnnouncementsByClassQuery(classId) {
  const { rows } = await pool.query(
    `SELECT a.*, u.username as teacher_name 
     FROM announcements a
     JOIN users u ON a.teacher_id = u.id
     WHERE a.class_id = $1
     ORDER BY a.created_at DESC`,
    [classId]
  );
  return rows;
}

module.exports = {
  createAnnouncementQuery,
  getAnnouncementsByClassQuery
};