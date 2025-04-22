import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import leadsRoutes from './routes/leadsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;


app.use(express.json());


app.use(cors());

// הנתיבים
app.use('/leads', leadsRoutes);

app.listen(PORT, () => {
  console.log(`Leads service running on port ${PORT}`);
});
