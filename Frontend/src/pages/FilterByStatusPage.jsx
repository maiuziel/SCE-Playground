import React, { useState } from 'react';

const allRequests = [
  { id: 201, customer: 'מאיה ישראלי', status: 'פתוחה' },
  { id: 202, customer: 'דניאל ברק', status: 'בהמתנה' },
  { id: 203, customer: 'עדי כהן', status: 'נענה' },
  { id: 204, customer: 'אופיר לוי', status: 'סגור' },
];

export default function FilterByStatusPage() {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filtered, setFiltered] = useState([]);

  const handleFilter = () => {
    const result = allRequests.filter(req => req.status === selectedStatus);
    setFiltered(result);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px', color: 'white' }}>
      <h2>סינון פניות לפי סטטוס</h2>

      <div style={{ marginTop: '20px' }}>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px' }}
        >
          <option value="">בחר סטטוס</option>
          <option value="פתוחה">פתוחה</option>
          <option value="בהמתנה">בהמתנה</option>
          <option value="נענה">נענה</option>
          <option value="סגור">סגור</option>
        </select>

        <button onClick={handleFilter} style={{ marginRight: '10px', padding: '10px', borderRadius: '8px' }}>
          סנן
        </button>
      </div>

      {filtered.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>תוצאות:</h3>
          {filtered.map(req => (
            <div key={req.id} style={{
              backgroundColor: 'white',
              color: '#222',
              margin: '10px auto',
              padding: '15px',
              borderRadius: '10px',
              width: '60%',
              textAlign: 'right'
            }}>
              <p><strong>לקוח:</strong> {req.customer}</p>
              <p><strong>סטטוס:</strong> {req.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
