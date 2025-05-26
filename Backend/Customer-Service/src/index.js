import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import supportRequestRouter from './routes/customerRoutes.js';
import customerRouter from './controllers/CustomerServiceController.js';
import { initDb } from './data-access/db.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5174',
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

// 4️⃣ מטעינים את כל ה־routers
app.use('/support-requests', supportRequestRouter);
app.use('/customers', customerRouter);

const port = 4002;
app.listen(port, () => {
  console.log(`Customer-Service is running on port ${port}`);
});
