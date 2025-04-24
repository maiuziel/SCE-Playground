import { Router } from 'express';
import { forwardAuthRequests } from '../controllers/gatewayController.js';

const router = Router();

router.use('/auth', forwardAuthRequests);
router.get('/ping', ping);

router.use('/leads', forwardLeadsRequests);
export default router;
