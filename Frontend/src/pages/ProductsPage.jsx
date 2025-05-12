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

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '' });
  const [success, setSuccess] = useState(null);
  const { user, token } = useContext(StoreContext);
  const decoded = jwtDecode(token);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/read-all-products');
        setAllProducts(response.data);
        setDisplayedProducts(response.data);
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

  console.log(allProducts);

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

  function sortHighToLow() {
    const sorted = [...displayedProducts].sort((a, b) => b.price - a.price);
    setDisplayedProducts(sorted);
  }

  function sortLowToHigh() {
    const sorted = [...displayedProducts].sort((a, b) => a.price - b.price);
    setDisplayedProducts(sorted);
  }

  function filterByCategory(category) {
    const filtered = [...allProducts].filter(
      (product) => product.category === category
    );
    setDisplayedProducts(filtered);
  }

  function filterByPrice(minPriceRange, maxPriceRange) {
    const filtered = [...allProducts].filter(
      (product) =>
        product.price >= minPriceRange && product.price <= maxPriceRange
    );
    setDisplayedProducts(filtered);
  }

  function search(searchTerm) {
    searchTerm = String(searchTerm).toLowerCase();
    const searched = [...allProducts].filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    setDisplayedProducts(searched);
  }

  return (
    <div className="product-container">
      <div className="display-buttons-wrapper">
        <h2 className="products-page-title">Products</h2>
        <div className="display-buttons">
          <FilterSortSearch
            sortHighToLow={sortHighToLow}
            sortLowToHigh={sortLowToHigh}
            categories={[
              ...new Set(
                allProducts
                  .map((product) => product.category)
                  .filter((category) => category)
              ),
            ]}
            minPrice={Math.min(...allProducts.map((product) => product.price))}
            maxPrice={Math.max(...allProducts.map((product) => product.price))}
            filterByCategory={filterByCategory}
            filterByPrice={filterByPrice}
            search={search}
          />
        </div>
      </div>
      {displayedProducts.length > 0 && (
        <div className="product-list">
          <div className="products-catalog">
            {displayedProducts.map((product) => (
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
