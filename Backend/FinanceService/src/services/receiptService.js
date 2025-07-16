import {
  insertReceipt,
  fetchAllReceipts,
  fetchReceiptById,
  changeReceiptStatus
} from '../data-access/db.js';

export const createReceiptService = async (data) => await insertReceipt(data);
export const getAllReceiptsService = async () => await fetchAllReceipts();
export const getReceiptByIdService = async (id) => await fetchReceiptById(id);
export const updateReceiptStatusService = async (id, status) => await changeReceiptStatus(id, status);
