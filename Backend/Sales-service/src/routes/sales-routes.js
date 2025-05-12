// src/routes/sales-routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controller/sales-controller');

router.get('/representatives/is-rep', controller.isSalesRep);
router.post('/', controller.createSale);
router.get('/', controller.getAllSales);
router.get('/:id', controller.getSaleById);
router.put('/:id', controller.updateSale);
router.delete('/:id', controller.deleteSale);




module.exports = router;
