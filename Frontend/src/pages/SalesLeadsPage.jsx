import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { StoreContext } from '../store/StoreContext';

export default function SalesLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [isPersonalView, setIsPersonalView] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const { user } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllLeads();
  }, []);

  const fetchAllLeads = async () => {
    try {
      const res = await api.get('sales/getAllLeads');
      setLeads(res.data);
      setIsPersonalView(false);
      setShowActiveOnly(false);
    } catch (error) {
      console.error('Failed to fetch all leads:', error);
    }
  };

  const fetchMyLeads = async () => {
    try {
      const res = await api.get(`sales/getMyLeads/${user.email}`);
      setLeads(res.data);
      setIsPersonalView(true);
      setShowActiveOnly(false);
    } catch (error) {
      console.error('Failed to fetch my leads:', error);
    }
  };

  const showActiveLeads = async () => {
    try {
      const res = await api.get('sales/getAllLeads');
      const activeLeads = res.data.filter((lead) => {
        const status = lead.status?.toLowerCase();
        return status !== 'done' && status !== 'canceled';
      });
      setLeads(activeLeads);
      setIsPersonalView(false);
      setShowActiveOnly(true);
    } catch (error) {
      console.error('Failed to fetch active leads:', error);
    }
  };

  const assignLeadToMe = async (leadId) => {
    if (!user?.email) {
      alert('You must be logged in to assign leads');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('sales/assignLead', {
        leadId,
        email: user.email
      });

      if (res.data.success) {
        setLeads(leads.map(lead =>
          lead.lead_id === leadId
            ? { ...lead, rep_mail: user.email }
            : lead
        ));
        alert('Lead assigned successfully!');
      } else {
        alert('Failed to assign lead');
      }
    } catch (error) {
      console.error('Error assigning lead:', error);
      alert('Error assigning lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check if a lead is "new" and older than 3 days
  const isNewAndOld = (lead) => {
    if (lead.status?.toLowerCase() !== 'new') return false;
    const applicationDate = new Date(lead.application_date);
    const now = new Date();
    const diffDays = (now - applicationDate) / (1000 * 60 * 60 * 24);
    return diffDays > 3;
  };

  // Filter and sort leads so that "new and old" leads come first
  const filteredLeads = (showActiveOnly
    ? leads.filter((lead) => {
        const status = lead.status?.toLowerCase();
        return status !== 'done' && status !== 'canceled';
      })
    : leads
  ).sort((a, b) => {
    const aOld = isNewAndOld(a);
    const bOld = isNewAndOld(b);
    return bOld - aOld; // true > false
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={fetchAllLeads}
          style={buttonStyle('#007bff', 'white')}
        >
          all the leads
        </button>

        <button
          onClick={fetchMyLeads}
          style={buttonStyle('#28a745', 'white')}
        >
          my leads
        </button>

        <button
          onClick={showActiveLeads}
          style={buttonStyle('#ffc107', 'black')}
        >
          active leads
        </button>
      </div>

      {isPersonalView && filteredLeads.length === 0 ? (
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.lead_id}
                style={{
                  backgroundColor: isNewAndOld(lead) ? 'red' : 'transparent'
                }}
              >
                <td>{lead.lead_id}</td>
                <td>{lead.contact_number}</td>
                <td>{lead.status}</td>
                <td>{lead.rep_mail}</td>
                <td>{lead.application_date}</td>
                <td>{lead.closing_date ?? '-'}</td>
                <td>
                  {!lead.rep_mail && (
                    <button
                      onClick={() => assignLeadToMe(lead.lead_id)}
                      disabled={loading}
                      style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '3px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                      }}
                    >
                      {loading ? 'Assigning...' : 'Assign to me'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Helper style function for button reuse
function buttonStyle(bgColor, color) {
  return {
    backgroundColor: bgColor,
    color,
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    marginRight: '10px',
    cursor: 'pointer'
  };
}
