import React, { useState } from 'react';
import api from '../services/api';

function ViewTransactionsPage() {
  const [customerId, setCustomerId] = useState('');
  const [month, setMonth] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      setTransactions([]);

      const response = await api.get('/finance/transaction', {
        params: {
          customer_id: customerId,
          month,
        },
      });

      setTransactions(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch transactions');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <h2>View Transactions</h2>

      <label>Customer ID:</label><br />
      <input
        type="text"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Enter your ID"
      />
      <br /><br />

      <label>Select Month (YYYY-MM):</label><br />
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        Search
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {transactions.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Results:</h3>
          <ul>
            {transactions.map((t) => (
              <li key={t.id}>
                ID: {t.id}, Amount: {t.amount}, Status: {t.status}
              </li>
            ))}
          </ul>
        </div>
      )}

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

export default ViewTransactionsPage;
