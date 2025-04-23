import React, { useState } from 'react';

const requests = [
  { id: 101, customer: 'נועה לוי', status: 'בהמתנה' },
  { id: 102, customer: 'איתן כהן', status: 'פתוחה' },
];

export default function AutoStatusUpdatePage() {
  const [requestList, setRequestList] = useState(requests);

  const updateStatus = (id, newStatus) => {
    const updated = requestList.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequestList(updated);
    alert(`הסטטוס עודכן ל־"${newStatus}" והודעה נשלחה ללקוח! 📬`);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px' }}>
      <h2 style={{ color: 'white' }}>עדכון סטטוס אוטומטי</h2>

      {requestList.map(req => (
        <div
          key={req.id}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            margin: '15px auto',
            width: '60%',
            backgroundColor: 'white',
            borderRadius: '10px',
            color: '#222', // צבע טקסט כהה
            textAlign: 'right'
          }}
        >
          <p><strong>לקוח:</strong> {req.customer}</p>
          <p><strong>סטטוס נוכחי:</strong> {req.status}</p>
          <label>
            <strong>בחר סטטוס חדש:</strong><br />
            <select onChange={(e) => updateStatus(req.id, e.target.value)}>
              <option disabled selected value="">בחר סטטוס חדש</option>
              <option value="נענה">נענה</option>
              <option value="סגור">סגור</option>
              <option value="בהמתנה">בהמתנה</option>
            </select>
          </label>
        </div>
      ))}
    </div>
  );
}
