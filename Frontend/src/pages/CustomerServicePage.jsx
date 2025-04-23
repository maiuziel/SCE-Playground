<<<<<<< HEAD
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerServicePage() {
  const navigate = useNavigate();

  const buttonStyle = {
    width: '300px',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Customer Service Dashboard</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <button style={buttonStyle} onClick={() => navigate('/manage-requests')}>
          ניהול פניות לקוחות
        </button>

        <button style={buttonStyle} onClick={() => navigate('/reply-to-request')}>
          מענה לפניות
        </button>

        <button style={buttonStyle} onClick={() => navigate('/auto-status-update')}>
          עדכון סטטוס אוטומטי (מייל/SMS)
        </button>

        <button style={buttonStyle} onClick={() => navigate('/filter-by-status')}>
          סינון לפי סטטוס
        </button>

        <button style={buttonStyle} onClick={() => navigate('/search-requests')}>
          חיפוש בקשות
        </button>

        <button style={buttonStyle} onClick={() => navigate('/manual-status-update')}>
          עדכון סטטוס הבקשה
        </button>

        <button style={buttonStyle} onClick={() => navigate('/write-reply')}>
          כתיבת תגובה ללקוח
        </button>

        <button style={buttonStyle} onClick={() => navigate('/notifications')}>
          קבלת התראות על בקשות חדשות
        </button>
      </div>
    </div>
  );
}
=======
export default function CustomerServicePage() {
    return <h2>Welcome to Customer Service!</h2>;
  }
  
>>>>>>> d6fc473 (First commit)
