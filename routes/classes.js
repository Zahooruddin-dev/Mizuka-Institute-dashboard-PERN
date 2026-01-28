const express = require('express');
const router = express.Router();
const controller = require('../controllers/classControl');
require('dotenv').config;

router.get('/', controller.getClasses);

router.post('/', controller.createClasses);

module.exports = router;
