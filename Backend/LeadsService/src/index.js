import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Leads Service is running!');
});

app.listen(PORT, () => {
  console.log(`Leads service running on port: ${PORT}`);
});
