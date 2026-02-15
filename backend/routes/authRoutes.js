const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControl');
const upload = require('../middleware/uploadMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.put('/update-profile', upload.single('image'), authController.changeUsername);

module.exports = router;