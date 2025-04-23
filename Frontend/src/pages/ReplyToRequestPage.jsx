import React, { useState } from 'react';

const dummyRequests = [
  { id: 1, customer: 'Danny Cohen', message: 'The product did not arrive', status: 'Open' },
  { id: 2, customer: 'Tamar Levi', message: 'The delivery is delayed', status: 'Pending' },
];

export default function ReplyToRequestPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [requests, setRequests] = useState(dummyRequests);

  const handleReply = (id) => {
    setSelectedId(id);
    setResponseText('');
  };

  const handleSend = () => {
    const updatedRequests = requests.map(req =>
      req.id === selectedId
        ? { ...req, status: 'Answered' }
        : req
    );
    setRequests(updatedRequests);
    alert('Reply sent!');
    setSelectedId(null);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px' }}>
      <h2>Respond to Customer Requests</h2>

      {requests.map(req => (
        <div key={req.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px auto', width: '60%' }}>
          <p><strong>Customer:</strong> {req.customer}</p>
          <p><strong>Request:</strong> {req.message}</p>
          <p><strong>Status:</strong> {req.status}</p>
          <button onClick={() => handleReply(req.id)}>Reply</button>

          {selectedId === req.id && (
            <div style={{ marginTop: '10px' }}>
              <textarea
                rows="4"
                style={{ width: '100%' }}
                placeholder="Type your response..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
              <button onClick={handleSend} style={{ marginTop: '5px' }}>Send Reply</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
