import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FeedbackPage() {
  const { id } = useParams(); // מזהה את הפנייה (supportRequestId)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const submitFeedback = async () => {
    try {
      await fetch('http://localhost:4000/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          comment,
          supportRequestId: id
        })
      });

      alert('Thank you for your feedback!');
      navigate('/');
    } catch (err) {
      alert('Failed to submit feedback');
    }
  };

  return (
    <div className="page-container">
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
        style={{ width: '100%', marginTop: '1rem' }}
      />
      <button style={{ marginTop: '1rem' }} onClick={submitFeedback}>
        Send
      </button>
    </div>
  );
}
