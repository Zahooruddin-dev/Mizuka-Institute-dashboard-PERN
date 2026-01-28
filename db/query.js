const pool = require('./Pool')

async function getAllClasses() {
  const {classes} = await pool.query(`SELECT * FROM classes`)
  return classes
}


module.exports = {
  getAllClasses
}