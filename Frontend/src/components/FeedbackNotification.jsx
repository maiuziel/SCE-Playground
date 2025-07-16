import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeedbackNotification({ requestId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/feedback/${requestId}`);
  };

  return (
    <div style={{
      background: '#d4edda',
      border: '1px solid #c3e6cb',
      padding: '1rem',
      marginBottom: '1rem',
      borderRadius: '8px'
    }}>
      <strong>🎉 Your support request has been marked as "Done".</strong>
      <br />
      <button
        onClick={handleClick}
        style={{
          marginTop: '0.5rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Rate the Service
      </button>
    </div>
  );
}
