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
  const done = 'done';
  const canceled = 'canceled';
  const result = await pool.query(
    'SELECT * FROM Leads_table WHERE rep_mail = $1 AND status != $2 AND status != $3 ORDER BY application_date DESC',
    [email,done,canceled]
    );
  return result.rows;
};

exports.getAllLeads = async () => {
  const result = await pool.query(
    'SELECT * FROM Leads_table ORDER BY application_date DESC'
    );
  return result.rows;
};

exports.getSalesByCustomerId = async(customerId) => {
  const result = await pool.query(
    'SELECT * FROM sales WHERE customer_id = $1 ORDER BY date DESC',
    [customerId]
  );
  return result.rows;
};

exports.assignLead = async (leadId, email) => {
  const result = await pool.query(
    'UPDATE Leads_table SET rep_mail = $1 WHERE lead_id = $2 RETURNING *',
    [email, leadId]
  );
  return result.rows[0];
};


exports.updateLeadToInProgress = async (number) => {
  const newStatus = 'in progress';
  const oldStatus = 'new';
  const result = await pool.query(
    'UPDATE leads_table SET status = $1 WHERE status = $2 AND rep_mail IS NOT NULL',
    [newStatus,oldStatus]
  );
  return result.rows[0];
};

exports.updateLeadStatus = async (leadId, status) => {
  const result = await pool.query(
    'UPDATE Leads_table SET status = $1 WHERE lead_id = $2 RETURNING *',
    [status, leadId]
  );
  return result.rows[0];
};

exports.unassignLead = async (leadId) => {
  const result = await pool.query(
    'UPDATE Leads_table SET rep_mail = NULL, status = $1 WHERE lead_id = $2 RETURNING *',
    ['new', leadId]
  );
  return result.rows[0];
};


exports.doneRevenue = async (leadId) => {
  console.log("Checking done revenue for lead:", leadId);

  try {
    const newStr = 'new';
    const doneResult = await pool.query(
      `SELECT AVG(sales.amount)  
       FROM leads_table 
       JOIN sales ON leads_table.lead_id = sales.customer_id 
       WHERE leads_table.lead_id = $1 AND leads_table.status = $2 
       GROUP BY leads_table.lead_id`,
      [leadId, newStr]
    );

    if (doneResult.rows.length > 0 && doneResult.rows[0].avg !== null) {
      return doneResult.rows[0];  // הצליח, מחזירים
    }
  } catch (err) {
    console.error("Error querying done revenue:", err);
  }

  // אם לא מצאנו תוצאה מתאימה, מנסים את השאילתה השנייה
  console.log("Falling back to undone revenue...");

  try {
    const month = 'month';
    const oneMonth = '1 month';
    const undoneResult = await pool.query(
      `SELECT AVG(COALESCE(total.total_amount, 0)) AS avg 
   FROM (
     SELECT leads_table.lead_id, SUM(s.amount) AS total_amount 
     FROM leads_table 
     LEFT JOIN sales s ON leads_table.lead_id = s.customer_id 
     AND date_trunc($1, s.date) = date_trunc($1, CURRENT_DATE - INTERVAL '1 month') 
     GROUP BY leads_table.lead_id
   ) AS total`,
  [month]
    );

    return undoneResult.rows[0];
  } catch (err) {
    console.error("Error querying undone revenue:", err);
    return null;
  }
};


exports.unDoneRevenue = async() => {
  const month = 'month';
  const oneMonth = '1 month'
  const result = await pool.query(
  'SELECT AVG(COALESCE(total.total_amount, 0)) FROM ( SELECT leads_table.lead_id, SUM(s.amount) AS total_amount FROM leads LEFT JOIN sales s ON leads_table.lead_id = s.customer_id AND date_trunc($1, s.date) = date_trunc($1, CURRENT_DATE - INTERVAL $2) GROUP BY leads_table.lead_id) AS total',
  [month,oneMonth]
  );
  return result.rows[0];
};

exports.isOwner = async (email) => {
  const result = await pool.query(
    'SELECT * FROM sales_representatives WHERE email = $1 AND title = $2',
    [email, 'Business owner']
  );
  return result.rows.length > 0;
};

exports.reportByRep = async(email) => {
  try {
    const result = await pool.query(
      'SELECT sales.id, sales.product, sales.amount, sales.customer_id, sales.date FROM sales WHERE rep_mail=$1 ORDER BY date DESC',
      [email]  // Note: Add the comma after the query string
    );
    return result.rows;
  } catch(err) {
    console.error("Error querying representative report:", err);
    return null;
  }
};

exports.totalSalesByRep = async(email) => {
  try {
    const result = await pool.query(
      'SELECT SUM(sales.amount) FROM sales WHERE sales.rep_mail = $1',
      [email]  // Note: Add the comma after the query string
    );
    return result.rows[0];
  } catch(err) {
    console.error("Error querying representative total sales:", err);
    return null;
  }
};

exports.getAllRepresentatives = async () => {
  try{
    const result = await pool.query('SELECT * FROM sales_representatives ORDER BY firstName, lastName');
    return result.rows;
  }catch(error){
    console.error("DB access failed:", error);
    return null;
  } 
};
