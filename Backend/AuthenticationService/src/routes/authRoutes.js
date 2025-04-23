// authentication-service/src/routes/authRoutes.js
import { Router } from 'express';
import {
  signup,
  signin,
  validateToken,
  deleteUser
} from '../controllers/authController.js';

// ייבוא הקונטרולר החדש לטיפול בפניות
import {
  createSupportRequest,
  getSupportRequests,
  updateSupportRequestStatus
} from '../controllers/supportController.js';


const router = Router();

// רוטות אוטנטיקציה
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/validate-token', validateToken);
router.delete('/user', deleteUser);

// רוטות פניות שירות
router.post(  '/support-request',               createSupportRequest);
router.get(   '/support-requests',              getSupportRequests);
router.patch( '/support-requests/:id/status',   updateSupportRequestStatus);



export default router;
