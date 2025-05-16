import React, { useEffect, useState } from 'react';

export default function SupportHistoryPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetch('http://localhost:4002/support-requests')
      .then(res => res.json())
      .then(setRequests)
      .catch(err => {
        console.error('Error fetching requests:', err);
        setError('לא ניתן להציג פניות כרגע');
      })
      .finally(() => setLoading(false));
  }, []);

  const submitComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await fetch(`http://localhost:4002/support-requests/${activeRequestId}/comment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: commentText })
      });

      if (res.ok) {
        const updatedRequest = await res.json();
        setRequests(prev =>
          prev.map(r => (r.id === activeRequestId ? updatedRequest.request : r))
        );
        setCommentText('');
        setActiveRequestId(null);
        alert('Comment sent successfully!');
      } else {
        alert('Failed to send comment');
      }
    } catch (err) {
      alert('Error sending comment');
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Support Request History</h1>
      <p className="page-description">
        Here you can view all the support requests you've submitted.
      </p>

      {loading && <p>Loading requests...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table className="requests-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Response</th>
              <th>My Comment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, index) => (
              <tr key={r.id}>
                <td>{index + 1}</td>
                <td>{r.subject}</td>
                <td>{r.description}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>{r.status}</td>
                <td>{r.response || <span style={{ color: '#aaa' }}>No response yet</span>}</td>
                <td>{r.clientComment || <span style={{ color: '#aaa' }}>No comment</span>}</td>
                <td>
                  <button
                    onClick={() => setActiveRequestId(r.id)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#4fc3f7', // תכלת
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Add Comment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeRequestId && (
        <div style={{
          marginTop: '1rem',
          background: '#f0f0f0',
          padding: '1rem',
          borderRadius: '8px',
          width: 'fit-content'
        }}>
          <h3 style={{ color: 'black' }}>
            Write comment for Request #{requests.findIndex(r => r.id === activeRequestId) + 1}
          </h3>
          <textarea
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type your comment here..."
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          <div>
            <button
              onClick={submitComment}
              style={{
                marginRight: '1rem',
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid black',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
            <button
              onClick={() => {
                setActiveRequestId(null);
                setCommentText('');
              }}
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid black',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
