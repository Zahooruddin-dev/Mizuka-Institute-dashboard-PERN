const express = require('express');
const router = express.Router({ mergeParams: true }); 
const controller = require('../controllers/announcementControl');
const { isTeacher, verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, isTeacher, controller.postAnnouncement);
router.get('/', controller.getClassAnnouncements);
module.exports = router;