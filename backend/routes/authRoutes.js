const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControl');
const upload = require('../middleware/uploadMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.put('/update-profile', upload.single('image'), authController.changeUsername);
router.delete('/delete',verifyToken, authController.deleteUser);

module.exports = router;