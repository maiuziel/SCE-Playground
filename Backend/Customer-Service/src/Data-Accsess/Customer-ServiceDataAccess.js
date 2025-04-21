const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

const insertCustomer = async ({ full_name, password, phone, email }) => {
  const result = await pool.query(
    `INSERT INTO customers (full_name, password, phone, email)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [full_name, password, phone, email]
  );
  return result.rows[0];
};

const getAllCustomers = async () => {
  const result = await pool.query('SELECT * FROM customers');
  return result.rows;
};

const getCustomerById = async (id) => {
  const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
  return result.rows[0];
};

const updateCustomer = async (id, { full_name, password, phone, email }) => {
  const result = await pool.query(
    `UPDATE customers SET full_name = $1, password = $2, phone = $3, email = $4
     WHERE id = $5 RETURNING *`,
    [full_name, password, phone, email, id]
  );
  return result.rows[0];
};

const deleteCustomer = async (id) => {
  const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  insertCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
