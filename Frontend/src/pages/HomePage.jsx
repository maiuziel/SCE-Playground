// frontend/src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function HomePage() {
  const navigate = useNavigate();
  const [isSalesRep, setIsSalesRep] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function checkSalesRep() {
      if (user?.email) {
        const email = user.email;
        try {
          const res = await api.get('/sales/representatives/is-rep', {
            email,
          });
          setIsSalesRep(res.data.isRep);
        } catch (err) {
          console.error('Failed to check if sales rep:', err);
        }
      }
    }
    checkSalesRep();
  }, [user?.email]);

  return (
    <div className='home-container'>
      <h1>Welcome to SCE Software Ltd.</h1>
      <p>Explore our products, check your receipts, or get support. </p>

      <div className='home-images'>
        <img
          src='/reports.jpg'
          alt='Colorful Product 1'
          onClick={() => navigate('/reports')}
        />
      </div>

      {isSalesRep && (
        <button className="salesBtn" onClick={() => navigate('/sales')}>
          go to sales
        </button>
      )}
    </div>
  );
}
