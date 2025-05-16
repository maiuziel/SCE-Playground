// frontend/src/pages/ProductsPage.jsx
import './ProductsPage.css';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../services/api.js';
import '../App.css';
import { StoreContext } from '../store/StoreContext.jsx';
import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProductCard from '../components/ProductCard.jsx';
import AddProductForm from '../components/AddProductForm';
import FilterSortSearch from '../components/FilterSortSearch.jsx';
import products from './products.js';

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user, token } = useContext(StoreContext);
  const decoded = jwtDecode(token);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setAllProducts(products);
    setDisplayedProducts(products);
    // try {
    //   const response = await api.get('/products/read-all-products');
    //   setAllProducts(response.data);
    //   setDisplayedProducts(response.data);
    // } catch (err) {
    //   setError(err.response?.data?.message || 'Failed to fetch products');
    // }
  };

  if (error) {
    return (
      <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
        {error}
      </p>
    );
  }

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="product-container">
      {user?.email === 'admin@gmail.com' && (
        <div>
          <Button className="add-button" variant="primary" onClick={handleOpen}>
            +
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
            allProducts={allProducts}
            displayedProducts={displayedProducts}
            setDisplayedProducts={setDisplayedProducts}
            setLastSearchTerm={setLastSearchTerm} // מעביר את הפונקציה ל-Search
          />
        </div>
      </div>

      {displayedProducts.length > 0 ? (
        <>
          {lastSearchTerm && (
            <div
              style={{
                marginTop: '1rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Search results for: '{lastSearchTerm}'
            </div>
          )}

          <div className="product-list">
            <div className="products-catalog">
              {displayedProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    img={product.image_url}
                    price={product.price}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="no-results-message">
          No results found for: '{lastSearchTerm}'{' '}
        </div>
      )}
    </div>
  );
}
