// src/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import supportRequestRouter from './routes/customerRoutes.js';
import customerRouter from './controllers/CustomerServiceController.js';
import { initDb } from './data-access/db.js';

const app = express();  // ① מוודאים שמייד אחרי היבוא מגדירים את app

// ② מגדירים CORS ו־JSON middleware
app.use(cors({
    origin: 'http://localhost:5174', // ← עדכון הפורט כאן
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

// ④ מטמיעים את כל ה־routers
app.use('/support-requests', supportRequestRouter);
app.use('/customers', customerRouter);

// ⑤ מריצים את השרת
const port = process.env.PORT ?? 4002;
app.listen(port, () => {
    console.log(`🚀 Customer-Service is running on port ${port}`);
});
