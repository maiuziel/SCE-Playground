import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewRequestNotificationBanner() {
  const [newRequestNotifs, setNewRequestNotifs] = useState([]);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_GATEWAY_URL;

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${baseUrl}/support-requests/notifications/new-requests`);
        if (!res.ok) throw new Error('Failed to fetch new request notifications');
        const notifications = await res.json();

        setNewRequestNotifs(notifications);
      } catch (err) {
        console.error('❌ Failed to fetch notifications:', err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [baseUrl]);

  const handleClick = async () => {
    try {
      for (const notif of newRequestNotifs) {
        await fetch(`${baseUrl}/support-requests/notifications/${notif.id}/mark-read`, {
          method: 'PATCH',
        });
      }

      setNewRequestNotifs([]);
      navigate('/manage-requests');
    } catch (err) {
      console.error('❌ Failed to mark notifications as read:', err);
    }
  };

  if (newRequestNotifs.length === 0) return null;

  return (
    <div
      className="notification-banner"
      onClick={handleClick}
      style={{
        backgroundColor: '#ffefb4',
        padding: '12px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginBottom: '16px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      }}
    >
      📬 A new support request has been received – Click here to manage it
    </div>
  );
}
