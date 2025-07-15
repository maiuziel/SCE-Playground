import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeedbackNotificationBanner() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_GATEWAY_URL;

  useEffect(() => {
    fetch(`${baseUrl}/support-requests/notifications`)
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
      })
      .catch(err => {
        console.error('Error loading notifications:', err);
      });
  }, [baseUrl]);

  const handleClick = async (notification) => {
    await fetch(`${baseUrl}/support-requests/notifications/${notification.id}/mark-read`, {
      method: 'PATCH'
    });

    setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    navigate(`/feedback/${notification.supportRequestId}`);
  };

  if (!notifications.length) return null;

  return (
    <div style={{
      backgroundColor: '#d4edda',
      border: '1px solid #c3e6cb',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      textAlign: 'center'
    }}>
      {notifications.map(notification => (
        <div key={notification.id} style={{ marginBottom: '0.5rem' }}>
          <strong>✅ {notification.message}</strong>
          <br />
          <button
            onClick={() => handleClick(notification)}
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Rate Now
          </button>
        </div>
      ))}
    </div>
  );
}
