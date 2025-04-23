// frontend/src/App.jsx

import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
<<<<<<< HEAD
import ReportsPage from './pages/ReportsPage.jsx';
import CustomerServicePage from './pages/CustomerServicePage.jsx';
import ClientPage from './pages/ClientPage.jsx'; 
import ClientRequestPage from './pages/ClientRequestPage.jsx';
import SubscriptionsPage from './pages/SubscriptionsPage.jsx';
import SupportHistoryPage from './pages/SupportHistoryPage.jsx';
import ManageRequestsPage from './pages/ManageRequestsPage.jsx';
import ReplyToRequestPage from './pages/ReplyToRequestPage.jsx';
import AutoStatusUpdatePage from './pages/AutoStatusUpdatePage.jsx';
import FilterByStatusPage from './pages/FilterByStatusPage.jsx';
import SearchRequestsPage from './pages/SearchRequestsPage.jsx';
import ManualStatusUpdatePage from './pages/ManualStatusUpdatePage.jsx';
import WriteReplyPage from './pages/WriteReplyPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';






import { StoreProvider, StoreContext } from './store/StoreContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';
=======
import { StoreProvider, StoreContext } from './store/StoreContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css'; // Import the new CSS
import ReportsPage from './pages/ReportsPage.jsx';
import CustomerServicePage from './pages/CustomerServicePage.jsx';
>>>>>>> d6fc473 (First commit)

function Navbar() {
  const { user, signOut } = useContext(StoreContext);
  const navigate = useNavigate();

  function signUserOut() {
    signOut();
    navigate('/signin');
  }

<<<<<<< HEAD
=======
  // If user exists, create an initial
>>>>>>> d6fc473 (First commit)
  const userInitial = user && user.firstName ? user.firstName[0] : user && user.email ? user.email[0] : null;

  return (
    <div className='navbar'>
      <div className='nav-left'>
<<<<<<< HEAD
=======
        {/* University icon (replace with your own image path or URL) */}
>>>>>>> d6fc473 (First commit)
        <img
          className='university-icon'
          src='https://www.sce.ac.il/ver/14/tpl/website/img/SamiSH-logo_2.png'
          alt='University Icon'
        />
      </div>

      <div className='nav-right'>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          {!user ? <Link to='/signin'>Sign In</Link> : <a onClick={signUserOut}>Sign out</a>}
          <Link to='/signup'>Sign Up</Link>
          <Link to='/products'>Products</Link>
        </div>
<<<<<<< HEAD
=======
        {/* If logged in, show user circle */}
>>>>>>> d6fc473 (First commit)
        {user && <div className='user-circle'>{userInitial}</div>}
      </div>
    </div>
  );
}

function App() {
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
            <Route path='/customer-service' element={<CustomerServicePage />} />
<<<<<<< HEAD
            <Route path='/client' element={<ClientPage />} /> 
            <Route path="/client-request" element={<ClientRequestPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/support-history" element={<SupportHistoryPage />} />
            <Route path="/manage-requests" element={<ManageRequestsPage />} />
            <Route path="/reply-to-request" element={<ReplyToRequestPage />} />
            <Route path="/auto-status-update" element={<AutoStatusUpdatePage />} />
            <Route path="/filter-by-status" element={<FilterByStatusPage />} />
            <Route path="/search-requests" element={<SearchRequestsPage />} />
            <Route path="/manual-status-update" element={<ManualStatusUpdatePage />} />
            <Route path="/write-reply" element={<WriteReplyPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />





=======
>>>>>>> d6fc473 (First commit)

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

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> d6fc473 (First commit)
