import React, { useState } from 'react';

const allRequests = [
  { id: 401, customer: 'שחר לוי', status: 'פתוחה' },
  { id: 402, customer: 'מאי בר', status: 'בהמתנה' },
  { id: 403, customer: 'לירון גולדשטיין', status: 'נענה' },
];

export default function ManualStatusUpdatePage() {
  const [requests, setRequests] = useState(allRequests);
  const [newStatuses, setNewStatuses] = useState({});

  const handleStatusChange = (id, value) => {
    setNewStatuses({ ...newStatuses, [id]: value });
  };

  const updateStatus = (id) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, status: newStatuses[id] || req.status } : req
    );
    setRequests(updated);
    alert(`סטטוס הבקשה עודכן ל: "${newStatuses[id]}"`);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px', color: 'white' }}>
      <h2>עדכון סטטוס ידני לבקשות</h2>

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
          <p><strong>סטטוס נוכחי:</strong> {req.status}</p>

          <label>
            <strong>סטטוס חדש:</strong><br />
            <select
              onChange={(e) => handleStatusChange(req.id, e.target.value)}
              defaultValue=""
            >
              <option disabled value="">בחר סטטוס</option>
              <option value="פתוחה">פתוחה</option>
              <option value="בהמתנה">בהמתנה</option>
              <option value="נענה">נענה</option>
              <option value="סגור">סגור</option>
            </select>
          </label>

          <br /><br />
          <button onClick={() => updateStatus(req.id)}>עדכן סטטוס</button>
        </div>
      ))}
    </div>
  );
}
