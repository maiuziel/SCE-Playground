// gateway-service/src/routes/gatewayRoutes.js
import { Router } from 'express';
import { forwardAuthRequests } from '../controllers/gatewayController.js';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = Router();

// Forward all /auth/* requests
router.use('/auth', forwardAuthRequests);
router.use('/leads', createProxyMiddleware({
    target: process.env.LEADS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/leads': '', 
    },
  }));
export default router;
