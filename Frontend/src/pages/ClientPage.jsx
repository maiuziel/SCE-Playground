import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClientPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1 className="page-title">Client Portal</h1>

      <button
        className="home-button"
        onClick={() => navigate('/client-request')}
      >
        Submit Customer Service Request
      </button>

      <button
        className="home-button"
        onClick={() => navigate('/subscriptions')}
        style={{ marginTop: '1rem' }}
      >
        View My Subscriptions
      </button>

      <button
        className="home-button"
        onClick={() => navigate('/support-history')}
        style={{ marginTop: '1rem' }}
      >
        View Support History
      </button>
    </div>
  );
}
