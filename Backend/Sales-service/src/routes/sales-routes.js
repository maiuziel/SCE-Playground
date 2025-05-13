// src/routes/sales-routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controller/sales-controller');

router.get('/representatives/is-rep', controller.isSalesRep);
router.get('/getSalesRepType', controller.getSalesRepType)
router.post('/createConversation', controller.createSale);
router.get('/getAllConversation', controller.getAllSales);
router.get('/getConverstaion', controller.getSaleById);
router.put('/:id', controller.updateSale);
router.delete('/deleteConverstation', controller.deleteSale);
router.get('/conversations/:customerId', controller.getConversationsByCustomerId);
router.get('/conversations/:All', controller.getAllConversations);





module.exports = router;
