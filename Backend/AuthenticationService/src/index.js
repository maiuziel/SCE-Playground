// Backend/AuthenticationService/src/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initDb } from './data-access/db.js';
import { SupportRequest } from './data-access/supportRequest.model.js';

const app = express();
const PORT = process.env.PORT || 4001;

// 1) קודם CORS
app.use(cors({
  origin: 'http://localhost:5173',  // כתובת ה-frontend שלך
  credentials: true
}));

// 2) אחריה JSON parsing
app.use(express.json());

// 3) אתחול DB
initDb()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('DB connection failed:', err));

// 4) רוטות האוטנטיקציה (signup, signin וכו')
app.use('/', authRoutes);

// 5) רוטה לשמירת פנייה
app.post('/support-request', async (req, res) => {
  const { subject, description } = req.body;
  try {
    await SupportRequest.create({ subject, description });
    return res.status(201).json({ message: 'Support request received' });
  } catch (error) {
    console.error('Error saving support request:', error);
    return res.status(500).json({ message: 'Failed to save support request' });
  }
});
// 5.5) רוטה חדשה להבאת כל הפניות
app.get('/support-requests', async (req, res) => {
  try {
    // תשלוף את כל הרשומות, ממוינות לפי תאריך יורד
    const all = await SupportRequest.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(all);
  } catch (err) {
    console.error('Error fetching support requests:', err);
    res.status(500).json({ message: 'Error fetching support requests' });
  }
});

// 6) error handler צריך לבוא אחרי כל הרוטות
app.use(errorHandler);

// 7) הפעלת השרת
app.listen(PORT, () => {
  console.log(`Authentication service running on port ${PORT}`);
});


