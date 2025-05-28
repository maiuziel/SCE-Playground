// gateway-service/src/routes/gatewayRoutes.js
import { Router } from 'express';
import { forwardAuthRequests, forwardSalesRequests, ping} from '../controllers/gatewayController.js';

const router = Router();

router.use('/auth', forwardAuthRequests);
router.get('/ping', ping);
router.use('/sales', forwardSalesRequests);

export default router;