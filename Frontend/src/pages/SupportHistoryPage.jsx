// frontend/src/pages/SupportHistoryPage.jsx
import React, { useEffect, useState } from 'react';

export default function SupportHistoryPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4001/support-requests', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  // אם אתה משתמש בעוגיות/טוקן
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching requests:', err);
        setError(' Unable to display requests at the moment');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loaded requests...</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="page-container">
      <h1 className="page-title">Support Request History</h1>
      <p className="page-description">
        Here you can view all the support requests you've submitted.
      </p>

      <table className="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.subject}</td>
              <td>{r.description}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
