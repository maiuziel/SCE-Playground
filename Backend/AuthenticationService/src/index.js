// Backend/AuthenticationService/src/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Op } from 'sequelize';
// authentication-service/src/index.js
import './data-access/supportRequest.model.js'; 

import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initDb } from './data-access/db.js';
import { SupportRequest } from './data-access/supportRequest.model.js';
import { updateSupportRequestStatus } from './controllers/supportController.js';
import { getSupportRequests } from './controllers/supportController.js';
import { sequelize } from './data-access/db.js';




const app = express();
const PORT = process.env.PORT || 4001;


app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true
}));

app.use(express.json());

initDb()
.then(() => {
  console.log('Database connected successfully');

  // ✅ הוספת שדות חדשים לטבלה אם הם לא קיימים
  sequelize.sync({ alter: true });
})
.catch(err => console.error('DB connection failed:', err));

app.use('/api', authRoutes);



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


app.get('/support-requests', async (req, res) => {
  try {
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


// 6) error handler צריך לבוא אחרי כל הרוטות
app.use(errorHandler);

// 7) הפעלת השרת
app.listen(PORT, () => {
  console.log(`Authentication service running on port ${PORT}`);
});


