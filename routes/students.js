const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentControl');
require('dotenv').config;

router.get('/search', controller.searchStudents);
router.get('/:id', controller.getStudentById); 
router.get('/:id/classes', controller.getStudentSchedule); 

module.exports = router;
