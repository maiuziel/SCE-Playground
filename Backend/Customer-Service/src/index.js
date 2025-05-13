import 'dotenv/config';

import cors from 'cors';
import { Op } from 'sequelize';
import './data-access/supportRequest.model.js'; // ייבוא המודלים
import { initDb } from './data-access/db.js';
import { SupportRequest } from './data-access/supportRequest.model.js';
import { updateSupportRequestStatus } from './controllers/supportController.js';
import { getSupportRequests } from './controllers/supportController.js';


require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4002;

const customerController = require('./Controllers/Customer-ServiceController');

app.use(cors({
  origin: 'http://localhost:5173',  // כתובת ה-frontend שלך
  credentials: true
}));


app.use(express.json());

initDb()
    .then(() => {
      console.log('Database connected successfully');
    })
    .catch((err) => {
      console.error('Database connection failed:', err.message);
});

app.use('/customers', customerController);

// Error handling
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
app.patch('/support-requests/:id/status', updateSupportRequestStatus);

app.get('/support-requests', getSupportRequests);
// 5.1) רוטה להביא את כל הפניות
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
// POST /support-requests/:id/respond
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
    if (!request) {
      return res.status(404).json({ message: 'Support request not found' });
    }

    // עדכון ההודעה בתגובה
    request.responseMessage = message;
    await request.save();

    return res.status(200).json({ message: 'Response saved successfully' });
  } catch (error) {
    console.error('Error saving response:', error);
    return res.status(500).json({ message: 'Failed to save response' });
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
      order: [['createdAt', 'DESC']]
    });

    res.json(unreadResponses);
  } catch (err) {
    console.error('Error fetching unread messages:', err);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Customer-Service is running on port ${port}`);
});
