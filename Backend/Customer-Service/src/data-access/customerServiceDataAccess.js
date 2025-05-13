// src/data-access/customerServiceDataAccess.js

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

export async function insertCustomer({ full_name, password, phone, email }) {
  const result = await pool.query(
      `INSERT INTO customers (full_name, password, phone, email)
     VALUES ($1, $2, $3, $4) RETURNING *`,
      [full_name, password, phone, email]
  );
  return result.rows[0];
}

export async function getAllCustomers() {
  const result = await pool.query('SELECT * FROM customers');
  return result.rows;
}

export async function getCustomerById(id) {
  const result = await pool.query(
      'SELECT * FROM customers WHERE id = $1',
      [id]
  );
  return result.rows[0];
}

export async function updateCustomer(id, { full_name, password, phone, email }) {
  const result = await pool.query(
      `UPDATE customers
     SET full_name = $1, password = $2, phone = $3, email = $4
     WHERE id = $5 RETURNING *`,
      [full_name, password, phone, email, id]
  );
  return result.rows[0];
}

export async function deleteCustomer(id) {
  const result = await pool.query(
      'DELETE FROM customers WHERE id = $1 RETURNING *',
      [id]
  );
  return result.rows[0];
}
