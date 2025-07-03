// src/data-access/db.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// ----- INVOICES -----
export async function insertInvoice(data) {
  const { customer_id, amount, status, description, created_at } = data;
  console.log('Trying to insert invoice:', data);

  try {
    const [result] = await sequelize.query(
      'INSERT INTO invoices (customer_id, amount, status, description, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      {
        bind: [customer_id, amount, status, description, created_at]
      }
    );

    console.log('Invoice inserted:', result);
    return result[0];
  } catch (err) {
    console.error('Failed to insert invoice:', err);
    throw err;
  }
}

export async function fetchAllInvoices() {
  const [result] = await sequelize.query('SELECT * FROM invoices');
  return result;
}

export async function fetchInvoiceById(id) {
  const [result] = await sequelize.query('SELECT * FROM invoices WHERE id = $1', {
    bind: [id],
  });
  return result[0];
}

export async function changeInvoiceStatus(id, status) {
  const [result] = await sequelize.query(
    'UPDATE invoices SET status = $1 WHERE id = $2 RETURNING *',
    { bind: [status, id] }
  );
  return result[0];
}

// ----- RECEIPTS -----
export async function insertReceipt(data) {
  const { customer_id, amount,status, description, created_at } = data;
  const [result] = await sequelize.query(
    'INSERT INTO receipt (customer_id, amount, status, description, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    { bind: [customer_id, amount, status, description, created_at] }
  );
  return result[0];
}

export async function fetchAllReceipts() {
  const [result] = await sequelize.query('SELECT * FROM receipts');
  return result;
}

export async function fetchReceiptById(id) {
  const [result] = await sequelize.query('SELECT * FROM receipts WHERE id = $1', {
    bind: [id],
  });
  return result[0];
}

export async function changeReceiptStatus(id, status) {
  const [result] = await sequelize.query(
    'UPDATE receipts SET status = $1 WHERE id = $2 RETURNING *',
    { bind: [status, id] }
  );
  return result[0];
}

// ----- REPORTS -----
export async function insertReport(data) {
  const { title, content } = data;
  const [result] = await sequelize.query(
    'INSERT INTO reports (title, content) VALUES ($1, $2) RETURNING *',
    { bind: [title, content] }
  );
  return result[0];
}

export async function fetchAllReports() {
  const [result] = await sequelize.query('SELECT * FROM reports');
  return result;
}

export async function fetchReportById(id) {
  const [result] = await sequelize.query('SELECT * FROM reports WHERE id = $1', {
    bind: [id],
  });
  return result[0];
}

export async function changeReportStatus(id, status) {
  const [result] = await sequelize.query(
    'UPDATE reports SET status = $1 WHERE id = $2 RETURNING *',
    { bind: [status, id] }
  );
  return result[0];
}

export async function fetchMonthlyReport(year, month) {
  const [result] = await sequelize.query(`
    SELECT 
      COUNT(*) AS transaction_count,
      SUM(amount) AS total_income,
      ROUND(AVG(amount), 2) AS average_payment
    FROM transaction
    WHERE EXTRACT(YEAR FROM created_at) = $1
      AND EXTRACT(MONTH FROM created_at) = $2
  `, {
    bind: [year, month]
  });

  return result[0];
}


export async function fetchSummaryReport() {
  const [result] = await sequelize.query(`
    SELECT 
      COUNT(*) AS transaction_count,
      SUM(amount) AS total_income,
      ROUND(AVG(amount), 2) AS average_payment
    FROM transaction
  `);

  return result[0];
}


// ----- TRANSACTIONS -----
export async function insertTransaction(data) {
  const { customer_id, amount, status, description, created_at } = data;
  const [result] = await sequelize.query(
    'INSERT INTO transaction (customer_id, amount, status, description, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    { bind: [customer_id, amount, status, description, created_at] , 
      type: sequelize.QueryTypes.INSERT 
    }
  );
  return result[0];
}

export async function fetchAllTransactions() {
  const [result] = await sequelize.query('SELECT * FROM transaction');
  return result;
}

export async function fetchTransactionById(id) {
  const [result] = await sequelize.query('SELECT * FROM transactions WHERE id = $1', {
    bind: [id],
  });
  return result[0];
}

export async function changeTransactionStatus(id, status) {
  const [result] = await sequelize.query(
    'UPDATE transaction SET status = $1 WHERE id = $2 RETURNING *',
    { bind: [status, id] }
  );
  return result[0];
}
