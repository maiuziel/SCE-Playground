require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4002;

const customerController = require('./Customer-Service/src/Controller/Customer-ServiceController');

// תוספי אמצע (middlewares)
app.use(express.json());

app.use('/customers', customerController);

app.listen(port, () => {
  console.log(`Customer-Service is running on port ${port}`);
});
