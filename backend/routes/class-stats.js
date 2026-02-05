const express = require('express');
const router = express.Router();
const controller = require('../controllers/statsControl.js');
require('dotenv').config;

router.get('/', controller.getAllClassesStats);
router.get('/popularity', controller.getPopularityStats);

module.exports = router;
