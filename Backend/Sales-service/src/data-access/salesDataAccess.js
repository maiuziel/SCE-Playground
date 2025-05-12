// src/data-access/salesDataAccess.js
const pool = require('../db');

// Insert a new sale into the database
exports.insertSale = async ({customerId, date, time, products, notes }) => {
  console.log("been here 3");
  const result = await pool.query(
    `INSERT INTO sales_conversations (customer_id, date, time, products, notes)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [customerId, date, time, products, notes]
  );
  return result.rows[0];
};

// Retrieve all sales from the database
exports.getAllSales = async () => {
  const result = await pool.query('SELECT * FROM sales ORDER BY id');
  return result.rows;
};

// Retrieve a single sale by ID
exports.getSaleById = async (id) => {
  const result = await pool.query('SELECT * FROM sales WHERE id = $1', [id]);
  return result.rows[0];
};

// Update a sale in the database
exports.updateSale = async (id, { product, amount, customer_id }) => {
  const result = await pool.query(
    `UPDATE sales SET product = $1, amount = $2, customer_id = $3
     WHERE id = $4 RETURNING *`,
    [product, amount, customer_id, id]
  );
  return result.rows[0];
};

// Delete a sale from the database
exports.deleteSale = async (id) => {
  await pool.query('DELETE FROM sales WHERE id = $1', [id]);
};



exports.checkIfSalesRep = async (email) => {
  const result = await pool.query(
    'SELECT * FROM sales_representatives WHERE email = $1',
    [email]
  );
  return result.rows.length > 0;
};
