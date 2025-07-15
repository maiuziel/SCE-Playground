import { Router } from 'express';
import {
  forwardAuthRequests,
  forwardLeadsRequests,
  forwardProductsRequests,
  ping,
} from '../controllers/gatewayController.js';

const router = Router();

router.use('/auth', forwardAuthRequests);
router.use('/products', forwardProductsRequests);
router.get('/ping', ping);

router.use('/leads', forwardLeadsRequests);
router.use('/support-requests', createProxy('https://sce-playground-y67y.onrender.com'));

export default router;
