// src/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';


import supportRequestRouter from './routes/customerRoutes.js';
import customerRouter from './controllers/CustomerServiceController.js';
import { initDb } from './data-access/db.js';


const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // או הפורט שבו רץ הפרונט שלך
    credentials: true
  }));
  
app.use(express.json());

// ③ מתחברים לבסיס הנתונים (אסינכרוני, אבל לא לפני שה־app הוגדר)
//     לא משתמשים ב־top-level await אלא ב־then/catch
initDb()
    .then(() => console.log('🗄️ Database connected successfully'))
    .catch(err => {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    });

app.use('/support-requests', supportRequestRouter);
app.use('/customers', customerRouter);

const port = 4002;
app.listen(port, () => {
    console.log(`🚀 Customer-Service is running on port ${port}`);
});
