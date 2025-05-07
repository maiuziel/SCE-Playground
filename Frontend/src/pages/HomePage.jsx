// frontend/src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.email == "babilabong@gmail.com") {
    return (
      <div className='home-container'>
        <h1>Welcome to SCE Software Ltd.</h1>
        <p>Explore our products, check your receipts, or get support. </p>
  
        <div className='home-images'>
          <img src='/reports.jpg' alt='Colorful Product 1' onClick={() => navigate('/reports')} />
        </div>
  
        <button className="salesBtn"
        onClick={() => navigate('/sales')}>go to sales</button>
      </div>
    );
  }

  return (
    <div className='home-container'>
      <h1>Welcome to SCE Software Ltd.</h1>
      <p>Explore our products, check your receipts, or get support. </p>

      <div className='home-images'>
        <img src='/reports.jpg' alt='Colorful Product 1' onClick={() => navigate('/reports')} />
      </div>
    </div>
  );
}
