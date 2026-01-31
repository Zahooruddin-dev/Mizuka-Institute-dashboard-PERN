const express = require('express');
const classRoutes = require('./routes/classes');
const classStatsRoute = require('./routes/class-stats');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/class', classRoutes);
app.use('/api/class-stats', classStatsRoute);

app.listen(PORT, () => {
	console.log(`${PORT} is running`);
});

module.exports = app;
