// src/controller/sales-controller.js
const salesService = require('../services/sales-service');

// Create a new sale
exports.createSale = async (req, res) => {
  try {
    const sale = await salesService.createSale(req.body);
    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create sale' });
  }
};

// Retrieve all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await salesService.getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get sales' });
  }
};

// Retrieve a specific sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await salesService.getSaleById(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get sale' });
  }
};

// Update a sale
exports.updateSale = async (req, res) => {
  try {
    const updated = await salesService.updateSale(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sale' });
  }
};

// Delete a sale
exports.deleteSale = async (req, res) => {
  try {
    await salesService.deleteSale(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sale' });
  }
};
