import React, { useState } from 'react';
import axios from 'axios';
import api from '../services/api.js';


export default function SalesPage() {
  const [customerId, setCustomerId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [products, setProducts] = useState('');
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    console.log('📦 Sending to backend:', {
      customerId:Number(customerId),
      date,
      time,
      products,
      notes,
    });
    
    e.preventDefault();
    try {
      // שליחת כל השדות לשרת דרך ה-Gateway
      const res = await api.post('api/sales', {
        customerId: Number(customerId) ,
        date,
        time,
        products,
        notes,
      });
      setResult(res.data);
      // איפוס הטופס אחרי שליחה מוצלחת
      setCustomerId('');
      setDate('');
      setTime('');
      setProducts('');
      setNotes('');
    } catch (err) {
      alert('An error occurred while submitting the data');
    }
  };

  return (
    <div>
      <h1>Sales Conversation Log</h1>
      <form 
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', maxWidth: 350, gap: 14 }}
      >
        <input
          type="number"
          placeholder="Customer ID"
          value={customerId}
          onChange={e => setCustomerId(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Time"
          value={time}
          onChange={e => setTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Products"
          value={products}
          onChange={e => setProducts(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
        <button
          type="submit"
          style={{
            padding: '10px 0',
            fontSize: 16,
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            marginTop: 8,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Save Conversation
        </button>
      </form>
      {result && (
        <div>
          <h4>Saved successfully!</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}