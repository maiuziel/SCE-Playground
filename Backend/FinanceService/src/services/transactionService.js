import {
  insertTransaction,
  fetchAllTransactions,
  fetchTransactionById,
  changeTransactionStatus,
  insertInvoice,
  insertReceipt
} from '../data-access/db.js';


export const createTransactionService = async (data) => {
  const transaction = await insertTransaction(data);
  await insertInvoice(data); 
  await insertReceipt(data);
  return transaction;
};

export const getAllTransactionsService = async () => await fetchAllTransactions();
export const getTransactionByIdService = async (id) => await fetchTransactionById(id);
export const updateTransactionStatusService = async (id, status) => await changeTransactionStatus(id, status);
