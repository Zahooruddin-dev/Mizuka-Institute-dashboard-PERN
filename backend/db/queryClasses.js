const pool = require('./Pool');

async function getAllClassesQuery() {
	const { rows } = await pool.query(`SELECT * FROM classes;`);
	return rows;
}
async function CreateNewClassQuery(data) {
	const { class_name, time_in_pakistan } = data;
	await pool.query(
		`
    INSERT INTO classes (class_name, time_in_pakistan)
    VALUES ($1,$2)
    `,
		[class_name, time_in_pakistan],
	);
}
async function queryEditClassQuery(id, data) {
	const { class_name, time_in_pakistan } = data;
	await pool.query(
		`
		UPDATE classes
		SET class_name = $1, time_in_pakistan = $2
		WHERE id = $3
    `,
		[class_name, time_in_pakistan, id],
	);
}
async function getClassByIdQuery(id) {
	const { rows } = await pool.query('SELECT * FROM classes WHERE id = $1', [
		id,
	]);
	return rows;
}
async function deleteClassByIdQuery(id) {
	await pool.query('DELETE FROM classes WHERE id = $1', [id]);
}

module.exports = {
	getAllClassesQuery,
	CreateNewClassQuery,
	deleteClassByIdQuery,
	getClassByIdQuery,
	queryEditClassQuery,
};
