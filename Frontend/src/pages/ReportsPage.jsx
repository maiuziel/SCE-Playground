import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../store/StoreContext';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

export default function ReportsPage() {
  const { user, token } = useContext(StoreContext);
  const [representatives, setRepresentatives] = useState([]);
  const [selectedRep, setSelectedRep] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [allRepsSales, setAllRepsSales] = useState([]);
  const [showAllReps, setShowAllReps] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

  // Fetch the list of sales representatives when the page loads
  useEffect(() => {
    const fetchRepresentatives = async () => {
      try {
        // You'll need to create this endpoint in your backend
        const res = await api.get('/sales/representatives');
        setRepresentatives(res.data);
      } catch (error) {
        console.error('Failed to fetch representatives:', error);
      }
    };

    fetchRepresentatives();
  }, []);

  // Fetch sales data when a representative is selected
  const handleRepSelection = async (email) => {
    setSelectedRep(email);

    setMonthlyData([]);
    setShowAllReps(false);
    setShowCharts(false);


    if (!email) {
      setSalesData([]);
      setTotalSales(0);
      return;
    }

    setLoading(true);
    try {
      // Fetch sales data for the selected representative
      const salesRes = await api.get(`/sales/reportByRep/${email}`);
      setSalesData(salesRes.data || []);
      
      // Fetch total sales amount
      const totalRes = await api.get(`/sales/totalSalesByRep/${email}`);
      setTotalSales(parseFloat(totalRes.data?.sum || 0));
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
      setSalesData([]);
      setTotalSales(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sales data by month for the selected representative
  const handleMonthlySales = async () => {
    if (!selectedRep) {
      alert('Please select a representative first');
      return;
    }

    setLoading(true);
    try {
      // This would require a new endpoint in your backend
      const res = await api.get(`/sales/reportByRepMonthly/${selectedRep}`);
      setMonthlyData(res.data || []);
      setShowCharts(false);
      setShowAllReps(false);
    } catch (error) {
      console.error('Failed to fetch monthly sales data:', error);
      alert('Failed to load monthly sales data');
      setMonthlyData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sales data for all representatives
  const handleAllRepsSales = async () => {
    setLoading(true);
    try {
      // You'll need to create this endpoint in your backend
      const res = await api.get('/sales/allRepresentativesSales');
      setAllRepsSales(res.data || []);
      setShowAllReps(true);
      setShowCharts(false);
    } catch (error) {
      console.error('Failed to fetch all representatives sales:', error);
      alert('Failed to load all representatives sales');
      setAllRepsSales([]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle charts view
  const handleShowCharts = () => {
    if (!selectedRep && !showAllReps) {
      alert('Please select a representative or show all representatives data first');
      return;
    }
    setShowCharts(true);
  };

  // If user is not logged in, redirect to /signin
  if (!user || !token) return <Navigate to='/signin' replace />;

  // Function to render charts (placeholder)
  const renderCharts = () => {
    // This would be where you'd integrate a charting library like Chart.js or Recharts
    return (
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Sales Charts</h3>
        <p>Charts would be displayed here using a charting library.</p>
        <div style={{ height: '300px', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Chart Placeholder - Integrate a charting library of your choice</p>
        </div>
      </div>
    );
  };

  // Function to render monthly sales data
  const renderMonthlySales = () => {
  if (monthlyData.length === 0) {
    return <p>No monthly sales data available for this representative.</p>;
  }

  return (
    <div>
      <h3>Monthly Sales for {selectedRep}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Sale ID</th>
            <th style={tableHeaderStyle}>Product</th>
            <th style={tableHeaderStyle}>Amount</th>
            <th style={tableHeaderStyle}>Customer ID</th>
            <th style={tableHeaderStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {monthlyData.map((sale, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{sale.id}</td>
              <td style={tableCellStyle}>{sale.product}</td>
              <td style={tableCellStyle}>${parseFloat(sale.amount).toFixed(2)}</td>
              <td style={tableCellStyle}>{sale.customer_id}</td>
              <td style={tableCellStyle}>{new Date(sale.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


  // Function to render all representatives sales
  const renderAllRepsSales = () => {
    if (allRepsSales.length === 0) {
      return <p>No sales data available for all representatives.</p>;
    }

    return (
      <div>
        <h3>All Representatives Sales</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Representative</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Total Sales</th>
              <th style={tableHeaderStyle}>Number of Sales</th>
            </tr>
          </thead>
          <tbody>
            {allRepsSales.map((rep, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>{rep.name || rep.email}</td>
                <td style={tableCellStyle}>{rep.email}</td>
                <td style={tableCellStyle}>${parseFloat(rep.total_amount).toFixed(2)}</td>
                <td style={tableCellStyle}>{rep.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sales Representative Reports</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="rep-select" style={{ display: 'block', marginBottom: '8px' }}>
          Select a Sales Representative:
        </label>
        <select 
          id="rep-select"
          value={selectedRep}
          onChange={(e) => handleRepSelection(e.target.value)}
          style={{ 
            padding: '8px', 
            width: '300px',
            borderRadius: '4px'
          }}
        >
          <option value="">-- Select a representative --</option>
          {representatives.map(rep => (
            <option key={rep.email} value={rep.email}>
              {rep.firstName} {rep.lastName} ({rep.email})
            </option>
          ))}
        </select>
      </div>

      {/* New buttons for additional functionality */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={handleMonthlySales}
          style={buttonStyle}
          disabled={!selectedRep || loading}
        >
          Show Monthly Sales
        </button>
        <button 
          onClick={handleAllRepsSales}
          style={buttonStyle}
          disabled={loading}
        >
          Show All Representatives Sales
        </button>
        <button 
          onClick={handleShowCharts}
          style={buttonStyle}
          disabled={(!selectedRep && !showAllReps) || loading}
        >
          Create Charts
        </button>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {/* Display different views based on user selection */}
          {showCharts && renderCharts()}
          
          {monthlyData.length > 0 && !showCharts && !showAllReps && renderMonthlySales()}
          
          {showAllReps && !showCharts && renderAllRepsSales()}
          
          {/* Original individual sales view */}
          {selectedRep && !showCharts && !showAllReps && monthlyData.length === 0 && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <h2>Sales Summary for {selectedRep}</h2>
                <h3>Total Sales: ${totalSales.toFixed(2)}</h3>
              </div>

              <h3>Individual Sales</h3>
              {salesData.length === 0 ? (
                <p>No sales found for this representative.</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={tableHeaderStyle}>Sale ID</th>
                      <th style={tableHeaderStyle}>Customer ID</th>
                      <th style={tableHeaderStyle}>Product</th>
                      <th style={tableHeaderStyle}>Amount</th>
                      <th style={tableHeaderStyle}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map(sale => (
                      <tr key={sale.id}>
                        <td style={tableCellStyle}>{sale.id}</td>
                        <td style={tableCellStyle}>{sale.customer_id}</td>
                        <td style={tableCellStyle}>{sale.product}</td>
                        <td style={tableCellStyle}>${parseFloat(sale.amount).toFixed(2)}</td>
                        <td style={tableCellStyle}>
                          {new Date(sale.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// Styles
const tableHeaderStyle = {
  backgroundColor: '#f2f2f2',
  color: '#333',
  padding: '10px',
  borderBottom: '1px solid #ddd',
  textAlign: 'left'
};

const tableCellStyle = {
  padding: '8px',
  borderBottom: '1px solid #ddd'
};

// New button style
const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
};