const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/statsControl.js');
require('dotenv').config;

router.get('/', controller.getStudents);

module.exports = router;
