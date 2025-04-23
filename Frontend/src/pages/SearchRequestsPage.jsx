import React, { useState } from 'react';

const allRequests = [
  { id: 301, customer: 'Yael Cohen', message: 'Question about delivery', status: 'Open' },
  { id: 302, customer: 'Omri Dagan', message: 'Request for refund', status: 'Answered' },
  { id: 303, customer: 'Michal Levi', message: 'Slow service', status: 'Pending' },
  { id: 304, customer: 'David Sela', message: 'Update subscription details', status: 'Closed' },
  { id: 305, customer: 'Noa Levi', message: 'Payment issue', status: 'Answered' },
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
      <h2>Search Requests by Keywords</h2>

      <input
        type="text"
        placeholder="Enter customer name or keyword..."
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
        Search
      </button>

      {results.length > 0 ? (
        <div style={{ marginTop: '30px' }}>
          <h3>Results:</h3>
          {results.map(req => (
            <div key={req.id} style={{
              backgroundColor: 'white',
              color: '#222',
              margin: '10px auto',
              padding: '15px',
              borderRadius: '10px',
              width: '60%',
              textAlign: 'left'
            }}>
              <p><strong>Customer:</strong> {req.customer}</p>
              <p><strong>Message:</strong> {req.message}</p>
              <p><strong>Status:</strong> {req.status}</p>
            </div>
          ))}
        </div>
      ) : (
        query && <p style={{ marginTop: '30px' }}>No results found 😕</p>
      )}
    </div>
  );
}
