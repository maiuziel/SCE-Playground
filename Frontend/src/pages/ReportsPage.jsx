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
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyData, setYearlyData] = useState([]);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [allRepsSales, setAllRepsSales] = useState([]);
  const [showAllReps, setShowAllReps] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    const fetchRepresentatives = async () => {
      try {
        const res = await api.get('/sales/representatives');
        setRepresentatives(res.data);
      } catch (error) {
        console.error('Failed to fetch representatives:', error);
      }
    };
    fetchRepresentatives();
  }, []);

  const handleRepSelection = async (email) => {
    setSelectedRep(email);
    setMonthlyData([]);
    setMonthlyTotal(0);
    setYearlyData([]);
    setYearlyTotal(0);
    setShowAllReps(false);
    setShowCharts(false);

    if (!email) {
      setSalesData([]);
      setTotalSales(0);
      return;
    }

    setLoading(true);
    try {
      const salesRes = await api.get(`/sales/reportByRep/${email}`);
      setSalesData((salesRes.data || []).sort((a, b) => b.amount - a.amount));
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

  const handleMonthlySales = async () => {
    if (!selectedRep) return alert('Please select a representative first');
    setLoading(true);
    try {
      const res = await api.get(`/sales/reportByRepMonthly/${selectedRep}`);
      const sortedData = (res.data || []).sort((a, b) => b.amount - a.amount);
      setMonthlyData(sortedData);
      const total = sortedData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
      setMonthlyTotal(total);
      setYearlyData([]);
      setYearlyTotal(0);
      setShowCharts(false);
      setShowAllReps(false);
    } catch (error) {
      console.error('Failed to fetch monthly sales data:', error);
      alert('Failed to load monthly sales data');
      setMonthlyData([]);
      setMonthlyTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleYearlySales = async () => {
    if (!selectedRep) return alert('Please select a representative first');
    setLoading(true);
    try {
      const res = await api.get(`/sales/reportByRepYearly/${selectedRep}`);
      const sortedData = (res.data || []).sort((a, b) => b.amount - a.amount);
      setYearlyData(sortedData);
      const total = sortedData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
      setYearlyTotal(total);
      setMonthlyData([]);
      setMonthlyTotal(0);
      setShowCharts(false);
      setShowAllReps(false);
    } catch (error) {
      console.error('Failed to fetch yearly sales data:', error);
      alert('Failed to load yearly sales data');
      setYearlyData([]);
      setYearlyTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleAllRepsSales = async () => {
  setLoading(true);
  try {
    const allSales = [];

    for (const rep of representatives) {
      const email = rep.email;
      const salesRes = await api.get(`/sales/reportByRep/${email}`);
      const sales = salesRes.data || [];
      const totalAmount = sales.reduce((sum, s) => sum + parseFloat(s.amount), 0);

      allSales.push({
        name: `${rep.firstName} ${rep.lastName}`,
        email,
        total_amount: totalAmount,
        count: sales.length,
      });
    }

    setAllRepsSales(allSales.sort((a, b) => b.total_amount - a.total_amount));
    // כאן מוסיפים את הניקוי:
    setMonthlyData([]);
    setMonthlyTotal(0);
    setYearlyData([]);
    setYearlyTotal(0);
    setSalesData([]);
    setTotalSales(0);
    setSelectedRep('');
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



  const handleShowCharts = () => {
    if (!selectedRep && !showAllReps) return alert('Please select a representative or show all representatives data first');
    setShowCharts(true);
  };

  if (!user || !token) return <Navigate to='/signin' replace />;

  const renderCharts = () => (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h3>Sales Charts</h3>
      <div style={{ height: '300px', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Chart Placeholder - Integrate a charting library of your choice</p>
      </div>
    </div>
  );

  const renderTable = (title, data, total) => (
    <div>
      <h3>{title}</h3>
      <h4>Total Sales: ${total.toFixed(2)}</h4>
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
          {data.map((sale, index) => (
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

  const renderAllRepsSales = () => (
  <div>
    <h3>All Representatives Sales</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>Email</th>
          <th style={tableHeaderStyle}>Total Sales Amount</th>
          <th style={tableHeaderStyle}>Average Sale Amount</th>
        </tr>
      </thead>
      <tbody>
        {allRepsSales.map((rep, index) => (
          <tr key={index}>
            <td style={tableCellStyle}>{rep.email}</td>
            <td style={tableCellStyle}>${rep.total_amount.toFixed(2)}</td>
            <td style={tableCellStyle}>
              {rep.count > 0 ? `$${(rep.total_amount / rep.count).toFixed(2)}` : 'N/A'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);



  return (
    <div style={{ padding: '20px' }}>
      <h1>Sales Representative Reports</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="rep-select">Select a Sales Representative:</label>
        <select 
          id="rep-select"
          value={selectedRep}
          onChange={(e) => handleRepSelection(e.target.value)}
          style={{ padding: '8px', width: '300px', borderRadius: '4px' }}
        >
          <option value="">-- Select a representative --</option>
          {representatives.map(rep => (
            <option key={rep.email} value={rep.email}>
              {rep.firstName} {rep.lastName} ({rep.email})
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={handleMonthlySales} style={buttonStyle} disabled={!selectedRep || loading}>Show Monthly Sales</button>
        <button onClick={handleYearlySales} style={buttonStyle} disabled={!selectedRep || loading}>Show Yearly Sales</button>
        <button onClick={handleAllRepsSales} style={buttonStyle} disabled={loading}>Show All Representatives Sales</button>
        <button onClick={handleShowCharts} style={buttonStyle} disabled={(!selectedRep && !showAllReps) || loading}>Create Charts</button>
      </div>

      {loading ? <p>Loading data...</p> : (
        <>
          {showCharts && renderCharts()}
          {!showCharts && monthlyData.length > 0 && renderTable(`Monthly Sales for ${selectedRep}`, monthlyData, monthlyTotal)}
          {!showCharts && yearlyData.length > 0 && renderTable(`Yearly Sales for ${selectedRep}`, yearlyData, yearlyTotal)}
          {!showCharts && showAllReps && renderAllRepsSales()}
          {!showCharts && selectedRep && !showAllReps && monthlyData.length === 0 && yearlyData.length === 0 && (
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
                        <td style={tableCellStyle}>{new Date(sale.date).toLocaleDateString()}</td>
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

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};