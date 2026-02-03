const pool = require('./Pool');

async function getClassRosterQuery(classId) {
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
async function enrollStudentQuery(studentId, classId) {
  const { rows } = await pool.query(
    `INSERT INTO enrollments (student_id, class_id) 
     VALUES ($1, $2) 
     RETURNING *`,
    [studentId, classId]
  );
  return rows[0];
}
async function getStudentScheduleQuery(studentId) {
  const { rows } = await pool.query(
    `SELECT students.student_name, classes.class_name, enrollments.enrollment_date
     FROM students
     JOIN enrollments ON students.id = enrollments.student_id
     JOIN classes ON enrollments.class_id = classes.id
     WHERE students.id = $1`,
    [studentId]
  );
  return rows;
}
module.exports= {
  enrollStudentQuery,
  getClassRosterQuery,
  getStudentScheduleQuery
}