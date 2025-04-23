// src/index.js
const express = require('express');
require('dotenv').config();
const app = express();

const salesController = require('./controller/sales-controller');
const salesRoutes = require('./routes/sales-routes');

app.use(express.json());
app.use('/sales', salesRoutes);

app.post('/sales', salesController.createSale);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sales service running on port ${PORT}`);
});
