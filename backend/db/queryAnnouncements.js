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
    `SELECT a.*, u.username AS teacher_name
     FROM announcements a
     JOIN users u ON a.teacher_id = u.id
     WHERE a.class_id = $1
     ORDER BY a.created_at DESC`,
    [classId]
  );
  return rows;
}

async function getAnnouncementByIdQuery(announcementId) {
  const { rows } = await pool.query(
    `SELECT a.*, u.username AS teacher_name, c.class_name
     FROM announcements a
     JOIN users u ON a.teacher_id = u.id
     JOIN classes c ON a.class_id = c.id
     WHERE a.id = $1`,
    [announcementId]
  );
  return rows[0] ?? null;
}

async function getAnnouncementsForStudentQuery(studentId) {
  const { rows } = await pool.query(
    `SELECT a.*, u.username AS teacher_name, c.class_name
     FROM announcements a
     JOIN users u ON a.teacher_id = u.id
     JOIN classes c ON a.class_id = c.id
     JOIN enrollments e ON e.class_id = a.class_id
     WHERE e.student_id = $1
     ORDER BY a.created_at DESC`,
    [studentId]
  );
  return rows;
}

module.exports = {
  createAnnouncementQuery,
  getAnnouncementsByClassQuery,
  getAnnouncementByIdQuery,
  getAnnouncementsForStudentQuery,
};