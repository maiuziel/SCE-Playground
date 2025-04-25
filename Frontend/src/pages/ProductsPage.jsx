// frontend/src/pages/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import '../App.css';
import { StoreContext } from '../store/StoreContext.jsx';
import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '' });
  const [success, setSuccess] = useState(null); // נוספה
  const { user, token } = useContext(StoreContext);
  const decoded = jwtDecode(token);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/read-all-products');
        setProducts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return (
      <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
        {error}
      </p>
    );
  }

  console.log(products);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    try {
      const response = await api.post('/products/create-product', formData);
      const newProduct = response.data; // שמור את המוצר החדש
      setSuccess(`Created new item with ID ${newProduct.id}. Welcome, ${decoded.firstName}`);
      setFormData({ name: '', category: '' });
      setProducts((prev) => [...prev, newProduct]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    }
  };

  return (
    <div className='product-container'>
      <form onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input type='text' name='name' id='name' onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='category'>Category:</label>
          <input
            type='text'
            name='category'
            id='category'
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Add</button>
        {success && (
          <p style={{ color: 'green' }}>
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      {products.length > 0 && (
  <div className="product-list">
    <h2>Product List</h2>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <strong>Name : {product.name}</strong> , Category : {product.category}
        </li>
      ))}
    </ul>
  </div>
)}
    </div>
  );
}
