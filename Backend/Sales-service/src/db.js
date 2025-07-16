const { Pool } = require('pg');
require('dotenv').config();
console.log('Connecting to DB:', process.env.POSTGRES_URI);

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  ssl: {
    rejectUnauthorized: false 
  }
});

module.exports = pool;