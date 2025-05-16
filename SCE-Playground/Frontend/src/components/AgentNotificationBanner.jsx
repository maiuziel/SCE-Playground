// src/components/AgentNotificationBanner.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgentNotificationBanner() {
  const [newRequests, setNewRequests] = useState([]);
  const navigate = useNavigate();

  // שליפה של פניות חדשות שה-agent טרם ראה
  useEffect(() => {
    fetch('http://localhost:4002/support-requests/new-client-requests')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch new client requests');
        return res.json();
      })
      .then(data => setNewRequests(data))
      .catch(err => console.error('Error loading new client requests:', err));
  }, []);

  const handleClick = async () => {
    try {
      // מסמן את הפניות כ"נצפו על ידי נציג"
      await fetch('http://localhost:4002/support-requests/mark-new-as-read', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      // הסרת ההתראה מהמסך
      setNewRequests([]);

      // ניווט לעמוד ניהול הפניות
      navigate('/manage-requests');
    } catch (err) {
      console.error('Error marking requests as read:', err);
    }
  };

  if (!newRequests.length) return null;

  return (
    <div style={{
      background: '#fff3cd',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      border: '1px solid #ffeeba',
      textAlign: 'center'
    }}>
      <strong>🔔 {newRequests.length} new request{newRequests.length > 1 ? 's' : ''} from customers</strong>
      <br />
      <button
        onClick={handleClick}
        style={{
          marginTop: '10px',
          backgroundColor: '#ffc107',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        View New Requests
      </button>
    </div>
  );
}
