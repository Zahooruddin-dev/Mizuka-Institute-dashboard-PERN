const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentControl');
require('dotenv').config;

router.get('/search', controller.searchStudents);
router.get('/:id', controller.getStudentById); 
router.get('/:id/classes', controller.getStudentSchedule); 

router.put('/:id', controller.updateStudent);              
router.delete('/:id', controller.deleteStudent);            

module.exports = router;
