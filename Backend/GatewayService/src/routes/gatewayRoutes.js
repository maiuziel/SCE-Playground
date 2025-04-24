// gateway-service/src/routes/gatewayRoutes.js
import { Router } from 'express';
import { forwardAuthRequests, forwardSalesRequests } from '../controllers/gatewayController.js';

const router = Router();

// כל הבקשות ל־/auth (הרשאות) יעברו ל־auth-service
router.use('/auth', forwardAuthRequests);

// כל הבקשות ל־/api/sales יעברו ל־sales-service
router.use('/sales', forwardSalesRequests);

export default router;