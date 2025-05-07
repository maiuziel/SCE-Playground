// frontend/src/pages/SignInPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../store/StoreContext.jsx';
import api from '../services/api.js';
import '../App.css';

export default function SignInPage() {
  const { signIn, signOut, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await api.post('/auth/signin', { email, password });
      signIn(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) return;
    const validateToken = async () => {
      try {
        const { data } = await api.post('/auth/validate-token', { token }); // ← POST במקום GET
        if (data?.isValid) {
          console.log('Token is valid, user is already logged in');
          navigate('/');
          return;
        }
      } catch (err) {
        console.error('Token validation failed:', err);
      }
  
      console.log('Token is invalid or not present, redirecting to sign-in page');
      signOut();
    };
  
    validateToken();
  }, [token, navigate, signOut]);
  
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

      <h3>Sign In</h3>
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
