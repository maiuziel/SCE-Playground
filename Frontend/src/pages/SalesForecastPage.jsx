import React, { useState } from 'react';
import api from '../services/api';

export default function RevenueChecker() {
  const [leadId, setLeadId] = useState('');
  const [averageRevenue, setAverageRevenue] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!leadId) {
      setError('Please enter a valid ID');
      return;
    }

    setError(null);
    setAverageRevenue(null);
    try {
      // Make sure the URL matches your backend route
      const doneRes = await api.get(`/sales/doneRevenue/${leadId}`);
      
      const avgFromDone = doneRes.data?.avg ?? null;
      if (avgFromDone != null) {
        setAverageRevenue(avgFromDone);
      } else {
        const undoneRes = await api.get(`/sales/unDoneRevenue/${leadId}`);
        const avgFromUndone = undoneRes.data?.avg ?? 0;
        setAverageRevenue(avgFromUndone);
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching revenue');
    }
  };

  return (
    <div style={{ padding: 20, color: '#333' }}>
      <h2 style={{ color: 'white' }}>Revenue Checker</h2>
      <input
        type="text"
        placeholder="Enter ID"
        value={leadId}
        onChange={(e) => setLeadId(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      />
      <button
        onClick={handleSubmit}  // Make sure this matches the function name (case-sensitive)
        style={{
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          padding: '8px 16px'
        }}
      >
        Submit
      </button>
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      {averageRevenue != null && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: 8, color: 'white' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: 8, color: 'white' }}>Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: 8, color: 'white' }}>{leadId}</td>
            <td style={{ border: '1px solid #ccc', padding: 8, color: 'white' }}>{averageRevenue}</td>
          </tr>
        </tbody>
      </table>
      )}
    </div>
  );
}
