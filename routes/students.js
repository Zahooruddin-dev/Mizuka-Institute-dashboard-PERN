const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentControl');
require('dotenv').config;

router.get('/:id', controller.getSpecificClass);



module.exports = router;
