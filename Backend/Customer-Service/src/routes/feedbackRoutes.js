import { Router } from 'express';
import {
  submitFeedback,
  getUnreadFeedbackNotifications,
  markFeedbackNotificationAsRead
} from '../controllers/feedbackController.js';

const router = Router();

router.post('/', submitFeedback);
router.get('/notifications', getUnreadFeedbackNotifications);
router.patch('/notifications/:id/mark-read', markFeedbackNotificationAsRead);

export default router;
