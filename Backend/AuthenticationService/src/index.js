// authentication-service/src/index.js
import 'dotenv/config';
import express, { json } from 'express';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initDb } from './data-access/db.js';
<<<<<<< HEAD
import { SupportRequest } from './data-access/supportRequest.model.js';

=======
>>>>>>> d6fc473 (First commit)

const app = express();
const PORT = process.env.PORT || 4001;

app.use(json());

// Initialize the database connection
initDb()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
  });

// Authentication routes
app.use('/', authRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Authentication service running on port ${PORT}`);
});
<<<<<<< HEAD
app.post('/support-request', (req, res) => {
  const { subject, description } = req.body;

  console.log('Saving support request:', subject, description);

  res.status(201).json({ message: 'Support request received' });
});

app.post('/support-request', async (req, res) => {
  const { subject, description } = req.body;
  try {
    await SupportRequest.create({ subject, description });
    res.status(201).json({ message: 'Support request received' });
  } catch (error) {
    console.error('Error saving support request:', error);
    res.status(500).json({ message: 'Failed to save support request' });
  }
});

=======
>>>>>>> d6fc473 (First commit)
