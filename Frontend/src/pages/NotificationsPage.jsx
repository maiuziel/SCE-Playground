import React, { useEffect, useState } from 'react';

export default function NotificationsPage() {
  const [requests, setRequests] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRequest = {
        id: Date.now(),
        customer: 'לקוח חדש',
        message: 'פנייה חדשה התקבלה',
      };

      // עדכון הרשימה
      setRequests((prev) => [...prev, newRequest]);

      // הצגת ההתראה
      setShowAlert(true);

      // הדפסה לקונסול לזיהוי
      console.log('📢 פנייה חדשה נוספה למערכת:', newRequest);

      // הסתרת ההתראה אחרי 3 שניות
      setTimeout(() => setShowAlert(false), 3000);
    }, 10000); // כל 10 שניות

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px', color: 'white' }}>
      <h2>קבלת התראות על בקשות חדשות</h2>

      {showAlert && (
        <div style={{
          backgroundColor: '#ffecb3',
          color: '#222',
          padding: '10px',
          margin: '20px auto',
          borderRadius: '10px',
          width: '60%',
          fontWeight: 'bold',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)'
        }}>
          📢 פנייה חדשה התקבלה!
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h3>כל הפניות שהתקבלו:</h3>
        {requests.map(req => (
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
            <p><strong>הודעה:</strong> {req.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
