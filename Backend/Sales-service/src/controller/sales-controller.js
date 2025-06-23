// src/controller/sales-controller.js
const salesService = require('../services/sales-service');

// Create a new sale
exports.createSale = async (req, res) => {
  console.log('POST/sales');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  try {
    console.log('been here');
    const sale = await salesService.createSale(req.body);
    console.log('New sale created:', sale); 
    res.status(201).json(sale);
  } catch (err) {
    console.error('Error inserting sale:', err);
    res.status(500).json({ error: 'Failed to create sale' });
  }
};


// Retrieve all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await salesService.getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get sales' });
  }
};

// Retrieve a specific sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await salesService.getSaleById(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get sale' });
  }
};

// Update a sale
exports.updateSale = async (req, res) => {
  try {
    const updated = await salesService.updateSale(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sale' });
  }
};

// Delete a sale
exports.deleteSale = async (req, res) => {
  try {
    await salesService.deleteSale(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sale' });
  }
};

exports.getSalesByCustomerId = async (req, res) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const data = await salesService.getSalesByCustomerId(customerId);
    res.json(data);
  } catch (err) {
    console.error('Error retrieving cusomer sales:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

exports.isSalesRep = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Missing email' });

  try {
    const isRep = await salesService.isSalesRep(email);
    res.status(200).json({ isRep });
  } catch (error) {
    console.error('DB error in isSalesRep:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSalesRepType = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Missing email' });

  try {
    const type = await salesService.getSalesRepType(email);
    res.status(200).json({ type });
  } catch (error) {
    console.error('DB error in isSalesRep:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getConversationsByCustomerId = async (req, res) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const data = await salesService.getConversationsByCustomerId(customerId);
    res.json(data);
  } catch (err) {
    console.error('Error retrieving conversations:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const data = await salesService.getAllConversations();
    res.json(data);
  } catch (err) {
    console.error('Error retrieving conversations:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

exports.getMyLeads = async(req, res) => {
  try {
    const email = req.params.email;
    const data = await salesService.getMyLeads(email);
    res.json(data);
  } catch (err) {
    console.error('Error retrieving leads:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

exports.getAllLeads = async(req, res) => {
  try {
    const data = await salesService.getAllLeads();
    res.json(data);
  } catch (err) {
    console.error('Error retrieving leads:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

exports.assignLead = async(req, res) => {
  try {
    const { leadId, email } = req.body;
    const data = await salesService.assignLead(leadId, email);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error assigning lead:', err);
    res.status(500).json({ success: false, error: 'Failed to assign lead' });
  }
}


exports.updateLeadToInProgress = async(req, res) => {
  try {
    const number = req.params.number;
    const data = await salesService.updateLeadToInProgress(number);
    res.json(data);
  } catch (err) {
    console.error('Error retrieving leads:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

exports.updateLeadStatus = async(req, res) => {
  try {
    const { leadId, status } = req.body;
    const data = await salesService.updateLeadStatus(leadId, status);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error updating lead status:', err);
    res.status(500).json({ success: false, error: 'Failed to update lead status' });
  }
}

exports.unassignLead = async(req, res) => {
  try {
    const { leadId } = req.body;
    const data = await salesService.unassignLead(leadId);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error unassigning lead:', err);
    res.status(500).json({ success: false, error: 'Failed to unassign lead' });
  }
}

exports.doneRevenueLead = async (req, res) => {
  try {
    const leadId = req.params.id;
    console.log('Controller: Processing request for leadId:', leadId);
    const revenue = await salesService.doneRevenue(leadId);
    console.log('Controller: Got revenue result:', revenue);
    res.json(revenue);
  } catch (err) {
    console.error('Error calculating lead revenue:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

exports.unDoneRevenueLead = async(req, res) => {
  try{
    const revenue = await salesService.unDoneRevenue();
    res.json(revenue);
  }catch (err) {
    console.error('Error calculate lead revenue:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

exports.isOwner = async (req, res) => {
  const email = req.params.email;
  if (!email) return res.status(400).json({ error: 'Missing email' });

  try {
    const isOwner = await salesService.isOwner(email);
    res.status(200).json({ isOwner });
  } catch (error) {
    console.error('DB error in isOwner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllRepresentatives = async (req, res) => {
  try {
    const representatives = await salesService.getAllRepresentatives();
    res.status(200).json(representatives);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get representatives' });
  }
};


exports.reportByRep = async (req, res) => {
  try{
    const email = req.params.email;
    const repReport = await salesService.reportByRep(email);
    res.status(200).json(repReport);
  }catch(error){
    console.error('DB error in reportByRep:',error)
    res.status(500).json({error: 'Internal server error'});
  }
};

exports.totalSalesByRep = async (req, res) => {
  try{
    const email = req.params.email;
    const repTotal = await salesService.totalSalesByRep(email);
    res.status(200).json(repTotal);
  }catch(error){
    console.error('DB totalSalesByRep:',error)
    res.status(500).json({error: 'Internal server error'});
  }
};

exports.getAllSalesPrice = async(req, res) => {
  try{
    const price = await salesService.getAllSalesPrice();
    res.json(price);
  }catch (err) {
    console.error('Error calculate price:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

exports.getAllSalesPriceByTime = async(req, res) => {
  try{
    const price = await salesService.getAllSalesPriceByTime();
    res.json(price);
  }catch (err) {
    console.error('Error calculate price:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};


exports.reportByRepMonthly = async (req, res) => {
  try{
    const email = req.params.email;
    const repReportMonthly = await salesService.reportByRepMonthly(email);
    res.status(200).json(repReportMonthly);
  }catch(error){
    console.error('DB error in reportByRepMonthly:',error)
    res.status(500).json({error: 'Internal server error'});
  }
};

exports.reportByRepYearly = async (req, res) => {
  try{
    const email = req.params.email;
    const repReportYearly = await salesService.reportByRepYearly(email);
    res.status(200).json(repReportYearly);
  }catch(error){
    console.error('DB error in reportByRepYearly:',error)
    res.status(500).json({error: 'Internal server error'});
  }
};


exports.readAllLeads = async (req, res) => {
  try {
    const leads = await salesService.fetchAllLeads();
    res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res
      .status(500)
      .json({ message: 'Failed to fetch leads', details: error.message });
  }
};


exports.syncExternalLeads = async (req, res) => {
  const externalLeads = req.body; // מערך לידים

  try {
    await salesService.syncExternalLeads(externalLeads);
    res.json({ success: true, message: 'Leads synchronized successfully' });
  } catch (error) {
    console.error('Error syncing leads:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};