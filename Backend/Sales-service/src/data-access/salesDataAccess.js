// src/data-access/salesDataAccess.js
const pool = require('../db');

exports.insertSale = async ({ product, amount, customer_id }) => {
  const result = await pool.query(
    `INSERT INTO sales (product, amount, customer_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [product, amount, customer_id]
  );

  return result.rows[0];
};
