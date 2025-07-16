import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ManagementPage() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await api.get('/finance/report/summary');
      setSummary(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load summary report');
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <h2>Management Summary</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '250px' }}>
        <button onClick={() => navigate('/update-status')}>
          Update Transaction Status
        </button>

        <button onClick={() => navigate('/finance/management/monthly')}>
          Monthly Report
        </button>

        <button onClick={fetchSummary} disabled={loading}>
          {loading ? 'Loading...' : 'Show Summary Report'}
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {summary && (
          <>
            <p><strong>Total Transactions:</strong> {summary.transaction_count}</p>
            <p><strong>Total Income:</strong> ₪ {summary.total_income}</p>
            <p><strong>Average Payment:</strong> ₪ {summary.average_payment}</p>
          </>
        )}
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

export default ManagementPage;
