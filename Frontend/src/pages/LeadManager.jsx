import React, { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
  TimeScale,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
  TimeScale
);

export default function LeadManager() {
  const [leads, setLeads] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    lead_source: '',
    time_period: '',
    status: '',
  });
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [tempStatuses, setTempStatuses] = useState({});
  const [toDelete, setToDelete] = useState(new Set());
  const [successMsg, setSuccessMsg] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [notesByLead, setNotesByLead] = useState({});
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [currentLeadEmail, setCurrentLeadEmail] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNoteText, setEditedNoteText] = useState('');

  const currentUser = { email: 'yakov@example.com', isAdmin: false };

  const loadLeads = useCallback(async () => {
    try {
      const res = await fetch('/leads/getall');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setLeads(await res.json());
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadNotes = useCallback(async () => {
    try {
      const res = await fetch('/leads/notes');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const all = await res.json();
      const grouped = all.reduce((acc, n) => {
        acc[n.email] = acc[n.email] || [];
        acc[n.email].push(n);
        return acc;
      }, {});
      setNotesByLead(grouped);
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
    loadNotes();
  }, [loadLeads, loadNotes]);

  useEffect(() => {
    const q = search.toLowerCase();
    const now = new Date();

    const timeFiltered = lead => {
      if (!filters.time_period) return true;
      const leadDate = new Date(lead.submission_date);
      if (filters.time_period === '7') {
        const weekAgo = new Date(); weekAgo.setDate(now.getDate() - 7);
        return leadDate >= weekAgo;
      }
      if (filters.time_period === '30') {
        const monthAgo = new Date(); monthAgo.setDate(now.getDate() - 30);
        return leadDate >= monthAgo;
      }
      return true;
    };

    setFiltered(
      leads.filter(l =>
        (
          (l.full_name || '').toLowerCase().includes(q) ||
          (l.email || '').toLowerCase().includes(q) ||
          (l.phone || '').toLowerCase().includes(q)
        ) &&
        (!filters.lead_source || l.lead_source === filters.lead_source) &&
        (!filters.status || l.status === filters.status) &&
        timeFiltered(l)
      )
    );
  }, [leads, search, filters]);

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const getSortIcon = key => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '▲▼';
  };

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
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ emails: [email] }),
            })
          )
        );
      }
      const updates = leads
        .filter(l => tempStatuses[l.email] && tempStatuses[l.email] !== l.status)
        .map(l => ({ email: l.email, status: tempStatuses[l.email] }));
      if (updates.length) {
        await Promise.all(
          updates.map(u =>
            fetch('/leads/status', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(u),
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

  const totalLeads = leads.length;
  const convertedLeads = leads.filter(l => {
    const tempStatus = tempStatuses[l.email];
    return (tempStatus || l.status) === 'Converted';
  }).length;
  const conversionRate = totalLeads
    ? ((convertedLeads / totalLeads) * 100).toFixed(1)
    : 0;

  const getCampaignPerformanceData = () => {
    const data = {};
    filtered.forEach(lead => {
      if (isEditingAll && toDelete.has(lead.email)) return;
      const date = new Date(lead.submission_date).toISOString().split('T')[0];
      const campaign = lead.campaign || 'Lead converted';
      const status = isEditingAll
        ? tempStatuses[lead.email] || lead.status
        : lead.status;
      if (status !== 'Converted') return;
      if (!data[campaign]) data[campaign] = {};
      if (!data[campaign][date]) data[campaign][date] = 0;
      data[campaign][date]++;
    });
    const allDates = new Set();
    Object.values(data).forEach(camp =>
      Object.keys(camp).forEach(d => allDates.add(d))
    );
    const sortedDates = Array.from(allDates).sort();
    const datasets = Object.entries(data).map(([campaign, campData], i) => ({
      label: campaign,
      data: sortedDates.map(d => campData[d] || 0),
      fill: false,
      borderColor: `hsl(${i * 50}, 70%, 50%)`,
      tension: 0.3,
    }));
    return { labels: sortedDates, datasets };
  };
  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: {
      x: { type: 'time', time: { unit: 'day', tooltipFormat: 'MMM dd' } },
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };
  const getConversionRateByDayData = () => {
    const dateMap = {};
    filtered.forEach(lead => {
      if (isEditingAll && toDelete.has(lead.email)) return;
      const date = new Date(lead.submission_date).toISOString().split('T')[0];
      const status = isEditingAll
        ? tempStatuses[lead.email] || lead.status
        : lead.status;
      if (status === 'Converted') {
        dateMap[date] = (dateMap[date] || 0) + 1;
      }
    });
    const labels = Object.keys(dateMap).sort();
    return {
      labels,
      datasets: [
        {
          label: 'Converted Leads',
          data: labels.map(d => dateMap[d]),
          backgroundColor: labels.map((_, i) => `hsl(${i * 35}, 70%, 60%)`),
        },
      ],
    };
  };

  const openNotes = email => {
    setCurrentLeadEmail(email);
    setNewNoteText('');
    setEditingNoteId(null);
    setEditedNoteText('');
    setShowNotesModal(true);
  };
  const closeNotes = () => setShowNotesModal(false);
  const canEdit = note => note.author === currentUser.email || currentUser.isAdmin;

  const S = {
    page: { padding: 20, fontFamily: 'Arial, sans-serif' },
    header: { marginBottom: 16 },
    dataWidget: {
      display: 'flex',
      gap: 24,
      marginBottom: 16,
      fontWeight: 'bold',
      fontSize: '1rem',
      backgroundColor: '#f9f9f9',
      padding: '12px 20px',
      borderRadius: 8,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    dataItem: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', color: '#333' },
    chartBox: { marginBottom: 32, backgroundColor: '#fff', padding: 16, borderRadius: 8 },
    chartRow: { display: 'flex', flexWrap: 'wrap', gap: 32 },
    chartColumn: { flex: 1, minWidth: 300 },
    toolbar: { display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16, alignItems: 'center' },
    input: { padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', minWidth: 200 },
    select: { padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', backgroundColor: '#fff' },
    editAllBtn: { padding: '8px 12px', borderRadius: 6, border: 'none', backgroundColor: '#2196F3', color: '#fff', cursor: 'pointer' },
    saveAllBtn: { padding: '8px 12px', borderRadius: 6, border: 'none', backgroundColor: '#4CAF50', color: '#fff', cursor: 'pointer' },
    tableWrap: { width: '100%', overflowX: 'auto', backgroundColor: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    table: { width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' },
    th: {
      textAlign: 'left',
      padding: '10px',
      borderBottom: '2px solid #ddd',
      backgroundColor: '#f0f0f0',
      color: '#000',
      cursor: 'pointer',
      userSelect: 'none'
    },
    numCol: { width: '5%', textAlign: 'center', padding: '10px', borderBottom: '2px solid #ddd', backgroundColor: '#f0f0f0', color: '#000' },
    td: { padding: '10px', borderBottom: '1px solid #eee', backgroundColor: '#fff', color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    statusBadge: { padding: '4px 8px', borderRadius: 12, backgroundColor: '#ddd', color: '#333', fontWeight: 'bold', fontSize: '0.9em', cursor: 'default' },
    notesBtn: { padding: '4px 8px', borderRadius: 12, backgroundColor: '#ddd', color: '#333', fontWeight: 'bold', fontSize: '0.9em', cursor: 'pointer', border: 'none' },
    successMsg: { color: '#4CAF50', marginBottom: 12, fontWeight: 'bold' },
    modalBackdrop: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    modal: { backgroundColor: '#fff', padding: 20, borderRadius: 8, width: '90%', maxWidth: 500, maxHeight: '80%', overflowY: 'auto' },
    deleteBtn: {marginLeft: 8,padding: '4px 8px',borderRadius: 4,border: 'none',backgroundColor: '#F44336',color: '#fff',cursor: 'pointer'},
      modalBtn: { marginTop: 8, padding: '6px 12px', borderRadius: 8, backgroundColor: '#ddd', color: '#333', fontWeight: 'bold', fontSize: '0.9em', cursor: 'pointer', border: 'none', marginRight: 8 }
  };

  let displayedRows = filtered.filter(l => !(isEditingAll && toDelete.has(l.email)));
  if (sortConfig.key) {
    displayedRows = [...displayedRows].sort((a, b) => {
      let aVal = a[sortConfig.key] ?? '';
      let bVal = b[sortConfig.key] ?? '';
      if (sortConfig.key === 'submission_date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return (
    <div style={S.page}>
      <h2 style={S.header}>Lead Manager</h2>

      <div style={S.dataWidget}>
        <div style={S.dataItem}>
          <span>Total Leads</span>
          <span>{totalLeads}</span>
        </div>
        <div style={S.dataItem}>
          <span>Conversion Rate</span>
          <span>{conversionRate}%</span>
        </div>
      </div>

      <div style={S.chartBox}>
        <h3 style={{ marginBottom: 16, color: '#333' }}>Conversion Analytics</h3>
        <div style={S.chartRow}>
          <div style={S.chartColumn}>
            <Line data={getCampaignPerformanceData()} options={chartOptions} />
          </div>
          <div style={S.chartColumn}>
            <Doughnut data={getConversionRateByDayData()} />
          </div>
        </div>
      </div>

      <div style={S.toolbar}>
        <input
          type="text"
          placeholder="Search name, email or phone…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={S.input}
        />
        <select
          style={S.select}
          value={filters.lead_source}
          onChange={e => setFilters(f => ({ ...f, lead_source: e.target.value }))}
        >
          <option value="">All Sources</option>
          {Array.from(new Set(leads.map(l => l.lead_source).filter(Boolean)))
            .sort()
            .map(src => (
              <option key={src}>{src}</option>
            ))}
        </select>
        <select
          style={S.select}
          value={filters.status}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
        >
          <option value="">All Statuses</option>
          {['New', 'Contacted', 'Converted', 'Disqualified'].map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          style={S.select}
          value={filters.time_period}
          onChange={e => setFilters(f => ({ ...f, time_period: e.target.value }))}
        >
          <option value="">Any Time</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
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
              <th style={S.th} onClick={() => requestSort('full_name')}>
                Name <span style={{ color: '#000' }}>{getSortIcon('full_name')}</span>
              </th>
              <th style={S.th} onClick={() => requestSort('email')}>
                Email <span style={{ color: '#000' }}>{getSortIcon('email')}</span>
              </th>
              <th style={S.th} onClick={() => requestSort('phone')}>
                Phone <span style={{ color: '#000' }}>{getSortIcon('phone')}</span>
              </th>
              <th style={S.th} onClick={() => requestSort('submission_date')}>
                Submitted <span style={{ color: '#000' }}>{getSortIcon('submission_date')}</span>
              </th>
              <th style={S.th} onClick={() => requestSort('product_interest')}>
                Product interest <span style={{ color: '#000' }}>{getSortIcon('product_interest')}</span>
              </th>
              <th style={S.th} onClick={() => requestSort('lead_source')}>
                Lead source <span style={{ color: '#000' }}>{getSortIcon('lead_source')}</span>
              </th>
              <th style={S.th} onClick={() => requestSort('status')}>
                Status <span style={{ color: '#000' }}>{getSortIcon('status')}</span>
              </th>
              <th style={S.th}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((l, i) => (
              <tr key={l.email}>
                <td style={S.numCol}>{i + 1}</td>
                <td style={S.td}>{l.full_name}</td>
                <td style={S.td}>{l.email}</td>
                <td style={S.td}>
                  {l.phone && l.phone.length > 3
                    ? `${l.phone.slice(0, 3)}-${l.phone.slice(3)}`
                    : l.phone}
                </td>
                <td style={S.td}>{new Date(l.submission_date).toLocaleDateString()}</td>
                <td style={S.td}>{l.product_interest || '—'}</td>
                <td style={S.td}>{l.lead_source || '—'}</td>
                <td style={S.td}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {isEditingAll ? (
                      <>
                        <select
                          value={tempStatuses[l.email]}
                          onChange={e => onTempChange(l.email, e.target.value)}
                          style={S.select}
                        >
                          {['New', 'Contacted', 'Converted', 'Disqualified'].map(s => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                        <button onClick={() => toggleDelete(l.email)} style={S.deleteBtn}>
                          Delete
                        </button>
                      </>
                    ) : (
                      <span style={S.statusBadge}>{l.status}</span>
                    )}
                  </div>
                </td>
                <td style={S.td}>
                  <button onClick={() => openNotes(l.email)} style={S.notesBtn}>
                    {(notesByLead[l.email] || []).length} note(s)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNotesModal && currentLeadEmail && (
        <div style={S.modalBackdrop}>
          <div style={S.modal}>
            <h4 style={{ color: '#000' }}>Notes for {currentLeadEmail}</h4>
            <ul>
              {(notesByLead[currentLeadEmail] || []).map(n => (
                <li key={n.id} style={{ marginBottom: 12 }}>
                  <small>
                    {new Date(n.created_at).toLocaleString()} by {n.author}
                  </small>
                  {editingNoteId === n.id ? (
                    <textarea
                      style={{ width: '100%', minHeight: 60 }}
                      value={editedNoteText}
                      onChange={e => setEditedNoteText(e.target.value)}
                    />
                  ) : (
                    <p>{n.text}</p>
                  )}
                  {canEdit(n) && (
                    editingNoteId === n.id ? (
                      <button
                        style={S.modalBtn}
                        onClick={async () => {
                          await fetch(`/leads/notes/${n.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ text: editedNoteText }),
                          });
                          await loadNotes();
                          setEditingNoteId(null);
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        style={S.modalBtn}
                        onClick={() => {
                          setEditingNoteId(n.id);
                          setEditedNoteText(n.text);
                        }}
                      >
                        Edit
                      </button>
                    )
                  )}
                </li>
              ))}
            </ul>
            <textarea
              style={{ width: '100%', minHeight: 80 }}
              placeholder="Add a new note…"
              value={newNoteText}
              onChange={e => setNewNoteText(e.target.value)}
            />
            <button
              style={S.modalBtn}
              onClick={async () => {
                await fetch('/leads/notes', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: currentLeadEmail, text: newNoteText }),
                });
                await loadNotes();
                setNewNoteText('');
              }}
            >
              Add Note
            </button>
            <button style={S.modalBtn} onClick={closeNotes}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
