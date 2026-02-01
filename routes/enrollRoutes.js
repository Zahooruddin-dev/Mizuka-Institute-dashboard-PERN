const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentControl');

router.post('/', controller.createEnrollment);

module.exports = router;