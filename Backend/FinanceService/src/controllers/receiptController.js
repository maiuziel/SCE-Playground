import {
  createReceiptService,
  getAllReceiptsService,
  getReceiptByIdService,
  updateReceiptStatusService
} from '../services/receiptService.js';

export const createReceipt = async (req, res) => {
  try {
    const receipt = await createReceiptService(req.body);
    res.status(201).json(receipt);
  } catch (error) {
    console.error('Error creating receipt:', error);
    res.status(500).json({ message: 'Failed to create receipt' });
  }
};

export const getAllReceipts = async (_req, res) => {
  try {
    const receipts = await getAllReceiptsService();
    res.status(200).json(receipts);
  } catch (error) {
    console.error('Error fetching receipts:', error);
    res.status(500).json({ message: 'Failed to fetch receipts' });
  }
};

export const getReceiptById = async (req, res) => {
  try {
    const receipt = await getReceiptByIdService(req.params.id);
    res.status(200).json(receipt);
  } catch (error) {
    console.error('Error fetching receipt by ID:', error);
    res.status(500).json({ message: 'Failed to fetch receipt' });
  }
};

export const updateReceiptStatus = async (req, res) => {
  try {
    const updatedReceipt = await updateReceiptStatusService(req.params.id, req.body.status);
    res.status(200).json(updatedReceipt);
  } catch (error) {
    console.error('Error updating receipt status:', error);
    res.status(500).json({ message: 'Failed to update receipt status' });
  }
};
