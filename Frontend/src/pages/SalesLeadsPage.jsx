import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { StoreContext } from '../store/StoreContext';

export default function SalesLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [isPersonalView, setIsPersonalView] = useState(false);
  const { user } = useContext(StoreContext);

  useEffect(() => {
    fetchAllLeads();
  }, []);

  const fetchAllLeads = async () => {
    try {
      const res = await api.get('sales/getAllLeads');
      setLeads(res.data);
      setIsPersonalView(false);
    } catch (error) {
      console.error('Failed to fetch all leads:', error);
    }
  };

  const fetchMyLeads = async () => {
    try {
      const res = await api.get(`sales/getMyLeads/${user.email}`);
      setLeads(res.data);
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
          all the leads
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
          my leads
        </button>
      </div>

      {isPersonalView && leads.length === 0 ? (
        <p style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>
          You have no leads assigned to you.
        </p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Contact Number</th>
              <th>Status</th>
              <th>Rep Email</th>
              <th>Application Date</th>
              <th>Closing Date</th>
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
