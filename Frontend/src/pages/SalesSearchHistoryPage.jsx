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
    <div >
      <h1>Sales</h1>
      <div>
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />
      </div>
      <div>
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
              marginBottom: 10
            }}
          >
            Load Sales for Customer #{customerId || '...'}
          </button>
      </div>
      <div>
      <table
       style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #ccc',
        marginTop: 10
      }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Products</th>
            <th>Amount</th>
            <th>Costumer ID</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((row) => (
            <tr key={sales.id}>
              <td>{sales.id}</td>
              <td>{sales.name}</td>
              <td>{sales.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}