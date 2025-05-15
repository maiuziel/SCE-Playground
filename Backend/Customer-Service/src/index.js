app.use(express.json());

initDb()
  .then(() => {
    console.log('✔ Database connected successfully');
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
});

app.use('/support-requests', supportRequestsRouter);
app.use('/customers', customerRouter);

const port = process.env.PORT ?? 4002;
app.listen(port, () => {
  console.log(`Customer-Service is running on port ${port}`);
});
