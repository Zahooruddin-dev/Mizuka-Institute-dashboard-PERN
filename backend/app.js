const express = require('express');
const cors = require('cors');
const classRoutes = require('./routes/classes');
const classStatsRoute = require('./routes/class-stats');
const studentsRoute = require('./routes/students');
const enrollRoutes = require('./routes/enrollRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/api/class', classRoutes);
app.use('/api/class-stats', classStatsRoute);
app.use('/api/students', studentsRoute);
app.use('/api/enroll', enrollRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
	console.log(`${PORT} is running`);
});

module.exports = app;
