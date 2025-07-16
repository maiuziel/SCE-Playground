// authentication-service/src/index.js

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initDb, sequelize } from './data-access/db.js';
import SupportRequest from './data-access/supportRequest.model.js';
import {
  createSupportRequest,
  getSupportRequests,
  updateSupportRequestStatus
} from './controllers/supportController.js';
import { Op } from 'sequelize';

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));

// 2) JSON parsing
app.use(express.json());

// Initialize the database connection
initDb()
  .then(() => {
    console.log('Database connected successfully');

    // במידת הצורך: עדכון סכימה מול הדאטהבייס
    sequelize.sync({ alter: true });
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });

// Auth routes
app.use('/api', authRoutes);

// ✅ Customer Support routes
app.post('/support-request', async (req, res) => {
  const { subject, description } = req.body;
  try {
    await SupportRequest.create({ subject, description });
    res.status(201).json({ message: 'Support request received' });
  } catch (error) {
    console.error('❌ Error saving support request:', error);
    res.status(500).json({ message: 'Failed to save support request' });
  }
});

app.patch('/support-requests/:id/status', updateSupportRequestStatus);

app.get('/support-requests', async (req, res) => {
  try {
    const allRequests = await SupportRequest.findAll({
      order: [['createdAt', 'DESC']],
    });
    return res.json(allRequests);
  } catch (err) {
    console.error('Error fetching support requests:', err);
    return res.status(500).json({ message: 'Failed to fetch support requests' });
  }
});

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

app.post('/support-requests/:id/response', async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const request = await SupportRequest.findByPk(id);
    if (!request) return res.status(404).json({ message: 'Not found' });
    request.responseMessage = message;
    await request.save();
    res.status(200).json({ message: 'Response saved' });
  } catch (error) {
    console.error('❌ Error saving response:', error);
    res.status(500).json({ message: 'Failed to save response' });
  }
});

app.get('/support-requests/unread', async (req, res) => {
  try {
    const unreadResponses = await SupportRequest.findAll({
      where: {
        responseMessage: {
          [Op.ne]: null
        },
        responseMessageRead: false
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(unreadResponses);
  } catch (err) {
    console.error('❌ Error fetching unread responses:', err);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

// Error handling - תמיד בסוף!
app.use(errorHandler);

// 7) הפעלת השרת
app.listen(PORT, () => {
  console.log(`🚀 Authentication service running on port ${PORT}`);
});
