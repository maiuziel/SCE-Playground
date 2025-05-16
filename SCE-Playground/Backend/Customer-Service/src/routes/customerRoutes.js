// Backend/Customer-Service/src/routes/customerRoutes.js
import { Router } from 'express';
import { addClientComment } from '../controllers/supportController.js';
import { getNewClientRequests } from '../controllers/supportController.js';
import { markAllNewRequestsAsRead } from '../controllers/supportController.js';


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
router.patch('/:id/comment', addClientComment);
router.get('/new-client-requests', getNewClientRequests);
router.patch('/mark-new-as-read', markAllNewRequestsAsRead);

export default router;


