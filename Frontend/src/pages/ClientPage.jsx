import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNotificationBanner from '../components/ClientNotificationBanner';
import FeedbackNotificationBanner from '../components/FeedbackNotificationBanner';


export default function ClientPage() {
  const navigate = useNavigate();
  const [feedbackRequests, setFeedbackRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4002/support-requests')
      .then(res => res.json())
      .then(data => {
        const doneWithoutFeedback = data.filter(r => r.status === 'Done' && !r.feedbackSent);
        setFeedbackRequests(doneWithoutFeedback);
      })
      .catch(err => {
        console.error('Failed to load support requests:', err);
      });
  }, []);

  const goToFeedback = (id) => {
    navigate(`/feedback/${id}`);
  };

  return (
    <div className="page-container">
      <ClientNotificationBanner />

      {feedbackRequests.length > 0 && (
        <div style={{ background: '#fff3cd', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <strong>🎉 You have {feedbackRequests.length} request(s) marked as done! </strong>
          <br />
          {feedbackRequests.map(r => (
            <div key={r.id} style={{ marginTop: '0.5rem' }}>
              Request #{r.id} is completed. Please rate:
              <button
                onClick={() => goToFeedback(r.id)}
                style={{ marginLeft: '10px', backgroundColor: '#ffc107', border: 'none', padding: '6px 12px', borderRadius: '6px' }}
              >
                Rate Now
              </button>
            </div>
          ))}
        </div>
      )}

      <h1 className="page-title">Client Portal</h1>

      <button
        className="home-button"
        onClick={() => navigate('/client-request')}
      >
        Submit Customer Service Request
      </button>

      <button
        className="home-button"
        onClick={() => navigate('/subscriptions')}
        style={{ marginTop: '1rem' }}
      >
        View My Subscriptions
      </button>

      <button
        className="home-button"
        onClick={() => navigate('/support-history')}
        style={{ marginTop: '1rem' }}
      >
        View Support History
      </button>
    </div>
  );
}
