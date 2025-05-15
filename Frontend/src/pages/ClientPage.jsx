import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNotificationBanner from '../components/ClientNotificationBanner'; // ✅

export default function ClientPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* ✅ הצגת ההתראה אם קיימת */}
      <ClientNotificationBanner />

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
