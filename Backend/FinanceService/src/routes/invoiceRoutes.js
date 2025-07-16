import express from 'express';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoiceStatus
} from '../controllers/invoiceController.js';

const router = express.Router();

router.post('/invoice', createInvoice);
router.get('/invoice', getAllInvoices);
router.get('/invoice:id', getInvoiceById);
router.put('/invoice:id/status', updateInvoiceStatus);

export default router;
