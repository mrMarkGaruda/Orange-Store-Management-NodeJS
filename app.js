const express = require('express');
const { PORT } = require('./config');
const orangeRoutes = require('./routes/orangeRoutes');

const app = express();
app.use(express.json());
app.use('/oranges', orangeRoutes);

module.exports = app; // Export the app instance for testing
