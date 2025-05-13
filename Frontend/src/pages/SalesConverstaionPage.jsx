import React, { useState } from 'react';
import api from '../services/api.js';

export default function SalesConversationPage() {
  const [customerId, setCustomerId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [products, setProducts] = useState('');
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState(null);
  const [conversations, setConversations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('sales/createConversation', {
        customerId: Number(customerId),
        date,
        time,
        products,
        notes,
      });
      setResult(res.data);
      setCustomerId('');
      setDate('');
      setTime('');
      setProducts('');
      setNotes('');
    } catch (err) {
      alert('An error occurred while submitting the data');
    }
  };

  const fetchConversations = async () => {
    try {
      const res = await api.get(`/sales/conversations/${customerId}`);
      setConversations(res.data);
    } catch (err) {
      alert('Failed to fetch conversations');
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1976d2' }}>Sales Conversation Log</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, gap: 12, marginBottom: 30 }}
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
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <input
          type="time"
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

      <div style={{ marginBottom: 30 }}>
        <button
          onClick={fetchConversations}
          style={{
            padding: '8px 16px',
            fontSize: 14,
            background: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            marginBottom: 10
          }}
        >
          Load Conversations for Customer #{customerId || '...'}
        </button>

        {conversations.length > 0 && (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #ccc',
              marginTop: 10
            }}
          >
            <thead style={{ backgroundColor: 'green' }}>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Customer ID</th>
                <th style={th}>Date</th>
                <th style={th}>Time</th>
                <th style={th}>Products</th>
                <th style={th}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((row) => (
                <tr key={row.id}>
                  <td style={td}>{row.id}</td>
                  <td style={td}>{row.customer_id}</td>
                  <td style={td}>{row.date}</td>
                  <td style={td}>{row.time}</td>
                  <td style={td}>{row.products}</td>
                  <td style={td}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h4 style={{ color: 'green' }}>Saved successfully!</h4>
          <pre style={{ background: '#f7f7f7', padding: 10, borderRadius: 4 }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

const th = {
  border: '1px solid #ccc',
  padding: 8,
  textAlign: 'left'
};

const td = {
  border: '1px solid #ccc',
  padding: 8
};
