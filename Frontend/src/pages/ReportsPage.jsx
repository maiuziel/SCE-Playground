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

  // If user is not logged in, redirect to /signin
  if (!user || !token) return <Navigate to='/signin' replace />;

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

      {loading ? (
        <p>Loading sales data...</p>
      ) : selectedRep ? (
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
      ) : (
        <p>Please select a representative to view their sales data.</p>
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
