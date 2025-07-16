// frontend/src/pages/FeedbackPage.jsx
import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function FeedbackPage() {
  const { id } = useParams(); 
  const { state } = useLocation(); 
  const notificationId = state?.notificationId;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const submitFeedback = async () => {
    try {
      await fetch(`${import.meta.env.VITE_GATEWAY_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          comment,
          supportRequestId: id
        })
      });

      if (notificationId) {
        await fetch(`${import.meta.env.VITE_GATEWAY_URL}/support-requests/notifications/${notificationId}/mark-read`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
        });
      }

      alert('Thank you for your feedback!');
      navigate('/');
    } catch (err) {
      alert('Failed to submit feedback');
    }
  };

  return (
    <div className="page-container" style={{ textAlign: 'center' }}>
      <h1>Rate Your Support Experience</h1>

      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            style={{
              fontSize: '2rem',
              color: star <= rating ? 'gold' : 'gray',
              border: 'none',
              background: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setRating(star)}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        placeholder="Write your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        style={{
          width: '60%',
          marginTop: '1rem',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />

      <br />

      <button
        style={{
          marginTop: '1rem',
          backgroundColor: '#00bfff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
        onClick={submitFeedback}
      >
        Send
      </button>
    </div>
  );
}
