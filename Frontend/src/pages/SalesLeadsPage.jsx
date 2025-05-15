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

  const assignLeadToMe = async (leadId, contactNumber) => {
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
        await api.put(`sales/updateLeadToInProgress/${contactNumber}`);

        setLeads(leads.map(lead =>
          lead.lead_id === leadId
            ? { ...lead, rep_mail: user.email, status: 'in progress' }
            : lead
        ));

        alert('Lead assigned and status updated!');
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

  const markLeadAsDone = async (leadId) => {
    if (!user?.email) {
      alert('You must be logged in to update leads');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/sales/updateLeadStatus', {
        leadId,
        status: 'done'
      });

      if (res.status === 200) {
        const updatedLeads = leads.map(lead =>
          lead.lead_id === leadId ? { ...lead, status: 'done' } : lead
        );
        setLeads(updatedLeads);
        alert('Lead marked as done!');
      }
    } catch (error) {
      console.error('Error updating lead status: ', error);
      alert('Error updating lead status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const unassignLead = async (leadId) => {
    setLoading(true);
    try {
      const res = await api.post('/sales/unassignLead', {
        leadId
      });

      if (res.status === 200) {
        const updatedLeads = leads.map(lead =>
          lead.lead_id === leadId ? { ...lead, rep_mail: null, status: 'new' } : lead
        );
        setLeads(updatedLeads);
        alert('Lead unassigned!');
      }
    } catch (error) {
      console.error('Error unassigning lead: ', error);
      alert('Error unassigning lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cancelLead = async (leadId) => {
    setLoading(true);
    try {
      const res = await api.post('/sales/updateLeadStatus', {
        leadId,
        status: 'canceled'
      });

      if (res.status === 200) {
        const updatedLeads = leads.map(lead =>
          lead.lead_id === leadId ? { ...lead, status: 'canceled' } : lead
        );
        setLeads(updatedLeads);
        alert('Lead canceled!');
      }
    } catch (error) {
      console.error('Error canceling lead: ', error);
      alert('Error canceling lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isNewAndOld = (lead) => {
    if (lead.status?.toLowerCase() !== 'new') return false;
    const applicationDate = new Date(lead.application_date);
    const now = new Date();
    const diffDays = (now - applicationDate) / (1000 * 60 * 60 * 24);
    return diffDays > 3;
  };

  const filteredLeads = (showActiveOnly
    ? leads.filter((lead) => {
        const status = lead.status?.toLowerCase();
        return status !== 'done' && status !== 'canceled';
      })
    : leads
  ).sort((a, b) => {
    const aOld = isNewAndOld(a);
    const bOld = isNewAndOld(b);
    return bOld - aOld;
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '15px' }}>
        <button onClick={fetchAllLeads} style={buttonStyle('#007bff', 'white')}>
          all the leads
        </button>
        <button onClick={fetchMyLeads} style={buttonStyle('#28a745', 'white')}>
          my leads
        </button>
        <button onClick={showActiveLeads} style={buttonStyle('#ffc107', 'black')}>
          active leads
        </button>
      </div>

      {isPersonalView && filteredLeads.length === 0 ? (
        <p style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>
          You have no leads assigned to you.
        </p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
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
                  backgroundColor: isNewAndOld(lead) ? 'red' : 'transparent',
                  color: isNewAndOld(lead) ? 'black' : 'inherit',
                  fontWeight: isNewAndOld(lead) ? 'bold' : 'normal',
                  height: '60px'
                }}
              >
                <td style={cellStyle}>{lead.lead_id}</td>
                <td style={cellStyle}>{lead.contact_number}</td>
                <td style={cellStyle}>{lead.status}</td>
                <td style={cellStyle}>{lead.rep_mail}</td>
                <td style={cellStyle}>{lead.application_date}</td>
                <td style={cellStyle}>{lead.closing_date ?? '-'}</td>
                <td style={{ ...cellStyle, display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {lead.status?.toLowerCase() === 'new' && (
                    <>
                      <button
                        onClick={() => assignLeadToMe(lead.lead_id, lead.contact_number)}
                        disabled={loading}
                        style={actionButtonStyle('#4CAF50')}
                      >
                        Assign
                      </button>
                      <button
                        onClick={() => cancelLead(lead.lead_id)}
                        disabled={loading}
                        style={actionButtonStyle('#dc3545')}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {lead.status?.toLowerCase() === 'in progress' && (
                    <>
                      <button
                        onClick={() => markLeadAsDone(lead.lead_id)}
                        disabled={loading}
                        style={actionButtonStyle('#17a2b8')}
                      >
                        Done
                      </button>
                      <button
                        onClick={() => unassignLead(lead.lead_id)}
                        disabled={loading}
                        style={actionButtonStyle('#ffc107')}
                      >
                        Unassign
                      </button>
                      <button
                        onClick={() => cancelLead(lead.lead_id)}
                        disabled={loading}
                        style={actionButtonStyle('#dc3545')}
                      >
                        Cancel
                      </button>
                    </>
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

const actionButtonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  fontSize: '14px',
  cursor: 'pointer'
});

const cellStyle = {
  textAlign: 'center',
  padding: '12px',
  fontSize: '16px'
};
