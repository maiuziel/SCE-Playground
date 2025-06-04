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

router.get('/doneRevenue/:id', controller.doneRevenueLead);
router.get('/unDoneRevenue', controller.unDoneRevenueLead);

router.get('/isOwner/:email', controller.isOwner);
router.get('/getAllSalesPriceByTime', controller.getAllSalesPriceByTime);
router.get('/getAllSalesPrice', controller.getAllSalesPrice);

router.get('/reportByRep/:email', controller.reportByRep);
router.get('/totalSalesByRep/:email', controller.totalSalesByRep);
router.get('/representatives', controller.getAllRepresentatives);
router.get('/reportByRepMonthly/:email', controller.reportByRepMonthly);
router.get('/reportByRepYearly/:email', controller.reportByRepYearly);

router.get('/read-all-leads', controller.readAllLeads);
//router.post('/update-leads', controller.updateLeadsTable);





module.exports = router;
