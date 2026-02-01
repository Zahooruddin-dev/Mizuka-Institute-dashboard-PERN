const pool = require('./Pool');

async function getClassRoster(classId) {
  const { rows } = await pool.query(
    `SELECT classes.class_name, students.student_name, students.email
     FROM classes
     JOIN enrollments ON classes.id = enrollments.class_id
     JOIN students ON enrollments.student_id = students.id
     WHERE classes.id = $1`,
    [classId]
  );
  return rows;
}
async function enrollStudent(studentId, classId) {
  const { rows } = await pool.query(
    `INSERT INTO enrollments (student_id, class_id) 
     VALUES ($1, $2) 
     RETURNING *`,
    [studentId, classId]
  );
  return rows[0];
}
module.exports= {
  enrollStudent,
  getClassRoster
}