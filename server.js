const express = require('express');
const { PORT } = require('./config');
const orangeRoutes = require('./routes/orangeRoutes');

const app = express();

app.use(express.json());
app.use('/oranges', orangeRoutes);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'dev'} mode on port ${PORT}`);
});
