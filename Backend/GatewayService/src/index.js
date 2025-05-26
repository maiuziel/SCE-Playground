// gateway-service/index.js

import 'dotenv/config';
import express, { json } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { errorHandler } from './middleware/errorHandler.js';
import gatewayRoutes from './routes/gatewayRoutes.js';
import cors from 'cors'; 



const app = express();
const PORT = process.env.PORT || 4000;
app.use(
  '/support-requests',
  createProxyMiddleware({
    target: 'http://localhost:4002', // כי את מריצה את Customer-Service מקומית
    changeOrigin: true
  })
);
app.use(json());
app.use(cors());

// Gateway routes
app.use('/', gatewayRoutes);

// Error Handling
app.use(errorHandler);

app.use(
  '/service-a',
  createProxyMiddleware({
    target: 'http://localhost:3000', // הכתובת שבה ServiceA שלך רץ
    changeOrigin: true
  })
);

app.listen(PORT, () => {
  console.log(`Gateway service running on port: ${PORT}`);
});


