// src/services/sales-service.js
const salesDataAccess = require('../data-access/salesDataAccess');

exports.createSale = async (saleData) => {
  return await salesDataAccess.insertSale(saleData);
};
