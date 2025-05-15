import React, { useEffect, useState } from 'react';

export default function SupportHistoryPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4001/api/support-requests', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        setRequests(data);
        setLoading(false);

        // סימון תגובות כנקראו אם יש שדה response ולא נקרא עדיין
        data.forEach(req => {
          if (req.response && !req.responseMessageRead) {
            fetch(`http://localhost:4001/api/support-requests/${req.id}/mark-read`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
          }
        });
      })
      .catch(err => {
        console.error('Error fetching requests:', err);
        setError('Unable to load support requests at the moment.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Support Request History</h1>
      <p className="page-description">
        Here you can view all the support requests you've submitted.
      </p>

      {loading && <p>Loading requests…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table className="requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.subject}</td>
                <td>{r.description}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>{r.status}</td>
                <td>
                  {r.response && r.response.trim()
                    ? <span style={{ color: 'green' }}>{r.response}</span>
                    : <span style={{ color: 'gray' }}>No response yet</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
