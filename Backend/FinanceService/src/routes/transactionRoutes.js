import express from 'express';
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransactionStatus
} from '../controllers/transactionController.js';

const router = express.Router();

router.get('/ping', (req, res) => res.send('pong'));

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.put('/:id/status', updateTransactionStatus);

export default router;



