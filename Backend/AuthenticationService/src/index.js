import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Op } from 'sequelize';

import './data-access/supportRequest.model.js'; // ייבוא המודלים
import { SupportRequest } from './data-access/supportRequest.model.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initDb } from './data-access/db.js';
import { updateSupportRequestStatus, getSupportRequests } from './controllers/supportController.js';

const app = express();
const PORT = process.env.PORT || 4001;

// 1) CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// 2) JSON parsing
app.use(express.json());

// 3) אתחול בסיס נתונים
initDb()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('DB connection failed:', err));

// 4) רוטות התחברות/הרשמה
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

// 5.1) רוטה לעדכון סטטוס פנייה
app.patch('/support-requests/:id/status', updateSupportRequestStatus);

// 5.2) רוטה לשליפת כל הפניות
app.get('/support-requests', getSupportRequests);

// 5.3) רוטה לשליחת תגובה לפנייה (גרסה אחת)
app.post('/support-requests/:id/respond', async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;
  try {
    const reqItem = await SupportRequest.findByPk(id);
    if (!reqItem) return res.status(404).json({ message: 'Not found' });
    reqItem.response = response;
    await reqItem.save();
    return res.json({ message: 'Response saved' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed' });
  }
});

// 5.4) רוטה חלופית לתגובה לפנייה
app.post('/support-requests/:id/response', async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const request = await SupportRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Support request not found' });
    }
    request.responseMessage = message;
    await request.save();
    return res.status(200).json({ message: 'Response saved successfully' });
  } catch (error) {
    console.error('Error saving response:', error);
    return res.status(500).json({ message: 'Failed to save response' });
  }
});

// 5.5) רוטה לקריאת תגובות שלא נקראו
app.get('/support-requests/unread', async (req, res) => {
  try {
    const unreadResponses = await SupportRequest.findAll({
      where: {
        responseMessage: { [Op.ne]: null },
        responseMessageRead: false
      },
      order: [['createdAt', 'DESC']]
    });
    res.json(unreadResponses);
  } catch (err) {
    console.error('Error fetching unread messages:', err);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

// 6) error handler בסוף
app.use(errorHandler);

// 7) הפעלת השרת
app.listen(PORT, () => {
  console.log(`Authentication service running on port ${PORT}`);
});
