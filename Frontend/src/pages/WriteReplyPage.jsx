import React, { useState } from 'react';

const requests = [
  { id: 501, customer: 'רוני ישראלי', subject: 'בעיה בחיוב', status: 'פתוחה' },
  { id: 502, customer: 'ניב ברק', subject: 'שאלה על מוצר', status: 'נענה' },
];

export default function WriteReplyPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSend = () => {
    alert(`התגובה נשלחה ללקוח: "${replyText}"`);
    setReplyText('');
    setSelectedId(null);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px', color: 'white' }}>
      <h2>כתיבת תגובה ללקוח</h2>

      {requests.map(req => (
        <div key={req.id} style={{
          backgroundColor: 'white',
          color: '#222',
          margin: '15px auto',
          padding: '15px',
          borderRadius: '10px',
          width: '60%',
          textAlign: 'right'
        }}>
          <p><strong>לקוח:</strong> {req.customer}</p>
          <p><strong>נושא:</strong> {req.subject}</p>
          <p><strong>סטטוס:</strong> {req.status}</p>
          <button onClick={() => setSelectedId(req.id)}>כתוב תגובה</button>

          {selectedId === req.id && (
            <div style={{ marginTop: '10px' }}>
              <textarea
                rows="4"
                style={{ width: '100%' }}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="הקלד את התגובה שלך..."
              />
              <button onClick={handleSend} style={{ marginTop: '8px' }}>שלח תגובה</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
