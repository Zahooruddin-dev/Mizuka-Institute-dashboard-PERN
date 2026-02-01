const express = require('express');
const router = express.Router();
const controller = require('../controllers/enrollControl');

router.post('/', controller.createEnrollment);
router.get('/class/:id',controller.rooster)
module.exports = router;