// src/services/sales-service.js
const salesDataAccess = require('../data-access/salesDataAccess');

// Handle creation logic
exports.createSale = async (data) => {
  console.log("been here 2");
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


exports.isSalesRep = async (email) => {
  return await salesDataAccess.checkIfSalesRep(email);
};

exports.getSalesRepType = async (email) => {
  return await salesDataAccess.getSalesRepType(email);
};

exports.getConversationsByCustomerId = async (email) => {
  return await salesDataAccess.getConversationsByCustomerId(email);
};