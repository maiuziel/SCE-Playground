import React, { useState } from 'react';
import api from '../services/api';

export default function SalesForecastPage() {
  const [doneRevenue, setDoneRevenue] = useState(null);
  const [undoneRevenue, setUnDoneRevenue] = useState(null);
  const [leadId, setLeadId] = useState('');

    const doneRevenue = async () => {
        try{
            const res = await api.get('sales/doneRevenueLead', {leadId});
            setDoneRevenue(res.data);
            if(!donerevenue){
                unDoneRevenue;
            }
        }catch (err) {
            alert('An error occurred while getting the data');
        }
    };

    const unDoneRevenue = async () => {
        try{
            const res = await api.get('sales/unDoneRevenueLead');
            setUnDoneRevenue(res.data);
        }catch (err) {
            alert('An error occurred while getting the data');
        }
    };

    return(
        <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#fff' }}>Forecast Reveneu</h1>

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
            <th style={thStyle}>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {(doneRevenue !== null || undoneRevenue !== null) ? (
            <tr>
              <td style={tdStyle}>{leadId}</td>
              <td style={tdStyle}>{undonerevenue}</td>
            </tr>
          ) : (
           
              <tr>
                <td style={tdStyle}>{leadId}</td>
                <td style={tdStyle}>{donerevenue}</td>
              </tr>
            )
         }
        </tbody>
      </table>
    </div>
  );
}