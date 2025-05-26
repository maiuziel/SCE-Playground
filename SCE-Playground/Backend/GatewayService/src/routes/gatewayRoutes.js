// gateway-service/src/routes/gatewayRoutes.js
import { Router } from 'express';
import { forwardAuthRequests } from '../controllers/gatewayController.js';
import { createProxyMiddleware } from 'http-proxy-middleware';


const router = Router();
router.use(
    '/support-requests',
    createProxyMiddleware({
      target: 'http://localhost:4002',
      changeOrigin: true
    })
  );
// Forward all /auth/* requests
router.use('/auth', forwardAuthRequests);

export default router;
