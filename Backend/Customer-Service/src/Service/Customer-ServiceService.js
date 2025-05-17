const customerData = require("../Data-Access/Customer-ServiceDataAccess");

const createCustomer = async (data) => {
  return await customerData.insertCustomer(data);
};

const getAllCustomers = async () => {
  return await customerData.getAllCustomers();
};

const getCustomerById = async (id) => {
  return await customerData.getCustomerById(id);
};

const updateCustomer = async (id, data) => {
  return await customerData.updateCustomer(id, data);
};

const deleteCustomer = async (id) => {
  return await customerData.deleteCustomer(id);
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
