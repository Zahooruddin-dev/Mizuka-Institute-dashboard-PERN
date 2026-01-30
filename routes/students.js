const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentControl.js');
require('dotenv').config;

router.get('/students', controller.getStudents);

module.exports = router;
