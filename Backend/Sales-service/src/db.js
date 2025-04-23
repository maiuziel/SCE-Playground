const { Pool } = require('pg');
require('dotenv').config();
console.log('Connecting to DB:', process.env.DB_CONNECTION_STRING);

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false 
  }
});

module.exports = pool;