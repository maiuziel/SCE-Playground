import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerServicePage() {
  const navigate = useNavigate();

  const buttonStyle = {
    width: '300px',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Customer Service Dashboard</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <button style={buttonStyle} onClick={() => navigate('/manage-requests')}>
          Manage Customer Requests
        </button>

        <button style={buttonStyle} onClick={() => navigate('/reply-to-request')}>
          Respond to Requests
        </button>

        <button style={buttonStyle} onClick={() => navigate('/filter-by-status')}>
          Filter by Status
        </button>

        <button style={buttonStyle} onClick={() => navigate('/search-requests')}>
          Search Requests
        </button>

        <button style={buttonStyle} onClick={() => navigate('/write-reply')}>
          Write Reply to Customer
        </button>

        <button style={buttonStyle} onClick={() => navigate('/notifications')}>
          Receive New Request Alerts
        </button>
      </div>
    </div>
  );
}
