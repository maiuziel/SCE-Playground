// frontend/src/pages/ClientRequestPage.jsx
import React, { useState } from 'react';

export default function ClientRequestPage() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:4001/support-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, description })
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Request submitted successfully! ✅');
        setSubject('');
        setDescription('');
      })
      .catch((err) => {
        console.error('Error submitting request:', err);
        alert('Something went wrong');
      });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Submit a Customer Service Request</h1>
      <form className="support-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
