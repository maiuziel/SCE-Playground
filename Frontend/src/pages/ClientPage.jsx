import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNotificationBanner from '../components/ClientNotificationBanner';

export default function ClientPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4002/support-requests/notifications')
      .then(res => res.json())
      .then(data => {
        const feedbackNotifs = data.filter(n => n.type === 'feedback_prompt' && !n.read);
        setNotifications(feedbackNotifs);
      })
      .catch(err => {
        console.error('Failed to load notifications:', err);
      });
  }, []);

  const goToFeedback = (supportRequestId, notificationId) => {
    // נווט לדף הפידבק ושמור את notificationId ב-state
    navigate(`/feedback/${supportRequestId}`, {
      state: { notificationId }
    });
  };

  return (
    <div className="page-container">
      <ClientNotificationBanner />

      {notifications.length > 0 && (
        <div style={{ background: '#d4edda', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <strong>🎉 You have request(s) marked as done!</strong>
          <br />
          {notifications.map(n => (
            <div key={n.id} style={{ marginTop: '0.5rem' }}>
              Request #{n.supportRequestId} is completed. Please rate:
              <button
                onClick={() => goToFeedback(n.supportRequestId, n.id)}
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#28a745',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  color: 'white'
                }}
              >
                Rate Now
              </button>
            </div>
          ))}
        </div>
      )}

      <h1 className="page-title">Client Portal</h1>

      <button className="home-button" onClick={() => navigate('/client-request')}>
        Submit Customer Service Request
      </button>

      <button className="home-button" onClick={() => navigate('/subscriptions')} style={{ marginTop: '1rem' }}>
        View My Subscriptions
      </button>

      <button className="home-button" onClick={() => navigate('/support-history')} style={{ marginTop: '1rem' }}>
        View Support History
      </button>
    </div>
  );
}
