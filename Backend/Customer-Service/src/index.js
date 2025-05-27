import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { sequelize } from './data-access/db.js';

// טוענים את המודלים לפני הסנכרון
import './data-access/supportRequest.model.js';
import './data-access/feedback.model.js';
import './data-access/notification.model.js';

import supportRequestRouter from './routes/customerRoutes.js';
import feedbackRouter from './routes/feedbackRoutes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    await sequelize.sync({ alter: true });
    console.log('📦 Database synced');

    // מטעינים את כל ה-routers
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
