// frontend/src/App.jsx
import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import CustomerServicePage from './pages/CustomerServicePage.jsx';
import ClientPage from './pages/ClientPage.jsx'; 
import ClientRequestPage from './pages/ClientRequestPage.jsx';
import SubscriptionsPage from './pages/SubscriptionsPage.jsx';
import SupportHistoryPage from './pages/SupportHistoryPage.jsx';
import ManageRequestsPage from './pages/ManageRequestsPage.jsx';
import RespondPage from './pages/RespondRequestPage.jsx';

import { StoreProvider, StoreContext } from './store/StoreContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';

function Navbar() {
  const { user, signOut } = useContext(StoreContext);
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  function signUserOut() {
    signOut();
    navigate('/signin');
  }

  const userInitial = user && (user.firstName?.[0] || user.email?.[0]);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:4001/support-requests/unread')
        .then((res) => res.json())
        .then((data) => {
          setUnreadCount(data.length);
        })
        .catch((err) => {
          console.error('Failed to load notifications:', err);
        });
    }
  }, [user]);

  return (
    <div className='navbar'>
      <div className='nav-left'>
        <img
          className='university-icon'
          src='https://www.sce.ac.il/ver/14/tpl/website/img/SamiSH-logo_2.png'
          alt='University Icon'
        />
      </div>

      <div className='nav-right'>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          {!user
            ? <Link to='/signin'>Sign In</Link>
            : <a onClick={signUserOut}>Sign Out</a>
          }
          <Link to='/signup'>Sign Up</Link>
          <Link to='/products'>Products</Link>
          <Link to='/subscriptions'>Subscriptions</Link>
          {user && <Link to='/client'>Client Portal</Link>}
          {user && <Link to='/support-history'>My Requests</Link>}
          {user && <Link to='/manage-requests'>Manage Requests</Link>}
        </div>

        {user && (
  <>
    {/* פעמון התראה רק ללקוח */}
    {user.role === 'client' && (
      <div
        className='notification-bell'
        onClick={() => navigate('/support-history')}
        title="View notifications"
        style={{ fontSize: '24px', cursor: 'pointer', marginRight: '10px' }}
      >
        🔔
        {unreadCount > 0 && (
          <span className='notification-badge'>{unreadCount}</span>
        )}
      </div>
    )}
    <div className='user-circle'>{userInitial}</div>
  </>
)}

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
            <Route path='/' element={<HomePage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/reports' element={<ReportsPage />} />
            <Route
              path='/products'
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            <Route path='/subscriptions' element={<SubscriptionsPage />} />
            <Route path='/client' element={<ClientPage />} />
            <Route path='/client-request' element={<ClientRequestPage />} />
            <Route path='/support-history' element={<SupportHistoryPage />} />
            <Route path='/customer-service' element={<CustomerServicePage />} />
            <Route path='/manage-requests' element={<ManageRequestsPage />} />
            <Route path='/respond/:id' element={<RespondPage />} />
            <Route path='/support-requests/:id/respond' element={<RespondPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
