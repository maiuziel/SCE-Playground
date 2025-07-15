import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Axios instance with baseURL and token support

export default function NotificationBanner() {
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for unread support responses from customer service
    api.get('/support-requests/unread')
      .then(res => {
        console.log('🔔 Response from /unread:', res.data);
        if (res.data.length > 0) {
          setHasNewMessages(true);
        }
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
      📬 You have a new reply from Customer Service – Click here to view
    </div>
  );
}
