import React, { useState } from 'react';
import api from '../services/api.js';

export default function SalesSearchHistoryPage() {
  const [customerId, setCustomerId] = useState('');
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const endpoint = customerId
        ? `/sales/getSalesByCostumer/${customerId}`
        : '/sales/getAllsales';

      const res = await api.get(endpoint);
      setSales(res.data);
    } catch (err) {
      alert('Failed to fetch sales');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#fff' }}>Sales</h1>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
      </div>

      <button
        onClick={fetchSales}
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
        Load Sales for Customer #{customerId || '...'}
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
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Product</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Customer ID</th>
            <th style={thStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: 10, color: '#fff' }}>
                No sales found.
              </td>
            </tr>
          ) : (
            sales.map((row) => (
              <tr key={row.id}>
                <td style={tdStyle}>{row.id}</td>
                <td style={tdStyle}>{row.product}</td>
                <td style={tdStyle}>{row.amount}</td>
                <td style={tdStyle}>{row.customer_id}</td>
                <td style={tdStyle}>
                  {row.date ? new Date(row.date).toISOString().split('T')[0] : ''}
                </td>
              </tr>
            ))
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
  backgroundColor: 'transparent',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: 8,
  color: '#fff',
  backgroundColor: 'transparent',
};
