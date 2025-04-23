import React, { useState } from 'react';

const dummyRequests = [
  { id: 1, customer: 'דני כהן', message: 'המוצר לא הגיע', status: 'פתוחה' },
  { id: 2, customer: 'תמר לוי', message: 'המשלוח באיחור', status: 'בהמתנה' },
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
        ? { ...req, status: 'נענה' }
        : req
    );
    setRequests(updatedRequests);
    alert('התגובה נשלחה!');
    setSelectedId(null);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px' }}>
      <h2>מענה לפניות לקוחות</h2>

      {requests.map(req => (
        <div key={req.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px auto', width: '60%' }}>
          <p><strong>לקוח:</strong> {req.customer}</p>
          <p><strong>פנייה:</strong> {req.message}</p>
          <p><strong>סטטוס:</strong> {req.status}</p>
          <button onClick={() => handleReply(req.id)}>השב</button>

          {selectedId === req.id && (
            <div style={{ marginTop: '10px' }}>
              <textarea
                rows="4"
                style={{ width: '100%' }}
                placeholder="הקלד תגובה..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
              <button onClick={handleSend} style={{ marginTop: '5px' }}>שלח תגובה</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
