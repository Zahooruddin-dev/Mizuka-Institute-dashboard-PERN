const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentControl');
require('dotenv').config;

router.get('/:id', controller.searchStudents);
router.get('/:id/classes', controller.searchStudents);

module.exports = router;
