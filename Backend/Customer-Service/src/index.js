// src/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import supportRequestRouter from './routes/customerRoutes.js';
import customerRouter from './controllers/CustomerServiceController.js';
import { initDb } from './data-access/db.js';

const app = express(); // מוודאים שמייצר אחראי היבוא מגדירים את ה-app

// ② מגדירים CORS ו-JSON middleware
app.use(cors({
  origin: 'http://localhost:5174', // ← עדכון הפורט כאן
  credentials: true
}));
app.use(express.json());

initDb()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });

// ④ מטעינים את כל ה-routers
app.use('/support-requests', supportRequestRouter);
app.use('/customers', customerRouter);

// ⑤ מריצים את השרת
const port = process.env.PORT ?? 4002;
app.listen(port, () => {
  console.log(`Customer-Service is running on port ${port}`);
});
