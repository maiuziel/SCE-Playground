import {
  insertInvoice,
  fetchAllInvoices,
  fetchInvoiceById,
  changeInvoiceStatus
} from '../data-access/db.js';

export const createInvoiceService = async (data) => await insertInvoice(data);
export const getAllInvoicesService = async () => await fetchAllInvoices();
export const getInvoiceByIdService = async (id) => await fetchInvoiceById(id);
export const updateInvoiceStatusService = async (id, status) => await changeInvoiceStatus(id, status);
