import React, { useState } from 'react';

const allRequests = [
  { id: 201, customer: 'Maya Israeli', status: 'Open' },
  { id: 202, customer: 'Daniel Barak', status: 'Pending' },
  { id: 203, customer: 'Adi Cohen', status: 'Answered' },
  { id: 204, customer: 'Ofir Levi', status: 'Closed' },
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
      <h2>Filter Requests by Status</h2>

      <div style={{ marginTop: '20px' }}>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px' }}
        >
          <option value="">Select a Status</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Answered">Answered</option>
          <option value="Closed">Closed</option>
        </select>

        <button onClick={handleFilter} style={{ marginRight: '10px', padding: '10px', borderRadius: '8px' }}>
          Filter
        </button>
      </div>

      {filtered.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Results:</h3>
          {filtered.map(req => (
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
              <p><strong>Status:</strong> {req.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
