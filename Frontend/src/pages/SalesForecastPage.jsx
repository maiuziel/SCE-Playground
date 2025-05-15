import React, { useState } from 'react';
import api from '../services/api';

export default function SalesForecastPage() {
  const [doneRevenue, setDoneRevenue] = useState(null);
  const [undoneRevenue, setUnDoneRevenue] = useState(null);
  const [leadId, setLeadId] = useState('');

  const fetchRevenues = async () => {
    try {
      const doneRes = await api.get(`/sales/doneRevenue/${leadId}`);
      setDoneRevenue(doneRes.data);

      const undoneRes = await api.get('/sales/unDoneRevenue');
      setUnDoneRevenue(undoneRes.data);
    } catch (err) {
      alert('An error occurred while getting the data');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#fff' }}>Forecast Revenue</h1>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Lead ID"
          value={leadId}
          onChange={(e) => setLeadId(e.target.value)}
        />
      </div>

      <button
        onClick={fetchRevenues}
        style={{
          padding: '8px 16px',
          fontSize: 14,
          background: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          marginBottom: 10,
        }}
      >
        Calculate Revenue
      </button>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #ccc',
          marginTop: 10,
          backgroundColor: 'transparent',
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Lead ID</th>
            <th style={thStyle}>Done Revenue</th>
            <th style={thStyle}>Undone Revenue</th>
          </tr>
        </thead>
        <tbody>
          {(doneRevenue !== null || undoneRevenue !== null) ? (
            <tr>
              <td style={tdStyle}>{leadId}</td>
              <td style={tdStyle}>{doneRevenue ?? 'N/A'}</td>
              <td style={tdStyle}>{undoneRevenue ?? 'N/A'}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', color: '#fff', padding: 10 }}>
                No data loaded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: '1px solid #ccc',
  padding: 8,
  color: '#fff',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: 8,
  color: '#fff',
};
