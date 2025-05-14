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

// Retrieve a single sale by customer_id
exports.getSaleById = async (id) => {
  const result = await pool.query('SELECT * FROM sales WHERE customer_id = $1', [id]);
  return result.rows;
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

exports.getSalesRepType = async (email) => {
  const result = await pool.query(
    'SELECT title FROM sales_representatives WHERE email = $1',
    [email]
  );
  return result.rows;
};

exports.getConversationsByCustomerId = async (customerId) => {
  const result = await pool.query(
    'SELECT * FROM sales_conversations WHERE customer_id = $1',
    [customerId]
  );
  return result.rows;
};

exports.getAllConversations = async () => {
  const result = await pool.query(
    'SELECT * FROM sales_conversations'
    );
  return result.rows;
};


exports.getMyLeads = async (email) => {
  const result = await pool.query(
    'SELECT * FROM Leads_table WHERE rep_mail = $1',
    [email]
    );
  return result.rows;
};

exports.getAllLeads = async () => {
  const result = await pool.query(
    'SELECT * FROM Leads_table'
    );
  return result.rows;
};

exports.getSalesByCostumerId = async(customerId) => {
  const result = await pool.query(
    'SELECT * FROM sales WHERE customer_id = $1',
    [customerId]
  );
  return result.rows;
}

exports.assignLead = async (leadId, email) => {
  const result = await pool.query(
    'UPDATE Leads_table SET rep_mail = $1 WHERE lead_id = $2 RETURNING *',
    [email, leadId]
  );
  return result.rows[0];
};


exports.updateLeadToInProgress = async (number) => {
  const newStatus = 'in progress';
  const result = await pool.query(
    'UPDATE leads_table SET status = $1 WHERE lead_id = $2 RETURNING *',
    [newStatus,number]
  );
  return result.rows[0];
};
