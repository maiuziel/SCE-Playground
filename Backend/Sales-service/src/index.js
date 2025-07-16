// src/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const salesRoutes = require('./routes/sales-routes');

app.use(cors({
  origin: '*', // או כתובת ספציפית של ה־frontend/gateway
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use('/sales', salesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sales service running on port ${PORT}`);
});
