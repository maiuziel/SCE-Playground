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
      setResponse({ name: fullName, phone });

    } catch (error) {
      console.error('❌ Error creating lead:', error);
      alert('An error occurred while creating the lead. Please try again later.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create a New Lead</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        /><br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /><br /><br />

        <input
          type="text"
          placeholder="Product Interest"
          value={productInterest}
          onChange={(e) => setProductInterest(e.target.value)}
        /><br /><br />

        <button type="submit">Submit</button>
      </form>

      {response && (
  <div style={{ marginTop: '20px', color: 'white' }}>
    ✅ Thank you, <strong>{response.full_name}</strong> (Phone: <strong>{response.phone}</strong>), for submitting your details. We will contact you shortly.
  </div>
)}

    </div>
  );
}
