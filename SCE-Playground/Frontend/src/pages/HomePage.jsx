import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to SCE Software Ltd.</h1>
      <p className="home-description">
        Explore our products, check your receipts, or get support.
      </p>

      <div className="home-images">
        <img
          src="/reports.jpg"
          alt="Colorful Product 1"
          onClick={() => navigate('/reports')}
        />
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button className="home-button" onClick={() => navigate('/customer-service')}>
          Go to Customer Service
        </button>

        <button className="home-button" onClick={() => navigate('/client')}>
          Go to Client
        </button>
      </div>
    </div>
  );
}
