// frontend/src/pages/SignInPage.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../store/StoreContext.jsx';
import api from '../services/api.js';
import '../App.css'; // ensure global styles are available

export default function SignInPage() {
  const { signIn } = useContext(StoreContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post('/auth/signin', { email, password });
      const { token } = response.data;
      // minimal user data
      const userData = { email, ...response.data };
      signIn(userData, token);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign in failed');
    }
  }

  return (
    <div className='auth-container'>
      {/* LOADER – sits above everything else when active */}
      {loading && (
        <div className='loader-overlay'>
          <div className='spinner' />
        </div>
      )}

      <img
        className='university-icon'
        src='https://www.sce.ac.il/ver/14/tpl/website/img/SamiSH-logo_2.png'
        alt='University Icon'
      />

      <h3 style={{ color: '#000' }}>Sign In</h3>
      {error && <p className='error-message'>{error}</p>}
      <form className='auth-form' onSubmit={handleSubmit}>
        <input type='email' value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} required />
        <input type='password' value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} required />
        <button type='submit' disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}