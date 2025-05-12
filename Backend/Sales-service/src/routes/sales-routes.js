// src/routes/sales-routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controller/sales-controller');

router.post('/', controller.createSale);
router.get('/', controller.getAllSales);
router.get('/:id', controller.getSaleById);
router.put('/:id', controller.updateSale);
router.delete('/:id', controller.deleteSale);

router.get('/workers', controller.getWorker);
router.get('/representatives/is-rep', controller.isSalesRep);


module.exports = router;
