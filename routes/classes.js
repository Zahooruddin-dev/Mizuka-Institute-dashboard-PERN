const express = require('express');
const router = express.Router();

router.get('/physics', (req, res) => {
	res.send('THIS IS NOTHIGN');
});

module.exports = router