// frontend/src/pages/ManageRequestsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_GATEWAY_URL;

  useEffect(() => {
    loadRequests();
    loadNotifications();
  }, []);

  const loadRequests = () => {
    fetch(`${baseUrl}/support-requests`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(setRequests)
      .catch(err => console.error('Error loading requests:', err));
  };

  const loadNotifications = () => {
    fetch(`${baseUrl}/feedback/notifications`)
      .then(res => res.json())
      .then(setNotifications)
      .catch(err => console.error('Failed to load feedback notifications:', err));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${baseUrl}/support-requests/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setRequests(prev =>
          prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
        );
      } else {
        console.error('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleViewFeedback = async (notif) => {
    try {
      const res = await fetch(`${baseUrl}/feedback/notifications/${notif.id}/mark-read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setNotifications(prev => prev.filter(n => n.id !== notif.id));
        const { supportRequestId } = notif;

        const feedbackRes = await fetch(`${baseUrl}/feedback/by-request/${supportRequestId}`);
        const feedback = await feedbackRes.json();

        alert(`⭐ Rating: ${feedback.rating}/5\n📝 Comment: ${feedback.comment || 'No comment'}`);
      }
    } catch (err) {
      console.error('Error viewing feedback:', err);
    }
  };

  const maxId = Math.max(...requests.map(r => r.id), 0);

  return (
    <div className="page-container">
      <h1 className="page-title">Manage Customer Requests</h1>
      <p className="page-description">
        Here you can update the status of each request and respond to customers.
      </p>

      {notifications.length > 0 && (
        <div style={{ background: '#fff3cd', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <strong>📢 New Feedback Received!</strong>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notifications.map(notif => (
              <li key={notif.id} style={{ marginTop: '0.5rem' }}>
                Request #{notif.supportRequestId}
                <button
                  onClick={() => handleViewFeedback(notif)}
                  style={{
                    marginLeft: '10px',
                    backgroundColor: '#ffc107',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  View Feedback
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input
          type="number"
          placeholder="Search by ID"
          value={searchId}
          min="0"
          max={maxId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '160px'
          }}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          <option value="all">All statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Done</option>
        </select>
      </div>

      <table className="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Client Comment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests
            .filter((r) => {
              const matchStatus = filterStatus === 'all' || r.status === filterStatus;
              const matchId = !searchId || r.id.toString() === searchId;
              return matchStatus && matchId;
            })
            .map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.subject}</td>
                <td>{r.description}</td>
                <td>{r.clientComment || <i style={{ color: '#777' }}>No comment</i>}</td>
                <td>
                  <select
                    value={r.status}
                    onChange={(e) => handleStatusChange(r.id, e.target.value)}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Done</option>
                  </select>
                </td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => navigate(`/respond/${r.id}`)}
                  >
                    Respond
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <style>{`
        .action-button {
          padding: 8px 16px;
          font-size: 14px;
          background-color: #00aaff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }

        .action-button:hover {
          background-color: #0077cc;
        }

        .requests-table td,
        .requests-table th {
          text-align: center;
          padding: 12px;
        }

        select {
          padding: 6px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
