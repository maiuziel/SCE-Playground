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
router.get('/AllConversations', controller.getAllConversations);
router.get('/conversations/:customerId', controller.getConversationsByCustomerId);
router.get('/getSalesByCostumer/:customerId', controller.getSalesByCustomerId);
router.get('/getAllSales', controller.getAllSales);

router.get('/getMyLeads/:email', controller.getMyLeads);
router.get('/getAllLeads',controller.getAllLeads);
router.post('/assignLead', controller.assignLead);
router.put('/updateLeadToInProgress/:contact_number', controller.updateLeadToInProgress);

router.post('/updateLeadStatus', controller.updateLeadStatus);
router.post('/unassignLead', controller.unassignLead);

router.get('/doneRevenue/:leadId', controller.doneRevenueLead);
router.get('/unDoneRevenue', controller.unDoneRevenueLead);






module.exports = router;
