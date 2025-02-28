const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, `${env}.env`) });

module.exports = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
};
