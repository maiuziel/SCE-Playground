import React, { useState } from 'react';
import api from '../services/api'; // ודא שהנתיב נכון לשירות API שלך

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
      const doneRes = await api.get(`/doneRevenue/${leadId}`);
      const avgFromDone = doneRes.data?.avg ?? doneRes.data ?? null;

      if (avgFromDone !== null) {
        setAverageRevenue(avgFromDone);
      } else {
        // אם אין ממוצע מהשאילתה הראשונה – נשלחת הבקשה השנייה
        const undoneRes = await api.get('/unDoneRevenue');
        const avgFromUndone = undoneRes.data?.avg ?? undoneRes.data ?? 0;
        setAverageRevenue(avgFromUndone);
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching revenue');
    }
  };

  return (
    <div style={{ padding: 20, color: '#fff' }}>
      <h2>Revenue Checker</h2>

      <input
        type="text"
        placeholder="Enter ID"
        value={leadId}
        onChange={(e) => setLeadId(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: '8px 16px',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
        }}
      >
        Submit
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

      {averageRevenue !== null && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid #ccc',
            marginTop: 20,
            backgroundColor: 'transparent',
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Average Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>{leadId}</td>
              <td style={tdStyle}>{averageRevenue}</td>
            </tr>
          </tbody>
        </table>
      )}
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
