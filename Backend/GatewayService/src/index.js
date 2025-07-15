import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';
import 'dotenv/config';

const app = express();

// Enable CORS for frontend URL
app.use(cors({
  origin: ['https://sce-playground-y67y.onrender.com'],
  credentials: true,
}));

// Proxy to Customer Service (API)
app.use('/support-requests', createProxyMiddleware({
  target: process.env.CUSTOMER_SERVICE_URL || 'https://sce-customer-service.onrender.com',
  changeOrigin: true,
}));

// Serve frontend (React) static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, '../../Frontend/dist');

app.use(express.static(frontendPath));

// Handle React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Gateway is running on port ${PORT}`);
});
