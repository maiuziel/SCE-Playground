// frontend/src/pages/HomePage.jsx
<<<<<<< HEAD
import React from "react";
import { useNavigate } from "react-router-dom";
=======
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../store/StoreContext';
>>>>>>> 8df1b7b35205e0a40dafb8c26de783bad71bba95

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(StoreContext);
  console.log('user', user);

  return (
<<<<<<< HEAD
    <div className="home-container">
      <h1>Welcome to SCE Software Ltd.</h1>
=======
    <div className='home-container'>
      <h1>Hi {user && user.firstName}!Welcome to SCE Software Ltd.</h1>
>>>>>>> 8df1b7b35205e0a40dafb8c26de783bad71bba95
      <p>Explore our products, check your receipts, or get support. </p>

      <div className="home-images">
        <img
          src="/reports.jpg"
          alt="Colorful Product 1"
          onClick={() => navigate("/reports")}
        />
      </div>
    </div>
  );
}
