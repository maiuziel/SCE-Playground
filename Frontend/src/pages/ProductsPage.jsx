import React, { useEffect, useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../services/api.js';
import '../App.css';
import { StoreContext } from '../store/StoreContext.jsx';
import { jwtDecode } from 'jwt-decode';
import ProductCard from '../components/ProductCard.jsx';
import AddProductForm from '../components/AddProductForm';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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
              <AddProductForm />
            </Modal.Body>
          </Modal>
        </div>
      )}

      {products.length > 0 && (
        <div className="product-list">
          <h2 style={{ color: 'white', textAlign: 'center' }}>Products</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              margin: '4rem auto',
              maxWidth: '90%',
            }}
          >
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
