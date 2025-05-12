// frontend/src/pages/ProductsPage.jsx
import './ProductsPage.css';
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import '../App.css';
import { StoreContext } from '../store/StoreContext.jsx';
import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProductCard from '../components/ProductCard.jsx';
import FilterSortSearch from '../components/FilterSortSearch.jsx';
import SortDropdown from '../components/SortDropdown.jsx';
import FilterOffcanvas from '../components/FilterOffcanvas.jsx';
import Search from '../components/Search.jsx';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '' });
  const [success, setSuccess] = useState(null);
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
      const newProduct = response.data;
      setSuccess(
        `Created new item with ID ${newProduct.id}. Welcome, ${decoded.firstName}`
      );
      setFormData({ name: '', category: '' });
      setProducts((prev) => [...prev, newProduct]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    }
  };
  return (
    <div className="product-container">
      <div className="display-buttons-wrapper">
        <h2 className="products-page-title">Products</h2>
        <div className="display-buttons">
          <FilterSortSearch products={products} />
        </div>
      </div>
      {products.length > 0 && (
        <div className="product-list">
          <div className="products-catalog">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  img={product.image_url}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
