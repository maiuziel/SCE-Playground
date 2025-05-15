import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function RespondRequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4002/support-requests/${id}/respond`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response: message })
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);
      alert('Response sent successfully! ✅');
      navigate('/manage-requests');
    } catch (err) {
      console.error(err);
      setError('Failed to send response');
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Respond to Request #{id}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea
          placeholder="Type your response here..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={6}
          required
        />
        <button type="submit" className="home-button">Send Response</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
