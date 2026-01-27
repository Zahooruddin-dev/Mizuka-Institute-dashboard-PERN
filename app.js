const express = require('express');
const classRoutes = require('./routes/classes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())

app.use('/api/class',classRoutes)


app.listen(PORT, () => {
	console.log(`${PORT} is running`);
});

module.exports = app;
