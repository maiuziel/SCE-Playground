import React, { useState } from 'react';

const allRequests = [
  { id: 301, customer: 'יעל כהן', message: 'שאלה על משלוח', status: 'פתוחה' },
  { id: 302, customer: 'עמרי דגן', message: 'בקשה להחזר כספי', status: 'נענה' },
  { id: 303, customer: 'מיכל לוי', message: 'שירות איטי', status: 'בהמתנה' },
  { id: 304, customer: 'דוד סלע', message: 'שינוי פרטי מנוי', status: 'סגור' },
  { id: 305, customer: 'נועה לוי', message: 'בעיה בתשלום', status: 'נענה' },
];

export default function SearchRequestsPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = allRequests.filter(req =>
      req.customer.toLowerCase().includes(normalizedQuery) ||
      req.message.toLowerCase().includes(normalizedQuery)
    );

    setResults(filtered);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px', color: 'white' }}>
      <h2>חיפוש בקשות לפי מילות מפתח</h2>

      <input
        type="text"
        placeholder="הקלד שם לקוח או מילת מפתח..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '8px',
          width: '60%',
          marginTop: '20px',
          marginBottom: '10px'
        }}
      />
      <br />
      <button
        onClick={handleSearch}
        style={{ padding: '10px 20px', borderRadius: '8px', marginTop: '5px' }}
      >
        חפש
      </button>

      {results.length > 0 ? (
        <div style={{ marginTop: '30px' }}>
          <h3>תוצאות:</h3>
          {results.map(req => (
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
              <p><strong>פנייה:</strong> {req.message}</p>
              <p><strong>סטטוס:</strong> {req.status}</p>
            </div>
          ))}
        </div>
      ) : (
        query && <p style={{ marginTop: '30px' }}>לא נמצאו תוצאות 😕</p>
      )}
    </div>
  );
}
