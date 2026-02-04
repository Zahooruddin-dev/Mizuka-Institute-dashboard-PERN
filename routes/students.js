const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentControl');
const enrollController = require('../controllers/enrollControl')
const statsController = require('../controllers/statsControl')
require('dotenv').config;

router.get('/', controller.getAllStudentsPagination)
router.get('/', controller.getAllStudents)
router.get('/search', controller.searchStudents);
router.get('/workload', statsController.getAllStudentsStats);

router.get('/:id', controller.getStudents); 
router.get('/:id/classes', enrollController.getStudentSchedule); 
router.get('/:id/students', enrollController.rooster);

router.put('/:id', controller.updateStudent);              
router.delete('/:id', controller.deleteStudent);            

module.exports = router;
