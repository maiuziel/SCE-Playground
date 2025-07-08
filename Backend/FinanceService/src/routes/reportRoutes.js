import express from 'express';
import {
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus,
  getSummaryReport,
  getMonthlyReport
} from '../controllers/reportController.js';

const router = express.Router();

router.post('/report', createReport);
router.get('/report', getAllReports);
router.get('/report:id', getReportById);
router.put('/report:id/status', updateReportStatus);
router.get('/summary', getSummaryReport);
router.get('/monthly', getMonthlyReport); 

export default router;
