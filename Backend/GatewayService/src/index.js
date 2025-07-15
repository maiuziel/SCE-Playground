// gateway-service/index.js
import 'dotenv/config';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import gatewayRoutes from './routes/gatewayRoutes.js';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware'; // ✅ ייבוא הפרוקסי

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));
app.use(express.json());

// ✅ פרוקסי לשירותי Customer-Service
app.use('/support-requests', createProxyMiddleware({
  target: process.env.CUSTOMER_SERVICE_URL,
  changeOrigin: true,
}));

app.use('/feedback', createProxyMiddleware({
  target: process.env.CUSTOMER_SERVICE_URL,
  changeOrigin: true,
}));

app.use('/', gatewayRoutes);

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Gateway service running on port: ${PORT}`);
});
