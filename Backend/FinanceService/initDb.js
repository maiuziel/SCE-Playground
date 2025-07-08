// create-tables.js
import pool from './src/data-access/db.js';

const createTables = async () => {
  try {
    await pool.query(`

      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        amount NUMERIC(10, 2) NOT NULL,
        status VARCHAR(20),
        description TEXT,
        date DATE DEFAULT CURRENT_DATE,
        transaction_id INTEGER
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        amount NUMERIC(10, 2) NOT NULL,
        status VARCHAR(20) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS receipts (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER,
        transaction_id INTEGER,
        email VARCHAR(100),
        amount NUMERIC(10, 2),
        description TEXT,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS monthly_reports (
        id SERIAL PRIMARY KEY,
        month VARCHAR(2),
        year VARCHAR(4),
        total_transactions INTEGER,
        total_amount NUMERIC(10, 2),
        generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS overview_reports (
        id SERIAL PRIMARY KEY,
        total_income NUMERIC(10, 2),
        total_expenses NUMERIC(10, 2),
        net_profit NUMERIC(10, 2),
        generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS live_tracking (
        id SERIAL PRIMARY KEY,
        type VARCHAR(20),
        amount NUMERIC(10, 2),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        source TEXT
      );

    `);

    console.log(' All tables created successfully on the Render DB!');
    process.exit(0);
  } catch (err) {
    console.error(' Error creating tables:', err.message);
    process.exit(1);
  }
};

createTables();
