const express = require('express');
const router = express.Router();
const controller = require('../controllers/enrollControl');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', controller.createEnrollment);
router.get('/class/:id', controller.rooster);
router.get('/student/:id', controller.getStudentSchedule);
router.delete('/student/:studentId/class/:classId', verifyToken, controller.unenrollStudent);

module.exports = router;