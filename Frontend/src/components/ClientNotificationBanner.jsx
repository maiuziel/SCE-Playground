import React, { useEffect, useState } from 'react';

export default function ClientNotificationBanner() {
  const [newMessages, setNewMessages] = useState([]);
  const baseUrl = import.meta.env.VITE_GATEWAY_URL;

  useEffect(() => {
    fetch(`${baseUrl}/support-requests/unread`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch unread messages');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setNewMessages(data);
      })
      .catch(err => {
        console.error('Error loading unread messages:', err);
      });
  }, [baseUrl]);

  const handleView = async (id, response) => {
    alert(`📩 Response:\n\n${response}`);
    await fetch(`${baseUrl}/support-requests/${id}/mark-read`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    });
    setNewMessages(prev => prev.filter(r => r.id !== id));
  };

  if (!newMessages.length) return null;

  return (
    <div style={{ background: '#fff3cd', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #ffeeba' }}>
      <strong>📬 You have {newMessages.length} new message{newMessages.length > 1 ? 's' : ''} from support:</strong>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
        {newMessages.map(msg => (
          <li key={msg.id}>
            <button
              onClick={() => handleView(msg.id, msg.response)}
              style={{
                background: '#ffc107',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 12px',
                marginTop: '8px',
                cursor: 'pointer'
              }}
            >
              View response to request #{msg.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
