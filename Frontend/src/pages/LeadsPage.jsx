// Frontend/src/pages/LeadsPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../store/StoreContext';

export default function LeadsPage() {
  const navigate = useNavigate();
  const { user, token } = useContext(StoreContext);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // If user is not logged in, redirect to /signin
  if (!user || !token) {
    return <Navigate to='/signin' replace />;
  }

  useEffect(() => {
    async function fetchLeads() {
      try {
        // Replace with your actual API endpoint for leads
        const response = await api.get('sales/leads');
        setLeads(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch leads:', err);
        setError('Failed to load leads. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchLeads();
  }, []);

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className='leads-container'>
      <h1>New Leads</h1>
      
      {leads.length === 0 ? (
        <p>No leads available at this time.</p>
      ) : (
        <div className="leads-list">
          {leads.map(lead => (
            <div key={lead.id} className="lead-card">
              <h3>{lead.firstName} {lead.lastName}</h3>
              <p>Email: {lead.email}</p>
              <p>Date Added: {new Date(lead.createdAt).toLocaleDateString()}</p>
              {lead.notes && <p>Notes: {lead.notes}</p>}
              <button onClick={() => navigate(`/leads/${lead.id}`)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
