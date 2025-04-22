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
        Submit Customer Service support
      </button>
    </div>
  );
}
