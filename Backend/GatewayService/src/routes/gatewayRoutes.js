import { Router } from 'express';
import {
  forwardAuthRequests,
  forwardLeadsRequests,
  forwardProductsRequests,
  forwardTechSupportRequests,
  forwardSalesRequests,
  forwardFinanceRequests,
  ping,
} from '../controllers/gatewayController.js';

const router = Router();

router.use('/auth', forwardAuthRequests);
router.use('/products', forwardProductsRequests);
router.use('/finance', forwardFinanceRequests);
router.use('/sales', forwardSalesRequests);
router.use('/leads', forwardLeadsRequests);
router.use('/ts', forwardTechSupportRequests);

router.get('/ping', ping);

export default router;
