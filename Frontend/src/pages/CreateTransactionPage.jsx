import React, { useState } from 'react';
import api from '../services/api';

function CreateTransactionPage() {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!createdAt) throw new Error('Please select a month.');
      const fullDate = new Date(`${createdAt}-01T00:00:00Z`);
      if (isNaN(fullDate.getTime())) throw new Error('Invalid date format.');

      const response = await api.post('/finance/transaction', {
        customer_id: Number(customerId),
        amount: Number(amount),
        status,
        description,
        created_at: fullDate.toISOString()
      });

      setCustomerId('');
      setAmount('');
      setStatus('');
      setDescription('');
      setCreatedAt('');
      setLoading(false); 



      setTimeout(() => {
        if (status.toLowerCase() === 'paid') {
          alert('Transaction paid and created successfully! receipt has been sent to email');
        } else {
          alert('Transaction created successfully! when menager changes status to "paid", receipt will be sent to email');
        }
      }, 0);

    } catch (error) {
      console.error('Failed to create transaction:', error);
      setLoading(false);
      alert(error.message || 'Failed to create transaction');
    }
  };

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <h2>Create Transaction</h2>

      <form onSubmit={handleSubmit} style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? 'none' : 'auto' }}>
        <div>
          <label>Customer ID:</label><br />
          <input
            type="number"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Amount:</label><br />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Status:</label><br />
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label><br />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Created At (YYYY-MM):</label><br />
          <input
            type="month"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            required
          />
        </div>

        <br />
        <button type="submit">Save Transaction</button>
      </form>

      {loading && (
        <div style={spinnerOverlayStyle}>
          <div style={spinnerStyle}></div>
        </div>
      )}
    </div>
  );
}

const spinnerOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
};

const spinnerStyle = {
  border: '6px solid #f3f3f3',
  borderTop: '6px solid #3498db',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
};

const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

export default CreateTransactionPage;
