const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/classStudentControl.js');
require('dotenv').config;

router.get('/students', controller.getStudents);
router.get('/students/search', controller.getStudents);
router.post('/students', controller.createStudent);

module.exports = router;
