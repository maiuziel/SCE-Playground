// server.js
import express from 'express';
import dotenv from 'dotenv';
import invoiceRoutes from './routes/invoiceRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import receiptRoutes from './routes/receiptRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();
console.log('DB connection string:', process.env.DB_CONNECTION_STRING);


console.log('server.js started');

const app = express();
app.use(express.json());

console.log('loading routes...');

app.use('/invoices', invoiceRoutes);
console.log('invoiceRoutes loaded');

app.use('/transaction', transactionRoutes);
console.log('transactionRoutes loaded');

app.use('/receipt', receiptRoutes);
console.log('receiptRoutes loaded');

app.use('/report', reportRoutes);
console.log('reportRoutes loaded');

app.listen(process.env.PORT || 4002, () => {
  console.log('FinanceService is running on port 4002');
});



