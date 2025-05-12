// src/pages/LeadManager.jsx
import React, { useState, useEffect, useCallback } from 'react';

export default function LeadManager() {
  const [leads, setLeads]               = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [search, setSearch]             = useState('');
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [tempStatuses, setTempStatuses] = useState({});

  const statuses = [
    'New',
    'Contacted',
    'In Progress',
    'Converted',
    'Disqualified'
  ];

  // format phone: 0505842069 → 050-5842069
  const formatPhone = phone =>
    phone && phone.length > 3
      ? `${phone.slice(0, 3)}-${phone.slice(3)}`
      : phone;

  // fetch leads
  const loadLeads = useCallback(async () => {
    try {
      const res = await fetch('/leads/getall');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setLeads(await res.json());
    } catch (err) {
      console.error(err);
    }
  }, []);

  // on mount + poll every 5s
  useEffect(() => {
    loadLeads();
    const iv = setInterval(loadLeads, 5000);
    return () => clearInterval(iv);
  }, [loadLeads]);

  // apply search filter
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      leads.filter(
        l =>
          (l.full_name || '').toLowerCase().includes(q) ||
          (l.email     || '').toLowerCase().includes(q)
      )
    );
  }, [leads, search]);

  // toggle global edit-mode
  const toggleEditAll = () => {
    if (isEditingAll) {
      setTempStatuses({});
      setIsEditingAll(false);
    } else {
      setTempStatuses(Object.fromEntries(leads.map(l => [l.email, l.status])));
      setIsEditingAll(true);
    }
  };

  // track a change in the dropdown
  const onTempChange = (email, status) =>
    setTempStatuses(prev => ({ ...prev, [email]: status }));

  // save all changed statuses
  const onSaveAll = async () => {
    const updates = leads
      .filter(l => tempStatuses[l.email] && tempStatuses[l.email] !== l.status)
      .map(l => ({ email: l.email, status: tempStatuses[l.email] }));

    try {
      await Promise.all(
        updates.map(u =>
          fetch('/leads/status', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(u),
          })
        )
      );
      await loadLeads();
      setIsEditingAll(false);
      setTempStatuses({});
    } catch (err) {
      console.error(err);
    }
  };

  // inline style map (colors unchanged from before)
  const S = {
    page: { padding: 20, fontFamily: 'Arial, sans-serif' },
    header: { marginBottom: 16 },
    toolbar: { display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' },
    input: {
      padding: '8px 12px',
      borderRadius: 6,
      border: '1px solid #ccc',
      flexGrow: 1,
      minWidth: 200
    },
    editAllBtn: {
      padding: '8px 12px',
      borderRadius: 6,
      border: 'none',
      backgroundColor: '#2196F3',  // same blue as editBtn before
      color: '#fff',
      cursor: 'pointer'
    },
    saveAllBtn: {
      padding: '8px 12px',
      borderRadius: 6,
      border: 'none',
      backgroundColor: '#4CAF50',  // same green as saveBtn before
      color: '#fff',
      cursor: 'pointer'
    },
    tableWrapper: {
      overflowX: 'auto',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: {
      textAlign: 'left',
      padding: '10px',
      borderBottom: '2px solid #ddd',
      backgroundColor: '#f0f0f0',
      color: '#000'
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #eee',
      backgroundColor: '#fff',
      color: '#000'
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: 12,
      backgroundColor: '#ddd',
      color: '#333',
      fontWeight: 'bold',
      fontSize: '0.9em',
      display: 'inline-block'
    },
    select: {
      padding: '4px 8px',
      borderRadius: 4,
      border: '1px solid #ccc'
    }
  };

  return (
    <div style={S.page}>
      <h2 style={S.header}>Lead Manager</h2>
      <div style={S.toolbar}>
        <input
          type="text"
          placeholder="Search name or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={S.input}
        />
        <button onClick={toggleEditAll} style={S.editAllBtn}>
          {isEditingAll ? 'Cancel' : 'Update Status'}
        </button>
        {isEditingAll && (
          <button onClick={onSaveAll} style={S.saveAllBtn}>
            Save
          </button>
        )}
      </div>

      <div style={S.tableWrapper}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Name</th>
              <th style={S.th}>Email</th>
              <th style={S.th}>Phone</th>
              <th style={S.th}>Submitted</th>
              <th style={S.th}>Product interest</th>
              <th style={S.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.email}>
                <td style={S.td}>{l.full_name}</td>
                <td style={S.td}>{l.email}</td>
                <td style={S.td}>{formatPhone(l.phone)}</td>
                <td style={S.td}>
                  {new Date(l.submission_date).toLocaleDateString()}
                </td>
                <td style={S.td}>{l.product_interest || '—'}</td>
                <td style={S.td}>
                  {isEditingAll ? (
                    <select
                      value={tempStatuses[l.email]}
                      onChange={e => onTempChange(l.email, e.target.value)}
                      style={S.select}
                    >
                      {statuses.map(s => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  ) : (
                    <span style={S.statusBadge}>{l.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
