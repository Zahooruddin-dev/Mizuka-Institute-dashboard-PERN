const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`${PORT} is running`);
});

module.exports = app;
