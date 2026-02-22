const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControl');
const resetControl = require('../controllers/resetControl');
const upload = require('../middleware/uploadMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.put('/update-profile', verifyToken, upload.single('image'), authController.changeUsername);
router.put('/change-password', verifyToken, authController.changePassword);
router.delete('/delete', verifyToken, authController.deleteUser);

router.post('/request-reset', resetControl.requestPasswordReset);
router.post('/reset-password', resetControl.resetPassword);

module.exports = router;