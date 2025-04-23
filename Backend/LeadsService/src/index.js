import express from 'express';

import dotenv from 'dotenv';
import leadsRoutes from './routes/leadsRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;


app.use(express.json());

// Initialize the database connection


// Authentication routes
app.use('/', leadsRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Leads Service');
});


app.listen(PORT, () => {
  console.log(`Authentication service running on port ${PORT}`);
});