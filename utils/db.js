const { Pool } = require('pg');
const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, `../${env}.env`) });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

module.exports = pool;
