import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../store/StoreContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(StoreContext);
  console.log('user:', user);

  return (
    <div className="home-container">
      <h1>Hi {user?.firstName}! Welcome to SCE Software Ltd.</h1>
      <p>Explore our products, check your receipts, or get support.</p>

      <div
        className="home-images"
        style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* ── REPORTS TILE ── */}
        <div style={{ textAlign: 'center' }}>
          <img
            src="/reports.jpg"
            alt="Reports"
            onClick={() => navigate('/reports')}
            style={{
              maxWidth: '300px',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>

        {/* ── LEADS GENERATION TILE ── */}
        <div style={{ textAlign: 'center' }}>
          <img
            src="/LeadsGeneration.png"
            alt="Leads Generation"
            style={{
              maxWidth: '300px',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              marginBottom: '15px',
            }}
            onClick={() => navigate('/createlead')}
          />
          <button
            onClick={() => navigate('/createlead')}
            style={{
              background: 'linear-gradient(to right, #5BD40A, #E100FF)',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            🚀 Go to Leads Generation
          </button>
        </div>
        {/* ── MANAGE LEADS TILE ── */}
        <div style={{ textAlign: 'center' }}>
          <img
            src="/lead_manager.png"               // make sure this exactly matches your file in public/
            alt="Lead Manager"
            onClick={() => navigate('/lead-manager')}
            style={{
              maxWidth: '300px',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>

      </div>
    </div>
  );
}
