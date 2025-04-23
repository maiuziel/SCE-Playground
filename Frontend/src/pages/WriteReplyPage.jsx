import React, { useState } from 'react';

const requests = [
  { id: 501, customer: 'Roni Israeli', subject: 'Billing issue', status: 'Open' },
  { id: 502, customer: 'Niv Barak', subject: 'Product question', status: 'Answered' },
];

export default function WriteReplyPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSend = () => {
    alert(`Reply sent to customer: "${replyText}"`);
    setReplyText('');
    setSelectedId(null);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px', color: 'white' }}>
      <h2>Write Reply to Customer</h2>

      {requests.map(req => (
        <div key={req.id} style={{
          backgroundColor: 'white',
          color: '#222',
          margin: '15px auto',
          padding: '15px',
          borderRadius: '10px',
          width: '60%',
          textAlign: 'left'
        }}>
          <p><strong>Customer:</strong> {req.customer}</p>
          <p><strong>Subject:</strong> {req.subject}</p>
          <p><strong>Status:</strong> {req.status}</p>
          <button onClick={() => setSelectedId(req.id)}>Write Reply</button>

          {selectedId === req.id && (
            <div style={{ marginTop: '10px' }}>
              <textarea
                rows="4"
                style={{ width: '100%' }}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
              />
              <button onClick={handleSend} style={{ marginTop: '8px' }}>Send Reply</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
