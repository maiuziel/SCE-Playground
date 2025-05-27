import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewRequestNotificationBanner() {
  const [hasNewRequest, setHasNewRequest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('https://your-api-url.com/api/new-requests');
        const data = await res.json();
        if (data.hasNew) {
          setHasNewRequest(true);
        }
      } catch (err) {
        console.error('Failed to fetch new requests:', err);
      }
    }, 5000); // כל 5 שניות

    return () => clearInterval(interval);
  }, []);

  if (!hasNewRequest) return null;

  return (
    <div className="notification-banner" onClick={() => navigate('/manage-requests')}>
      📬 New customer request received – Click to manage
    </div>
  );
}
