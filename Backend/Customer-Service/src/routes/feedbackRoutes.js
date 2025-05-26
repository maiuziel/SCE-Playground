import { Router } from 'express';
import { submitFeedback } from '../controllers/feedbackController.js';

const router = Router();

router.post('/', submitFeedback);

export default router;
