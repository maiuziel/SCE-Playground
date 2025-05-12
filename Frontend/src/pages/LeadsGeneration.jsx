import React, { useState } from 'react';
import axios from 'axios';

export default function LeadsGeneration() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productInterest, setProductInterest] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !phone || !email || !productInterest) {
      alert('נא למלא את כל השדות!');
      return;
    }

    try {
      const result = await axios.post('/leads/createlead', {
        full_name: fullName,
        phone,
        email,
        product_interest: productInterest,
      });

      console.log('✅ Gateway: lead added successfully', result.data);
      setResponse({ fullName, phone });
    } catch (error) {
      console.error('❌ Error creating lead:', error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.statusText ||
        'An error occurred while creating the lead. Please try again later.';

      alert(`❌ ${errorMessage}`);
    }
  };

  const inputStyle = {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '100%',
    fontSize: '16px',
  };

  return (
    <div
      style={{
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '30px',
          boxShadow: '0 0 20px rgba(0,0,0,0.15)',
          padding: '40px',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#222' }}>
          Share Your Contact Info
        </h2>
  
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <input
            type="text"
            placeholder="Full Name-Max 255 characters(a-zA-Z)"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email - example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Phone Number - 05XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Product Interest"
            value={productInterest}
            onChange={(e) => setProductInterest(e.target.value)}
            style={inputStyle}
          />
          <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                color: 'white',
                border: 'none',
                padding: '14px 40px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              Submit
            </button>
          </div>
        </form>
  
        {response && (
          <div
            style={{
              marginTop: '30px',
              background: '#28a745',
              color: 'white',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            ✅ Thank you, <strong>{response?.fullName ?? 'Unknown'}</strong> (Phone: <strong>{response?.phone ?? 'N/A'}</strong>), for submitting your details. We will contact you shortly.
          </div>
        )}
      </div>
    </div>
  );
}