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

module.exports = {
	getAllClasses,
	CreateNewClass,
};
