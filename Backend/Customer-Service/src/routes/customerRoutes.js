// Backend/Customer-Service/src/routes/customerRoutes.js
import { Router } from 'express';
import {
    createSupportRequest,
    getSupportRequests,
    updateSupportRequestStatus
} from '../controllers/supportController.js';

const router = Router();

router.post(  '/support-request',               createSupportRequest);
router.get(   '/support-requests',              getSupportRequests);
router.patch( '/support-requests/:id/status',   updateSupportRequestStatus);

export default router;