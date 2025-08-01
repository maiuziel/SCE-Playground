// frontend/src/App.jsx
import React, { useContext } from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import SalesPage from './pages/SalesPage.jsx';
import SalesConverstaionPage from './pages/SalesConverstaionPage.jsx';
import SalesSearchHistoryPage from './pages/SalesSearchHistoryPage.jsx';
import SalesForecastPage from './pages/SalesForecastPage.jsx';
import SalesRevenuePage from './pages/SalesRevenuePage.jsx';
import TechSupportPage from './pages/TechSupportPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import CustomerServicePage from './pages/CustomerServicePage.jsx';
import ClientPage from './pages/ClientPage.jsx'; 
import ClientRequestPage from './pages/ClientRequestPage.jsx';
import SubscriptionsPage from './pages/SubscriptionsPage.jsx';
import SupportHistoryPage from './pages/SupportHistoryPage.jsx';
import ManageRequestsPage from './pages/ManageRequestsPage.jsx';
import RespondPage from './pages/RespondRequestPage.jsx';
import FeedbackPage from './pages/FeedbackPage.jsx';

import { StoreProvider, StoreContext } from './store/StoreContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProductsAdminRoute from './components/ProductsAdminRoute';
import './App.css';
import SalesLeadsPage from  './pages/SalesLeadsPage.jsx';


import TechSupport from './pages/TechSupportPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import EditProductPage from './pages/UpdateProductPage.jsx';
import LeadsPage from './pages/LeadsPage.jsx';
import LeadsGeneration from './pages/LeadsGeneration.jsx';
import LeadManager from './pages/LeadManager.jsx';
import FinanceModulePage from './pages/FinanceModulePage.jsx';
import CreateTransactionPage from './pages/CreateTransactionPage.jsx';
import ViewTransactionsPage from './pages/ViewTransactionsPage.jsx';
import ManagementPage from './pages/ManagementPage.jsx';
import MonthlyReportPage from './pages/MonthlyReportPage.jsx';
import UpdateStatusPage from './pages/UpdateStatusPage.jsx';

function Navbar() {
  const { user, signOut, isLoading, isValidating } = useContext(StoreContext);

  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  function signUserOut() {
    signOut();
    navigate('/signin');
  }

  const userInitial =
    user && user.firstName
      ? user.firstName[0]
      : user && user.email
      ? user.email[0]
      : null;

  // While loading/validating, you can show a spinner or skeleton here
  if (isLoading || isValidating) {
    return (
      <div className="navbar">
        <div className="nav-left">
          <img
            className="university-icon"
            src="https://www.sce.ac.il/ver/14/tpl/website/img/SamiSH-logo_2.png"
            alt="University Icon"
          />
        </div>
        <div className="nav-right">Loading...</div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="nav-left">
        <img
          className="university-icon"
          src="https://www.sce.ac.il/ver/14/tpl/website/img/SamiSH-logo_2.png"
          alt="University Icon"
        />
      </div>

      <div className="nav-right">
        <div className="nav-links">
          <Link to="/">Home</Link>

          {!user ? (
            <>
              <Link to="/signin">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/products">Products</Link>
              <Link to="/createlead">Leads Generation</Link>
            </>
          ) : (
            <>
              <a onClick={signUserOut}>Sign Out</a>
              <Link to="/products">Products</Link>
              <Link to="/subscriptions">Subscriptions</Link>
              <Link to="/client">Client Portal</Link>
              <Link to="/support-history">My Requests</Link>
              <Link to="/manage-requests">Manage Requests</Link>
            </>
          )}
        </div>

        {/* If logged in, show user circle */}
        {user && <div className="user-circle">{userInitial}</div>}
      </div>
    </div>
  );
}


export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Navbar />

        <div style={{ backgroundImage: 'url(/background.png)' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductPage />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path='/reports' element={<ReportsPage />} />
            <Route path='/sales' element={<SalesPage />} />
            <Route path='/reports' element={<ReportsPage />} />
            <Route path='/salesConverstaion' element={<SalesConverstaionPage />} />
            <Route path='/salesSearchHistory' element={<SalesSearchHistoryPage />}/>
            <Route path='/SalesLeadsPage' element={<SalesLeadsPage />}/>
            <Route path='/SalesForecastPage' element={<SalesForecastPage/>}/>
            <Route path='/SalesRevenuePage' element={<SalesRevenuePage/>}/>

            <Route path="/createlead" element={<LeadsGeneration />} />
            <Route path="/lead-manager" element={<LeadManager />} />
              
            <Route
              path='/techsupport'
              element={
                <ProtectedRoute>
                  <TechSupport />
                </ProtectedRoute>
              }
            />
                
            <Route
              path="/products/update-product/:id"
              element={
                <ProductsAdminRoute>
                  <EditProductPage />
                </ProductsAdminRoute>
              }
            />

            <Route
              path="/products/:id/leads"
              element={
                <ProductsAdminRoute>
                  <LeadsPage />
                </ProductsAdminRoute>
              }
            />
            <Route
              path="/finance-module"
              element={
                <ProtectedRoute>
                  <FinanceModulePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/finance/create"
              element={
                <ProtectedRoute>
                  <CreateTransactionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/finance-module/view"
              element={
                <ProtectedRoute>
                  <ViewTransactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/finance/management"
              element={
                <ProtectedRoute>
                  <ManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/finance/management/monthly"
              element={
                <ProtectedRoute>
                  <MonthlyReportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-status"
              element={
                <ProtectedRoute>
                  <UpdateStatusPage />
                </ProtectedRoute>
              }
              
            />
            <Route
              path='/products'
              element={
                <ProtectedRoute>
                  <ProductsPage />
                  </ProtectedRoute>
            }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </StoreProvider>

    
  );


}
