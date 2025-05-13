// src/services/customerService.js

import * as customerData from '../data-access/customerServiceDataAccess.js';

export async function createCustomer(data) {
  return await customerData.insertCustomer(data);
}

export async function getAllCustomers() {
  return await customerData.getAllCustomers();
}

export async function getCustomerById(id) {
  return await customerData.getCustomerById(id);
}

export async function updateCustomer(id, data) {
  return await customerData.updateCustomer(id, data);
}

export async function deleteCustomer(id) {
  return await customerData.deleteCustomer(id);
}
