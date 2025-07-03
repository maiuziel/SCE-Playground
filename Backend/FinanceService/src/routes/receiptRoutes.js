import express from 'express';
import {
  createReceipt,
  getAllReceipts,
  getReceiptById,
  updateReceiptStatus
} from '../controllers/receiptController.js';

const router = express.Router();

router.post('/receipt', createReceipt);
router.get('/receipt', getAllReceipts);
router.get('/receipt:id', getReceiptById);
router.put('/receipt:id/status', updateReceiptStatus);

export default router;
