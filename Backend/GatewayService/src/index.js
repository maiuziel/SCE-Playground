// gateway-service/index.js
// gateway-service/index.js
import 'dotenv/config';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import gatewayRoutes from './routes/gatewayRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '12mb' }));

app.use('/', gatewayRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Gateway service running on port: ${PORT}`);
});

