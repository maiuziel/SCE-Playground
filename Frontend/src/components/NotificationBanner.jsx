import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationBanner() {
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4001/api/support-requests/unread', {

      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log('🔔 Response from /unread:', data);
        if (data.length > 0) setHasNewMessages(true);
      })
      .catch(err => {
        console.error('Error checking notifications:', err);
      });
  }, []);

  if (!hasNewMessages) return null;

  return (
    <div
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onClick={() => navigate('/support-history')}
    >
      📬 יש לך תגובה חדשה מנציג שירות – לחץ כאן לצפייה
    </div>
  );
}
