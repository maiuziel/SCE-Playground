import React, { useState } from 'react';
import api from '../services/api';

function MonthlyReportPage() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMonthlyReport = async () => {
    try {
      setLoading(true);
      setError('');
      setReport(null);

      if (!selectedMonth) throw new Error('Please select a month');

      const fullDate = new Date(`${selectedMonth}-01T00:00:00Z`);
      if (isNaN(fullDate.getTime())) throw new Error('Invalid date format');

      const year = fullDate.getUTCFullYear();
      const month = fullDate.getUTCMonth() + 1;

      const response = await api.get('/finance/report/monthly', {
        params: { year, month }
      });

      setReport(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load monthly report');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <h2>Monthly Report</h2>

      <label>Select Month (YYYY-MM):</label><br />
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        required
      />
      <br /><br />

      <button onClick={fetchMonthlyReport} disabled={loading}>
        Get Report
      </button>

      <div style={{ marginTop: '1rem' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {report && (
          <>
            <p><strong>Transactions in {selectedMonth}:</strong> {report.transaction_count}</p>
            <p><strong>Total Income:</strong> ₪ {report.total_income}</p>
            <p><strong>Average Payment:</strong> ₪ {report.average_payment}</p>
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

export default MonthlyReportPage;
