const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentControl');
const enrollController = require('../controllers/enrollControl');
const statsController = require('../controllers/statsControl');
require('dotenv').config();

router.get('/', controller.getAllStudentsPagination);
router.post('/', controller.addStudent);

router.get('/search', controller.searchStudents);
router.get('/stats', statsController.getAllStudentsStats);
router.get('/count', controller.getTotalStudentsCount);
router.get('/recent', controller.getRecentStudents);

router.get('/:id', controller.getStudentById);
router.get('/:id/classes', enrollController.getStudentSchedule);
router.get('/:id/enrollment', enrollController.getStudentEnrollments);
router.get('/:id/grades', controller.getStudentGrades);

router.put('/:id', controller.updateStudent);
router.patch('/:id/email', controller.updateStudentEmail);

router.delete('/:id', controller.deleteStudent);
router.delete('/bulk', controller.bulkDeleteStudents);

module.exports = router;