import React, { useState } from 'react';
import api from '../services/api'; // ודא שזה הנתיב הנכון

export default function SalesRevenuePage() {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [timeRevenue, setTimeRevenue] = useState({ today: null, month: null, year: null });

  const fetchTotalRevenue = async () => {
    try {
      const res = await api.get('/sales/getAllSalesPrice');
      setTotalRevenue(res.data.total);
    } catch (err) {
      console.error('Error fetching total revenue:', err);
    }
  };

  const fetchTimeRevenue = async () => {
    try {
      const res = await api.get('/sales/getAllSalesPriceByTime');
      setTimeRevenue({
        today: res.data.total_today,
        month: res.data.total_month,
        year: res.data.total_year
      });
    } catch (err) {
      console.error('Error fetching time-based revenue:', err);
    }
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50', // ירוק
    color: 'white',
    padding: '12px 24px',
    margin: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: '0.3s',
  };

  const hoverStyle = {
    backgroundColor: '#45a049',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📊 Sales Revenue</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          style={buttonStyle}
          onMouseOver={e => (e.target.style.backgroundColor = hoverStyle.backgroundColor)}
          onMouseOut={e => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={fetchTotalRevenue}
        >
          💰 Get Total Revenue
        </button>
        {totalRevenue !== null && (
          <p>Total Revenue: <strong>{totalRevenue}</strong> ₪</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          style={{ ...buttonStyle, backgroundColor: '#2196F3' }} // כחול
          onMouseOver={e => (e.target.style.backgroundColor = '#1976D2')}
          onMouseOut={e => (e.target.style.backgroundColor = '#2196F3')}
          onClick={fetchTimeRevenue}
        >
          🕒 Get Revenue By Time
        </button>
        {timeRevenue.today !== null && (
          <div>
            <p>Today: <strong>{timeRevenue.today}</strong> ₪</p>
            <p>This Month: <strong>{timeRevenue.month}</strong> ₪</p>
            <p>This Year: <strong>{timeRevenue.year}</strong> ₪</p>
          </div>
        )}
      </div>
    </div>
  );
}
