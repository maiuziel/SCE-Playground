import React, { useState } from 'react';
import api from '../services/api';

function UpdateStatusPage() {
  const [transactionId, setTransactionId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError('');
      setMessage('');

      const response = await api.put(`/finance/transaction/${transactionId}/status`, { status });

      setMessage(`Transaction ${response.data.id} updated to status "${response.data.status}"`);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to update transaction status');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <h2>Update Transaction Status</h2>
      <input
        type="text"
        placeholder="Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <input
        type="text"
        placeholder="New Status (e.g. paid)"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <button onClick={handleUpdate} disabled={loading}>Update</button>

      <div style={{ marginTop: '1rem' }}>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

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

export default UpdateStatusPage;
