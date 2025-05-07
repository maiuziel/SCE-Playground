// frontend/src/pages/AdminProductsPage.jsx
import React, { useContext, useState } from 'react';
import { StoreContext } from '../store/StoreContext.jsx';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function AdminProductsPage() {
  const { user } = useContext(StoreContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState({ name: '', price: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!user || user.email !== 'admin@gmail.com') {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await api.post('/products', product);
      setSuccess('Product added successfully!');
      setProduct({ name: '', price: '' });
    } catch (err) {
      setError('Failed to add product');
    }
  };

  return (
    <div className="auth-container">
      <h3>Add New Product (Admin)</h3>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
