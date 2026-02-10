const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControl');

router.post('/login', authController.login);



module.exports = router;