import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { errorHandler } from './middleware/errorHandler.js';
import gatewayRoutes from './routes/gatewayRoutes.js';

const app = express();

app.use(cors({
  origin: ['https://sce-playground-y67y.onrender.com'],
  credentials: true,
}));
app.use(express.json({ limit: '12mb' }));

app.use('/support-requests', createProxyMiddleware({
  target: process.env.CUSTOMER_SERVICE_URL || 'https://sce-customer-service.onrender.com',
  changeOrigin: true,
}));

app.use(
  '/service-a',
  createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true
  })
);

app.use('/', gatewayRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, '../../Frontend/dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Gateway is running on port ${PORT}`);
});
