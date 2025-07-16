import {
  createTransactionService,
  getAllTransactionsService,
  getTransactionByIdService,
  updateTransactionStatusService
} from '../services/transactionService.js';
import { createReceiptService } from '../services/receiptService.js';
import { createInvoiceService } from '../services/invoiceService.js'; 
export const createTransaction = async (req, res, next) => {
  try {
    const result = await createTransactionService(req.body); 

    
    //await createInvoiceService({
    //customer_id: result.customer_id,
    //amount: result.amount,
    //status: result.status,
    //description: result.description
    //});

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await getAllTransactionsService();
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await getTransactionByIdService(id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateTransactionStatus = async (req, res) => {
  try {
    const updatedTransaction = await updateTransactionStatusService(
      req.params.id,
      req.body.status
    );
    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction status:', error);
    res.status(500).json({ message: 'Failed to update transaction status' });
  }
};
