const { Pool } = require('pg');
require('dotenv').config();
console.log('Connecting to DB:', process.env.DB_CONNECTION_STRING);

const pool = new Pool({
  connectionString: 'postgresql://sales:K6snrKxLKJgZw6BKlHw5AM61vD7IU4kR@dpg-d0424rali9vc738aaobg-a.frankfurt-postgres.render.com/sales_db',
  ssl: {
    rejectUnauthorized: false 
  }
});

module.exports = pool;