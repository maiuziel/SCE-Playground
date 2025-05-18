// Backend/Customer-Service/src/routes/customerRoutes.js
import { Router } from 'express';
import { getNewClientRequests } from '../controllers/supportController.js';
import { addClientComment } from '../controllers/supportController.js';

import {
  createSupportRequest,
  getSupportRequests,
  updateSupportRequestStatus,
  respondToSupportRequest,
  getUnreadSupportRequests,
  markResponseAsRead // ✅ ייבוא הפונקציה
} from '../controllers/supportController.js';

const router = Router();

// ראוטים לפניות לקוח
router.post(  '/',                    createSupportRequest);
router.get(   '/',                    getSupportRequests);
router.patch( '/:id/status',          updateSupportRequestStatus);
router.patch( '/:id/respond',         respondToSupportRequest);
router.get(   '/unread',              getUnreadSupportRequests);
router.patch( '/:id/mark-read',       markResponseAsRead); // ✅ הנתיב החדש
router.get('/new-client-requests', getNewClientRequests);
router.patch('/:id/comment', addClientComment);


export default router;
