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
  const [isSalesRep, setIsSalesRep] = useState(null); // null = עדיין בטעינה
  const [isOwner, setIsOwner] = useState(null); // נבדוק גם אם בעל עסק

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
          setIsSalesRep(false);
        }
      }
    }

    async function checkOwner() {
      if (user?.email) {
        try {
          const res = await api.get(`sales/isOwner/${user.email}`);
          console.log('Owner check:', res.data);
          setIsOwner(res.data.isOwner); // הנח שיש שדה isOwner בתגובה
        } catch (err) {
          console.error('Failed to check if owner:', err);
          setIsOwner(false);
        }
      }
    }

    checkSalesRep();
    checkOwner();
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
    return <p>Checking permissions...</p>;
  }

  if (!isSalesRep) {
    console.log(user.email);
    return <p>You are not authorized to access this page.</p>;
  }

  return(
    <div className='sales-container'>
      <h1>Welcome to Sales.</h1>

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
        <button className="SalesForecastbtn" onClick={() => navigate('/SalesForecastPage')}>
          Sales Forecast
        </button>
        {isOwner && (
          <button className="SalesForecastbtn" onClick={() => navigate('/SalesRevenuePage')}>
            Sales Revenue
          </button>
        )}
      </div>
    </div>
  );

}
