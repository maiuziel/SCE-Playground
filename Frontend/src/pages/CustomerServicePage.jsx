import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerServicePage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1 className="page-title">Customer Service Dashboard</h1>

      <button
        className="home-button"
        onClick={() => navigate('/manage-requests')}
      >
        Manage Requests
      </button>
    </div>
  );
}
