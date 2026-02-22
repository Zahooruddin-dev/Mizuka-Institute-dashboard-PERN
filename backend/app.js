const express = require('express');
const cors = require('cors');
const classRoutes = require('./routes/classes');
const enrollRoutes = require('./routes/enrollRoutes');
const authRoutes = require('./routes/authRoutes');
const announcementRoutes = require('./routes/announcements');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/api/class', classRoutes);
app.use('/api/class/:classId/announcements', announcementRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/enroll', enrollRoutes);
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
	console.log(`${PORT} is running`);
});

module.exports = app;
