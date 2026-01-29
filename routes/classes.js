const express = require('express');
const router = express.Router();
const controller = require('../controllers/classControl');
require('dotenv').config;

router.get('/', controller.getClasses);

router.get('/:id', controller.getSpecificClass);

router.post('/', controller.createClasses);

router.delete('/:id', controller.deleteClass)

module.exports = router;
