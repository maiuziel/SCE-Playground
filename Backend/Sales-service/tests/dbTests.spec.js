// Replace the require statement with an import
const { expect } = require('chai');
const pool = require('../src/db');  // Ensure the path is correct for your project

describe('sales_conversationsTest Table', () => {
  before(async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sales_conversationsTest (
        id INTEGER GENERATED ALWAYS AS IDENTITY,
        customer_id INTEGER NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        time TIME NOT NULL DEFAULT CURRENT_TIME,
        products TEXT,
        notes TEXT
      )
    `);
  });

  beforeEach(async () => {
    await pool.query('DELETE FROM sales_conversationsTest');
  });

  it('should insert a conversation row', async () => {
    const result = await pool.query(`
      INSERT INTO sales_conversationsTest (customer_id, products, notes)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [101, 'Product A, Product B', 'Test notes']
    );

    const row = result.rows[0];
    expect(row).to.include({ customer_id: 101, products: 'Product A, Product B', notes: 'Test notes' });
    expect(row.date).to.exist;
    expect(row.time).to.exist;
  });

  it('should retrieve a row by ID', async () => {
    const inserted = await pool.query(`
      INSERT INTO sales_conversationsTest (customer_id, products, notes)
      VALUES (202, 'Product X', 'Note X') RETURNING *`
    );

    const found = await pool.query('SELECT * FROM sales_conversationsTest WHERE id = $1', [inserted.rows[0].id]);
    expect(found.rows[0]).to.deep.equal(inserted.rows[0]);
  });

  it('should update a row', async () => {
    const inserted = await pool.query(`
      INSERT INTO sales_conversationsTest (customer_id, products, notes)
      VALUES (303, 'Old Product', 'Old Note') RETURNING *`
    );

    const updated = await pool.query(`
      UPDATE sales_conversationsTest
      SET products = $1, notes = $2
      WHERE id = $3 RETURNING *`,
      ['New Product', 'Updated Note', inserted.rows[0].id]
    );
    expect(updated.rows.length).to.equal(1);
    expect(updated.rows[0].products).to.equal('New Product');
    expect(updated.rows[0].notes).to.equal('Updated Note');
  });

  it('should delete a row', async () => {
    const inserted = await pool.query(`
      INSERT INTO sales_conversationsTest (customer_id, products, notes)
      VALUES (404, 'Delete Me', 'Delete Note') RETURNING *`
    );

    await pool.query('DELETE FROM sales_conversationsTest WHERE id = $1', [inserted.rows[0].id]);

    const check = await pool.query('SELECT * FROM sales_conversationsTest WHERE id = $1', [inserted.rows[0].id]);
    expect(check.rows.length).to.equal(0);
  });
});