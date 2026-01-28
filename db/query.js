const pool = require('./Pool')

async function getAllClasses() {
  const { rows } = await pool.query(`SELECT * FROM classes;`)
  return rows
}


module.exports = {
  getAllClasses
}