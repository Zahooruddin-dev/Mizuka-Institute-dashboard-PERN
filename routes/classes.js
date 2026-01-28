const express = require('express');
const router = express.Router();
const controller = require('../controllers/classControl');
require('dotenv').config;

router.get('/', controller.getClasses);

router.get('/physics', (req, res) => {
	res.send('THIS IS NOTHIGN');
});

router.post('/', controller.createClasses);

module.exports = router;
