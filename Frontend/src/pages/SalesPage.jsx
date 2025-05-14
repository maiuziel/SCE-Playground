import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';

export default function SalesPage() {

  const navigate = useNavigate();

  const [customerId, setCustomerId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [products, setProducts] = useState('');
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState(null);
  const [isSalesRep, setIsSalesRep] = useState(null); //null כדי לדעת מתי הבדיקה עדיין לא הסתיימה

  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    console.log('connected:', user.email);
  }

  useEffect(() => {
    async function checkSalesRep() {
      if (user?.email) {
        try {
          const res = await api.get(`sales/representatives/is-rep?email=${user.email}`);
          setIsSalesRep(res.data.isRep);
        } catch (err) {
          console.error('Failed to check if sales rep:', err);
          setIsSalesRep(false); // ברירת מחדל במקרה של שגיאה
        }
      }
    }
    checkSalesRep();
  }, [user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending to backend:', {
      customerId: Number(customerId),
      date,
      time,
      products,
      notes,
    });

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

  if (isSalesRep === null) {
    return <p>Checking permissions...</p>; // עדיין טוען
  }

  if (!isSalesRep) {
    console.log(user.email);
    return <p>You are not authorized to access this page.</p>; // לא איש מכירות
  }

  return(
    
    <div className='sales-container'>
      <h1>Welcome to Salse.</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  <button className="addSalesConverstaionBtn"
    onClick={() => navigate('/salesConverstaion')}>
    Add conversation
  </button>
  <button className="addSalesConverstaionBtn"
    onClick={() => navigate('/SalesLeadsPage')}>
    Leads
  </button>
  <button className="searchSaleHistorybtn" onClick={() => navigate('/salesSearchHistory')}>
  Search Sale History
</button>

</div>


    </div>
    
  );


  
}