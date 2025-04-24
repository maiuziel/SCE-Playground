// gateway-service/src/routes/gatewayRoutes.js
import { Router } from 'express';
import { forwardAuthRequests, forwardSalesRequests } from '../controllers/gatewayController.js';

const router = Router();

router.use('/auth', forwardAuthRequests);

router.use('/sales', forwardSalesRequests);

export default router;