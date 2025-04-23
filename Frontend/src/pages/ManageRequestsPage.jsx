// frontend/src/pages/ManageRequestsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageRequestsPage() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4001/support-requests')
      .then(res => res.json())
      .then(setRequests)
      .catch(console.error);
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Manage Customer Requests</h1>
      <p className="page-description">
        כאן ניתן לעדכן את הסטטוס של כל פנייה ולענות ללקוח
      </p>

      <table className="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.subject}</td>
              <td>{r.description}</td>
              <td>{r.status}</td>
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
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }

        .action-button:hover {
          background-color: #0056b3;
        }

        .requests-table td,
        .requests-table th {
          text-align: center;
          padding: 12px;
        }
      `}</style>
    </div>
  );
}
