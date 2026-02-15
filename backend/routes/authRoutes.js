const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControl');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.put('/update-profile', authController.changeUsername);


module.exports = router;