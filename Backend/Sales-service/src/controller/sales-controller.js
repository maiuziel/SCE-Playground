// src/controller/sales-controller.js
const salesService = require('../services/sales-service');

exports.createSale = async (req, res) => {
  try {
    const newSale = await salesService.createSale(req.body);
    res.status(201).json(newSale);
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ error: 'Failed to create sale1' });
  }
};