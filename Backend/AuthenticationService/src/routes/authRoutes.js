// authentication-service/src/routes/authRoutes.js
import { Router } from 'express';
import {
  signup,
  signin,
  validateToken,
  deleteUser,
  ping
} from '../controllers/authController.js';

import {
  createSupportRequest,
  getSupportRequests,
  updateSupportRequestStatus,
  respondToSupportRequest,
  getUnreadResponses,
  markResponseAsRead
} from '../controllers/supportController.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/validate-token', validateToken);
router.get('/ping', ping);
router.delete('/user', deleteUser);

router.post(  '/support-request',                createSupportRequest);
router.get(   '/support-requests',               getSupportRequests);
router.patch( '/support-requests/:id/status',    updateSupportRequestStatus);

router.patch( '/support-requests/:id/respond',   respondToSupportRequest);   // תגובת נציג
router.get(   '/support-requests/unread',        getUnreadResponses);        // פניות לא נקראו
router.patch( '/support-requests/:id/mark-read', markResponseAsRead);        // סימון כהנקראה

export default router;
