import React, { useEffect, useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../services/api.js';
import '../App.css';
import './ProductsPage.css';
import { StoreContext } from '../store/StoreContext.jsx';
import { jwtDecode } from 'jwt-decode';
import ProductCard from '../components/ProductCard.jsx';
import AddProductForm from '../components/AddProductForm';
import FilterSortSearch from '../components/FilterSortSearch.jsx';

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user, token } = useContext(StoreContext);
  const decoded = jwtDecode(token);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/read-all-products');
      setAllProducts(response.data);
      setDisplayedProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    }
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  function sortHighToLow() {
    const sorted = [...displayedProducts].sort((a, b) => b.price - a.price);
    setDisplayedProducts(sorted);
  }

  function sortLowToHigh() {
    const sorted = [...displayedProducts].sort((a, b) => a.price - b.price);
    setDisplayedProducts(sorted);
  }

  function filterByCategory(category) {
    const filtered = allProducts.filter(
      (product) => product.category === category
    );
    setDisplayedProducts(filtered);
  }

  function filterByPrice(minPrice, maxPrice) {
    const filtered = allProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setDisplayedProducts(filtered);
  }

  function search(searchTerm) {
    searchTerm = String(searchTerm).toLowerCase();
    const results = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    setDisplayedProducts(results);
  }

  if (error) {
    return (
      <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
        {error}
      </p>
    );
  }

  return (
    <div className="product-container">
      {user?.email === 'admin@gmail.com' && (
        <div>
          <Button variant="primary" onClick={handleOpen}>
            Add Product
          </Button>

          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddProductForm onProductAdded={fetchProducts} />
            </Modal.Body>
          </Modal>
        </div>
      )}
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
            minPrice={Math.min(
              ...allProducts.map((product) => product.price || 0)
            )}
            maxPrice={Math.max(
              ...allProducts.map((product) => product.price || 0)
            )}
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
