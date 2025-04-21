const express = require('express');
const router = express.Router();
const customerService = require('../Service/Customer-ServiceService');

router.post('/', async (req, res) => {
  const customer = await customerService.createCustomer(req.body);
  res.status(201).json(customer);
});

router.get('/', async (req, res) => {
  const customers = await customerService.getAllCustomers();
  res.json(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.id);
  res.json(customer);
});

router.put('/:id', async (req, res) => {
  const updated = await customerService.updateCustomer(req.params.id, req.body);
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await customerService.deleteCustomer(req.params.id);
  res.json(deleted);
});

module.exports = router;
