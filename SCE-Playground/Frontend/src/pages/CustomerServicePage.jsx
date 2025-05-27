import React from 'react';
import { useNavigate } from 'react-router-dom';
import AgentNotificationBanner from '../components/AgentNotificationBanner'; // ✅ ייבוא הקומפוננטה
import ClientNotificationBanner from '../components/ClientNotificationBanner';
import NewRequestNotificationBanner from '../components/NewRequestNotificationBanner';


export default function CustomerServicePage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <AgentNotificationBanner />
      <NewRequestNotificationBanner />

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
