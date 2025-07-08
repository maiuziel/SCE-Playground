// invoiceController.js
import {
  createInvoiceService,
  getAllInvoicesService,
  getInvoiceByIdService,
  updateInvoiceStatusService
} from '../services/invoiceService.js';

export const createInvoice = async (req, res) => {
  try {
    const invoice = await createInvoiceService(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ message: 'Failed to create invoice' });
  }
};

export const getAllInvoices = async (_req, res) => {
  try {
    const invoices = await getAllInvoicesService();
    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ message: 'Failed to fetch invoices' });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await getInvoiceByIdService(req.params.id);
    res.status(200).json(invoice);
  } catch (error) {
    console.error('Error fetching invoice by ID:', error);
    res.status(500).json({ message: 'Failed to fetch invoice' });
  }
};

export const updateInvoiceStatus = async (req, res) => {
  try {
    const updatedInvoice = await updateInvoiceStatusService(req.params.id, req.body.status);
    res.status(200).json(updatedInvoice);
  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ message: 'Failed to update invoice status' });
  }
};
