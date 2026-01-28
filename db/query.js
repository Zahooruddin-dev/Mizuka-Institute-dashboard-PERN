const pool = require('./Pool');

async function getAllClasses() {
	const { rows } = await pool.query(`SELECT * FROM classes;`);
	return rows;
}

async function CreateNewClass(data) {
	const { class_name, time_in_pakistan } = data;
	await pool.query(
		`
    INSERT INTO classes (class_name, time_in_pakistan)
    VALUES ($1,$2)
    `,
		[class_name, time_in_pakistan],
	);
}

async function getClassById(id) {
	await pool.query('SELECT * FROM classes WHERE id = $1', [id]);
}
async function deleteClassById(id) {
	const { rows } = await pool.query('DELETE FROM classes WHERE id = $1', [id]);
	return rows
}
module.exports = {
	getAllClasses,
	CreateNewClass,
	deleteClassById,
	getClassById,
};
