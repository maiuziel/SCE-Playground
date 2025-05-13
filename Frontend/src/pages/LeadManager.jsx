// src/pages/LeadManager.jsx
import React, { useState, useEffect, useCallback } from 'react';

export default function LeadManager() {
  const [leads, setLeads]               = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [search, setSearch]             = useState('');
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [tempStatuses, setTempStatuses] = useState({});
  const [toDelete, setToDelete]         = useState(new Set());
  const [successMsg, setSuccessMsg]     = useState('');

  const statuses = ['New','Contacted','Converted','Disqualified'];

  const formatPhone = phone =>
    phone && phone.length > 3
      ? `${phone.slice(0,3)}-${phone.slice(3)}`
      : phone;

  const loadLeads = useCallback(async () => {
    try {
      const res = await fetch('/leads/getall');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setLeads(await res.json());
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadLeads();
    const iv = setInterval(loadLeads, 60000);
    return () => clearInterval(iv);
  }, [loadLeads]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      leads.filter(l =>
        (l.full_name  || '').toLowerCase().includes(q) ||
        (l.email      || '').toLowerCase().includes(q) ||
        (l.phone      || '').toLowerCase().includes(q)
      )
    );
  }, [leads, search]);

  const toggleEditAll = () => {
    if (isEditingAll) {
      setTempStatuses({});
      setToDelete(new Set());
      setSuccessMsg('');
      setIsEditingAll(false);
    } else {
      setTempStatuses(Object.fromEntries(leads.map(l => [l.email, l.status])));
      setToDelete(new Set());
      setIsEditingAll(true);
    }
  };

  const onTempChange = (email, status) =>
    setTempStatuses(prev => ({ ...prev, [email]: status }));

  const toggleDelete = email => {
    setToDelete(prev => {
      const next = new Set(prev);
      next.has(email) ? next.delete(email) : next.add(email);
      return next;
    });
  };

  const onSaveAll = async () => {
    try {
      if (toDelete.size) {
        await Promise.all(
          Array.from(toDelete).map(email =>
            fetch('/leads/delete', {
              method:'DELETE',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({ emails:[email] })
            })
          )
        );
      }
      const updates = leads
        .filter(l => tempStatuses[l.email] && tempStatuses[l.email] !== l.status)
        .map(l => ({ email:l.email, status:tempStatuses[l.email] }));
      if (updates.length) {
        await Promise.all(
          updates.map(u =>
            fetch('/leads/status',{ 
              method:'PUT',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify(u)
            })
          )
        );
      }
      await loadLeads();
      setTempStatuses({});
      setToDelete(new Set());
      setIsEditingAll(false);
      setSuccessMsg('Status updated!');
    } catch (err) {
      console.error(err);
    }
  };

  const S = {
    page:           { padding:20, fontFamily:'Arial, sans-serif' },
    header:         { marginBottom:16 },
    toolbar:        { display:'flex', gap:12, marginBottom:16, alignItems:'center' },
    input:          { padding:'8px 12px', borderRadius:6, border:'1px solid #ccc', flexGrow:1, minWidth:200 },
    editAllBtn:     { padding:'8px 12px', borderRadius:6, border:'none', backgroundColor:'#2196F3', color:'#fff', cursor:'pointer' },
    saveAllBtn:     { padding:'8px 12px', borderRadius:6, border:'none', backgroundColor:'#4CAF50', color:'#fff', cursor:'pointer' },
    tableWrap:      { width:'100%', overflowX:'auto', backgroundColor:'#fff', borderRadius:8, padding:16, boxShadow:'0 2px 8px rgba(0,0,0,0.1)' },
    table:          { width:'100%', borderCollapse:'collapse', tableLayout:'fixed' },
    numCol:         { width:'5%', textAlign:'center', padding:'10px', borderBottom:'2px solid #ddd', backgroundColor:'#f0f0f0', color:'#000' },
    th:             { textAlign:'left', padding:'10px', borderBottom:'2px solid #ddd', backgroundColor:'#f0f0f0', color:'#000' },
    td:             { padding:'10px', borderBottom:'1px solid #eee', backgroundColor:'#fff', color:'#000', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' },
    statusBadge:    { padding:'4px 8px', borderRadius:12, backgroundColor:'#ddd', color:'#333', fontWeight:'bold', fontSize:'0.9em', display:'inline-block' },
    select:         { padding:'4px 8px', borderRadius:4, border:'1px solid #ccc' },
    deleteBtn:      { marginLeft:8, padding:'4px 8px', borderRadius:4, border:'none', backgroundColor:'#F44336', color:'#fff', cursor:'pointer' },
    deletePlaceholder:{ visibility:'hidden', marginLeft:8, padding:'4px 8px', borderRadius:4, border:'none', backgroundColor:'#F44336', color:'#fff' },
    successMsg:     { color:'#4CAF50', marginBottom:12, fontWeight:'bold' }
  };

  return (
    <div style={S.page}>
      <h2 style={S.header}>Lead Manager</h2>
      <div style={S.toolbar}>
        <input
          type="text"
          placeholder="Search name, email or phone…"
          value={search}
          onChange={e=>setSearch(e.target.value)}
          style={S.input}
        />
        <button onClick={toggleEditAll} style={S.editAllBtn}>
          {isEditingAll ? 'Cancel' : 'Update Status'}
        </button>
        {isEditingAll && (
          <button onClick={onSaveAll} style={S.saveAllBtn}>Save</button>
        )}
      </div>

      {successMsg && <div style={S.successMsg}>{successMsg}</div>}

      <div style={S.tableWrap}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.numCol}>#</th>
              <th style={S.th}>Name</th>
              <th style={S.th}>Email</th>
              <th style={S.th}>Phone</th>
              <th style={S.th}>Submitted</th>
              <th style={S.th}>Product interest</th>
              <th style={S.th}>Lead source</th>
              <th style={S.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered
              .filter(l => !(isEditingAll && toDelete.has(l.email)))
              .map((l,i) => (
                <tr key={l.email}>
                  <td style={S.numCol}>{i+1}</td>
                  <td style={S.td}>{l.full_name}</td>
                  <td style={S.td}>{l.email}</td>
                  <td style={S.td}>{formatPhone(l.phone)}</td>
                  <td style={S.td}>{new Date(l.submission_date).toLocaleDateString()}</td>
                  <td style={S.td}>{l.product_interest||'—'}</td>
                  <td style={S.td}>{l.lead_source||'—'}</td>
                  <td style={S.td}>
                    <div style={{ display:'flex', alignItems:'center' }}>
                      {isEditingAll ? (
                        <>
                          <select
                            value={tempStatuses[l.email]}
                            onChange={e=>onTempChange(l.email,e.target.value)}
                            style={S.select}
                          >
                            {statuses.map(s=><option key={s}>{s}</option>)}
                          </select>
                          <button
                            onClick={()=>toggleDelete(l.email)}
                            style={S.deleteBtn}
                          >Delete</button>
                        </>
                      ) : (
                        <>
                          <span style={S.statusBadge}>{l.status}</span>
                          <button style={S.deletePlaceholder}>Delete</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
