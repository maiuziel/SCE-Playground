import { Router } from 'express';
import { forwardAuthRequests } from '../controllers/gatewayController.js';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = Router();

// Forward /auth
router.use('/auth', forwardAuthRequests);

// Forward /support-requests
router.use(
  '/support-requests',
  createProxyMiddleware({
    target: 'http://localhost:4002',
    changeOrigin: true
  })
);

export default router;
