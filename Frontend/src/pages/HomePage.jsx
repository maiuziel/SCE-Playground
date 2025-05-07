// frontend/src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../store/StoreContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(StoreContext);
  console.log('user:', user);

  return (
    <div className='home-container'>
      <h1>Hi {user && user.firstName}!Welcome to SCE Software Ltd.</h1>
      <p>Explore our products, check your receipts, or get support. </p>

      <div className='home-images'>
        <img src='/reports.jpg' alt='Colorful Product 1' onClick={() => navigate('/reports')} />
      </div>
      <button
  onClick={() => navigate('/createlead')}
  style={{
    background: 'linear-gradient(to right,rgb(91, 212, 10), #E100FF)',
    marginTop: '20px',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px',
    fontWeight: 'bold',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
>
  🚀 Go to Leads Module
</button>
    </div>
  );
}
