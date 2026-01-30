const express = require('express');
const router = express.Router();
const controller = require('../controllers/classControl');
require('dotenv').config;



router.get('/students', controller);


module.exports = router;
