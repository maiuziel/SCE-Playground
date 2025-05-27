import React from 'react';
import { useNavigate } from 'react-router-dom';
import AgentFeedbackBanner from '../components/AgentFeedbackBanner'; // 🔔 ייבוא
import NewRequestNotificationBanner from '../components/NewRequestNotificationBanner';

export default function CustomerServicePage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* ✅ הצגת באנר התראה אם קיימות פניות חדשות */}
      <NewRequestNotificationBanner />


      <AgentFeedbackBanner /> {/* ✅ להציג התראות דירוג */}


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
