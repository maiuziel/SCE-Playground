import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { sequelize } from './data-access/db.js';

import './data-access/supportRequest.model.js';
import './data-access/feedback.model.js';
import './data-access/notification.model.js';

import supportRequestRouter from './routes/customerRoutes.js';
import feedbackRouter from './routes/feedbackRoutes.js';

const app = express();

// Clean up and split allowed origins from env
const allowedOrigins = process.env.CLIENT_ORIGIN
  .split(',')
  .map(origin => origin.trim());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN, 
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or same-origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`❌ CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true
}));

app.use(express.json());

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');
try {
  await sequelize.authenticate();
  console.log('✅ Database connection established');

    await sequelize.sync({ alter: true });
    console.log('📦 Database synced');
  await sequelize.sync({ alter: true });
  console.log('📦 Database synced');
} catch (err) {
  console.error('❌ Database error:', err.message);
}

    // מטעינים את כל ה-routers
    app.use('/support-requests', supportRequestRouter);
    app.use('/feedback', feedbackRouter);
app.use('/support-requests', supportRequestRouter);
app.use('/feedback', feedbackRouter);

    const port = 4002;
    app.listen(port, () => {
      console.log(`🚀 Customer-Service is running on port ${port}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

start();
const port = process.env.PORT || 4002;
app.listen(port, () => {
  console.log(`🚀 Customer-Service is running on port ${port}`);
});
