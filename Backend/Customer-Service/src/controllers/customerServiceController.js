// src/controllers/CustomerServiceController.js

import { Router } from 'express';
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from '../services/customerService.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const customer = await createCustomer(req.body);
    res.status(201).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create customer' });
  }
});

router.get('/', async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Not found' });
    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch customer' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await updateCustomer(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update customer' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteCustomer(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete customer' });
  }
});

export default router;
