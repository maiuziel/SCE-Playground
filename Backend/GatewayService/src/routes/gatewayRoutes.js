import { Router } from 'express';
import { forwardAuthRequests } from '../controllers/gatewayController.js';
import { forwardLeadsRequests } from '../controllers/gatewayController.js';

const router = Router();

router.use('/auth', forwardAuthRequests);



router.use('/leads', forwardLeadsRequests);
export default router;
