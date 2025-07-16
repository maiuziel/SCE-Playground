// Backend/Customer-Service/src/routes/customerRoutes.js
import { Router } from 'express';
import { getNewClientRequests } from '../controllers/supportController.js';
import { addClientComment } from '../controllers/supportController.js';
import { getClientNotifications } from '../controllers/supportController.js';
import { markNotificationAsRead } from '../controllers/supportController.js';
import { getAgentFeedbackNotifications } from '../controllers/supportController.js';
import {markAgentNotificationAsRead} from '../controllers/supportController.js'
import { getNewRequestNotifications } from '../controllers/supportController.js';

import {
  createSupportRequest,
  getSupportRequests,
  updateSupportRequestStatus,
  respondToSupportRequest,
  getUnreadSupportRequests,
  markResponseAsRead 
} from '../controllers/supportController.js';

const router = Router();

router.post(  '/',                    createSupportRequest);
router.get(   '/',                    getSupportRequests);
router.patch( '/:id/status',          updateSupportRequestStatus);
router.patch( '/:id/respond',         respondToSupportRequest);
router.get(   '/unread',              getUnreadSupportRequests);
router.patch( '/:id/mark-read',       markResponseAsRead); 
router.get('/new-client-requests', getNewClientRequests);
router.patch('/:id/comment', addClientComment);
router.get('/notifications', getClientNotifications);
router.patch('/notifications/:id/mark-read', markNotificationAsRead);
router.get('/notifications/feedbacks', getAgentFeedbackNotifications);
router.patch('/agent-feedback-notifications/:id/mark-read', markAgentNotificationAsRead);
router.get('/notifications/new-requests', getNewRequestNotifications);


export default router;
