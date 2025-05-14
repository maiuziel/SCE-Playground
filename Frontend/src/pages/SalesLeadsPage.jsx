// SalesLeadsPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { StoreContext } from '../store/StoreContext';

export default function SalesLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [isPersonalView, setIsPersonalView] = useState(false);
  const { user } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllLeads();
  }, []);

  // Function to check if a date is older than 3 days
  const isOlderThan3Days = (dateString) => {
    if (!dateString) return false;
    const leadDate = new Date(dateString);
    const today = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);
    return leadDate < threeDaysAgo; // Check if the date is OLDER than 3 days ago
  };

  // Function to process and sort leads
  const processLeads = (leadsData) => {
    return [...leadsData].sort((a, b) => {
      // First sort criterion: Older leads (more than 3 days) come first
      const aIsOld = isOlderThan3Days(a.application_date);
      const bIsOld = isOlderThan3Days(b.application_date);
      
      if (aIsOld && !bIsOld) return -1; // Older leads come first
      if (!aIsOld && bIsOld) return 1;
      
      // Second sort criterion: Sort by application date (newest first)
      if (a.application_date && b.application_date) {
        return new Date(b.application_date) - new Date(a.application_date);
      }
      
      return 0;
    });
  };

  // Fetch all leads
  const fetchAllLeads = async () => {
    try {
      const res = await api.get('/sales/getAllLeads');
      const processedLeads = processLeads(res.data);
      setLeads(processedLeads);
      setIsPersonalView(false);
    } catch (error) {
      console.error('Failed to fetch all leads:', error);
    }
  };

  // Fetch leads assigned to the current user
  const fetchMyLeads = async () => {
    try {
      const res = await api.get(`/sales/getMyLeads/${user.email}`);
      const processedLeads = processLeads(res.data);
      setLeads(processedLeads);
      setIsPersonalView(true);
    } catch (error) {
      console.error('Failed to fetch my leads:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={fetchAllLeads}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Show all leads
        </button>

        <button
          onClick={fetchMyLeads}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Show my leads
        </button>
      </div>

      {isPersonalView && leads.length === 0 ? (
        <p style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>
          You have no leads assigned to you.
        </p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Lead ID</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Contact Number</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Rep Email</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Application Date</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Closing Date</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.lead_id}>
                <td>{lead.lead_id}</td>
                <td>{lead.contact_number}</td>
                <td>{lead.status}</td>
                <td>{lead.rep_mail}</td>
                <td>{lead.application_date}</td>
                <td>{lead.closing_date ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}