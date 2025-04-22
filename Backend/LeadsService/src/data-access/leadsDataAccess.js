import pool from './db.js';
import service from '../services/leadsService.js';

export const createLead = async ({ full_name, phone, email, product_interest }) => {
  const result = await pool.query(
    `INSERT INTO leads (full_name, phone, email, product_interest)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [full_name, phone, email, product_interest]
  );
  return result.rows[0]; 
};



export const getAllLeads = async () => {
    const result = await pool.query('SELECT * FROM leads ORDER BY submission_date DESC');
    return result.rows;
  };


export const findLeadsByName = async (name) => {
    const result = await pool.query(
      'SELECT * FROM leads WHERE full_name ILIKE $1',
      [`%${name}%`] 
    );
    return result.rows;
  };

  export const fillterLeadsByStatus = async (status) => {
    const result = await pool.query(
      'SELECT * FROM leads WHERE status = $1',
      [status]
    );
    return result.rows;
  };
  
  export const sortByNameAsc = async () => {
    const result = await pool.query(
      'SELECT * FROM leads ORDER BY LOWER(full_name) ASC'
    );
    return result.rows;
  };
  
  export const sortByNameDesc = async () => {
    const result = await pool.query(
      'SELECT * FROM leads ORDER BY LOWER(full_name) DESC'
    );
    return result.rows;
  };
  
  export const sortByProductAsc = async (req, res) => {
    const leads = await service.sortProductAsc();
    res.json(leads);
  };
  
  export const sortByProductDesc = async (req, res) => {
    const leads = await service.sortProductDesc();
    res.json(leads);
  };
  
  export const sortByDateAsc = async (req, res) => {
    const leads = await service.sortDateAsc();
    res.json(leads);
  };
  
  export const sortByDateDesc = async (req, res) => {
    const leads = await service.sortDateDesc();
    res.json(leads);
  };
  
  export const updateNoteByEmail = async (email, note) => {
    const result = await pool.query(
      `UPDATE leads
       SET note = $1
       WHERE email = $2
       RETURNING *`,
      [note, email]
    );
    return result.rows[0];
  };
  export const updateStatusByEmail = async (email, status) => {
    const result = await pool.query(
      `UPDATE leads
       SET status = $1
       WHERE email = $2
       RETURNING *`,
      [status, email]
    );
    return result.rows[0];
  };
  export const deleteLeadsByEmails = async (emails) => {
    const result = await pool.query(
      `DELETE FROM leads
       WHERE email = ANY($1::text[])
       RETURNING *`,
      [emails]
    );
    return result.rows;
  };
  
