const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentControl');
const enrollController = require('../controllers/enrollControl')
require('dotenv').config;

router.get('/', controller.getAllStudents)
router.get('/search', controller.searchStudents);
router.get('/:id', controller.getStudents); 
router.get('/:id/classes', enrollController.getStudentSchedule); 

router.put('/:id', controller.updateStudent);              
router.delete('/:id', controller.deleteStudent);            

module.exports = router;
