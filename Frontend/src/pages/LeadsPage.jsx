import React, { useState } from 'react';
import axios from 'axios';

export default function LeadsPage() {
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
      console.log('✅ Response set to:', { fullName, phone });
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
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '45%', 
    minWidth: '280px',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        marginTop: '50px',
        padding: '50px',
        maxWidth: '1000px',
        
        margin: 'auto',
        background: '#f9f9f9',
        borderRadius: '50px',
        boxShadow: '0 0 15px rgba(245, 6, 6, 0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
      Share Your Contact Info
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
  <input
    type="text"
    placeholder="Full Name"
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

  <button
    type="submit"
    style={{
      background: 'linear-gradient(to right, #6a11cb, #2575fc)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: 'bold',
      width: '100%',
      maxWidth: '300px',
      marginTop: '20px',
    }}
  >
    Submit
  </button>
</form>

      {response && (
  <div
    style={{
      marginTop: '20px',
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
  );
}
