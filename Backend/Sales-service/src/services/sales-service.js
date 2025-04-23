// src/services/sales-service.js
const salesDataAccess = require('../data-access/salesDataAccess');

// Handle creation logic
exports.createSale = async (data) => {
  return await salesDataAccess.insertSale(data);
};

// Fetch all sales
exports.getAllSales = async () => {
  return await salesDataAccess.getAllSales();
};

// Fetch a specific sale by ID
exports.getSaleById = async (id) => {
  return await salesDataAccess.getSaleById(id);
};

// Handle update logic
exports.updateSale = async (id, data) => {
  return await salesDataAccess.updateSale(id, data);
};

// Handle deletion logic
exports.deleteSale = async (id) => {
  await salesDataAccess.deleteSale(id);
};
